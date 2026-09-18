import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "./Elections.css";

const Elections = () => {
  const { t } = useLanguage();

  const ELECTIONS = [
    {
      id: "GE-2026",
      title: t('ge2026Title'),
      type: t('ge2026Type'),
      status: "active",
      startDate: "15 August 2026",
      endDate: "31 August 2026",
      candidates: 4,
      description: t('ge2026Desc'),
    },
    {
      id: "LA-2026",
      title: t('la2026Title'),
      type: t('la2026Type'),
      status: "upcoming",
      startDate: "10 September 2026",
      endDate: "20 September 2026",
      candidates: 8,
      description: t('la2026Desc'),
    },
    {
      id: "SE-2026",
      title: t('se2026Title'),
      type: t('se2026Type'),
      status: "completed",
      startDate: "10 July 2026",
      endDate: "20 July 2026",
      candidates: 6,
      description: t('se2026Desc'),
    },
  ];

  const STATUS_LABELS = {
    all: t('allElectionsTitle'),
    active: t('votingActiveLabel'),
    upcoming: t('upcomingLabel'),
    completed: t('completedLabel'),
  };

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
        return t('votingActiveLabel');
      case "upcoming":
        return t('upcomingLabel');
      case "completed":
        return t('completedLabel');
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
            <span className="elections-eyebrow">{t('voterPortalEyebrow')}</span>

            <h1>{t('allElectionsTitle')}</h1>

            <p>
              {t('allElectionsDesc')}
            </p>
          </div>

          <Link
            to="/voter-dashboard"
            className="elections-back-button"
          >
            <span aria-hidden="true">←</span>
            {t('backToDashboard')}
          </Link>
        </header>

        {/* ================= SUMMARY ================= */}
        <section className="elections-summary">
          <div className="elections-summary-card">
            <div className="elections-summary-icon active">
              ✓
            </div>

            <div>
              <span>{t('activeElections')}</span>
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
              <span>{t('upcomingElections')}</span>
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
              <span>{t('completedElections')}</span>
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
              <span>{t('totalElections')}</span>
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
              placeholder={t('searchElectionsPlaceholder')}
              aria-label="Search elections"
            />
          </div>
        </section>

        {/* ================= ELECTIONS ================= */}
        <section className="elections-list-section">
          <div className="elections-list-heading">
            <div>
              <span className="elections-card-label">
                {t('electionDirectoryLabel')}
              </span>

              <h2>
                {activeFilter === "all"
                  ? t('availableElections')
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
                      <span>{t('votingPeriod')}</span>

                      <strong>
                        {election.startDate}
                      </strong>

                      <small>
                        {t('to')} {election.endDate}
                      </small>
                    </div>

                    <div className="election-detail">
                      <span>{t('candidatesLabel')}</span>

                      <strong>
                        {election.candidates}
                      </strong>

                      <small>{t('availableLabel')}</small>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="election-card-footer">
                    {election.status === "active" && (
                      <Link
                        to="/cast-vote"
                        className="election-primary-button"
                      >
                        {t('castYourVoteBtn')}
                        <span aria-hidden="true">→</span>
                      </Link>
                    )}

                    {election.status === "upcoming" && (
                      <button
                        type="button"
                        className="election-disabled-button"
                        disabled
                      >
                        {t('votingNotStartedBtn')}
                      </button>
                    )}

                    {election.status === "completed" && (
                      <Link
                        to="/results"
                        className="election-secondary-button"
                      >
                        {t('viewResultsBtn')}
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

              <h3>{t('noElectionsFound')}</h3>

              <p>
                {t('noElectionsDesc')}
              </p>

              <button
                type="button"
                className="elections-reset-button"
                onClick={() => {
                  setSearchTerm("");
                  setActiveFilter("all");
                }}
              >
                {t('resetFiltersBtn')}
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
            <h3>{t('securePrivateVoting')}</h3>

            <p>
              {t('securePrivateDesc')}
            </p>
          </div>
        </aside>

      </div>
    </main>
  );
};

export default Elections;