const SCENE_CONFIG = {
  tones: ["red", "amber", "green"],
  sensorDotClassName: "sensor-list__dot"
};

function formatLogTimestamp(timestamp) {
  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(new Date(timestamp));
}

function SensorItem({ sensor }) {
  return (
    <li className="sensor-list__item">
      <span className={`${SCENE_CONFIG.sensorDotClassName} ${SCENE_CONFIG.sensorDotClassName}--${sensor.tone}`}></span>
      <div>
        <strong>{sensor.label}</strong>
        <span>{sensor.state}</span>
      </div>
    </li>
  );
}

function TrafficLights() {
  return SCENE_CONFIG.tones.map((tone) => (
    <span key={tone} className={`facility-scene__light facility-scene__light--${tone}`}></span>
  ));
}

export function FacilityScene({ panel }) {
  return (
    <section className="scene-card">
      <div className="facility-scene">
        <div className="facility-scene__ground"></div>
        <div className="facility-scene__building facility-scene__building--top">
          <div className="facility-scene__roof"></div>
          <div className="facility-scene__wall">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="facility-scene__building facility-scene__building--bottom">
          <div className="facility-scene__roof"></div>
          <div className="facility-scene__wall">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="facility-scene__truck facility-scene__truck--main"></div>
        <div className="facility-scene__truck facility-scene__truck--secondary"></div>
        <div className="facility-scene__car"></div>
        <div className="facility-scene__cones">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="facility-scene__greens">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="facility-scene__lights facility-scene__lights--left">
          <TrafficLights />
        </div>
        <div className="facility-scene__lights facility-scene__lights--right">
          <TrafficLights />
        </div>
      </div>
      <aside className="iot-card">
        <div className="panel-card__header">
          <span>{panel.title}</span>
          <button className="panel-card__menu" type="button" aria-label="Opciones">
            <svg>
              <use href="#icon-menu"></use>
            </svg>
          </button>
        </div>
        <ul className="sensor-list">
          {panel.sensors.map((sensor) => (
            <SensorItem key={sensor.label} sensor={sensor} />
          ))}
        </ul>
        <div className="iot-card__logs">
          <small>Recent Logs</small>
          <ul>
            {panel.recentLogs.map((item) => (
              <li key={item.id ?? item}>
                {typeof item === "string"
                  ? item
                  : `${formatLogTimestamp(item.timestamp)} | ${item.sensorName} | ${item.level}`}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </section>
  );
}
