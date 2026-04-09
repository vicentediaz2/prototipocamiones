const TRUCK_STATE_VIEW_CONFIG = {
  cardClassName: "plant-view",
  summaryCardClassName: "panel-card plant-view__summary-card",
  listCardClassName: "panel-card plant-view__list-card",
  summaryTitle: "Log Consolidado De Camiones",
  tableTitle: "Ultimos Movimientos Por Camion",
  tableHeaders: ["ID Camion", "Patente", "Ultimo Movimiento", "Fecha", "Hora", "Estado Derivado", "Ubicacion"],
  emptyMessage: "No hay estados disponibles."
};

function SummaryMetric({ label, value }) {
  return (
    <div className="plant-view__summary-metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function TruckStatusPill({ status }) {
  return <span className={`status-pill status-pill--${status.tone}`}>{status.text}</span>;
}

export function TruckStateView({ trucks, summary }) {
  return (
    <section className={TRUCK_STATE_VIEW_CONFIG.cardClassName}>
      <div className={TRUCK_STATE_VIEW_CONFIG.summaryCardClassName}>
        <div className="panel-card__header">
          <span>{TRUCK_STATE_VIEW_CONFIG.summaryTitle}</span>
        </div>
        <div className="plant-view__summary-grid">
          <SummaryMetric label="Total Camiones" value={summary.total} />
          <SummaryMetric label="Ultimos Ingresos Activos" value={summary.inside} />
          <SummaryMetric label="Ultimas Salidas" value={summary.outside} />
        </div>
      </div>

      <div className={TRUCK_STATE_VIEW_CONFIG.listCardClassName}>
        <div className="panel-card__header">
          <span>{TRUCK_STATE_VIEW_CONFIG.tableTitle}</span>
        </div>

        {trucks.length > 0 ? (
          <div className="table-shell">
            <table className="data-table">
              <thead>
                <tr>
                  {TRUCK_STATE_VIEW_CONFIG.tableHeaders.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {trucks.map((truck) => (
                  <tr key={`${truck.id}-${truck.plate}`}>
                    <td>{truck.id}</td>
                    <td>{truck.plate}</td>
                    <td>{truck.lastMovement?.estado ?? "--"}</td>
                    <td>{truck.lastMovement?.fecha ?? "--"}</td>
                    <td>{truck.lastMovement?.hora ?? "--"}</td>
                    <td>
                      <TruckStatusPill status={truck.currentStatus} />
                    </td>
                    <td>{truck.currentLocation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="plant-view__empty-state">{TRUCK_STATE_VIEW_CONFIG.emptyMessage}</div>
        )}
      </div>
    </section>
  );
}
