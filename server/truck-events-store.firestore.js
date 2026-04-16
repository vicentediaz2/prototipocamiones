import process from "node:process";
import { getDb, getFirebaseProjectId } from "./firebase.js";

const COLLECTION_NAME = "truckEvents";
const META_COLLECTION = "metadata";
const META_DOC_ID = "truckEvents";
const DEFAULT_TIMEZONE = process.env.APP_TIMEZONE ?? "America/Santiago";

function normalizeLimit(rawLimit, fallback = 25) {
  const parsed = Number.parseInt(rawLimit, 10);

  if (Number.isNaN(parsed) || parsed <= 0) {
    return fallback;
  }

  return Math.min(parsed, 200);
}

function toJsDate(value) {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return value;
  }

  if (typeof value?.toDate === "function") {
    return value.toDate();
  }

  const seconds = value?.seconds ?? value?._seconds;

  if (typeof seconds === "number") {
    return new Date(seconds * 1000);
  }

  if (typeof value === "string") {
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? null : new Date(parsed);
  }

  return null;
}

function formatDateParts(date) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: DEFAULT_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  const parts = formatter.formatToParts(date);
  const year = parts.find((part) => part.type === "year")?.value ?? "1970";
  const month = parts.find((part) => part.type === "month")?.value ?? "01";
  const day = parts.find((part) => part.type === "day")?.value ?? "01";

  return `${year}-${month}-${day}`;
}

function formatTimeParts(date) {
  return date.toLocaleTimeString("en-GB", {
    timeZone: DEFAULT_TIMEZONE,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}

function getEventTimestampMs(event) {
  if (typeof event?.timestampMs === "number" && Number.isFinite(event.timestampMs)) {
    return event.timestampMs;
  }

  if (typeof event?.fecha === "string" && typeof event?.hora === "string") {
    const parsed = Date.parse(`${event.fecha}T${event.hora}`);
    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }

  const fechaDate = toJsDate(event?.fecha);
  return fechaDate ? fechaDate.getTime() : 0;
}

function normalizeTruckId(truckId) {
  const raw = String(truckId ?? "").trim();

  if (!raw) {
    return null;
  }

  if (/^\d+$/.test(raw) && raw.length < 3) {
    return raw.padStart(3, "0");
  }

  return raw;
}

function normalizeEventShape(event) {
  const derivedDate = typeof event?.fecha === "string" ? null : toJsDate(event?.fecha);

  const fecha = typeof event?.fecha === "string" ? event.fecha : derivedDate ? formatDateParts(derivedDate) : null;
  const hora = typeof event?.hora === "string" ? event.hora : derivedDate ? formatTimeParts(derivedDate) : null;
  const gate = event?.gate ? String(event.gate).trim() : null;

  return {
    eventoId: String(event.eventoId ?? "").trim(),
    truckId: normalizeTruckId(event.truckId),
    plate: event.plate ? String(event.plate).toUpperCase() : null,
    estado: String(event.estado ?? "").trim().toLowerCase(),
    gate: gate || null,
    fecha,
    hora
  };
}

function matchesEvent(event, filters = {}) {
  const searchTerm = (filters.search ?? "").trim().toUpperCase();

  if (filters.estado && event.estado !== filters.estado) {
    return false;
  }

  if (filters.truckId && event.truckId !== filters.truckId) {
    return false;
  }

  if (filters.plate && event.plate !== String(filters.plate).toUpperCase()) {
    return false;
  }

  if (filters.fecha && event.fecha !== filters.fecha) {
    return false;
  }

  if (searchTerm && !String(event.truckId ?? "").includes(searchTerm) && !String(event.plate ?? "").includes(searchTerm)) {
    return false;
  }

  return true;
}

async function readRecentEvents(maxDocs = 200) {
  const db = getDb();
  const collectionRef = db.collection(COLLECTION_NAME);

  const snapshot = await (async () => {
    try {
      const ordered = await collectionRef.orderBy("timestampMs", "desc").limit(maxDocs).get();

      if (!ordered.empty) {
        return ordered;
      }

      return await collectionRef.limit(maxDocs).get();
    } catch {
      return await collectionRef.limit(maxDocs).get();
    }
  })();

  return snapshot.docs.map((doc) => ({ ...doc.data(), eventoId: doc.id }));
}

export async function getTruckEvents(filters = {}) {
  const limit = normalizeLimit(filters.limit, 50);
  const sortDirection = filters.sort === "asc" ? "asc" : "desc";
  const events = await readRecentEvents(200);
  const filteredEvents = events.filter((event) => matchesEvent(event, filters));

  const sorted = filteredEvents.sort((left, right) => {
    const delta = getEventTimestampMs(left) - getEventTimestampMs(right);
    return sortDirection === "asc" ? delta : -delta;
  });

  return sorted
    .slice(0, limit)
    .map((event) => normalizeEventShape(event))
    .filter((event) => event.eventoId && event.fecha && event.hora);
}

export async function appendTruckEvent(payload) {
  const truckId = String(payload.truckId ?? "").trim();
  const plate = String(payload.plate ?? "").trim().toUpperCase();
  const estado = String(payload.estado ?? "").trim().toLowerCase();
  const fecha = String(payload.fecha ?? "").trim();
  const hora = String(payload.hora ?? "").trim();
  const gate = String(payload.gate ?? "").trim();
  const timestampMs = Date.parse(`${fecha}T${hora}`);

  if (!truckId && !plate) {
    throw new Error("Debe incluir truckId o plate");
  }

  if (!["entrar", "salir"].includes(estado)) {
    throw new Error("El estado debe ser 'entrar' o 'salir'");
  }

  if (!fecha || !hora || Number.isNaN(timestampMs)) {
    throw new Error("Fecha u hora invalidas");
  }

  const db = getDb();
  const metaRef = db.collection(META_COLLECTION).doc(META_DOC_ID);

  const newEvent = await db.runTransaction(async (transaction) => {
    const metaSnap = await transaction.get(metaRef);
    const nextSequence = (metaSnap.exists ? Number(metaSnap.data()?.nextSequence) : 1) || 1;
    const eventoId = `mov-${String(nextSequence).padStart(4, "0")}`;
    const eventRef = db.collection(COLLECTION_NAME).doc(eventoId);

    transaction.set(
      eventRef,
      {
        truckId: truckId || null,
        plate: plate || null,
        estado,
        gate: gate || null,
        fecha,
        hora,
        timestampMs,
        createdAtMs: Date.now(),
        createdBy: process.env.USER ?? "server"
      },
      { merge: true }
    );

    transaction.set(
      metaRef,
      {
        nextSequence: nextSequence + 1
      },
      { merge: true }
    );

    return {
      eventoId,
      truckId: truckId || null,
      plate: plate || null,
      estado,
      gate: gate || null,
      fecha,
      hora
    };
  });

  return newEvent;
}

export async function getTruckEventsSummary() {
  const db = getDb();
  const metaRef = db.collection(META_COLLECTION).doc(META_DOC_ID);
  const metaSnap = await metaRef.get();
  const nextSequence = metaSnap.exists ? Number(metaSnap.data()?.nextSequence) : Number.NaN;
  const recentEvents = await readRecentEvents(200);

  return {
    total: Number.isNaN(nextSequence) ? recentEvents.length : Math.max(nextSequence - 1, 0),
    entradas: recentEvents.filter((event) => event.estado === "entrar").length,
    salidas: recentEvents.filter((event) => event.estado === "salir").length,
    ultimoEvento: (await getTruckEvents({ limit: 1 }))[0] ?? null,
    driver: "firebase",
    projectId: getFirebaseProjectId(),
    collection: COLLECTION_NAME
  };
}
