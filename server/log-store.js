const LOG_LEVELS = ["INFO", "WARN", "ERROR"];

const SENSOR_CATALOG = [
  {
    sensorId: "gate-reader-01",
    sensorName: "Gate Reader 01",
    zone: "Acceso Sur",
    messages: [
      "Lectura RFID completada",
      "Camion autorizado para ingreso",
      "Patente validada contra agenda",
      "Control de acceso sincronizado"
    ]
  },
  {
    sensorId: "gate-reader-02",
    sensorName: "Gate Reader 02",
    zone: "Acceso Norte",
    messages: [
      "Lectura RFID completada",
      "Control documental verificado",
      "Camion redirigido a patio de espera",
      "Ingreso liberado por seguridad"
    ]
  },
  {
    sensorId: "dock-scale-01",
    sensorName: "Balanza Patio",
    zone: "Patio Central",
    messages: [
      "Peso bruto registrado",
      "Variacion de carga dentro de rango",
      "Revision de peso pendiente",
      "Pesaje final enviado a ERP"
    ]
  },
  {
    sensorId: "temp-node-04",
    sensorName: "ESP32 Node 04",
    zone: "Camara Fria",
    messages: [
      "Temperatura actualizada",
      "Sensor reconectado tras microcorte",
      "Lectura fuera de rango detectada",
      "Calibracion automatica aplicada"
    ]
  },
  {
    sensorId: "yard-cam-02",
    sensorName: "Yard Cam 02",
    zone: "Patio Norte",
    messages: [
      "Movimiento detectado en patio",
      "Snapshot enviado al panel",
      "Cola de camiones actualizada",
      "Visibilidad reducida por neblina"
    ]
  },
  {
    sensorId: "dock-sensor-07",
    sensorName: "Dock Sensor 07",
    zone: "Muelle 07",
    messages: [
      "Inicio de descarga registrado",
      "Cierre de descarga confirmado",
      "Retraso sobre SLA detectado",
      "Asignacion de muelle actualizada"
    ]
  }
];

const TOTAL_LOGS = 480;

function pickLogLevel(index) {
  if (index % 19 === 0) {
    return "ERROR";
  }

  if (index % 7 === 0) {
    return "WARN";
  }

  return "INFO";
}

function generateLogs() {
  const baseTimestamp = new Date("2026-04-09T08:00:00.000Z").getTime();

  return Array.from({ length: TOTAL_LOGS }, (_, index) => {
    const sensor = SENSOR_CATALOG[index % SENSOR_CATALOG.length];
    const level = pickLogLevel(index);
    const timestamp = new Date(baseTimestamp + index * 5 * 60 * 1000);
    const message = sensor.messages[index % sensor.messages.length];

    return {
      id: `log-${String(index + 1).padStart(4, "0")}`,
      sensorId: sensor.sensorId,
      sensorName: sensor.sensorName,
      zone: sensor.zone,
      level,
      message,
      timestamp: timestamp.toISOString()
    };
  });
}

const logs = generateLogs();

function normalizeLimit(rawLimit, fallback = 25) {
  const parsed = Number.parseInt(rawLimit, 10);

  if (Number.isNaN(parsed) || parsed <= 0) {
    return fallback;
  }

  return Math.min(parsed, 200);
}

function applyLogFilters(collection, filters = {}) {
  const { sensorId, level, since } = filters;
  const sinceTimestamp = since ? Date.parse(since) : Number.NaN;

  return collection.filter((log) => {
    if (sensorId && log.sensorId !== sensorId) {
      return false;
    }

    if (level && log.level !== level.toUpperCase()) {
      return false;
    }

    if (!Number.isNaN(sinceTimestamp) && Date.parse(log.timestamp) < sinceTimestamp) {
      return false;
    }

    return true;
  });
}

function sortLogsByTimestamp(collection, direction = "desc") {
  const order = direction === "asc" ? 1 : -1;

  return [...collection].sort((left, right) => {
    const delta = Date.parse(left.timestamp) - Date.parse(right.timestamp);
    return delta * order;
  });
}

export function getAllLogs(filters = {}) {
  const direction = filters.sort === "asc" ? "asc" : "desc";
  const limit = normalizeLimit(filters.limit);
  const filteredLogs = applyLogFilters(logs, filters);

  return sortLogsByTimestamp(filteredLogs, direction).slice(0, limit);
}

export function getRecentLogs(limit = 10) {
  return sortLogsByTimestamp(logs).slice(0, normalizeLimit(limit, 10));
}

export function getLatestLogPerSensor() {
  const latestBySensor = new Map();

  sortLogsByTimestamp(logs).forEach((log) => {
    if (!latestBySensor.has(log.sensorId)) {
      latestBySensor.set(log.sensorId, log);
    }
  });

  return [...latestBySensor.values()];
}

export function getLogSummary() {
  return {
    totalLogs: logs.length,
    sensors: SENSOR_CATALOG.length,
    latestTimestamp: sortLogsByTimestamp(logs)[0]?.timestamp ?? null
  };
}
