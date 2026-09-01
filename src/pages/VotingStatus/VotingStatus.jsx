import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./VotingStatus.css";

const VotingStatus = () => {
  const [copied, setCopied] = useState(false);

  const election = {
    title: "General Election 2026",
    electionId: "GE-2026",
    status: "Voting Active",
    startDate: "15 August 2026",
    endDate: "31 August 2026",
    totalCandidates: 4,
    hasVoted: true,
    transactionId: "0x7a9f8b31e4c29a7d5f10b6c84c82d91e",
  };

  const votingSteps = [
    {
      id: 1,
      title: "Registration Completed",
      description:
        "Your voter registration has been successfully completed.",
      status: "completed",
    },
    {
      id: 2,
      title: "Identity Verified",
      description:
        "Your identity verification has been successfully completed.",
      status: "completed",
    },
    {
      id: 3,
      title: "Vote Cast",
      description:
        "Your vote has been securely recorded on the blockchain.",
      status: "completed",
    },
    {
      id: 4,
      title: "Vote Verification",
      description:
        "Your vote transaction record is available for verification.",
      status: "current",
    },
  ];

  const handleCopyTransaction = async () => {
    try {
      if (!navigator.clipboard) {
        return;
      }

      await navigator.clipboard.writeText(election.transactionId);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      console.error("Clipboard copy failed:", error);
      setCopied(false);
    }
  };

  return (
    <main className="voting-status-page">
      <div className="voting-status-container">

        {/* ================= HEADER ================= */}
        <header className="voting-status-header">
          <div>
            <span className="voting-status-eyebrow">
              VOTER PORTAL
            </span>

            <h1>Voting Status</h1>

            <p>
              Track your election participation and verify the
              current status of your vote.
            </p>
          </div>

          <Link
            to="/voter-dashboard"
            className="voting-status-back-button"
          >
            <span aria-hidden="true">←</span>
            Back to Dashboard
          </Link>
        </header>

        {/* ================= ELECTION OVERVIEW ================= */}
        <section className="voting-election-card">
          <div className="voting-election-main">
            <div
              className="voting-election-icon"
              aria-hidden="true"
            >
              ✓
            </div>

            <div>
              <span className="voting-card-label">
                CURRENT ELECTION
              </span>

              <h2>{election.title}</h2>

              <div className="voting-election-status">
                <span
                  className="voting-status-dot"
                  aria-hidden="true"
                />
                {election.status}
              </div>
            </div>
          </div>

          <div className="voting-election-date">
            <span>Election Period</span>

            <strong>
              {election.startDate} — {election.endDate}
            </strong>
          </div>
        </section>

        {/* ================= SUMMARY ================= */}
        <section className="voting-summary-grid">

          <article className="voting-summary-card">
            <div
              className="voting-summary-icon blue"
              aria-hidden="true"
            >
              ✓
            </div>

            <div>
              <span>Your Status</span>

              <strong>
                {election.hasVoted ? "Vote Cast" : "Not Voted"}
              </strong>

              <small>
                {election.hasVoted
                  ? "Your vote has been recorded"
                  : "Your vote is pending"}
              </small>
            </div>
          </article>

          <article className="voting-summary-card">
            <div
              className="voting-summary-icon green"
              aria-hidden="true"
            >
              #
            </div>

            <div>
              <span>Election ID</span>

              <strong>{election.electionId}</strong>

              <small>{election.title}</small>
            </div>
          </article>

          <article className="voting-summary-card">
            <div
              className="voting-summary-icon purple"
              aria-hidden="true"
            >
              {election.totalCandidates}
            </div>

            <div>
              <span>Candidates</span>

              <strong>{election.totalCandidates}</strong>

              <small>Available candidates</small>
            </div>
          </article>

        </section>

        {/* ================= VOTING PROGRESS ================= */}
        <section className="voting-progress-card">
          <div className="voting-section-heading">
            <div>
              <span className="voting-card-label">
                ACTIVITY
              </span>

              <h2>Voting Progress</h2>
            </div>

            <span className="voting-completed-badge">
              Completed
            </span>
          </div>

          <div className="voting-timeline">
            {votingSteps.map((step, index) => (
              <div
                className={`voting-timeline-item ${step.status}`}
                key={step.id}
              >
                <div
                  className="voting-timeline-marker"
                  aria-hidden="true"
                >
                  {step.status === "completed" ? "✓" : step.id}
                </div>

                <div className="voting-timeline-content">
                  <div className="voting-timeline-title-row">
                    <h3>{step.title}</h3>

                    {step.status === "completed" && (
                      <span className="voting-step-status">
                        Completed
                      </span>
                    )}

                    {step.status === "current" && (
                      <span className="voting-step-status current">
                        In Progress
                      </span>
                    )}
                  </div>

                  <p>{step.description}</p>
                </div>

                {index < votingSteps.length - 1 && (
                  <div
                    className="voting-timeline-line"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ================= BLOCKCHAIN VERIFICATION ================= */}
        <section className="voting-verification-card">
          <div className="voting-verification-content">
            <div
              className="voting-verification-icon"
              aria-hidden="true"
            >
              ⛓
            </div>

            <div>
              <span className="voting-card-label">
                BLOCKCHAIN VERIFICATION
              </span>

              <h2>Your vote is securely recorded</h2>

              <p>
                Your vote has been recorded as a blockchain
                transaction. The transaction record can be used
                to verify that your vote was included without
                publicly revealing your selected candidate.
              </p>
            </div>
          </div>

          <div className="voting-transaction-box">
            <div className="voting-transaction-heading">
              <span>Transaction ID</span>

              <span className="voting-verified-badge">
                <span aria-hidden="true">✓</span>
                Confirmed
              </span>
            </div>

            <div className="voting-transaction-value">
              <code>{election.transactionId}</code>

              <button
                type="button"
                className="voting-copy-button"
                onClick={handleCopyTransaction}
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          <div className="voting-verification-actions">
            <Link
              to="/vote-confirmation"
              className="voting-primary-button"
            >
              View Vote Confirmation
              <span aria-hidden="true">→</span>
            </Link>

            <Link
              to="/elections"
              className="voting-secondary-button"
            >
              View Elections
            </Link>
          </div>
        </section>

        {/* ================= PRIVACY NOTICE ================= */}
        <section className="voting-info-notice">
          <div
            className="voting-info-icon"
            aria-hidden="true"
          >
            i
          </div>

          <div>
            <h3>Privacy &amp; Security</h3>

            <p>
              Your voting status confirms that your ballot was
              successfully submitted. The system does not
              publicly associate your identity with your
              candidate selection.
            </p>
          </div>
        </section>

      </div>
    </main>
  );
};

export default VotingStatus;