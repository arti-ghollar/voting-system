import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
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
              ADMINISTRATION
            </span>

            <h1>Manage Voters</h1>

            <p>
              View, verify and manage registered voters from
              the administration dashboard.
            </p>
          </div>

          <Link
            to="/admin-dashboard"
            className="manage-voters-back-button"
          >
            <span aria-hidden="true">←</span>
            Back to Dashboard
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
              <span>Total Voters</span>
              <strong>{statistics.total}</strong>
              <small>Registered voters</small>
            </div>
          </div>

          <div className="manage-voters-stat-card">
            <div className="manage-voters-stat-icon active">
              ✓
            </div>

            <div>
              <span>Active Voters</span>
              <strong>{statistics.active}</strong>
              <small>Currently active</small>
            </div>
          </div>

          <div className="manage-voters-stat-card">
            <div className="manage-voters-stat-icon verified">
              ✓
            </div>

            <div>
              <span>Verified</span>
              <strong>{statistics.verified}</strong>
              <small>Identity verified</small>
            </div>
          </div>

          <div className="manage-voters-stat-card">
            <div className="manage-voters-stat-icon voted">
              ✓
            </div>

            <div>
              <span>Votes Cast</span>
              <strong>{statistics.voted}</strong>
              <small>Participation recorded</small>
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
              placeholder="Search by name, email, ID or phone..."
              aria-label="Search voters"
            />
          </div>

          <div className="manage-voters-filters">
            <label>
              <span>Status</span>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                aria-label="Filter by voter status"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>

            <label>
              <span>Verification</span>

              <select
                value={verificationFilter}
                onChange={(event) =>
                  setVerificationFilter(event.target.value)
                }
                aria-label="Filter by verification status"
              >
                <option value="all">All Verification</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
              </select>
            </label>

            <button
              type="button"
              className="manage-voters-reset-button"
              onClick={resetFilters}
            >
              Reset
            </button>
          </div>
        </section>

        {/* ================= TABLE HEADER ================= */}
        <section className="manage-voters-list">
          <div className="manage-voters-list-header">
            <div>
              <span className="manage-voters-label">
                REGISTERED VOTERS
              </span>

              <h2>Voter Directory</h2>
            </div>

            <span className="manage-voters-count">
              Showing {filteredVoters.length} of {voters.length}
            </span>
          </div>

          {/* ================= TABLE ================= */}
          {filteredVoters.length > 0 ? (
            <div className="manage-voters-table-wrapper">
              <table className="manage-voters-table">
                <thead>
                  <tr>
                    <th>Voter</th>
                    <th>Voter ID</th>
                    <th>Registered</th>
                    <th>Verification</th>
                    <th>Voting Status</th>
                    <th>Account</th>
                    <th>Action</th>
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
                            Verified
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
                            Pending
                          </button>
                        )}
                      </td>

                      {/* Voting */}
                      <td>
                        {voter.voted ? (
                          <span className="manage-voter-badge voted">
                            Vote Cast
                          </span>
                        ) : (
                          <span className="manage-voter-badge not-voted">
                            Not Voted
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
                            ? "Active"
                            : "Inactive"}
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
                            ? "Deactivate"
                            : "Activate"}
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

              <h3>No voters found</h3>

              <p>
                No registered voters match your current search
                or filter settings.
              </p>

              <button
                type="button"
                className="manage-voters-empty-button"
                onClick={resetFilters}
              >
                Clear Filters
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
            <h3>Administrator Access</h3>

            <p>
              Voter management actions should be protected by
              role-based authorization on the backend. The
              controls in this interface currently update the
              local application state.
            </p>
          </div>
        </aside>

      </div>
    </main>
  );
};

export default ManageVoters;