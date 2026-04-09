const CHART_CONFIG = {
  width: 540,
  height: 170,
  chartClassName: "panel-card panel-card--chart"
};

function buildLine(values, width, height) {
  const maxValue = Math.max(...values, 1);
  const step = width / (values.length - 1);

  return values
    .map((value, index) => {
      const x = index * step;
      const y = height - (value / maxValue) * (height - 42) - 24;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

function BarSeries({ values, seriesClass, width, height, offset }) {
  const barWidth = width / (values.length * 2.2);
  const step = width / values.length;
  const maxValue = Math.max(...values, 1);

  return values.map((value, index) => {
    const x = index * step + offset;
    const barHeight = (value / maxValue) * (height - 28);
    const y = height - barHeight - 20;

    return (
      <rect
        key={`${seriesClass}-${index}`}
        className={seriesClass}
        x={x.toFixed(2)}
        y={y.toFixed(2)}
        width={barWidth.toFixed(2)}
        height={barHeight.toFixed(2)}
        rx="1.6"
      ></rect>
    );
  });
}

export function TrafficChart({ chart }) {
  const linePath = buildLine(chart.line, CHART_CONFIG.width, CHART_CONFIG.height);

  return (
    <section className={CHART_CONFIG.chartClassName}>
      <div className="panel-card__header">
        <span>{chart.title}</span>
        <button className="panel-card__menu" type="button" aria-label="Opciones">
          <svg>
            <use href="#icon-menu"></use>
          </svg>
        </button>
      </div>
      <div className="traffic-chart">
        <div className="traffic-chart__grid"></div>
        <svg className="traffic-chart__svg" viewBox={`0 0 ${CHART_CONFIG.width} ${CHART_CONFIG.height}`} preserveAspectRatio="none">
          <BarSeries
            values={chart.barsA}
            seriesClass="chart-bars__series chart-bars__series--primary"
            width={CHART_CONFIG.width}
            height={CHART_CONFIG.height}
            offset={12}
          />
          <BarSeries
            values={chart.barsB}
            seriesClass="chart-bars__series chart-bars__series--secondary"
            width={CHART_CONFIG.width}
            height={CHART_CONFIG.height}
            offset={28}
          />
          <path className="traffic-chart__line" d={linePath}></path>
        </svg>
        <div className="traffic-chart__axis">
          {chart.labels.map((label, index) => {
            const step = CHART_CONFIG.width / chart.labels.length;
            const left = index * step + step * 0.5;

            return (
              <span key={label} style={{ left: `${left.toFixed(2)}px` }}>
                {label}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
