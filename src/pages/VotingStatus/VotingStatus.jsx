import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "./VotingStatus.css";

const VotingStatus = () => {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const election = {
    title: t('ge2026Title'),
    electionId: "GE-2026",
    status: t('votingActiveLabel'),
    startDate: "15 August 2026",
    endDate: "31 August 2026",
    totalCandidates: 4,
    hasVoted: true,
    transactionId: "0x7a9f8b31e4c29a7d5f10b6c84c82d91e",
  };

  const votingSteps = [
    {
      id: 1,
      title: t('registrationCompletedTitle'),
      description: t('registrationCompletedDesc'),
      status: "completed",
    },
    {
      id: 2,
      title: t('identityVerifiedTitle'),
      description: t('identityVerifiedDesc'),
      status: "completed",
    },
    {
      id: 3,
      title: t('voteCastStepTitle'),
      description: t('voteCastStepDesc'),
      status: "completed",
    },
    {
      id: 4,
      title: t('voteVerificationTitle'),
      description: t('voteVerificationDesc'),
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
              {t('voterPortalEyebrow')}
            </span>

            <h1>{t('votingStatusTitle')}</h1>

            <p>
              {t('votingStatusDesc')}
            </p>
          </div>

          <Link
            to="/voter-dashboard"
            className="voting-status-back-button"
          >
            <span aria-hidden="true">←</span>
            {t('backToDashboard')}
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
                {t('currentElectionLabel')}
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
            <span>{t('electionPeriodLabel')}</span>

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
              <span>{t('yourStatusLabel')}</span>

              <strong>
                {election.hasVoted ? t('voteCastLabel') : t('notVotedLabel')}
              </strong>

              <small>
                {election.hasVoted
                  ? t('voteRecordedDesc')
                  : t('votePendingDesc')}
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
              <span>{t('electionIdLabel')}</span>

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
              <span>{t('candidatesTitle')}</span>

              <strong>{election.totalCandidates}</strong>

              <small>{t('availableCandidates')}</small>
            </div>
          </article>

        </section>

        {/* ================= VOTING PROGRESS ================= */}
        <section className="voting-progress-card">
          <div className="voting-section-heading">
            <div>
              <span className="voting-card-label">
                {t('activityLabel')}
              </span>

              <h2>{t('votingProgressTitle')}</h2>
            </div>

            <span className="voting-completed-badge">
              {t('completedBadge')}
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
                        {t('completedBadge')}
                      </span>
                    )}

                    {step.status === "current" && (
                      <span className="voting-step-status current">
                        {t('inProgressBadge')}
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
                {t('blockchainVerificationLabel')}
              </span>

              <h2>{t('voteSecurelyRecordedTitle')}</h2>

              <p>
                {t('voteSecurelyRecordedDesc')}
              </p>
            </div>
          </div>

          <div className="voting-transaction-box">
            <div className="voting-transaction-heading">
              <span>{t('transactionIdLabel')}</span>

              <span className="voting-verified-badge">
                <span aria-hidden="true">✓</span>
                {t('confirmedLabel')}
              </span>
            </div>

            <div className="voting-transaction-value">
              <code>{election.transactionId}</code>

              <button
                type="button"
                className="voting-copy-button"
                onClick={handleCopyTransaction}
              >
                {copied ? t('copiedBtn') : t('copyBtn')}
              </button>
            </div>
          </div>

          <div className="voting-verification-actions">
            <Link
              to="/vote-confirmation"
              className="voting-primary-button"
            >
              {t('viewVoteConfirmationBtn')}
              <span aria-hidden="true">→</span>
            </Link>

            <Link
              to="/elections"
              className="voting-secondary-button"
            >
              {t('viewElections')}
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
            <h3>{t('privacySecurityTitle')}</h3>

            <p>
              {t('privacySecurityDesc3')}
            </p>
          </div>
        </section>

      </div>
    </main>
  );
};

export default VotingStatus;