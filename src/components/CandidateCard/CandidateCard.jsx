import "./CandidateCard.css";

const CandidateCard = ({
  candidate,
  selected = false,
  disabled = false,
  onSelect,
}) => {
  const {
    name = "Candidate",
    party = "Independent",
    symbol = "★",
    image = "",
    description = "Candidate information is available here.",
  } = candidate || {};

  const handleSelect = () => {
    if (!disabled && onSelect) {
      onSelect(candidate);
    }
  };

  return (
    <article
      className={`candidate-card ${selected ? "candidate-card--selected" : ""} ${
        disabled ? "candidate-card--disabled" : ""
      }`}
    >
      <div className="candidate-card__top">
        <div className="candidate-card__avatar">
          {image ? (
            <img src={image} alt={`${name} profile`} />
          ) : (
            <span>{name.charAt(0).toUpperCase()}</span>
          )}
        </div>

        <div className="candidate-card__symbol">
          {symbol}
        </div>
      </div>

      <div className="candidate-card__content">
        <h3>{name}</h3>
        <p className="candidate-card__party">{party}</p>
        <p className="candidate-card__description">{description}</p>
      </div>

      <button
        type="button"
        className="candidate-card__button"
        onClick={handleSelect}
        disabled={disabled}
        aria-pressed={selected}
      >
        {selected ? (
          <>
            <span>✓</span>
            Selected
          </>
        ) : (
          "Select Candidate"
        )}
      </button>
    </article>
  );
};

export default CandidateCard;