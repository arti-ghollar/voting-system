import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useElection } from "../../context/ElectionContext";
import { useLanguage } from "../../context/LanguageContext";
import { api } from "../../services/api";
import "./VoterDashboard.css";

const VoterDashboard = () => {
  const { user } = useAuth();
  const { elections, selectedElection } = useElection();
  const { t } = useLanguage();
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const res = await api.getMyVotes();
        if (res.success && res.votes && selectedElection) {
          const voted = res.votes.some(v => v.election_id === selectedElection.id);
          setHasVoted(voted);
        }
      } catch (err) {
        console.error("Failed to fetch my votes", err);
      } finally {
        setLoading(false);
      }
    };
    
    if (selectedElection) {
      fetchVotes();
    } else {
      setLoading(false);
    }
  }, [selectedElection]);

  const voter = {
    name: user?.name || "Voter",
    voterId: user?.id || "VT-00000",
    verificationStatus: t('verifiedStat'),
  };

  const election = {
    id: selectedElection?.id || "No active election",
    title: selectedElection?.title || "No active election",
    status: selectedElection?.status || "N/A",
    startDate: selectedElection?.start_date ? new Date(selectedElection.start_date).toLocaleDateString() : "-",
    endDate: selectedElection?.end_date ? new Date(selectedElection.end_date).toLocaleDateString() : "-",
    candidates: 0,
    hasVoted: hasVoted,
  };

  const stats = [
    {
      id: "status",
      label: t('votingStatusLabel'),
      value: election.hasVoted ? t('voteCast') : t('notVoted'),
      description: election.hasVoted
        ? t('voteRecordedDesc')
        : t('votePendingDesc'),
      icon: "✓",
      className: "blue",
    },
    {
      id: "election",
      label: t('currentElection'),
      value: t('activeLabel'),
      description: election.title,
      icon: "E",
      className: "purple",
    },
    {
      id: "candidates",
      label: t('elections'),
      value: String(elections.length),
      description: t('availableElections'),
      icon: "#",
      className: "green",
    },
  ];

  const quickActions = [
    {
      id: "vote-method",
      title: t('chooseVotingMethod'),
      description: t('chooseVotingMethodDesc'),
      icon: "🗳️",
      link: "/voting-method",
      className: "blue",
    },
    {
      id: "status",
      title: t('votingStatusLabel'),
      description: t('trackVoteDesc'),
      icon: "✓",
      link: "/voting-status",
      className: "green",
    },
    {
      id: "confirmation",
      title: t('voteConfirmation'),
      description: t('voteConfirmationDesc'),
      icon: "⛓",
      link: "/vote-confirmation",
      className: "purple",
    },
  ];

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>{t('loadingDashboard')}</div>;
  }

  return (
    <main className="voter-dashboard-page">
      <div className="voter-dashboard-container">
        {/* ================= HEADER ================= */}
        <header className="voter-dashboard-header">
          <div className="voter-dashboard-welcome">
            <span className="voter-dashboard-eyebrow">{t('voterPortalLabel')}</span>
            <h1>{t('welcomeVoter').replace('{name}', voter.name)}</h1>
            <p>{t('dashboardDesc')}</p>
          </div>
          <div className="voter-dashboard-profile">
            <div className="voter-dashboard-avatar">{voter.name.charAt(0)}</div>
            <div className="voter-dashboard-profile-info">
              <strong>{voter.name}</strong>
              <span>{voter.voterId}</span>
            </div>
            <span className="voter-dashboard-verified">
              <span aria-hidden="true">✓</span>
              {voter.verificationStatus}
            </span>
          </div>
        </header>

        {/* ================= ACTIVE ELECTION ================= */}
        {selectedElection ? (
        <section className="voter-dashboard-election-card">
          <div className="voter-dashboard-election-content">
            <div className="voter-dashboard-election-icon">
              <span aria-hidden="true">✓</span>
            </div>
            <div>
              <span className="voter-dashboard-card-label">{t('currentElection')}</span>
              <h2>{election.title}</h2>
              <div className="voter-dashboard-election-status">
                <span className="voter-dashboard-status-dot" aria-hidden="true" />
                {election.status}
              </div>
            </div>
          </div>
          <div className="voter-dashboard-election-info">
            <div>
              <span>{t('electionPeriod')}</span>
              <strong>{election.startDate} — {election.endDate}</strong>
            </div>
            {!election.hasVoted && (
              <Link to="/voting-method" className="voter-dashboard-election-button">
                {t('voteNow')}
                <span aria-hidden="true">→</span>
              </Link>
            )}
            {election.hasVoted && (
              <button disabled className="voter-dashboard-election-button" style={{ background: '#22c55e', color: 'white' }}>
                {t('voteSubmitted')}
              </button>
            )}
          </div>
        </section>
        ) : (
          <section className="voter-dashboard-election-card">
            <div className="voter-dashboard-election-content">
              <div>
                <h2>{t('noActiveElections')}</h2>
                <p>{t('noActiveElectionsDesc')}</p>
              </div>
            </div>
          </section>
        )}

        {/* ================= STATS ================= */}
        <section className="voter-dashboard-stats">
          {stats.map((stat) => (
            <article className="voter-dashboard-stat-card" key={stat.id}>
              <div className={`voter-dashboard-stat-icon ${stat.className}`} aria-hidden="true">{stat.icon}</div>
              <div className="voter-dashboard-stat-content">
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
                <small>{stat.description}</small>
              </div>
            </article>
          ))}
        </section>

        {/* ================= MAIN GRID ================= */}
        <div className="voter-dashboard-main-grid">
          {/* QUICK ACTIONS */}
          <section className="voter-dashboard-section-card">
            <div className="voter-dashboard-section-header">
              <div>
                <span className="voter-dashboard-card-label">{t('quickAccess')}</span>
                <h2>{t('quickActions')}</h2>
              </div>
            </div>
            <div className="voter-dashboard-actions">
              {quickActions.map((action) => (
                <Link to={action.link} className="voter-dashboard-action" key={action.id}>
                  <div className={`voter-dashboard-action-icon ${action.className}`} aria-hidden="true">{action.icon}</div>
                  <div className="voter-dashboard-action-content">
                    <h3>{action.title}</h3>
                    <p>{action.description}</p>
                  </div>
                  <span className="voter-dashboard-action-arrow" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </section>

          {/* VOTING SUMMARY */}
          <section className="voter-dashboard-section-card">
            <div className="voter-dashboard-section-header">
              <div>
                <span className="voter-dashboard-card-label">{t('electionActivity')}</span>
                <h2>{t('votingSummary')}</h2>
              </div>
              <span className="voter-dashboard-completed-badge">{t('completedBadge')}</span>
            </div>
            <div className="voter-dashboard-summary">
              <div className="voter-dashboard-summary-row">
                <div className="voter-dashboard-summary-icon">✓</div>
                <div>
                  <span>{t('registrationStat')}</span>
                  <strong>{t('completedBadge')}</strong>
                </div>
              </div>
              <div className="voter-dashboard-summary-line" />
              <div className="voter-dashboard-summary-row">
                <div className="voter-dashboard-summary-icon">✓</div>
                <div>
                  <span>{t('identityVerificationStat')}</span>
                  <strong>{t('verifiedStat')}</strong>
                </div>
              </div>
              <div className="voter-dashboard-summary-line" />
              <div className="voter-dashboard-summary-row">
                <div className="voter-dashboard-summary-icon">✓</div>
                <div>
                  <span>{t('voteSubmissionStat')}</span>
                  <strong>{election.hasVoted ? t('successfullyRecordedStat') : t('pendingStat')}</strong>
                </div>
              </div>
            </div>
            <Link to="/voting-status" className="voter-dashboard-status-link">
              {t('viewCompleteStatus')}
              <span aria-hidden="true">→</span>
            </Link>
          </section>
        </div>

        {/* ================= SECURITY CARD ================= */}
        <section className="voter-dashboard-security-card">
          <div className="voter-dashboard-security-icon">
            <span aria-hidden="true">🔐</span>
          </div>
          <div className="voter-dashboard-security-content">
            <span className="voter-dashboard-card-label">{t('securityPrivacyLabel')}</span>
            <h2>{t('voteProtected')}</h2>
            <p>{t('voteProtectedDesc')}</p>
          </div>
          <Link to="/voting-status" className="voter-dashboard-security-button">
            {t('verifyVote')}
            <span aria-hidden="true">→</span>
          </Link>
        </section>

        {/* ================= FOOTER ACTIONS ================= */}
        <div className="voter-dashboard-footer-actions">
          <Link to="/how-it-works" className="voter-dashboard-footer-link">{t('howItWorks')}</Link>
          <Link to="/elections" className="voter-dashboard-footer-link">{t('elections')}</Link>
          <Link to="/" className="voter-dashboard-footer-link">{t('home')}</Link>
        </div>
      </div>
    </main>
  );
};

export default VoterDashboard;