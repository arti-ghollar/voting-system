import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "./VotingMethodSelection.css";

const VotingMethodSelection = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <main className="voting-method-page">
      <div className="voting-method-container">
        {/* ================= HEADER ================= */}
        <header className="voting-method-header">
          <div className="voting-method-heading">
            <span className="voting-method-eyebrow">
              {t('votingMethodEyebrow')}
            </span>
            <h1>{t('howWouldYouLikeToVote')}</h1>
            <p>
              {t('chooseVotingMethodDesc')}
            </p>
          </div>
          <Link to="/voter-dashboard" className="voting-method-back-button">
            <span aria-hidden="true">←</span>
            {t('backToDashboard')}
          </Link>
        </header>

        {/* ================= METHOD CARDS ================= */}
        <section className="voting-method-grid">
          {/* ONLINE VOTING */}
          <article className="voting-method-card">
            <div className="voting-method-icon blue" aria-hidden="true">
              📱
            </div>
            <div className="voting-method-content">
              <h2>{t('homeOnlineVoting')}</h2>
              <p>{t('homeOnlineDesc')}</p>
              <ul className="voting-method-features">
                <li><span aria-hidden="true">✓</span> {t('quickConvenient')}</li>
                <li><span aria-hidden="true">✓</span> {t('immediateConfirmation')}</li>
                <li><span aria-hidden="true">✓</span> {t('highestPrivacy')}</li>
              </ul>
            </div>
            <button 
              className="voting-method-action-button blue-btn"
              onClick={() => navigate("/elections")}
            >
              {t('voteOnlineBtn')}
              <span aria-hidden="true">→</span>
            </button>
          </article>

          {/* VOTING CENTER */}
          <article className="voting-method-card">
            <div className="voting-method-icon purple" aria-hidden="true">
              🏢
            </div>
            <div className="voting-method-content">
              <h2>{t('votingCenterTitle')}</h2>
              <p>{t('votingCenterDesc')}</p>
              <ul className="voting-method-features">
                <li><span aria-hidden="true">✓</span> {t('staffAssistance')}</li>
                <li><span aria-hidden="true">✓</span> {t('accessibleDevices')}</li>
                <li><span aria-hidden="true">✓</span> {t('securePrivateBooths')}</li>
              </ul>
            </div>
            <div className="voting-method-info-badge">
              {t('logOutToAllow')}
            </div>
          </article>

          {/* HOME VISIT VOTING */}
          <article className="voting-method-card">
            <div className="voting-method-icon green" aria-hidden="true">
              🏠
            </div>
            <div className="voting-method-content">
              <h2>{t('homeVisitVotingTitle')}</h2>
              <p>{t('homeVisitDesc')}</p>
              <ul className="voting-method-features">
                <li><span aria-hidden="true">✓</span> {t('elderlyMobility')}</li>
                <li><span aria-hidden="true">✓</span> {t('verifiedOfficials')}</li>
                <li><span aria-hidden="true">✓</span> {t('authorizedAssistance')}</li>
              </ul>
            </div>
            <button 
              className="voting-method-action-button green-btn"
              onClick={() => navigate("/home-voting-request")}
            >
              {t('requestHomeVisitBtn')}
              <span aria-hidden="true">→</span>
            </button>
          </article>
        </section>
      </div>
    </main>
  );
};

export default VotingMethodSelection;
