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
      <img src="pasar.png" className="imagen-camion"></img>
      <aside className="iot-card">
        <div className="panel-card__header">
          <span>{panel.title}</span>
        </div>
        <ul className="sensor-list">
          {panel.sensors.map((sensor) => (
            <SensorItem key={sensor.label} sensor={sensor} />
          ))}
        </ul>
{/*         <div className="iot-card__logs">
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
        </div> */}
      </aside>
    </section>
  );
}
