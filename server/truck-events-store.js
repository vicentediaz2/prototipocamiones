import fs from "node:fs";
import path from "node:path";

const dataFilePath = path.resolve("server", "data", "truck-events.json");

function ensureDataFile() {
  const directoryPath = path.dirname(dataFilePath);

  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }

  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, "[]", "utf8");
  }
}

function readEvents() {
  ensureDataFile();

  const fileContent = fs.readFileSync(dataFilePath, "utf8");
  const parsed = JSON.parse(fileContent);

  return Array.isArray(parsed) ? parsed : [];
}

function writeEvents(events) {
  ensureDataFile();
  fs.writeFileSync(dataFilePath, JSON.stringify(events, null, 2), "utf8");
}

function toComparableTimestamp(event) {
  return Date.parse(`${event.fecha}T${event.hora}`);
}

function normalizeLimit(rawLimit, fallback = 25) {
  const parsed = Number.parseInt(rawLimit, 10);

  if (Number.isNaN(parsed) || parsed <= 0) {
    return fallback;
  }

  return Math.min(parsed, 200);
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

  if (searchTerm && !event.truckId.includes(searchTerm) && !event.plate.includes(searchTerm)) {
    return false;
  }

  return true;
}

export function getTruckEvents(filters = {}) {
  const limit = normalizeLimit(filters.limit, 50);
  const sortDirection = filters.sort === "asc" ? "asc" : "desc";
  const filteredEvents = readEvents().filter((event) => matchesEvent(event, filters));

  const sortedEvents = filteredEvents.sort((left, right) => {
    const delta = toComparableTimestamp(left) - toComparableTimestamp(right);
    return sortDirection === "asc" ? delta : -delta;
  });

  return sortedEvents.slice(0, limit);
}

export function appendTruckEvent(payload) {
  const truckId = String(payload.truckId ?? "").trim();
  const plate = String(payload.plate ?? "").trim().toUpperCase();
  const estado = String(payload.estado ?? "").trim().toLowerCase();
  const fecha = String(payload.fecha ?? "").trim();
  const hora = String(payload.hora ?? "").trim();

  if (!truckId && !plate) {
    throw new Error("Debe incluir truckId o plate");
  }

  if (!["entrar", "salir"].includes(estado)) {
    throw new Error("El estado debe ser 'entrar' o 'salir'");
  }

  if (!fecha || !hora || Number.isNaN(Date.parse(`${fecha}T${hora}`))) {
    throw new Error("Fecha u hora invalidas");
  }

  const events = readEvents();
  const nextSequence = String(events.length + 1).padStart(4, "0");
  const newEvent = {
    eventoId: `mov-${nextSequence}`,
    truckId: truckId || null,
    plate: plate || null,
    estado,
    fecha,
    hora
  };

  events.push(newEvent);
  writeEvents(events);

  return newEvent;
}

export function getTruckEventsSummary() {
  const events = readEvents();

  return {
    total: events.length,
    entradas: events.filter((event) => event.estado === "entrar").length,
    salidas: events.filter((event) => event.estado === "salir").length,
    ultimoEvento: getTruckEvents({ limit: 1 })[0] ?? null,
    filePath: dataFilePath
  };
}
