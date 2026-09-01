import "./ResultChart.css";

const ResultChart = ({ results = [], totalVotes }) => {
  const calculatedTotal = results.reduce(
    (sum, item) => sum + Number(item.votes || 0),
    0
  );

  const finalTotal = Number(totalVotes ?? calculatedTotal);

  return (
    <div className="result-chart">
      <div className="result-chart__header">
        <div>
          <span>RESULT OVERVIEW</span>
          <h3>Election Results</h3>
        </div>

        <strong>{finalTotal} Votes</strong>
      </div>

      <div className="result-chart__list">
        {results.length === 0 ? (
          <div className="result-chart__empty">
            No result data available yet.
          </div>
        ) : (
          results.map((result, index) => {
            const votes = Number(result.votes || 0);
            const percentage =
              finalTotal > 0 ? Math.round((votes / finalTotal) * 100) : 0;

            return (
              <div className="result-chart__item" key={result.id || index}>
                <div className="result-chart__label">
                  <div>
                    <strong>{result.name}</strong>
                    <span>{votes} votes</span>
                  </div>

                  <strong>{percentage}%</strong>
                </div>

                <div className="result-chart__track">
                  <div
                    className="result-chart__bar"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ResultChart;