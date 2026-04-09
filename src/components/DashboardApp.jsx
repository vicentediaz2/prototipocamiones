import { IconSprite } from "./IconSprite.jsx";
import { Sidebar } from "./Sidebar.jsx";
import { Topbar } from "./Topbar.jsx";
import { MetricCards } from "./MetricCards.jsx";
import { TruckTable } from "./TruckTable.jsx";
import { TrafficChart } from "./TrafficChart.jsx";
import { FacilityScene } from "./FacilityScene.jsx";
import { PlantTrucksView } from "./PlantTrucksView.jsx";
import { OperationsPanel } from "./OperationsPanel.jsx";
import { TruckEventLogView } from "./TruckEventLogView.jsx";

const APP_SHELL = {
  pageClassName: "dashboard-page",
  shellClassName: "app-shell",
  sidebarClassName: "sidebar",
  contentClassName: "content",
  gridClassName: "dashboard-grid",
  leftColumnClassName: "dashboard-column dashboard-column--wide",
  rightColumnClassName: "dashboard-column dashboard-column--narrow"
};

function DashboardView({ data }) {
  return (
    <section className={APP_SHELL.gridClassName}>
      <div className={APP_SHELL.leftColumnClassName}>
        <MetricCards cards={data.kpiCards} />
        <TruckTable table={data.truckTable} trucks={data.trucks} />
        <TrafficChart chart={data.trafficChart} />
        <OperationsPanel panel={data.operationsPanel} trucks={data.trucks} />
      </div>
      <div className={APP_SHELL.rightColumnClassName}>
        <FacilityScene panel={data.facilityPanel} />
      </div>
    </section>
  );
}

function resolveViewTitle(activeViewId, data) {
  const matchedItem = data.sidebarItems.find((item) => item.id === activeViewId);
  return matchedItem?.viewTitle ?? data.header.sectionTitle;
}

export function DashboardApp({ activeViewId, data, onViewChange }) {
  const resolvedHeader = {
    ...data.header,
    sectionTitle: resolveViewTitle(activeViewId, data)
  };

  return (
    <div className={APP_SHELL.pageClassName}>
      <IconSprite />
      <section className={APP_SHELL.shellClassName}>
        <Sidebar
          activeItemId={activeViewId}
          brandName={data.brandName}
          className={APP_SHELL.sidebarClassName}
          items={data.sidebarItems}
          onItemSelect={onViewChange}
        />
        <main className={APP_SHELL.contentClassName}>
          <Topbar header={resolvedHeader} />
          {activeViewId === "fleet" ? <TruckEventLogView events={data.truckEvents ?? []} compact /> : null}
          {activeViewId === "reports" ? <TruckEventLogView events={data.truckEvents ?? []} /> : null}
          {activeViewId === "sensors" ? <PlantTrucksView trucks={data.trucks} /> : null}
          {!["fleet", "reports", "sensors"].includes(activeViewId) ? <DashboardView data={data} /> : null}
        </main>
      </section>
    </div>
  );
}
