import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useVoting } from "../../context/VotingContext";
import { useLanguage } from "../../context/LanguageContext";
import "./CastVote.css";

const CastVote = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { castVote, hasVoted } = useVoting();
  const { t } = useLanguage();

  const CANDIDATES = [
    {
      id: "candidate-1",
      name: t('cand1Name'),
      party: t('cand1Party'),
      symbol: "PA",
      description: t('cand1Desc'),
    },
    {
      id: "candidate-2",
      name: t('cand2Name'),
      party: t('cand2Party'),
      symbol: "PD",
      description: t('cand2Desc'),
    },
    {
      id: "candidate-3",
      name: t('cand3Name'),
      party: t('cand3Party'),
      symbol: "NR",
      description: t('cand3Desc'),
    },
    {
      id: "candidate-4",
      name: t('cand4Name'),
      party: t('cand4Party'),
      symbol: "UC",
      description: t('cand4Desc'),
    },
  ];

  const votingMethod = location.state?.votingMethod || "ONLINE";
  const voterId = location.state?.voterId || "VT-2026-10482"; // Default for demo

  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [alreadyVoted, setAlreadyVoted] = useState(false);

  useEffect(() => {
    if (hasVoted("GE-2026")) {
      setAlreadyVoted(true);
    }
  }, [hasVoted]);

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

  const handleConfirmVote = async () => {
    if (!selectedCandidate || isSubmitting || alreadyVoted) {
      return;
    }

    setIsSubmitting(true);

    const result = await castVote({
      electionId: "GE-2026",
      candidateId: selectedCandidate,
      votingMethod: votingMethod,
    });

    if (result.success) {
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
                title: t('ge2026Title'),
              },
              transactionId: result.transactionId
            },
          });
        } else {
          navigate("/vote-confirmation", {
            state: {
              candidate: selectedCandidateData,
              election: {
                id: "GE-2026",
                title: t('ge2026Title'),
              },
              transactionId: result.transactionId
            },
          });
        }
      }, 1000);
    } else {
      setIsSubmitting(false);
      alert(result.message || t('failedToCastVote'));
    }
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
              <h3>{t('alreadyVotedTitle')}</h3>
              <p>{t('alreadyVotedDesc1')}{voterId}{t('alreadyVotedDesc2')}</p>
            </div>
          </div>
          <div style={{ marginTop: "24px" }}>
            <Link to={votingMethod === "CENTER" ? "/voting-center" : (votingMethod === "HOME_VISIT" ? "/home-voting-officer" : "/voter-dashboard")} className="cast-vote-primary-button" style={{ display: "inline-flex" }}>
              {t('returnToDashboard')}
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
              {t('voterPortalEyebrow')}
            </span>

            <h1>{t('castVoteTitle')}</h1>

            <p>
              {t('castVoteDesc')}
            </p>
          </div>

          <Link
            to="/voter-dashboard"
            className="cast-vote-back-button"
          >
            <span aria-hidden="true">←</span>
            {t('backToDashboard')}
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
                {t('currentElectionLabel')}
              </span>

              <h2>{t('ge2026Title')}</h2>

              <div className="cast-vote-election-status">
                <span
                  className="cast-vote-status-dot"
                  aria-hidden="true"
                />
                {t('votingActiveLabel')}
              </div>
            </div>
          </div>

          <div className="cast-vote-election-details">
            <span>{t('electionIdLabel')}</span>
            <strong>GE-2026</strong>
          </div>

          <div className="cast-vote-election-details">
            <span>{t('votingPeriod')}</span>
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
            <h3>{t('beforeYouVoteTitle')}</h3>

            <p>
              {t('beforeYouVoteDesc')}
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
                  {t('candidatesTitleLabel')}
                </span>

                <h2>{t('selectCandidateTitle')}</h2>

                <p>
                  {t('selectCandidateDesc')}
                </p>
              </div>

              <span className="cast-vote-selection-count">
                {selectedCandidate ? t('oneSelected') : t('noSelection')}
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
                <span>{t('yourSelectionLabel')}</span>

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
                {t('changeBtn')}
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
                <h3>{t('readyToSubmitTitle')}</h3>

                <p>
                  {t('readyToSubmitDesc')}
                </p>
              </div>
            </div>

            <div className="cast-vote-submit-actions">
              <Link
                to="/elections"
                className="cast-vote-secondary-button"
              >
                {t('cancelBtn')}
              </Link>

              <button
                type="submit"
                className="cast-vote-primary-button"
                disabled={!selectedCandidate || isSubmitting}
              >
                {isSubmitting ? t('submittingBtn') : t('reviewVoteBtn')}
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
            <h3>{t('privacySecurityTitle')}</h3>

            <p>
              {t('privacySecurityDesc')}
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
              {t('finalReviewLabel')}
            </span>

            <h2 id="cast-vote-modal-title">
              {t('confirmYourVoteTitle')}
            </h2>

            <p className="cast-vote-modal-description">
              {t('confirmYourVoteDesc')}
            </p>

            <div className="cast-vote-confirmation-box">
              <span>{t('selectedCandidateLabel')}</span>

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
                {t('makeSureCandidate')}
              </p>
            </div>

            <div className="cast-vote-modal-actions">
              <button
                type="button"
                className="cast-vote-modal-cancel"
                onClick={handleCancelConfirmation}
                disabled={isSubmitting}
              >
                {t('goBackBtn')}
              </button>

              <button
                type="button"
                className="cast-vote-modal-confirm"
                onClick={handleConfirmVote}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? t('submittingBtn')
                  : t('confirmSubmitBtn')}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CastVote;