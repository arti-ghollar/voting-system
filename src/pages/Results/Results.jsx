import React from "react";
import "./Results.css";

const resultData = [
  {
    candidate: "Aarav Sharma",
    party: "Progressive Alliance",
    votes: 4820,
    percentage: 48.2,
    position: 1,
  },
  {
    candidate: "Priya Patil",
    party: "People First",
    votes: 3210,
    percentage: 32.1,
    position: 2,
  },
  {
    candidate: "Rahul Deshmukh",
    party: "National Development Party",
    votes: 1970,
    percentage: 19.7,
    position: 3,
  },
];

const Results = () => {
  const totalVotes = resultData.reduce(
    (total, item) => total + item.votes,
    0
  );

  return (
    <section className="admin-results">
      <div className="ar-header">
        <div>
          <span className="ar-eyebrow">ELECTION ANALYTICS</span>
          <h1>Election Results</h1>
          <p>Transparent voting results and election performance.</p>
        </div>

        <button
          className="ar-export"
          onClick={() => window.print()}
        >
          Print Results
        </button>
      </div>

      <div className="ar-summary">
        <div>
          <span>Total Votes</span>
          <strong>{totalVotes.toLocaleString()}</strong>
        </div>

        <div>
          <span>Leading Candidate</span>
          <strong>{resultData[0].candidate}</strong>
        </div>

        <div>
          <span>Leading Votes</span>
          <strong>{resultData[0].votes.toLocaleString()}</strong>
        </div>
      </div>

      <div className="ar-panel">
        <div className="ar-panel-header">
          <div>
            <h2>General Election 2026</h2>
            <span>Final verified results</span>
          </div>

          <span className="ar-verified">✓ VERIFIED</span>
        </div>

        <div className="ar-list">
          {resultData.map((item) => (
            <div className="ar-result-row" key={item.position}>
              <div className="ar-position">
                #{item.position}
              </div>

              <div className="ar-candidate">
                <div className="ar-avatar">
                  {item.candidate.charAt(0)}
                </div>

                <div>
                  <strong>{item.candidate}</strong>
                  <span>{item.party}</span>
                </div>
              </div>

              <div className="ar-bar-area">
                <div className="ar-bar">
                  <div
                    className="ar-bar-fill"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>

              <div className="ar-votes">
                <strong>{item.votes.toLocaleString()}</strong>
                <span>{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Results;