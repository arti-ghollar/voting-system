import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Elections.css";

const ELECTIONS = [
  {
    id: "GE-2026",
    title: "General Election 2026",
    type: "General Election",
    status: "active",
    startDate: "15 August 2026",
    endDate: "31 August 2026",
    candidates: 4,
    description:
      "Participate in the General Election 2026 and cast your vote securely through the voter portal.",
  },
  {
    id: "LA-2026",
    title: "Local Authority Election 2026",
    type: "Local Election",
    status: "upcoming",
    startDate: "10 September 2026",
    endDate: "20 September 2026",
    candidates: 8,
    description:
      "Choose your local representatives and participate in the upcoming local authority election.",
  },
  {
    id: "SE-2026",
    title: "Student Council Election 2026",
    type: "Council Election",
    status: "completed",
    startDate: "10 July 2026",
    endDate: "20 July 2026",
    candidates: 6,
    description:
      "The Student Council Election 2026 has been completed successfully.",
  },
];

const STATUS_LABELS = {
  all: "All Elections",
  active: "Voting Active",
  upcoming: "Upcoming",
  completed: "Completed",
};

const Elections = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredElections = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return ELECTIONS.filter((election) => {
      const matchesStatus =
        activeFilter === "all" || election.status === activeFilter;

      const matchesSearch =
        normalizedSearch.length === 0 ||
        election.title.toLowerCase().includes(normalizedSearch) ||
        election.id.toLowerCase().includes(normalizedSearch) ||
        election.type.toLowerCase().includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }, [activeFilter, searchTerm]);

  const getStatusLabel = (status) => {
    switch (status) {
      case "active":
        return "Voting Active";
      case "upcoming":
        return "Upcoming";
      case "completed":
        return "Completed";
      default:
        return "Unknown";
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "active":
        return "elections-status-active";
      case "upcoming":
        return "elections-status-upcoming";
      case "completed":
        return "elections-status-completed";
      default:
        return "";
    }
  };

  return (
    <main className="elections-page">
      <div className="elections-container">

        {/* ================= HEADER ================= */}
        <header className="elections-header">
          <div className="elections-header-content">
            <span className="elections-eyebrow">VOTER PORTAL</span>

            <h1>All Elections</h1>

            <p>
              Explore current, upcoming, and completed elections.
              Select an active election to participate in secure voting.
            </p>
          </div>

          <Link
            to="/voter-dashboard"
            className="elections-back-button"
          >
            <span aria-hidden="true">←</span>
            Back to Dashboard
          </Link>
        </header>

        {/* ================= SUMMARY ================= */}
        <section className="elections-summary">
          <div className="elections-summary-card">
            <div className="elections-summary-icon active">
              ✓
            </div>

            <div>
              <span>Active Elections</span>
              <strong>
                {ELECTIONS.filter(
                  (election) => election.status === "active"
                ).length}
              </strong>
            </div>
          </div>

          <div className="elections-summary-card">
            <div className="elections-summary-icon upcoming">
              →
            </div>

            <div>
              <span>Upcoming</span>
              <strong>
                {ELECTIONS.filter(
                  (election) => election.status === "upcoming"
                ).length}
              </strong>
            </div>
          </div>

          <div className="elections-summary-card">
            <div className="elections-summary-icon completed">
              #
            </div>

            <div>
              <span>Completed</span>
              <strong>
                {ELECTIONS.filter(
                  (election) => election.status === "completed"
                ).length}
              </strong>
            </div>
          </div>

          <div className="elections-summary-card">
            <div className="elections-summary-icon total">
              E
            </div>

            <div>
              <span>Total Elections</span>
              <strong>{ELECTIONS.length}</strong>
            </div>
          </div>
        </section>

        {/* ================= TOOLBAR ================= */}
        <section className="elections-toolbar">
          <div className="elections-filter-group">
            {Object.entries(STATUS_LABELS).map(([key, label]) => (
              <button
                type="button"
                key={key}
                className={`elections-filter-button ${
                  activeFilter === key ? "active" : ""
                }`}
                onClick={() => setActiveFilter(key)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="elections-search">
            <span
              className="elections-search-icon"
              aria-hidden="true"
            >
              ⌕
            </span>

            <input
              type="search"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search elections..."
              aria-label="Search elections"
            />
          </div>
        </section>

        {/* ================= ELECTIONS ================= */}
        <section className="elections-list-section">
          <div className="elections-list-heading">
            <div>
              <span className="elections-card-label">
                ELECTION DIRECTORY
              </span>

              <h2>
                {activeFilter === "all"
                  ? "Available Elections"
                  : STATUS_LABELS[activeFilter]}
              </h2>
            </div>

            <span className="elections-result-count">
              {filteredElections.length}{" "}
              {filteredElections.length === 1
                ? "Election"
                : "Elections"}
            </span>
          </div>

          {filteredElections.length > 0 ? (
            <div className="elections-grid">
              {filteredElections.map((election) => (
                <article
                  className="election-card"
                  key={election.id}
                >
                  {/* Card top */}
                  <div className="election-card-top">
                    <div className="election-card-icon">
                      E
                    </div>

                    <span
                      className={`election-status ${getStatusClass(
                        election.status
                      )}`}
                    >
                      <span
                        className="election-status-dot"
                        aria-hidden="true"
                      />
                      {getStatusLabel(election.status)}
                    </span>
                  </div>

                  {/* Card content */}
                  <div className="election-card-content">
                    <span className="election-id">
                      {election.id}
                    </span>

                    <h3>{election.title}</h3>

                    <span className="election-type">
                      {election.type}
                    </span>

                    <p>{election.description}</p>
                  </div>

                  {/* Dates */}
                  <div className="election-card-details">
                    <div className="election-detail">
                      <span>Voting Period</span>

                      <strong>
                        {election.startDate}
                      </strong>

                      <small>
                        to {election.endDate}
                      </small>
                    </div>

                    <div className="election-detail">
                      <span>Candidates</span>

                      <strong>
                        {election.candidates}
                      </strong>

                      <small>Available</small>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="election-card-footer">
                    {election.status === "active" && (
                      <Link
                        to="/cast-vote"
                        className="election-primary-button"
                      >
                        Cast Your Vote
                        <span aria-hidden="true">→</span>
                      </Link>
                    )}

                    {election.status === "upcoming" && (
                      <button
                        type="button"
                        className="election-disabled-button"
                        disabled
                      >
                        Voting Not Started
                      </button>
                    )}

                    {election.status === "completed" && (
                      <Link
                        to="/results"
                        className="election-secondary-button"
                      >
                        View Results
                        <span aria-hidden="true">→</span>
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="elections-empty-state">
              <div
                className="elections-empty-icon"
                aria-hidden="true"
              >
                ⌕
              </div>

              <h3>No elections found</h3>

              <p>
                No elections match your current search or filter.
                Try another search term or select a different filter.
              </p>

              <button
                type="button"
                className="elections-reset-button"
                onClick={() => {
                  setSearchTerm("");
                  setActiveFilter("all");
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

        {/* ================= SECURITY NOTICE ================= */}
        <aside className="elections-security-notice">
          <div
            className="elections-security-icon"
            aria-hidden="true"
          >
            🔒
          </div>

          <div>
            <h3>Secure & Private Voting</h3>

            <p>
              Votes are designed to be securely recorded while
              protecting voter privacy. Your candidate selection is
              not publicly associated with your identity.
            </p>
          </div>
        </aside>

      </div>
    </main>
  );
};

export default Elections;