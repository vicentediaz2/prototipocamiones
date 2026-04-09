import { getTruckById } from "../utils/truck-selectors.js";

const OPERATIONS_CONFIG = {
  cardClassName: "panel-card operations-panel"
};

function HighlightItem({ item }) {
  return (
    <div className={`operations-panel__highlight operations-panel__highlight--${item.tone}`}>
      <span>{item.label}</span>
      <strong>{item.value}</strong>
    </div>
  );
}

function DockItem({ item, trucks }) {
  const truck = getTruckById(trucks, item.truckId);

  return (
    <li className="operations-panel__dock-item">
      <div>
        <strong>{item.dock}</strong>
        <span>{truck ? `${truck.plate} · ${truck.driverName}` : item.truckId}</span>
      </div>
      <div>
        <small>{item.task}</small>
        <span className={`status-pill status-pill--${item.tone}`}>{item.tone === "green" ? "Operativo" : "Revision"}</span>
      </div>
    </li>
  );
}

function AlertItem({ item }) {
  return (
    <li className={`operations-panel__alert operations-panel__alert--${item.tone}`}>
      <strong>{item.title}</strong>
      <span>{item.detail}</span>
    </li>
  );
}

export function OperationsPanel({ panel, trucks }) {
  return (
    <section className={OPERATIONS_CONFIG.cardClassName}>
      <div className="panel-card__header">
        <span>{panel.title}</span>
        <button className="panel-card__menu" type="button" aria-label="Opciones">
          <svg>
            <use href="#icon-menu"></use>
          </svg>
        </button>
      </div>
      <div className="operations-panel__highlights">
        {panel.highlights.map((item) => (
          <HighlightItem key={item.label} item={item} />
        ))}
      </div>
      <div className="operations-panel__content">
        <div className="operations-panel__section">
          <h3>Asignacion De Muelles</h3>
          <ul className="operations-panel__dock-list">
            {panel.dockAssignments.map((item) => (
              <DockItem key={`${item.dock}-${item.truckId}`} item={item} trucks={trucks} />
            ))}
          </ul>
        </div>
        <div className="operations-panel__section">
          <h3>Alertas Del Turno</h3>
          <ul className="operations-panel__alert-list">
            {panel.alerts.map((item) => (
              <AlertItem key={item.title} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
