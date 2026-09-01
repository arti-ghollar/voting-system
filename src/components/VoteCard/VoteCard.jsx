import "./VoteCard.css";

const VoteCard = ({
  candidate,
  selected = false,
  onSelect,
  disabled = false,
}) => {
  const {
    name = "Candidate",
    party = "Independent",
    symbol = "★",
    image = "",
  } = candidate || {};

  return (
    <button
      type="button"
      className={`vote-card ${selected ? "vote-card--selected" : ""}`}
      onClick={() => onSelect?.(candidate)}
      disabled={disabled}
      aria-pressed={selected}
    >
      <div className="vote-card__candidate">
        <div className="vote-card__avatar">
          {image ? (
            <img src={image} alt="" />
          ) : (
            <span>{name.charAt(0).toUpperCase()}</span>
          )}
        </div>

        <div className="vote-card__info">
          <strong>{name}</strong>
          <span>{party}</span>
        </div>
      </div>

      <div className="vote-card__right">
        <span className="vote-card__symbol">{symbol}</span>

        <span className="vote-card__radio">
          {selected && <span />}
        </span>
      </div>
    </button>
  );
};

export default VoteCard;