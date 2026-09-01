import "./TransactionCard.css";

const TransactionCard = ({
  hash = "",
  status = "confirmed",
  blockNumber = "—",
  timestamp = "—",
  type = "Vote Transaction",
}) => {
  const shortHash = hash
    ? `${hash.slice(0, 10)}...${hash.slice(-8)}`
    : "Transaction unavailable";

  const normalizedStatus = String(status).toLowerCase();

  return (
    <article className="transaction-card">
      <div className="transaction-card__icon">⬡</div>

      <div className="transaction-card__content">
        <div className="transaction-card__title">
          <strong>{type}</strong>

          <span
            className={`transaction-card__status transaction-card__status--${normalizedStatus}`}
          >
            <span />
            {normalizedStatus}
          </span>
        </div>

        <div className="transaction-card__hash" title={hash}>
          {shortHash}
        </div>

        <div className="transaction-card__meta">
          <span>Block: {blockNumber}</span>
          <span>{timestamp}</span>
        </div>
      </div>

      {hash && (
        <button
          type="button"
          className="transaction-card__copy"
          onClick={() => navigator.clipboard?.writeText(hash)}
          title="Copy transaction hash"
        >
          Copy
        </button>
      )}
    </article>
  );
};

export default TransactionCard;