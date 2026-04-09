import { truckCatalog } from "./truck-catalog.js";
import { getTruckEvents } from "./truck-events-store.js";

function getEventTimestamp(event) {
  return Date.parse(`${event.fecha}T${event.hora}`);
}

function getLatestEvent(events) {
  return [...events].sort((left, right) => getEventTimestamp(right) - getEventTimestamp(left))[0] ?? null;
}

function getLastEntryEvent(events) {
  return getLatestEvent(events.filter((event) => event.estado === "entrar"));
}

function getDerivedStatus(truck, latestEvent) {
  if (!latestEvent) {
    return {
      presenceState: "unknown",
      currentStatus: { code: "unknown", text: "Sin Movimientos", tone: "amber" },
      currentLocation: "Sin registro",
      currentProcess: "Pendiente de primer evento"
    };
  }

  if (latestEvent.estado === "entrar") {
    return {
      presenceState: "inside",
      currentStatus: { code: "inside", text: "Dentro De Planta", tone: "green" },
      currentLocation: truck.dock ?? "Patio de espera",
      currentProcess: truck.dock ? "Operacion en muelle" : "Espera de asignacion"
    };
  }

  return {
    presenceState: "outside",
    currentStatus: { code: "outside", text: "Fuera De Planta", tone: "blue" },
    currentLocation: "Fuera de planta",
    currentProcess: "Salida registrada"
  };
}

function matchesTruck(truck, filters = {}) {
  const search = String(filters.search ?? "").trim().toUpperCase();

  if (filters.presenceState && truck.presenceState !== filters.presenceState) {
    return false;
  }

  if (!search) {
    return true;
  }

  return (
    truck.id.includes(search) ||
    truck.plate.includes(search) ||
    truck.driverName.toUpperCase().includes(search) ||
    truck.company.toUpperCase().includes(search)
  );
}

export function getTruckStates(filters = {}) {
  const events = getTruckEvents({ limit: 200, sort: "desc" });

  return truckCatalog
    .map((truck) => {
      const truckEvents = events.filter((event) => event.truckId === truck.id || event.plate === truck.plate);
      const latestEvent = getLatestEvent(truckEvents);
      const lastEntryEvent = getLastEntryEvent(truckEvents);
      const derivedStatus = getDerivedStatus(truck, latestEvent);

      return {
        ...truck,
        ...derivedStatus,
        entryAt: lastEntryEvent?.hora ?? "--:--:--",
        lastMovement: latestEvent
          ? {
              estado: latestEvent.estado,
              fecha: latestEvent.fecha,
              hora: latestEvent.hora
            }
          : null
      };
    })
    .filter((truck) => matchesTruck(truck, filters))
    .sort((left, right) => {
      const leftTimestamp = left.lastMovement ? Date.parse(`${left.lastMovement.fecha}T${left.lastMovement.hora}`) : 0;
      const rightTimestamp = right.lastMovement ? Date.parse(`${right.lastMovement.fecha}T${right.lastMovement.hora}`) : 0;
      return rightTimestamp - leftTimestamp;
    });
}

export function getTruckStatesSummary() {
  const trucks = getTruckStates();

  return {
    total: trucks.length,
    inside: trucks.filter((truck) => truck.presenceState === "inside").length,
    outside: trucks.filter((truck) => truck.presenceState === "outside").length,
    unknown: trucks.filter((truck) => truck.presenceState === "unknown").length
  };
}
