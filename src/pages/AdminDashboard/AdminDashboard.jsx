import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const STATS = [
  {
    id: "voters",
    title: "Total Voters",
    value: "12,584",
    change: "+8.4%",
    description: "Compared with last month",
    icon: "V",
    className: "blue",
  },
  {
    id: "candidates",
    title: "Candidates",
    value: "48",
    change: "+12",
    description: "Registered candidates",
    icon: "C",
    className: "purple",
  },
  {
    id: "elections",
    title: "Active Elections",
    value: "3",
    change: "Active",
    description: "Currently running",
    icon: "E",
    className: "green",
  },
  {
    id: "votes",
    title: "Votes Cast",
    value: "8,942",
    change: "71.1%",
    description: "Voter participation",
    icon: "✓",
    className: "orange",
  },
];

const QUICK_ACTIONS = [
  {
    id: "voters",
    to: "/manage-voters",
    title: "Manage Voters",
    description: "View and manage registered voters",
    icon: "V",
    className: "blue",
  },
  {
    id: "candidates",
    to: "/manage-candidates",
    title: "Manage Candidates",
    description: "Add or update election candidates",
    icon: "C",
    className: "purple",
  },
  {
    id: "elections",
    to: "/elections",
    title: "Manage Elections",
    description: "Monitor current election activity",
    icon: "E",
    className: "green",
  },
];

const ELECTIONS = [
  {
    id: "GE-2026",
    name: "General Election 2026",
    status: "Active",
    candidates: 4,
    votes: "8,942",
    endDate: "31 Aug 2026",
  },
  {
    id: "SC-2026",
    name: "Student Council Election",
    status: "Upcoming",
    candidates: 8,
    votes: "0",
    endDate: "15 Sep 2026",
  },
  {
    id: "LC-2026",
    name: "Local Committee Election",
    status: "Completed",
    candidates: 6,
    votes: "4,218",
    endDate: "10 Aug 2026",
  },
];

const SYSTEM_HEALTH = [
  {
    id: "voting-service",
    title: "Voting Service",
    description: "Operational",
  },
  {
    id: "blockchain",
    title: "Blockchain Network",
    description: "Connected",
  },
  {
    id: "database",
    title: "Database",
    description: "All services available",
  },
  {
    id: "authentication",
    title: "Authentication",
    description: "Secure connection",
  },
];

const RECENT_ACTIVITY = [
  {
    id: "activity-1",
    title: "New voter registered",
    description:
      "Voter ID VTR-2026-01842 was successfully registered.",
    time: "10 minutes ago",
    type: "voter",
    icon: "V",
  },
  {
    id: "activity-2",
    title: "Candidate added",
    description:
      "Rahul Patil was added to General Election 2026.",
    time: "35 minutes ago",
    type: "candidate",
    icon: "C",
  },
  {
    id: "activity-3",
    title: "Vote successfully recorded",
    description:
      "A new encrypted vote was added to the election ledger.",
    time: "1 hour ago",
    type: "vote",
    icon: "✓",
  },
  {
    id: "activity-4",
    title: "Election settings updated",
    description:
      "General Election 2026 settings were updated by admin.",
    time: "2 hours ago",
    type: "settings",
    icon: "⚙",
  },
];

const AdminDashboard = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <main className="admin-dashboard-page">
      <div className="admin-dashboard-container">

        {/* ================= HEADER ================= */}
        <header className="admin-dashboard-header">
          <div className="admin-dashboard-heading">
            <span className="admin-dashboard-eyebrow">
              ADMINISTRATION PANEL
            </span>

            <h1>Admin Dashboard</h1>

            <p>
              Monitor elections, voters, candidates, and voting
              activity from one secure dashboard.
            </p>
          </div>

          <div className="admin-dashboard-header-actions">
            <span className="admin-online-status">
              <span
                className="admin-online-dot"
                aria-hidden="true"
              />
              System Online
            </span>

            <Link
              to="/login"
              className="admin-logout-button"
              aria-label="Logout from administrator dashboard"
            >
              Logout
            </Link>
          </div>
        </header>

        {/* ================= WELCOME BANNER ================= */}
        <section className="admin-welcome-banner">
          <div className="admin-welcome-content">
            <span className="admin-banner-label">
              WELCOME BACK
            </span>

            <h2>Election administration overview</h2>

            <p>
              Your voting system is currently operational. Review the
              latest activity and manage your election data below.
            </p>
          </div>

          <div
            className="admin-banner-icon"
            aria-hidden="true"
          >
            A
          </div>
        </section>

        {/* ================= STATISTICS ================= */}
        <section
          className="admin-stats-grid"
          aria-label="Dashboard statistics"
        >
          {STATS.map((stat) => (
            <article
              className="admin-stat-card"
              key={stat.id}
            >
              <div
                className={`admin-stat-icon ${stat.className}`}
                aria-hidden="true"
              >
                {stat.icon}
              </div>

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
              <span className="admin-section-label">
                MANAGEMENT
              </span>

              <h2>Quick Actions</h2>
            </div>
          </div>

          <div className="admin-quick-actions">
            {QUICK_ACTIONS.map((action) => (
              <Link
                key={action.id}
                to={action.to}
                className={`admin-quick-action ${action.className}`}
              >
                <span
                  className="admin-action-icon"
                  aria-hidden="true"
                >
                  {action.icon}
                </span>

                <span className="admin-action-content">
                  <strong>{action.title}</strong>
                  <small>{action.description}</small>
                </span>

                <span
                  className="admin-action-arrow"
                  aria-hidden="true"
                >
                  →
                </span>
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
                <span className="admin-section-label">
                  ELECTIONS
                </span>

                <h2>Election Overview</h2>
              </div>

              <Link
                to="/elections"
                className="admin-view-all"
              >
                View All
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="admin-election-list">
              {ELECTIONS.map((election) => (
                <article
                  className="admin-election-item"
                  key={election.id}
                >
                  <div className="admin-election-info">
                    <div className="admin-election-title-row">
                      <h3>{election.name}</h3>

                      <span
                        className={`admin-election-status ${election.status.toLowerCase()}`}
                      >
                        {election.status}
                      </span>
                    </div>

                    <span className="admin-election-id">
                      ID: {election.id}
                    </span>
                  </div>

                  <div className="admin-election-metrics">
                    <div>
                      <span>Candidates</span>
                      <strong>{election.candidates}</strong>
                    </div>

                    <div>
                      <span>Votes</span>
                      <strong>{election.votes}</strong>
                    </div>

                    <div>
                      <span>End Date</span>
                      <strong>{election.endDate}</strong>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ================= SYSTEM HEALTH ================= */}
          <section className="admin-section admin-health-section">
            <div className="admin-section-header">
              <div>
                <span className="admin-section-label">
                  SYSTEM
                </span>

                <h2>System Health</h2>
              </div>
            </div>

            <div className="admin-health-list">
              {SYSTEM_HEALTH.map((service) => (
                <div
                  className="admin-health-item"
                  key={service.id}
                >
                  <div className="admin-health-left">
                    <span
                      className="admin-health-icon"
                      aria-hidden="true"
                    >
                      ✓
                    </span>

                    <div>
                      <strong>{service.title}</strong>
                      <small>{service.description}</small>
                    </div>
                  </div>

                  <span className="admin-health-status">
                    Healthy
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ================= RECENT ACTIVITY ================= */}
        <section className="admin-section admin-activity-section">
          <div className="admin-section-header">
            <div>
              <span className="admin-section-label">
                AUDIT LOG
              </span>

              <h2>Recent Activity</h2>
            </div>

            <button
              type="button"
              className="admin-refresh-button"
              onClick={handleRefresh}
              aria-label="Refresh dashboard"
            >
              Refresh
            </button>
          </div>

          <div className="admin-activity-list">
            {RECENT_ACTIVITY.map((activity) => (
              <article
                className="admin-activity-item"
                key={activity.id}
              >
                <div
                  className={`admin-activity-icon ${activity.type}`}
                  aria-hidden="true"
                >
                  {activity.icon}
                </div>

                <div className="admin-activity-content">
                  <h3>{activity.title}</h3>

                  <p>{activity.description}</p>
                </div>

                <time>{activity.time}</time>
              </article>
            ))}
          </div>
        </section>

        {/* ================= SECURITY NOTICE ================= */}
        <aside className="admin-security-notice">
          <div
            className="admin-security-icon"
            aria-hidden="true"
          >
            !
          </div>

          <div>
            <h3>Administrator Security Notice</h3>

            <p>
              Administrative actions can affect election data and
              voter records. Always verify changes before publishing
              them to the live voting system.
            </p>
          </div>
        </aside>

      </div>
    </main>
  );
};

export default AdminDashboard;