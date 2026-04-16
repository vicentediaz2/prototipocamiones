const TRUCK_EVENT_LOG_CONFIG = {
  cardClassName: "panel-card event-log-view",
  tableShellClassName: "table-shell table-shell--log",
  title: "Vista Bruta De Truck Events",
  compactTitle: "Log Camiones",
  headers: ["Evento", "ID Camion", "Patente", "Estado", "Fecha", "Hora"],
  compactHeaders: ["Patente", "Ultimo Movimiento", "Puerta", "Fecha", "Hora"],
  emptyMessage: "No hay movimientos registrados."
};

function EventStatePill({ estado }) {
  const tone = estado === "entrar" ? "green" : "blue";
  const label = estado === "entrar" ? "Entrada" : "Salida";

  return <span className={`status-pill status-pill--${tone}`}>{label}</span>;
}

export function TruckEventLogView({ events, compact = false }) {
  const headers = compact ? TRUCK_EVENT_LOG_CONFIG.compactHeaders : TRUCK_EVENT_LOG_CONFIG.headers;
  const title = compact ? TRUCK_EVENT_LOG_CONFIG.compactTitle : TRUCK_EVENT_LOG_CONFIG.title;

  return (
    <section className={TRUCK_EVENT_LOG_CONFIG.cardClassName}>
      <div className="panel-card__header">
        <span>{title}</span>
      </div>

      {events.length > 0 ? (
        <div className={TRUCK_EVENT_LOG_CONFIG.tableShellClassName}>
          <table className="data-table">
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.eventoId}>
                  {compact ? (
                    <>
                      <td>{event.plate ?? "--"}</td>
                      <td>
                        <EventStatePill estado={event.estado} />
                      </td>
                      <td>{event.gate ?? "--"}</td>
                      <td>{event.fecha}</td>
                      <td>{event.hora}</td>
                    </>
                  ) : (
                    <>
                      <td>{event.eventoId}</td>
                      <td>{event.truckId ?? "--"}</td>
                      <td>{event.plate ?? "--"}</td>
                      <td>
                        <EventStatePill estado={event.estado} />
                      </td>
                      <td>{event.gate ?? "--"}</td>
                      <td>{event.fecha}</td>
                      <td>{event.hora}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="plant-view__empty-state">{TRUCK_EVENT_LOG_CONFIG.emptyMessage}</div>
      )}
    </section>
  );
}
