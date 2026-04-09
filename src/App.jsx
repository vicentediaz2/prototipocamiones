import { useEffect, useState } from "react";
import { DashboardApp } from "./components/DashboardApp.jsx";
import { buildKpiCards } from "./utils/kpi-selectors.js";

const APP_COMPONENT_CONFIG = {
  componentName: "App",
  defaultViewId: "dashboard"
};

export function App({ data }) {
  const [activeViewId, setActiveViewId] = useState(APP_COMPONENT_CONFIG.defaultViewId);
  const [dashboardState, setDashboardState] = useState(() => ({
    ...data,
    kpiCards: buildKpiCards({
      trucks: data.trucks,
      logs: data.facilityPanel.recentLogs,
      latestBySensor: data.facilityPanel.recentLogs
    }),
    truckEvents: data.truckEvents ?? [],
    truckStateSummary: data.truckStateSummary ?? { total: data.trucks.length, inside: 0, outside: 0, unknown: 0 }
  }));

  useEffect(() => {
    let isMounted = true;

    async function loadDashboardMetrics() {
      try {
        const [recentResponse, latestBySensorResponse, truckStatesResponse, truckEventsResponse] = await Promise.all([
          fetch("/api/logs/recent?limit=120"),
          fetch("/api/logs/latest-by-sensor"),
          fetch("/api/trucks/state"),
          fetch("/api/truck-events?limit=200&sort=desc")
        ]);

        if (!recentResponse.ok || !latestBySensorResponse.ok || !truckStatesResponse.ok || !truckEventsResponse.ok) {
          throw new Error(
            `No se pudo cargar metricas: ${recentResponse.status} / ${latestBySensorResponse.status} / ${truckStatesResponse.status} / ${truckEventsResponse.status}`
          );
        }

        const recentPayload = await recentResponse.json();
        const latestBySensorPayload = await latestBySensorResponse.json();
        const truckStatesPayload = await truckStatesResponse.json();
        const truckEventsPayload = await truckEventsResponse.json();

        if (!isMounted) {
          return;
        }

        setDashboardState((currentData) => ({
          ...currentData,
          kpiCards: buildKpiCards({
            trucks: truckStatesPayload.items,
            logs: recentPayload.items,
            latestBySensor: latestBySensorPayload.items
          }),
          trucks: truckStatesPayload.items,
          truckStateSummary: truckStatesPayload.summary,
          truckEvents: truckEventsPayload.items,
          facilityPanel: {
            ...currentData.facilityPanel,
            recentLogs: recentPayload.items
          }
        }));
      } catch (error) {
        console.error("Fallo al obtener metricas del dashboard", error);
      }
    }

    loadDashboardMetrics();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <DashboardApp
      activeViewId={activeViewId}
      data={dashboardState}
      data-component={APP_COMPONENT_CONFIG.componentName}
      onViewChange={setActiveViewId}
    />
  );
}
