import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useVoting } from "../../context/VotingContext";
import "./CastVote.css";

const CANDIDATES = [
  {
    id: "candidate-1",
    name: "Aarav Sharma",
    party: "Progressive Alliance",
    symbol: "PA",
    description: "Committed to transparent governance and digital development.",
  },
  {
    id: "candidate-2",
    name: "Priya Deshmukh",
    party: "People's Development Party",
    symbol: "PD",
    description: "Focused on education, employment, and community development.",
  },
  {
    id: "candidate-3",
    name: "Rahul Patil",
    party: "National Reform Front",
    symbol: "NR",
    description: "Working toward stronger infrastructure and public services.",
  },
  {
    id: "candidate-4",
    name: "Sneha Kulkarni",
    party: "United Citizens Party",
    symbol: "UC",
    description: "Focused on inclusive growth, innovation, and citizen welfare.",
  },
];

const CastVote = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { castVote, hasVoted } = useVoting();

  const votingMethod = location.state?.votingMethod || "ONLINE";
  const voterId = location.state?.voterId || "VT-2026-10482"; // Default for demo

  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [alreadyVoted, setAlreadyVoted] = useState(false);

  useEffect(() => {
    if (hasVoted("GE-2026", voterId)) {
      setAlreadyVoted(true);
    }
  }, [hasVoted, voterId]);

  const selectedCandidateData = CANDIDATES.find(
    (candidate) => candidate.id === selectedCandidate
  );

  const handleCandidateChange = (candidateId) => {
    if (isSubmitting || alreadyVoted) {
      return;
    }
    setSelectedCandidate(candidateId);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedCandidate || alreadyVoted) {
      return;
    }

    setShowConfirmation(true);
  };

  const handleConfirmVote = () => {
    if (!selectedCandidate || isSubmitting || alreadyVoted) {
      return;
    }

    setIsSubmitting(true);

    castVote({
      electionId: "GE-2026",
      voterId: voterId,
      candidateId: selectedCandidate,
      votingMethod: votingMethod,
    });

    window.setTimeout(() => {
      setIsSubmitting(false);
      
      if (votingMethod === "CENTER" || votingMethod === "HOME_VISIT") {
        // Privacy requirement: Do not reveal candidate to operator in the next screen
        navigate("/vote-confirmation", {
          state: {
            isAssisted: true,
            votingMethod,
            election: {
              id: "GE-2026",
              title: "General Election 2026",
            },
          },
        });
      } else {
        navigate("/vote-confirmation", {
          state: {
            candidate: selectedCandidateData,
            election: {
              id: "GE-2026",
              title: "General Election 2026",
            },
          },
        });
      }
    }, 1000);
  };

  const handleCancelConfirmation = () => {
    if (isSubmitting) {
      return;
    }

    setShowConfirmation(false);
  };

  if (alreadyVoted) {
    return (
      <main className="cast-vote-page">
        <div className="cast-vote-container">
          <div className="cast-vote-security-banner">
            <div className="cast-vote-security-icon" aria-hidden="true">✓</div>
            <div>
              <h3>Already Voted</h3>
              <p>A vote has already been cast for this election by this voter ID ({voterId}). One voter can vote only once in an election.</p>
            </div>
          </div>
          <div style={{ marginTop: "24px" }}>
            <Link to={votingMethod === "CENTER" ? "/voting-center" : (votingMethod === "HOME_VISIT" ? "/home-voting-officer" : "/voter-dashboard")} className="cast-vote-primary-button" style={{ display: "inline-flex" }}>
              Return to Dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cast-vote-page">
      <div className="cast-vote-container">

        {/* ================= HEADER ================= */}
        <header className="cast-vote-header">
          <div className="cast-vote-heading">
            <span className="cast-vote-eyebrow">
              VOTER PORTAL
            </span>

            <h1>Cast Your Vote</h1>

            <p>
              Select one candidate for the current election. Review
              your selection carefully before submitting your vote.
            </p>
          </div>

          <Link
            to="/voter-dashboard"
            className="cast-vote-back-button"
          >
            <span aria-hidden="true">←</span>
            Back to Dashboard
          </Link>
        </header>

        {/* ================= ELECTION CARD ================= */}
        <section className="cast-vote-election-card">
          <div className="cast-vote-election-left">
            <div
              className="cast-vote-election-icon"
              aria-hidden="true"
            >
              E
            </div>

            <div>
              <span className="cast-vote-card-label">
                CURRENT ELECTION
              </span>

              <h2>General Election 2026</h2>

              <div className="cast-vote-election-status">
                <span
                  className="cast-vote-status-dot"
                  aria-hidden="true"
                />
                Voting Active
              </div>
            </div>
          </div>

          <div className="cast-vote-election-details">
            <span>Election ID</span>
            <strong>GE-2026</strong>
          </div>

          <div className="cast-vote-election-details">
            <span>Voting Period</span>
            <strong>15 Aug — 31 Aug 2026</strong>
          </div>
        </section>

        {/* ================= SECURITY NOTICE ================= */}
        <section className="cast-vote-security-banner">
          <div
            className="cast-vote-security-icon"
            aria-hidden="true"
          >
            !
          </div>

          <div>
            <h3>Before you vote</h3>

            <p>
              You can select only one candidate. Once your vote is
              submitted and recorded, it cannot be changed.
            </p>
          </div>
        </section>

        {/* ================= VOTING FORM ================= */}
        <form
          className="cast-vote-form"
          onSubmit={handleSubmit}
        >
          <section className="cast-vote-card">
            <div className="cast-vote-section-header">
              <div>
                <span className="cast-vote-card-label">
                  CANDIDATES
                </span>

                <h2>Select a Candidate</h2>

                <p>
                  Choose the candidate you want to vote for.
                </p>
              </div>

              <span className="cast-vote-selection-count">
                {selectedCandidate ? "1 selected" : "No selection"}
              </span>
            </div>

            {/* ================= CANDIDATE LIST ================= */}
            <div className="cast-vote-candidates">
              {CANDIDATES.map((candidate) => {
                const isSelected =
                  selectedCandidate === candidate.id;

                return (
                  <label
                    className={`cast-vote-candidate ${
                      isSelected ? "selected" : ""
                    }`}
                    htmlFor={candidate.id}
                    key={candidate.id}
                  >
                    <input
                      id={candidate.id}
                      name="candidate"
                      type="radio"
                      value={candidate.id}
                      checked={isSelected}
                      onChange={() =>
                        handleCandidateChange(candidate.id)
                      }
                      disabled={isSubmitting}
                    />

                    <span
                      className="cast-vote-radio"
                      aria-hidden="true"
                    />

                    <span
                      className="cast-vote-candidate-symbol"
                      aria-hidden="true"
                    >
                      {candidate.symbol}
                    </span>

                    <span className="cast-vote-candidate-content">
                      <strong>{candidate.name}</strong>

                      <span className="cast-vote-party">
                        {candidate.party}
                      </span>

                      <small>{candidate.description}</small>
                    </span>

                    <span
                      className="cast-vote-selected-mark"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                  </label>
                );
              })}
            </div>
          </section>

          {/* ================= SELECTED CANDIDATE ================= */}
          {selectedCandidateData && (
            <section className="cast-vote-review-card">
              <div
                className="cast-vote-review-icon"
                aria-hidden="true"
              >
                ✓
              </div>

              <div className="cast-vote-review-content">
                <span>YOUR SELECTION</span>

                <strong>
                  {selectedCandidateData.name}
                </strong>

                <small>
                  {selectedCandidateData.party}
                </small>
              </div>

              <button
                type="button"
                className="cast-vote-change-button"
                onClick={() => setSelectedCandidate("")}
                disabled={isSubmitting}
              >
                Change
              </button>
            </section>
          )}

          {/* ================= SUBMIT AREA ================= */}
          <section className="cast-vote-submit-card">
            <div className="cast-vote-submit-info">
              <div
                className="cast-vote-lock-icon"
                aria-hidden="true"
              >
                🔒
              </div>

              <div>
                <h3>Ready to submit?</h3>

                <p>
                  Your vote will be securely submitted and recorded
                  as a transaction.
                </p>
              </div>
            </div>

            <div className="cast-vote-submit-actions">
              <Link
                to="/elections"
                className="cast-vote-secondary-button"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="cast-vote-primary-button"
                disabled={!selectedCandidate || isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Review Vote"}
                {!isSubmitting && (
                  <span aria-hidden="true">→</span>
                )}
              </button>
            </div>
          </section>
        </form>

        {/* ================= PRIVACY NOTICE ================= */}
        <aside className="cast-vote-privacy-notice">
          <div
            className="cast-vote-privacy-icon"
            aria-hidden="true"
          >
            i
          </div>

          <div>
            <h3>Privacy & Security</h3>

            <p>
              Your identity is not publicly associated with your
              candidate selection. The voting system is designed to
              preserve ballot privacy while maintaining a verifiable
              transaction record.
            </p>
          </div>
        </aside>

      </div>

      {/* ================= CONFIRMATION MODAL ================= */}
      {showConfirmation && selectedCandidateData && (
        <div
          className="cast-vote-modal-overlay"
          role="presentation"
        >
          <div
            className="cast-vote-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cast-vote-modal-title"
          >
            <div
              className="cast-vote-modal-icon"
              aria-hidden="true"
            >
              !
            </div>

            <span className="cast-vote-card-label">
              FINAL REVIEW
            </span>

            <h2 id="cast-vote-modal-title">
              Confirm Your Vote
            </h2>

            <p className="cast-vote-modal-description">
              Please verify your selection before submitting.
              This action cannot be reversed after submission.
            </p>

            <div className="cast-vote-confirmation-box">
              <span>Selected Candidate</span>

              <strong>
                {selectedCandidateData.name}
              </strong>

              <small>
                {selectedCandidateData.party}
              </small>
            </div>

            <div className="cast-vote-modal-warning">
              <span aria-hidden="true">⚠</span>

              <p>
                Make sure this is the candidate you want to vote
                for before continuing.
              </p>
            </div>

            <div className="cast-vote-modal-actions">
              <button
                type="button"
                className="cast-vote-modal-cancel"
                onClick={handleCancelConfirmation}
                disabled={isSubmitting}
              >
                Go Back
              </button>

              <button
                type="button"
                className="cast-vote-modal-confirm"
                onClick={handleConfirmVote}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Submitting..."
                  : "Confirm & Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CastVote;