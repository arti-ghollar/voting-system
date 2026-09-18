import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "./ElectionCard.css";

const ElectionCard = ({ election }) => {
  const { t } = useLanguage();
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
    active: t('statusActive'),
    upcoming: t('statusUpcoming'),
    completed: t('statusCompleted'),
    draft: t('statusDraft'),
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
            <span>{t('startsLabel')}</span>
            <strong>{startDate}</strong>
          </div>

          <div>
            <span>{t('endsLabel')}</span>
            <strong>{endDate}</strong>
          </div>
        </div>

        <div className="election-card__stats">
          <span>
            <strong>{candidatesCount}</strong> {t('candidatesCountLabel')}
          </span>

          <span>
            <strong>{totalVoters}</strong> {t('eligibleVotersLabel')}
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
          ? t('btnVoteNow')
          : normalizedStatus === "completed"
            ? t('btnViewResults')
            : t('btnViewDetails')}
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
};

export default ElectionCard;