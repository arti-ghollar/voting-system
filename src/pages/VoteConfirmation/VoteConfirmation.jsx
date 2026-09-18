import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "./VoteConfirmation.css";

const VoteConfirmation = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const isAssisted = location.state?.isAssisted || false;
  const votingMethod = location.state?.votingMethod || "ONLINE";

  const voteDetails = {
    electionId: location.state?.election?.id || "GE-2026",
    electionName: location.state?.election?.title || t('ge2026Title'),
    voteStatus: t('successfullyRecorded'),
    transactionId: "0x7a9f8b31e4c29a7d5f10b6c84c82d91e",
    blockNumber: "18,429,731",
    network: t('blockchainNetwork'),
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
              {isAssisted ? t('authorizedAssistanceLabel') : t('voterPortalLabel')}
            </span>

            <h1>{t('voteConfirmationTitle')}</h1>

            <p>
              {t('voteConfirmationDesc')}
            </p>
          </div>

          <Link
            to={getDashboardLink()}
            className="vote-confirmation-back-button"
          >
            <span aria-hidden="true">←</span>
            {t('backToDashboard')}
          </Link>
        </header>

        {/* ================= SUCCESS CARD ================= */}
        <section className="vote-confirmation-success-card">
          <div className="vote-confirmation-success-icon">
            <span aria-hidden="true">✓</span>
          </div>

          <span className="vote-confirmation-success-label">
            {t('voteSuccessfullyRecorded')}
          </span>

          <h2>{t('voteConfirmedTitle')}</h2>

          <p>
            {t('voteConfirmedDesc')}
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
                {t('electionDetailsLabel')}
              </span>

              <h2>{voteDetails.electionName}</h2>
            </div>

            <span className="vote-confirmation-election-id">
              {voteDetails.electionId}
            </span>
          </div>

          <div className="vote-confirmation-details-grid">
            <div className="vote-confirmation-detail">
              <span>{t('electionLabel')}</span>
              <strong>{voteDetails.electionName}</strong>
            </div>

            <div className="vote-confirmation-detail">
              <span>{t('electionIdLabel')}</span>
              <strong>{voteDetails.electionId}</strong>
            </div>

            <div className="vote-confirmation-detail">
              <span>{t('dateLabel')}</span>
              <strong>{voteDetails.date}</strong>
            </div>

            <div className="vote-confirmation-detail">
              <span>{t('timeLabel')}</span>
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
                {t('blockchainRecordLabel')}
              </span>

              <h2>{t('transactionVerificationTitle')}</h2>

              <p>
                {t('transactionVerificationDesc')}
              </p>
            </div>
          </div>

          {/* Transaction ID */}
          <div className="vote-confirmation-transaction">
            <div className="vote-confirmation-transaction-heading">
              <span>{t('transactionIdLabel')}</span>

              <span className="vote-confirmation-verified-badge">
                <span aria-hidden="true">✓</span>
                {t('verifiedLabel')}
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
                {t('copyBtn')}
              </button>
            </div>
          </div>

          {/* Blockchain Information */}
          <div className="vote-confirmation-chain-grid">
            <div>
              <span>{t('blockNumberLabel')}</span>
              <strong>{voteDetails.blockNumber}</strong>
            </div>

            <div>
              <span>{t('networkLabel')}</span>
              <strong>{voteDetails.network}</strong>
            </div>

            <div>
              <span>{t('statusLabel')}</span>
              <strong className="vote-confirmation-chain-status">
                {t('confirmedLabel')}
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
            <h3>{t('privacySecurityTitle')}</h3>

            <p>
              {t('privacySecurityDesc2')}
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
                {t('viewVotingStatusBtn')}
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                to="/elections"
                className="vote-confirmation-secondary-button"
              >
                {t('viewElections')}
              </Link>
            </>
          )}

          {isAssisted && (
            <Link
              to={getDashboardLink()}
              className="vote-confirmation-primary-button"
            >
              {t('finishAssistedSessionBtn')}
              <span aria-hidden="true">→</span>
            </Link>
          )}

          <Link
            to={getDashboardLink()}
            className="vote-confirmation-secondary-button"
          >
            {t('dashboardBtn')}
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
            <h3>{t('keepTransactionSafeTitle')}</h3>

            <p>
              {t('keepTransactionSafeDesc')}
            </p>
          </div>
        </aside>

      </div>
    </main>
  );
};

export default VoteConfirmation;