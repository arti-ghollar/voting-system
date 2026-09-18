import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useVoting } from "../../context/VotingContext";
import { useLanguage } from "../../context/LanguageContext";
import "./VotingCenter.css";

const VotingCenter = () => {
  const navigate = useNavigate();
  const { hasVoted } = useVoting();
  const { t } = useLanguage();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedVoter, setSearchedVoter] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setError("");
    setSearchedVoter(null);

    // Simulate API search
    setTimeout(() => {
      setIsSearching(false);
      
      // Mock voter data
      if (searchQuery.startsWith("VT-")) {
        const voterAlreadyVoted = hasVoted("GE-2026", searchQuery);
        setSearchedVoter({
          voterId: searchQuery.toUpperCase(),
          name: t('verifiedVoterName'),
          status: t('eligibleStatus'),
          hasVoted: voterAlreadyVoted
        });
      } else {
        setError(t('voterNotFound'));
      }
    }, 800);
  };

  const startAssistedVoting = () => {
    if (searchedVoter && !searchedVoter.hasVoted) {
      navigate("/cast-vote/GE-2026", {
        state: {
          votingMethod: "CENTER",
          voterId: searchedVoter.voterId
        }
      });
    }
  };

  return (
    <main className="voting-center-page">
      <div className="voting-center-container">
        {/* ================= HEADER ================= */}
        <header className="voting-center-header">
          <div className="voting-center-welcome">
            <span className="voting-center-eyebrow">
              {t('centerOperatorPortal')}
            </span>
            <h1>{t('votingCenterDashboardTitle')}</h1>
            <p>
              {t('votingCenterDashboardDesc')}
            </p>
          </div>
          <div className="voting-center-profile">
            <div className="voting-center-avatar">O</div>
            <div className="voting-center-profile-info">
              <strong>{t('centerOperatorRole')}</strong>
              <span>{t('centerDistrict')}</span>
            </div>
            <span className="voting-center-verified">
              <span aria-hidden="true">✓</span> {t('activeStatus')}
            </span>
          </div>
        </header>

        {/* ================= SEARCH CARD ================= */}
        <section className="voting-center-card">
          <div className="voting-center-card-header">
            <div>
              <span className="voting-center-card-label">{t('voterLookupLabel')}</span>
              <h2>{t('verifyVoterEligibilityTitle')}</h2>
            </div>
          </div>
          
          <form className="voting-center-search-form" onSubmit={handleSearch}>
            <div className="voting-center-search-wrapper">
              <input 
                type="text" 
                placeholder={t('enterVoterIdPlaceholder')} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                required
              />
              <button type="submit" disabled={isSearching} className="voting-center-search-btn">
                {isSearching ? t('searchingBtn') : t('searchBtn')}
              </button>
            </div>
            {error && <p className="voting-center-error">{error}</p>}
          </form>
        </section>

        {/* ================= VOTER DETAILS ================= */}
        {searchedVoter && (
          <section className="voting-center-card voter-details">
            <div className="voting-center-card-header">
              <div>
                <span className="voting-center-card-label">{t('verificationResultLabel')}</span>
                <h2>{t('voterInformationTitle')}</h2>
              </div>
              <span className={`voting-center-status-badge ${searchedVoter.hasVoted ? 'status-voted' : 'status-eligible'}`}>
                {searchedVoter.hasVoted ? t('alreadyVotedStatus') : t('eligibleStatus')}
              </span>
            </div>

            <div className="voting-center-details-grid">
              <div className="voting-center-detail">
                <span>{t('voterIdLabel')}</span>
                <strong>{searchedVoter.voterId}</strong>
              </div>
              <div className="voting-center-detail">
                <span>{t('nameLabel')}</span>
                <strong>{searchedVoter.name}</strong>
              </div>
              <div className="voting-center-detail">
                <span>{t('electionLabel')}</span>
                <strong>{t('ge2026Title')}</strong>
              </div>
              <div className="voting-center-detail">
                <span>{t('votingStatusLabel')}</span>
                <strong style={{ color: searchedVoter.hasVoted ? "var(--color-danger, #ef4444)" : "var(--color-success, #22c55e)" }}>
                  {searchedVoter.hasVoted ? t('voteCastLabel') : t('notVotedLabel')}
                </strong>
              </div>
            </div>

            <div className="voting-center-actions">
              {searchedVoter.hasVoted ? (
                <div className="voting-center-warning-box">
                  <span className="warning-icon">⚠</span>
                  <div>
                    <strong>{t('votingBlockedTitle')}</strong>
                    <p>{t('votingBlockedDesc')}</p>
                  </div>
                </div>
              ) : (
                <div className="voting-center-start-box">
                  <div className="voting-center-privacy-notice">
                    <span className="privacy-icon">🔐</span>
                    <p><strong>{t('privacyCheckTitle')}</strong> {t('privacyCheckDesc')}</p>
                  </div>
                  <button 
                    className="voting-center-primary-btn"
                    onClick={startAssistedVoting}
                  >
                    {t('startAssistedVotingBtn')}
                    <span>→</span>
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

      </div>
    </main>
  );
};

export default VotingCenter;
