const METRIC_CONFIG = {
  cardClassName: "metric-card",
  chartWidth: 220,
  chartHeight: 70
};

function buildLinePath(points, width, height) {
  const maxValue = Math.max(...points);
  const minValue = Math.min(...points);
  const range = Math.max(maxValue - minValue, 1);

  return points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * width;
      const y = height - ((point - minValue) / range) * height;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

function buildAreaPath(points, width, height) {
  const linePath = buildLinePath(points, width, height);
  return `${linePath} L ${width} ${height} L 0 ${height} Z`;
}

function MetricCard({ card }) {
  const path = buildLinePath(card.points, METRIC_CONFIG.chartWidth, METRIC_CONFIG.chartHeight);
  const area = buildAreaPath(card.points, METRIC_CONFIG.chartWidth, METRIC_CONFIG.chartHeight);

  return (
    <article className={`${METRIC_CONFIG.cardClassName} ${METRIC_CONFIG.cardClassName}--${card.accent}`}>
      <div className="panel-card__header">
        <span>{card.label}</span>
      </div>
      <div className="metric-card__value-row">
        <strong>{card.value}</strong>
        {card.delta ? <span>{card.delta}</span> : null}
      </div>
      <svg
        className="metric-card__chart"
        viewBox={`0 0 ${METRIC_CONFIG.chartWidth} ${METRIC_CONFIG.chartHeight}`}
        preserveAspectRatio="none"
      >
        <path className="metric-card__area" d={area}></path>
        <path className="metric-card__line" d={path}></path>
      </svg>
    </article>
  );
}

export function MetricCards({ cards }) {
  return (
    <section className="metric-grid">
      {cards.map((card) => (
        <MetricCard key={card.id} card={card} />
      ))}
    </section>
  );
}
