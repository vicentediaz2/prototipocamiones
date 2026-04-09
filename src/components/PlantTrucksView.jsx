import { getPlantTrucks } from "../utils/truck-selectors.js";

const PLANT_VIEW_CONFIG = {
  cardClassName: "plant-view",
  listCardClassName: "panel-card plant-view__list-card",
  summaryCardClassName: "panel-card plant-view__summary-card",
  summaryTitle: "Resumen De Planta",
  tableTitle: "Camiones Actualmente Dentro De Planta",
  tableHeaders: ["ID Camion", "Matricula", "Muelle", "Estado", "Hora Entrada"],
  emptyMessage: "No hay camiones dentro de la planta en este momento."
};

function PlantStatusPill({ status }) {
  return <span className={`status-pill status-pill--${status.tone}`}>{status.text}</span>;
}

function SummaryMetric({ label, value }) {
  return (
    <div className="plant-view__summary-metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export function PlantTrucksView({ trucks }) {
  const trucksInsidePlant = getPlantTrucks(trucks);
  const latestEntryTime = trucksInsidePlant.at(-1)?.entryAt ?? "--:--:--";

  return (
    <section className={PLANT_VIEW_CONFIG.cardClassName}>
      <div className={PLANT_VIEW_CONFIG.summaryCardClassName}>
        <div className="panel-card__header">
          <span>{PLANT_VIEW_CONFIG.summaryTitle}</span>
        </div>
        <div className="plant-view__summary-grid">
          <SummaryMetric label="Camiones En Planta" value={trucksInsidePlant.length} />
          <SummaryMetric label="Estado Base" value="Entrada Registrada" />
          <SummaryMetric label="Ultimo Ingreso" value={latestEntryTime} />
        </div>
      </div>

      <div className={PLANT_VIEW_CONFIG.listCardClassName}>
        <div className="panel-card__header">
          <span>{PLANT_VIEW_CONFIG.tableTitle}</span>
        </div>

        {trucksInsidePlant.length > 0 ? (
          <div className="table-shell">
            <table className="data-table">
              <thead>
                <tr>
                  {PLANT_VIEW_CONFIG.tableHeaders.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {trucksInsidePlant.map((truck) => (
                  <tr key={`${truck.id}-${truck.plate}`}>
                    <td>{truck.id}</td>
                    <td>{truck.plate}</td>
                    <td>{truck.dock ?? truck.location}</td>
                    <td>
                      <PlantStatusPill status={truck.status} />
                    </td>
                    <td>{truck.entryAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="plant-view__empty-state">{PLANT_VIEW_CONFIG.emptyMessage}</div>
        )}
      </div>
    </section>
  );
}
