import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import { useLanguage } from "../../context/LanguageContext";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { t } = useLanguage();

  const QUICK_ACTIONS = [
    {
      id: "voters",
      to: "/manage-voters",
      title: t('manageVotersTitle'),
      description: t('manageVotersDesc'),
      icon: "V",
      className: "blue",
    },
    {
      id: "candidates",
      to: "/manage-candidates",
      title: t('manageCandidatesTitle'),
      description: t('manageCandidatesDesc'),
      icon: "C",
      className: "purple",
    },
    {
      id: "elections",
      to: "/elections",
      title: t('manageElectionsTitle'),
      description: t('manageElectionsDesc'),
      icon: "E",
      className: "green",
    },
  ];

  const SYSTEM_HEALTH = [
    {
      id: "voting-service",
      title: t('votingServiceTitle'),
      description: t('votingServiceDesc'),
    },
    {
      id: "database",
      title: t('databaseTitle'),
      description: t('databaseDesc'),
    },
    {
      id: "authentication",
      title: t('authenticationTitle'),
      description: t('authenticationDesc'),
    },
  ];

  const [stats, setStats] = useState({
    totalVoters: 0,
    activeElections: 0,
    totalVotes: 0,
    totalCandidates: 0,
  });
  
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, electionsRes] = await Promise.all([
          api.admin.getStatistics(),
          api.getElections()
        ]);
        
        if (statsRes.success) {
          setStats(statsRes.statistics);
        }
        
        if (electionsRes.success) {
          setElections(electionsRes.elections);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  const dynamicStats = [
    {
      id: "voters",
      title: t('totalVotersLabel'),
      value: stats.totalVoters.toLocaleString(),
      change: t('realTimeChange'),
      description: t('registeredVotersDesc'),
      icon: "V",
      className: "blue",
    },
    {
      id: "elections",
      title: t('activeElectionsLabel'),
      value: stats.activeElections.toLocaleString(),
      change: t('activeChange'),
      description: t('currentlyRunningDesc'),
      icon: "E",
      className: "green",
    },
    {
      id: "votes",
      title: t('totalVotesCastLabel'),
      value: stats.totalVotes.toLocaleString(),
      change: t('realTimeChange'),
      description: t('voterParticipationDesc'),
      icon: "✓",
      className: "purple",
    },
    {
      id: "candidates",
      title: t('totalCandidatesLabel'),
      value: stats.totalCandidates.toLocaleString(),
      change: t('registeredChange'),
      description: t('acrossAllElectionsDesc'),
      icon: "C",
      className: "orange",
    },
  ];

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>{t('loadingDashboard')}</div>;
  }

  return (
    <main className="admin-dashboard-page">
      <div className="admin-dashboard-container">
        {/* ================= HEADER ================= */}
        <header className="admin-dashboard-header">
          <div className="admin-dashboard-heading">
            <span className="admin-dashboard-eyebrow">{t('adminPanelEyebrow')}</span>
            <h1>{t('adminDashboardTitle')}</h1>
            <p>{t('adminDashboardDesc')}</p>
          </div>
          <div className="admin-dashboard-header-actions">
            <span className="admin-online-status">
              <span className="admin-online-dot" aria-hidden="true" />
              {t('systemOnlineStatus')}
            </span>
            <Link to="/login" className="admin-logout-button">{t('logoutBtn')}</Link>
          </div>
        </header>

        {/* ================= WELCOME BANNER ================= */}
        <section className="admin-welcome-banner">
          <div className="admin-welcome-content">
            <span className="admin-banner-label">{t('welcomeBackLabel')}</span>
            <h2>{t('adminOverviewTitle')}</h2>
            <p>{t('adminOverviewDesc')}</p>
          </div>
          <div className="admin-banner-icon" aria-hidden="true">A</div>
        </section>

        {/* ================= STATISTICS ================= */}
        <section className="admin-stats-grid" aria-label="Dashboard statistics">
          {dynamicStats.map((stat) => (
            <article className="admin-stat-card" key={stat.id}>
              <div className={`admin-stat-icon ${stat.className}`} aria-hidden="true">{stat.icon}</div>
              <div className="admin-stat-content">
                <span>{stat.title}</span>
                <strong>{stat.value}</strong>
                <div className="admin-stat-bottom">
                  <b>{stat.change}</b>
                  <small>{stat.description}</small>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* ================= QUICK ACTIONS ================= */}
        <section className="admin-section">
          <div className="admin-section-header">
            <div>
              <span className="admin-section-label">{t('managementLabel')}</span>
              <h2>{t('quickActionsTitle')}</h2>
            </div>
          </div>
          <div className="admin-quick-actions">
            {QUICK_ACTIONS.map((action) => (
              <Link key={action.id} to={action.to} className={`admin-quick-action ${action.className}`}>
                <span className="admin-action-icon" aria-hidden="true">{action.icon}</span>
                <span className="admin-action-content">
                  <strong>{action.title}</strong>
                  <small>{action.description}</small>
                </span>
                <span className="admin-action-arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ================= MAIN GRID ================= */}
        <div className="admin-dashboard-main-grid">
          {/* ================= ELECTION OVERVIEW ================= */}
          <section className="admin-section admin-elections-section">
            <div className="admin-section-header">
              <div>
                <span className="admin-section-label">{t('electionsLabel')}</span>
                <h2>{t('electionOverviewTitle')}</h2>
              </div>
              <Link to="/elections" className="admin-view-all">
                {t('viewAllBtn')} <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="admin-election-list">
              {elections.length === 0 ? (
                <p style={{ color: 'var(--color-text-secondary)', padding: '1rem' }}>{t('noElectionsFound')}</p>
              ) : (
                elections.slice(0, 5).map((election) => (
                  <article className="admin-election-item" key={election.id}>
                    <div className="admin-election-info">
                      <div className="admin-election-title-row">
                        <h3>{election.title}</h3>
                        <span className={`admin-election-status ${(election.status || "UNKNOWN").toLowerCase()}`}>
                          {election.status}
                        </span>
                      </div>
                      <span className="admin-election-id">ID: {election.id}</span>
                    </div>
                    <div className="admin-election-metrics">
                      <div>
                        <span>{t('typeLabel')}</span>
                        <strong>{election.type}</strong>
                      </div>
                      <div>
                        <span>{t('endDateLabel')}</span>
                        <strong>{new Date(election.end_date).toLocaleDateString()}</strong>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>

          {/* ================= SYSTEM HEALTH ================= */}
          <section className="admin-section admin-health-section">
            <div className="admin-section-header">
              <div>
                <span className="admin-section-label">{t('systemLabel')}</span>
                <h2>{t('systemHealthTitle')}</h2>
              </div>
            </div>
            <div className="admin-health-list">
              {SYSTEM_HEALTH.map((service) => (
                <div className="admin-health-item" key={service.id}>
                  <div className="admin-health-left">
                    <span className="admin-health-icon" aria-hidden="true">✓</span>
                    <div>
                      <strong>{service.title}</strong>
                      <small>{service.description}</small>
                    </div>
                  </div>
                  <span className="admin-health-status">{t('healthyStatus')}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

      </div>
    </main>
  );
};

export default AdminDashboard;