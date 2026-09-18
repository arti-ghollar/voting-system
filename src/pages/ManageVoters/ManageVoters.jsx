import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "./ManageVoters.css";

const INITIAL_VOTERS = [
  {
    id: "VTR-1001",
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91 98765 43210",
    registeredOn: "12 Aug 2026",
    status: "active",
    verification: "verified",
    voted: true,
  },
  {
    id: "VTR-1002",
    name: "Priya Patil",
    email: "priya.patil@example.com",
    phone: "+91 97654 32109",
    registeredOn: "14 Aug 2026",
    status: "active",
    verification: "verified",
    voted: false,
  },
  {
    id: "VTR-1003",
    name: "Rahul Deshmukh",
    email: "rahul.deshmukh@example.com",
    phone: "+91 96543 21098",
    registeredOn: "16 Aug 2026",
    status: "inactive",
    verification: "verified",
    voted: false,
  },
  {
    id: "VTR-1004",
    name: "Sneha Kulkarni",
    email: "sneha.kulkarni@example.com",
    phone: "+91 95432 10987",
    registeredOn: "18 Aug 2026",
    status: "active",
    verification: "pending",
    voted: false,
  },
  {
    id: "VTR-1005",
    name: "Vikram Joshi",
    email: "vikram.joshi@example.com",
    phone: "+91 94321 09876",
    registeredOn: "20 Aug 2026",
    status: "active",
    verification: "verified",
    voted: true,
  },
  {
    id: "VTR-1006",
    name: "Ananya More",
    email: "ananya.more@example.com",
    phone: "+91 93210 98765",
    registeredOn: "22 Aug 2026",
    status: "active",
    verification: "pending",
    voted: false,
  },
];

const ManageVoters = () => {
  const { t } = useLanguage();
  const [voters, setVoters] = useState(INITIAL_VOTERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [verificationFilter, setVerificationFilter] = useState("all");

  const filteredVoters = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return voters.filter((voter) => {
      const matchesSearch =
        search.length === 0 ||
        voter.name.toLowerCase().includes(search) ||
        voter.email.toLowerCase().includes(search) ||
        voter.id.toLowerCase().includes(search) ||
        voter.phone.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "all" ||
        voter.status === statusFilter;

      const matchesVerification =
        verificationFilter === "all" ||
        voter.verification === verificationFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesVerification
      );
    });
  }, [
    voters,
    searchTerm,
    statusFilter,
    verificationFilter,
  ]);

  const statistics = useMemo(() => {
    const total = voters.length;

    const active = voters.filter(
      (voter) => voter.status === "active"
    ).length;

    const verified = voters.filter(
      (voter) => voter.verification === "verified"
    ).length;

    const voted = voters.filter(
      (voter) => voter.voted
    ).length;

    return {
      total,
      active,
      verified,
      voted,
    };
  }, [voters]);

  const toggleVoterStatus = (voterId) => {
    setVoters((currentVoters) =>
      currentVoters.map((voter) =>
        voter.id === voterId
          ? {
              ...voter,
              status:
                voter.status === "active"
                  ? "inactive"
                  : "active",
            }
          : voter
      )
    );
  };

  const updateVerification = (voterId, verification) => {
    setVoters((currentVoters) =>
      currentVoters.map((voter) =>
        voter.id === voterId
          ? {
              ...voter,
              verification,
            }
          : voter
      )
    );
  };

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setVerificationFilter("all");
  };

  return (
    <main className="manage-voters-page">
      <div className="manage-voters-container">

        {/* ================= HEADER ================= */}
        <header className="manage-voters-header">
          <div>
            <span className="manage-voters-eyebrow">
              {t('administrationEyebrow')}
            </span>

            <h1>{t('manageVotersPageTitle')}</h1>

            <p>
              {t('manageVotersPageDesc')}
            </p>
          </div>

          <Link
            to="/admin-dashboard"
            className="manage-voters-back-button"
          >
            <span aria-hidden="true">←</span>
            {t('backToDashboardBtn')}
          </Link>
        </header>

        {/* ================= STATISTICS ================= */}
        <section
          className="manage-voters-stats"
          aria-label="Voter statistics"
        >
          <div className="manage-voters-stat-card">
            <div className="manage-voters-stat-icon total">
              #
            </div>

            <div>
              <span>{t('totalVotersStatsLabel')}</span>
              <strong>{statistics.total}</strong>
              <small>{t('registeredVotersStatsDesc')}</small>
            </div>
          </div>

          <div className="manage-voters-stat-card">
            <div className="manage-voters-stat-icon active">
              ✓
            </div>

            <div>
              <span>{t('activeVotersStatsLabel')}</span>
              <strong>{statistics.active}</strong>
              <small>{t('currentlyActiveStatsDesc')}</small>
            </div>
          </div>

          <div className="manage-voters-stat-card">
            <div className="manage-voters-stat-icon verified">
              ✓
            </div>

            <div>
              <span>{t('verifiedStatsLabel')}</span>
              <strong>{statistics.verified}</strong>
              <small>{t('identityVerifiedStatsDesc')}</small>
            </div>
          </div>

          <div className="manage-voters-stat-card">
            <div className="manage-voters-stat-icon voted">
              ✓
            </div>

            <div>
              <span>{t('votesCastStatsLabel')}</span>
              <strong>{statistics.voted}</strong>
              <small>{t('participationRecordedStatsDesc')}</small>
            </div>
          </div>
        </section>

        {/* ================= TOOLBAR ================= */}
        <section className="manage-voters-toolbar">
          <div className="manage-voters-search">
            <span
              className="manage-voters-search-icon"
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
              placeholder={t('searchVotersPlaceholder')}
              aria-label="Search voters"
            />
          </div>

          <div className="manage-voters-filters">
            <label>
              <span>{t('statusFilterLabel')}</span>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                aria-label="Filter by voter status"
              >
                <option value="all">{t('allStatusOption')}</option>
                <option value="active">{t('activeOption')}</option>
                <option value="inactive">{t('inactiveOption')}</option>
              </select>
            </label>

            <label>
              <span>{t('verificationFilterLabel')}</span>

              <select
                value={verificationFilter}
                onChange={(event) =>
                  setVerificationFilter(event.target.value)
                }
                aria-label="Filter by verification status"
              >
                <option value="all">{t('allVerificationOption')}</option>
                <option value="verified">{t('verifiedOption')}</option>
                <option value="pending">{t('pendingOption')}</option>
              </select>
            </label>

            <button
              type="button"
              className="manage-voters-reset-button"
              onClick={resetFilters}
            >
              {t('resetFiltersBtn')}
            </button>
          </div>
        </section>

        {/* ================= TABLE HEADER ================= */}
        <section className="manage-voters-list">
          <div className="manage-voters-list-header">
            <div>
              <span className="manage-voters-label">
                {t('registeredVotersLabel')}
              </span>

              <h2>{t('voterDirectoryTitle')}</h2>
            </div>

            <span className="manage-voters-count">
              {t('showingLabel')} {filteredVoters.length} {t('ofLabel')} {voters.length}
            </span>
          </div>

          {/* ================= TABLE ================= */}
          {filteredVoters.length > 0 ? (
            <div className="manage-voters-table-wrapper">
              <table className="manage-voters-table">
                <thead>
                  <tr>
                    <th>{t('voterTh')}</th>
                    <th>{t('voterIdTh')}</th>
                    <th>{t('registeredTh')}</th>
                    <th>{t('verificationTh')}</th>
                    <th>{t('votingStatusTh')}</th>
                    <th>{t('accountTh')}</th>
                    <th>{t('actionTh')}</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredVoters.map((voter) => (
                    <tr key={voter.id}>

                      {/* Voter */}
                      <td>
                        <div className="manage-voter-profile">
                          <div className="manage-voter-avatar">
                            {voter.name.charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <strong>{voter.name}</strong>
                            <span>{voter.email}</span>
                            <small>{voter.phone}</small>
                          </div>
                        </div>
                      </td>

                      {/* ID */}
                      <td>
                        <code className="manage-voter-id">
                          {voter.id}
                        </code>
                      </td>

                      {/* Date */}
                      <td>
                        <span className="manage-voter-date">
                          {voter.registeredOn}
                        </span>
                      </td>

                      {/* Verification */}
                      <td>
                        {voter.verification === "verified" ? (
                          <span className="manage-voter-badge verified">
                            <span aria-hidden="true">✓</span>
                            {t('verifiedBadge')}
                          </span>
                        ) : (
                          <button
                            type="button"
                            className="manage-voter-badge pending"
                            onClick={() =>
                              updateVerification(
                                voter.id,
                                "verified"
                              )
                            }
                          >
                            <span aria-hidden="true">!</span>
                            {t('pendingBadge')}
                          </button>
                        )}
                      </td>

                      {/* Voting */}
                      <td>
                        {voter.voted ? (
                          <span className="manage-voter-badge voted">
                            {t('voteCastBadge')}
                          </span>
                        ) : (
                          <span className="manage-voter-badge not-voted">
                            {t('notVotedBadge')}
                          </span>
                        )}
                      </td>

                      {/* Account */}
                      <td>
                        <span
                          className={`manage-voter-account-status ${
                            voter.status === "active"
                              ? "active"
                              : "inactive"
                          }`}
                        >
                          <span
                            className="manage-voter-account-dot"
                            aria-hidden="true"
                          />
                          {voter.status === "active"
                            ? t('activeAccountBadge')
                            : t('inactiveAccountBadge')}
                        </span>
                      </td>

                      {/* Action */}
                      <td>
                        <button
                          type="button"
                          className={`manage-voter-action ${
                            voter.status === "active"
                              ? "deactivate"
                              : "activate"
                          }`}
                          onClick={() =>
                            toggleVoterStatus(voter.id)
                          }
                        >
                          {voter.status === "active"
                            ? t('deactivateBtn')
                            : t('activateBtn')}
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="manage-voters-empty">
              <div
                className="manage-voters-empty-icon"
                aria-hidden="true"
              >
                ⌕
              </div>

              <h3>{t('noVotersFoundTitle')}</h3>

              <p>
                {t('noVotersFoundDesc')}
              </p>

              <button
                type="button"
                className="manage-voters-empty-button"
                onClick={resetFilters}
              >
                {t('clearFiltersBtn')}
              </button>
            </div>
          )}
        </section>

        {/* ================= ADMIN NOTICE ================= */}
        <aside className="manage-voters-notice">
          <div
            className="manage-voters-notice-icon"
            aria-hidden="true"
          >
            i
          </div>

          <div>
            <h3>{t('administratorAccessTitle')}</h3>

            <p>
              {t('administratorAccessDesc')}
            </p>
          </div>
        </aside>

      </div>
    </main>
  );
};

export default ManageVoters;