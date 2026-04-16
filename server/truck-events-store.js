const driver = process.env.STORAGE_DRIVER ?? "file";

const impl =
  driver === "firebase"
    ? await import("./truck-events-store.firestore.js")
    : await import("./truck-events-store.file.js");

export const getTruckEvents = impl.getTruckEvents;
export const appendTruckEvent = impl.appendTruckEvent;
export const getTruckEventsSummary = impl.getTruckEventsSummary;

