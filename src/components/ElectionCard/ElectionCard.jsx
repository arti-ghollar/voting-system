import { Link } from "react-router-dom";
import "./ElectionCard.css";

const ElectionCard = ({ election }) => {
  const {
    id,
    title = "Student Council Election",
    description = "College election",
    status = "upcoming",
    startDate = "—",
    endDate = "—",
    candidatesCount = 0,
    totalVoters = 0,
  } = election || {};

  const normalizedStatus = String(status).toLowerCase();

  const statusLabel = {
    active: "Active",
    upcoming: "Upcoming",
    completed: "Completed",
    draft: "Draft",
  };

  return (
    <article className="election-card">
      <div className="election-card__header">
        <div className="election-card__icon">◉</div>

        <span
          className={`election-card__status election-card__status--${normalizedStatus}`}
        >
          <span />
          {statusLabel[normalizedStatus] || status}
        </span>
      </div>

      <div className="election-card__body">
        <h3>{title}</h3>

        <p>{description}</p>

        <div className="election-card__dates">
          <div>
            <span>STARTS</span>
            <strong>{startDate}</strong>
          </div>

          <div>
            <span>ENDS</span>
            <strong>{endDate}</strong>
          </div>
        </div>

        <div className="election-card__stats">
          <span>
            <strong>{candidatesCount}</strong> Candidates
          </span>

          <span>
            <strong>{totalVoters}</strong> Eligible Voters
          </span>
        </div>
      </div>

      <Link
        to={`/elections/${id || ""}`}
        className={`election-card__button ${
          normalizedStatus === "active"
            ? "election-card__button--primary"
            : ""
        }`}
      >
        {normalizedStatus === "active"
          ? "Vote Now"
          : normalizedStatus === "completed"
            ? "View Results"
            : "View Details"}
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
};

export default ElectionCard;