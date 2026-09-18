import { useLanguage } from "../../context/LanguageContext";
import "./ResultChart.css";

const ResultChart = ({ results = [], totalVotes }) => {
  const calculatedTotal = results.reduce(
    (sum, item) => sum + Number(item.votes || 0),
    0
  );
  const { t } = useLanguage();

  const finalTotal = Number(totalVotes ?? calculatedTotal);

  return (
    <div className="result-chart">
      <div className="result-chart__header">
        <div>
          <span>{t('resultOverviewEyebrow')}</span>
          <h3>{t('resultChartTitle')}</h3>
        </div>

        <strong>{finalTotal} {t('resultChartVotes')}</strong>
      </div>

      <div className="result-chart__list">
        {results.length === 0 ? (
          <div className="result-chart__empty">
            {t('resultChartEmpty')}
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
                    <span>{votes} {t('resultChartVotesLower')}</span>
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