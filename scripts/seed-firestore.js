import "../server/env.js";
import fs from "node:fs";
import path from "node:path";
import { getDb } from "../server/firebase.js";

const dataFilePath = path.resolve("server", "data", "truck-events.json");
const COLLECTION_NAME = "truckEvents";
const META_COLLECTION = "metadata";
const META_DOC_ID = "truckEvents";

function parseSequence(eventoId) {
  const match = /^mov-(\d+)$/i.exec(String(eventoId ?? "").trim());
  return match ? Number.parseInt(match[1], 10) : Number.NaN;
}

function chunk(items, size) {
  const result = [];
  for (let index = 0; index < items.length; index += size) {
    result.push(items.slice(index, index + size));
  }
  return result;
}

async function main() {
  if (!fs.existsSync(dataFilePath)) {
    throw new Error(`No existe archivo: ${dataFilePath}`);
  }

  const raw = fs.readFileSync(dataFilePath, "utf8");
  const parsed = JSON.parse(raw);

  if (!Array.isArray(parsed)) {
    throw new Error("El JSON debe ser un arreglo de eventos");
  }

  const events = parsed;
  const db = getDb();

  const maxSequence = events.reduce((currentMax, event) => {
    const seq = parseSequence(event.eventoId);
    return Number.isNaN(seq) ? currentMax : Math.max(currentMax, seq);
  }, 0);

  const batches = chunk(events, 400);

  for (const batchEvents of batches) {
    const batch = db.batch();

    batchEvents.forEach((event) => {
      const eventoId = String(event.eventoId ?? "").trim();

      if (!eventoId) {
        return;
      }

      const timestampMs = Date.parse(`${event.fecha}T${event.hora}`);
      const ref = db.collection(COLLECTION_NAME).doc(eventoId);

      batch.set(
        ref,
        {
          truckId: event.truckId ?? null,
          plate: event.plate ?? null,
          estado: event.estado,
          gate: event.gate ?? null,
          fecha: event.fecha,
          hora: event.hora,
          timestampMs: Number.isNaN(timestampMs) ? null : timestampMs,
          migratedAtMs: Date.now()
        },
        { merge: true }
      );
    });

    await batch.commit();
  }

  await db
    .collection(META_COLLECTION)
    .doc(META_DOC_ID)
    .set(
      {
        nextSequence: maxSequence + 1
      },
      { merge: true }
    );

  console.log(`Migrados ${events.length} eventos a Firestore (${COLLECTION_NAME}). nextSequence=${maxSequence + 1}`);
}

main().catch((error) => {
  console.error("Error migrando eventos:", error);
  process.exit(1);
});
