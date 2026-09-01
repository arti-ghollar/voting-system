import React, { useMemo, useState } from "react";
import "./ManageCandidates.css";

const initialCandidates = [
  {
    id: "CAN-001",
    name: "Aarav Sharma",
    party: "Progressive Alliance",
    election: "General Election 2026",
    symbol: "★",
    status: "Active",
  },
  {
    id: "CAN-002",
    name: "Priya Patil",
    party: "People First",
    election: "General Election 2026",
    symbol: "◆",
    status: "Active",
  },
  {
    id: "CAN-003",
    name: "Rahul Deshmukh",
    party: "National Development Party",
    election: "General Election 2026",
    symbol: "●",
    status: "Inactive",
  },
];

const ManageCandidates = () => {
  const [candidates, setCandidates] = useState(initialCandidates);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState(null);

  const [form, setForm] = useState({
    name: "",
    party: "",
    election: "",
    symbol: "",
    status: "Active",
  });

  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        candidate.name.toLowerCase().includes(searchText) ||
        candidate.party.toLowerCase().includes(searchText) ||
        candidate.id.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" || candidate.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [candidates, search, statusFilter]);

  const openAddModal = () => {
    setEditingCandidate(null);
    setForm({
      name: "",
      party: "",
      election: "",
      symbol: "",
      status: "Active",
    });
    setShowModal(true);
  };

  const openEditModal = (candidate) => {
    setEditingCandidate(candidate);
    setForm({
      name: candidate.name,
      party: candidate.party,
      election: candidate.election,
      symbol: candidate.symbol,
      status: candidate.status,
    });
    setShowModal(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.party.trim() ||
      !form.election.trim()
    ) {
      return;
    }

    if (editingCandidate) {
      setCandidates((previous) =>
        previous.map((candidate) =>
          candidate.id === editingCandidate.id
            ? { ...candidate, ...form }
            : candidate
        )
      );
    } else {
      const newCandidate = {
        id: `CAN-${String(candidates.length + 1).padStart(3, "0")}`,
        ...form,
      };

      setCandidates((previous) => [...previous, newCandidate]);
    }

    setShowModal(false);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this candidate?"
    );

    if (!confirmed) return;

    setCandidates((previous) =>
      previous.filter((candidate) => candidate.id !== id)
    );
  };

  return (
    <section className="manage-candidates">
      <div className="mc-header">
        <div>
          <span className="mc-eyebrow">ADMINISTRATION</span>
          <h1>Manage Candidates</h1>
          <p>
            Add, update and manage candidates participating in elections.
          </p>
        </div>

        <button className="mc-primary-btn" onClick={openAddModal}>
          <span>+</span>
          Add Candidate
        </button>
      </div>

      <div className="mc-stats">
        <div className="mc-stat-card">
          <span>Total Candidates</span>
          <strong>{candidates.length}</strong>
        </div>

        <div className="mc-stat-card">
          <span>Active</span>
          <strong>
            {candidates.filter((item) => item.status === "Active").length}
          </strong>
        </div>

        <div className="mc-stat-card">
          <span>Inactive</span>
          <strong>
            {candidates.filter((item) => item.status === "Inactive").length}
          </strong>
        </div>
      </div>

      <div className="mc-panel">
        <div className="mc-toolbar">
          <div className="mc-search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search candidates..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="mc-table-wrapper">
          <table className="mc-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Candidate</th>
                <th>Party</th>
                <th>Election</th>
                <th>Symbol</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map((candidate) => (
                  <tr key={candidate.id}>
                    <td className="mc-id">{candidate.id}</td>

                    <td>
                      <div className="mc-candidate-name">
                        <div className="mc-avatar">
                          {candidate.name.charAt(0).toUpperCase()}
                        </div>
                        <strong>{candidate.name}</strong>
                      </div>
                    </td>

                    <td>{candidate.party}</td>
                    <td>{candidate.election}</td>

                    <td>
                      <span className="mc-symbol">
                        {candidate.symbol || "—"}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`mc-status ${candidate.status.toLowerCase()}`}
                      >
                        {candidate.status}
                      </span>
                    </td>

                    <td>
                      <div className="mc-actions">
                        <button
                          className="mc-edit-btn"
                          onClick={() => openEditModal(candidate)}
                        >
                          Edit
                        </button>

                        <button
                          className="mc-delete-btn"
                          onClick={() => handleDelete(candidate.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">
                    <div className="mc-empty">
                      <strong>No candidates found</strong>
                      <span>Try changing your search or filter.</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="mc-modal-overlay">
          <div className="mc-modal">
            <div className="mc-modal-header">
              <div>
                <h2>
                  {editingCandidate ? "Edit Candidate" : "Add Candidate"}
                </h2>
                <p>
                  {editingCandidate
                    ? "Update candidate information."
                    : "Enter candidate information below."}
                </p>
              </div>

              <button
                className="mc-close"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mc-form-grid">
                <label>
                  Candidate Name
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter candidate name"
                    required
                  />
                </label>

                <label>
                  Political Party
                  <input
                    name="party"
                    value={form.party}
                    onChange={handleChange}
                    placeholder="Enter party"
                    required
                  />
                </label>

                <label>
                  Election
                  <input
                    name="election"
                    value={form.election}
                    onChange={handleChange}
                    placeholder="Enter election"
                    required
                  />
                </label>

                <label>
                  Election Symbol
                  <input
                    name="symbol"
                    value={form.symbol}
                    onChange={handleChange}
                    placeholder="e.g. ★"
                    maxLength="3"
                  />
                </label>

                <label>
                  Status
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </label>
              </div>

              <div className="mc-modal-footer">
                <button
                  type="button"
                  className="mc-cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="mc-primary-btn">
                  {editingCandidate ? "Update Candidate" : "Add Candidate"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ManageCandidates;