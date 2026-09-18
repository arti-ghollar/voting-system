import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./VoteConfirmation.css";

const VoteConfirmation = () => {
  const location = useLocation();
  const isAssisted = location.state?.isAssisted || false;
  const votingMethod = location.state?.votingMethod || "ONLINE";

  const voteDetails = {
    electionId: location.state?.election?.id || "GE-2026",
    electionName: location.state?.election?.title || "General Election 2026",
    voteStatus: "Successfully Recorded",
    transactionId: "0x7a9f8b31e4c29a7d5f10b6c84c82d91e",
    blockNumber: "18,429,731",
    network: "Blockchain Network",
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
  };

  const handleCopyTransaction = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(
          voteDetails.transactionId
        );
      }
    } catch (error) {
      console.error("Clipboard copy failed:", error);
      // Clipboard access may be unavailable in some browsers.
    }
  };

  const getDashboardLink = () => {
    if (votingMethod === "CENTER") return "/voting-center";
    if (votingMethod === "HOME_VISIT") return "/home-voting-officer";
    return "/voter-dashboard";
  };

  return (
    <main className="vote-confirmation-page">
      <div className="vote-confirmation-container">

        {/* ================= HEADER ================= */}
        <header className="vote-confirmation-header">
          <div>
            <span className="vote-confirmation-eyebrow">
              {isAssisted ? "AUTHORIZED ASSISTANCE" : "VOTER PORTAL"}
            </span>

            <h1>Vote Confirmation</h1>

            <p>
              Your vote has been successfully submitted and
              recorded.
            </p>
          </div>

          <Link
            to={getDashboardLink()}
            className="vote-confirmation-back-button"
          >
            <span aria-hidden="true">←</span>
            Back to Dashboard
          </Link>
        </header>

        {/* ================= SUCCESS CARD ================= */}
        <section className="vote-confirmation-success-card">
          <div className="vote-confirmation-success-icon">
            <span aria-hidden="true">✓</span>
          </div>

          <span className="vote-confirmation-success-label">
            VOTE SUCCESSFULLY RECORDED
          </span>

          <h2>Your vote has been confirmed</h2>

          <p>
            Your ballot was successfully submitted for the
            selected election. A blockchain transaction record
            has been generated for verification.
          </p>

          <div className="vote-confirmation-status">
            <span
              className="vote-confirmation-status-dot"
              aria-hidden="true"
            />
            {voteDetails.voteStatus}
          </div>
        </section>

        {/* ================= ELECTION DETAILS ================= */}
        <section className="vote-confirmation-card">
          <div className="vote-confirmation-card-header">
            <div>
              <span className="vote-confirmation-card-label">
                ELECTION DETAILS
              </span>

              <h2>{voteDetails.electionName}</h2>
            </div>

            <span className="vote-confirmation-election-id">
              {voteDetails.electionId}
            </span>
          </div>

          <div className="vote-confirmation-details-grid">
            <div className="vote-confirmation-detail">
              <span>Election</span>
              <strong>{voteDetails.electionName}</strong>
            </div>

            <div className="vote-confirmation-detail">
              <span>Election ID</span>
              <strong>{voteDetails.electionId}</strong>
            </div>

            <div className="vote-confirmation-detail">
              <span>Date</span>
              <strong>{voteDetails.date}</strong>
            </div>

            <div className="vote-confirmation-detail">
              <span>Time</span>
              <strong>{voteDetails.time}</strong>
            </div>
          </div>
        </section>

        {/* ================= BLOCKCHAIN RECORD ================= */}
        <section className="vote-confirmation-blockchain-card">
          <div className="vote-confirmation-blockchain-header">
            <div className="vote-confirmation-blockchain-icon">
              <span aria-hidden="true">⛓</span>
            </div>

            <div>
              <span className="vote-confirmation-card-label">
                BLOCKCHAIN RECORD
              </span>

              <h2>Transaction Verification</h2>

              <p>
                The following transaction information can be
                used to verify that your vote was recorded.
              </p>
            </div>
          </div>

          {/* Transaction ID */}
          <div className="vote-confirmation-transaction">
            <div className="vote-confirmation-transaction-heading">
              <span>Transaction ID</span>

              <span className="vote-confirmation-verified-badge">
                <span aria-hidden="true">✓</span>
                Verified
              </span>
            </div>

            <div className="vote-confirmation-transaction-value">
              <code>{voteDetails.transactionId}</code>

              <button
                type="button"
                className="vote-confirmation-copy-button"
                onClick={handleCopyTransaction}
                aria-label="Copy transaction ID"
              >
                Copy
              </button>
            </div>
          </div>

          {/* Blockchain Information */}
          <div className="vote-confirmation-chain-grid">
            <div>
              <span>Block Number</span>
              <strong>{voteDetails.blockNumber}</strong>
            </div>

            <div>
              <span>Network</span>
              <strong>{voteDetails.network}</strong>
            </div>

            <div>
              <span>Status</span>
              <strong className="vote-confirmation-chain-status">
                Confirmed
              </strong>
            </div>
          </div>
        </section>

        {/* ================= PRIVACY ================= */}
        <section className="vote-confirmation-privacy">
          <div
            className="vote-confirmation-privacy-icon"
            aria-hidden="true"
          >
            🔐
          </div>

          <div>
            <h3>Privacy &amp; Security</h3>

            <p>
              This confirmation proves that a vote was recorded
              for the election. It does not publicly reveal your
              candidate selection or associate your identity with
              your ballot choice.
            </p>
          </div>
        </section>

        {/* ================= ACTIONS ================= */}
        <section className="vote-confirmation-actions">
          {!isAssisted && (
            <>
              <Link
                to="/voting-status"
                className="vote-confirmation-primary-button"
              >
                View Voting Status
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                to="/elections"
                className="vote-confirmation-secondary-button"
              >
                View Elections
              </Link>
            </>
          )}

          {isAssisted && (
            <Link
              to={getDashboardLink()}
              className="vote-confirmation-primary-button"
            >
              Finish Assisted Session
              <span aria-hidden="true">→</span>
            </Link>
          )}

          <Link
            to={getDashboardLink()}
            className="vote-confirmation-secondary-button"
          >
            Dashboard
          </Link>
        </section>

        {/* ================= NOTICE ================= */}
        <aside className="vote-confirmation-notice">
          <div
            className="vote-confirmation-notice-icon"
            aria-hidden="true"
          >
            i
          </div>

          <div>
            <h3>Keep Your Transaction ID Safe</h3>

            <p>
              Your transaction ID can be used as a reference for
              checking the blockchain record of your submitted
              vote. Never share private keys, passwords or
              authentication credentials.
            </p>
          </div>
        </aside>

      </div>
    </main>
  );
};

export default VoteConfirmation;