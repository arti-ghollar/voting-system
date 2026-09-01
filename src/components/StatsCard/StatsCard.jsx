import "./StatsCard.css";

const StatsCard = ({
  title = "Total Votes",
  value = "0",
  subtitle = "",
  icon = "▦",
  trend = "",
  trendType = "positive",
}) => {
  return (
    <article className="stats-card">
      <div className="stats-card__top">
        <div className="stats-card__icon">{icon}</div>

        {trend && (
          <span className={`stats-card__trend stats-card__trend--${trendType}`}>
            {trend}
          </span>
        )}
      </div>

      <div className="stats-card__content">
        <span>{title}</span>
        <strong>{value}</strong>

        {subtitle && <small>{subtitle}</small>}
      </div>
    </article>
  );
};

export default StatsCard;