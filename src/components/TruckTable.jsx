import { getRealtimeTruckRows } from "../utils/truck-selectors.js";

const TABLE_CONFIG = {
  stateClassName: "status-pill",
  tableCardClassName: "panel-card panel-card--table"
};

function StatePill({ state }) {
  return <span className={`${TABLE_CONFIG.stateClassName} ${TABLE_CONFIG.stateClassName}--${state.tone}`}>{state.text}</span>;
}

export function TruckTable({ table, trucks }) {
  const rows = getRealtimeTruckRows(trucks);

  return (
    <section className={TABLE_CONFIG.tableCardClassName}>
      <div className="panel-card__header">
        <span>{table.title}</span>
        <button className="panel-card__menu" type="button" aria-label="Opciones">
          <svg>
            <use href="#icon-menu"></use>
          </svg>
        </button>
      </div>
      <div className="table-shell">
        <table className="data-table">
          <thead>
            <tr>
              {table.headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.id}-${row.plate}`}>
                <td>{row.id}</td>
                <td>{row.plate}</td>
                <td>{row.location}</td>
                <td>
                  <StatePill state={row.status} />
                </td>
                <td>{row.entryAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
