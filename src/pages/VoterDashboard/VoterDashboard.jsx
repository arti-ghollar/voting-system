import React from "react";
import { Link } from "react-router-dom";
import "./VoterDashboard.css";

const VoterDashboard = () => {
  const voter = {
    name: "Alex Johnson",
    voterId: "VT-2026-10482",
    verificationStatus: "Verified",
  };

  const election = {
    id: "GE-2026",
    title: "General Election 2026",
    status: "Voting Active",
    startDate: "15 August 2026",
    endDate: "31 August 2026",
    candidates: 4,
    hasVoted: true,
  };

  const stats = [
    {
      id: "status",
      label: "Voting Status",
      value: election.hasVoted ? "Vote Cast" : "Not Voted",
      description: election.hasVoted
        ? "Your vote has been recorded"
        : "Your vote is pending",
      icon: "✓",
      className: "blue",
    },
    {
      id: "election",
      label: "Current Election",
      value: election.id,
      description: election.title,
      icon: "E",
      className: "purple",
    },
    {
      id: "candidates",
      label: "Candidates",
      value: String(election.candidates),
      description: "Available candidates",
      icon: "#",
      className: "green",
    },
  ];

  const quickActions = [
    {
      id: "elections",
      title: "View Elections",
      description: "Explore available elections and candidates.",
      icon: "▣",
      link: "/elections",
      className: "blue",
    },
    {
      id: "status",
      title: "Voting Status",
      description: "Track your vote and verification status.",
      icon: "✓",
      link: "/voting-status",
      className: "green",
    },
    {
      id: "confirmation",
      title: "Vote Confirmation",
      description: "View your blockchain vote confirmation.",
      icon: "⛓",
      link: "/vote-confirmation",
      className: "purple",
    },
  ];

  return (
    <main className="voter-dashboard-page">
      <div className="voter-dashboard-container">

        {/* ================= HEADER ================= */}
        <header className="voter-dashboard-header">
          <div className="voter-dashboard-welcome">
            <span className="voter-dashboard-eyebrow">
              VOTER PORTAL
            </span>

            <h1>
              Welcome back, {voter.name}
            </h1>

            <p>
              Manage your elections, voting activity and
              blockchain verification from one secure dashboard.
            </p>
          </div>

          <div className="voter-dashboard-profile">
            <div className="voter-dashboard-avatar">
              {voter.name.charAt(0)}
            </div>

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
        <section className="voter-dashboard-election-card">
          <div className="voter-dashboard-election-content">

            <div className="voter-dashboard-election-icon">
              <span aria-hidden="true">✓</span>
            </div>

            <div>
              <span className="voter-dashboard-card-label">
                CURRENT ELECTION
              </span>

              <h2>{election.title}</h2>

              <div className="voter-dashboard-election-status">
                <span
                  className="voter-dashboard-status-dot"
                  aria-hidden="true"
                />
                {election.status}
              </div>
            </div>
          </div>

          <div className="voter-dashboard-election-info">
            <div>
              <span>Election Period</span>

              <strong>
                {election.startDate} — {election.endDate}
              </strong>
            </div>

            <Link
              to="/elections"
              className="voter-dashboard-election-button"
            >
              View Election
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="voter-dashboard-stats">
          {stats.map((stat) => (
            <article
              className="voter-dashboard-stat-card"
              key={stat.id}
            >
              <div
                className={`voter-dashboard-stat-icon ${stat.className}`}
                aria-hidden="true"
              >
                {stat.icon}
              </div>

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
                <span className="voter-dashboard-card-label">
                  QUICK ACCESS
                </span>

                <h2>Quick Actions</h2>
              </div>
            </div>

            <div className="voter-dashboard-actions">
              {quickActions.map((action) => (
                <Link
                  to={action.link}
                  className="voter-dashboard-action"
                  key={action.id}
                >
                  <div
                    className={`voter-dashboard-action-icon ${action.className}`}
                    aria-hidden="true"
                  >
                    {action.icon}
                  </div>

                  <div className="voter-dashboard-action-content">
                    <h3>{action.title}</h3>

                    <p>{action.description}</p>
                  </div>

                  <span
                    className="voter-dashboard-action-arrow"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* VOTING SUMMARY */}
          <section className="voter-dashboard-section-card">
            <div className="voter-dashboard-section-header">
              <div>
                <span className="voter-dashboard-card-label">
                  ELECTION ACTIVITY
                </span>

                <h2>Voting Summary</h2>
              </div>

              <span className="voter-dashboard-completed-badge">
                Completed
              </span>
            </div>

            <div className="voter-dashboard-summary">

              <div className="voter-dashboard-summary-row">
                <div className="voter-dashboard-summary-icon">
                  ✓
                </div>

                <div>
                  <span>Registration</span>
                  <strong>Completed</strong>
                </div>
              </div>

              <div className="voter-dashboard-summary-line" />

              <div className="voter-dashboard-summary-row">
                <div className="voter-dashboard-summary-icon">
                  ✓
                </div>

                <div>
                  <span>Identity Verification</span>
                  <strong>Verified</strong>
                </div>
              </div>

              <div className="voter-dashboard-summary-line" />

              <div className="voter-dashboard-summary-row">
                <div className="voter-dashboard-summary-icon">
                  ✓
                </div>

                <div>
                  <span>Vote Submission</span>
                  <strong>
                    {election.hasVoted
                      ? "Successfully Recorded"
                      : "Pending"}
                  </strong>
                </div>
              </div>

              <div className="voter-dashboard-summary-line" />

              <div className="voter-dashboard-summary-row">
                <div className="voter-dashboard-summary-icon">
                  ⛓
                </div>

                <div>
                  <span>Blockchain Record</span>
                  <strong>Available</strong>
                </div>
              </div>
            </div>

            <Link
              to="/voting-status"
              className="voter-dashboard-status-link"
            >
              View Complete Voting Status
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
            <span className="voter-dashboard-card-label">
              SECURITY &amp; PRIVACY
            </span>

            <h2>Your vote is protected</h2>

            <p>
              Your ballot is securely recorded and protected
              through blockchain technology. Your candidate
              selection is not publicly associated with your
              personal identity.
            </p>
          </div>

          <Link
            to="/voting-status"
            className="voter-dashboard-security-button"
          >
            Verify Vote
            <span aria-hidden="true">→</span>
          </Link>
        </section>

        {/* ================= FOOTER ACTIONS ================= */}
        <div className="voter-dashboard-footer-actions">
          <Link
            to="/how-it-works"
            className="voter-dashboard-footer-link"
          >
            How It Works
          </Link>

          <Link
            to="/elections"
            className="voter-dashboard-footer-link"
          >
            Elections
          </Link>

          <Link
            to="/"
            className="voter-dashboard-footer-link"
          >
            Home
          </Link>
        </div>

      </div>
    </main>
  );
};

export default VoterDashboard;