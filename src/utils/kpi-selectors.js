const KPI_WINDOW_SIZE = 12;
const TOTAL_DOCKS = 9;

function countBy(items, predicate) {
  return items.reduce((total, item) => total + (predicate(item) ? 1 : 0), 0);
}

function roundPercentage(value) {
  return Math.round(value);
}

function formatSignedPercent(currentValue, previousValue) {
  if (previousValue === 0) {
    return currentValue === 0 ? "(0%)" : "(+100%)";
  }

  const change = ((currentValue - previousValue) / previousValue) * 100;
  const rounded = Math.round(change);
  const sign = rounded > 0 ? "+" : "";
  return `(${sign}${rounded}%)`;
}

function chunkArray(items, chunkSize) {
  if (items.length === 0) {
    return Array.from({ length: KPI_WINDOW_SIZE }, () => 0);
  }

  const normalizedSize = Math.max(1, Math.ceil(items.length / chunkSize));
  const chunks = [];

  for (let index = 0; index < items.length; index += normalizedSize) {
    chunks.push(items.slice(index, index + normalizedSize));
  }

  while (chunks.length < chunkSize) {
    chunks.unshift([]);
  }

  return chunks.slice(-chunkSize);
}

function buildSeries(logs, predicate) {
  return chunkArray(logs, KPI_WINDOW_SIZE).map((chunk) => countBy(chunk, predicate));
}

function getStatusCode(truck) {
  return truck.presenceState ?? truck.currentStatus?.code ?? "";
}

export function buildKpiCards({ trucks, logs, latestBySensor }) {
  const recentLogs = [...logs].sort((left, right) => Date.parse(left.timestamp) - Date.parse(right.timestamp));
  const midpoint = Math.max(1, Math.floor(recentLogs.length / 2));
  const previousWindow = recentLogs.slice(0, midpoint);
  const currentWindow = recentLogs.slice(midpoint);

  const activeTrucks = countBy(trucks, (truck) => getStatusCode(truck) === "inside");
  const previousActiveEstimate = Math.max(1, countBy(trucks, (truck) => getStatusCode(truck) !== "unknown"));
  const trucksInsidePlant = countBy(trucks, (truck) => getStatusCode(truck) === "inside");

  const entrySensors = ["gate-reader-01", "gate-reader-02"];
  const currentEntriesFromLogs = countBy(currentWindow, (log) => entrySensors.includes(log.sensorId));
  const previousEntriesFromLogs = countBy(previousWindow, (log) => entrySensors.includes(log.sensorId));
  const currentEntries = Math.max(currentEntriesFromLogs, trucksInsidePlant);
  const previousEntries = Math.max(previousEntriesFromLogs, previousActiveEstimate);

  const currentAlerts = countBy(currentWindow, (log) => log.level !== "INFO");
  const previousAlerts = countBy(previousWindow, (log) => log.level !== "INFO");

  const operationalSensors = countBy(latestBySensor, (log) => log.level !== "ERROR");
  const previousOperationalSensors = Math.max(
    0,
    operationalSensors - countBy(currentWindow, (log) => log.level === "ERROR" && latestBySensor.some((sensorLog) => sensorLog.sensorId === log.sensorId))
  );

  const occupiedDocks = countBy(trucks, (truck) => Boolean(truck.dock));
  const dockOccupancy = roundPercentage((occupiedDocks / TOTAL_DOCKS) * 100);
  const previousDockOccupancy = roundPercentage(
    (countBy(trucks, (truck) => getStatusCode(truck) === "inside" && Boolean(truck.dock)) / TOTAL_DOCKS) * 100
  );

  return [
    {
      id: "active-trucks",
      label: "Camiones Activos:",
      value: String(activeTrucks),
      delta: formatSignedPercent(activeTrucks, previousActiveEstimate),
      accent: "teal",
      points: trucks.map((truck) => (getStatusCode(truck) === "inside" ? 1 : 0))
    },
    {
      id: "today-income",
      label: "Ingresos Monitoreados:",
      value: String(currentEntries),
      delta: formatSignedPercent(currentEntries, previousEntries),
      accent: "blue",
      points: buildSeries(recentLogs, (log) => entrySensors.includes(log.sensorId))
    },
    {
      id: "recent-alerts",
      label: "Alertas Recientes:",
      value: String(currentAlerts),
      delta: formatSignedPercent(currentAlerts, previousAlerts),
      accent: "amber",
      points: buildSeries(recentLogs, (log) => log.level !== "INFO")
    },
    {
      id: "sensor-availability",
      label: "Sensores Operativos:",
      value: `${operationalSensors}/${latestBySensor.length || 0}`,
      delta: formatSignedPercent(operationalSensors, previousOperationalSensors),
      accent: "teal",
      points: buildSeries(recentLogs, (log) => log.level === "INFO")
    },
    {
      id: "dock-occupancy",
      label: "Ocupacion De Muelles:",
      value: `${dockOccupancy}%`,
      delta: formatSignedPercent(dockOccupancy, previousDockOccupancy),
      accent: "blue",
      points: trucks.map((truck) => (truck.dock ? 1 : 0))
    }
  ].slice(0, 4);
}
