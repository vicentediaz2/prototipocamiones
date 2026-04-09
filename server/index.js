import fs from "node:fs";
import http from "node:http";
import https from "node:https";
import path from "node:path";
import express from "express";
import {
  getAllLogs,
  getLatestLogPerSensor,
  getLogSummary,
  getRecentLogs
} from "./log-store.js";
import {
  appendTruckEvent,
  getTruckEvents,
  getTruckEventsSummary
} from "./truck-events-store.js";
import { getTruckStates, getTruckStatesSummary } from "./truck-state-store.js";

const app = express();
const port = 3001;
const useHttps = process.argv.includes("--https");

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    message: "Backend operativo",
    protocol: useHttps ? "https" : "http",
    logs: getLogSummary(),
    truckEvents: getTruckEventsSummary(),
    truckStates: getTruckStatesSummary()
  });
});

app.get("/api/truck-events", (req, res) => {
  const events = getTruckEvents({
    limit: req.query.limit,
    sort: req.query.sort,
    truckId: req.query.truckId,
    plate: req.query.plate,
    estado: req.query.estado,
    fecha: req.query.fecha,
    search: req.query.search
  });

  res.json({
    total: events.length,
    items: events
  });
});

app.post("/api/truck-events", (req, res) => {
  try {
    const event = appendTruckEvent(req.body);
    const truck = getTruckStates().find((item) => item.id === event.truckId || item.plate === event.plate) ?? null;

    res.status(201).json({
      ok: true,
      item: event,
      truck
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: error.message
    });
  }
});

app.get("/api/logs", (req, res) => {
  const logs = getAllLogs({
    limit: req.query.limit,
    sensorId: req.query.sensorId,
    level: req.query.level,
    since: req.query.since,
    sort: req.query.sort
  });

  res.json({
    total: logs.length,
    items: logs
  });
});

app.get("/api/logs/recent", (req, res) => {
  const logs = getRecentLogs(req.query.limit);

  res.json({
    total: logs.length,
    items: logs
  });
});

app.get("/api/logs/latest-by-sensor", (_req, res) => {
  const logs = getLatestLogPerSensor();

  res.json({
    total: logs.length,
    items: logs
  });
});

app.get("/api/trucks/state", (req, res) => {
  const trucks = getTruckStates({
    presenceState: req.query.presenceState,
    search: req.query.search
  });

  res.json({
    total: trucks.length,
    summary: getTruckStatesSummary(),
    items: trucks
  });
});

const certDir = path.resolve("certs");
const keyPath = path.join(certDir, "localhost-key.pem");
const certPath = path.join(certDir, "localhost.pem");

const server =
  useHttps && fs.existsSync(keyPath) && fs.existsSync(certPath)
    ? https.createServer(
        {
          key: fs.readFileSync(keyPath),
          cert: fs.readFileSync(certPath)
        },
        app
      )
    : http.createServer(app);

server.listen(port, () => {
  const protocol = useHttps ? "https" : "http";
  console.log(`Backend disponible en ${protocol}://localhost:${port}`);
});
