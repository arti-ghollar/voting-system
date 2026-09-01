import React, { useMemo, useState } from "react";
import "./ManageElections.css";

const defaultElections = [
  {
    id: "ELX-001",
    title: "General Election 2026",
    type: "General",
    startDate: "2026-09-10",
    endDate: "2026-09-12",
    status: "Scheduled",
    candidates: 12,
  },
  {
    id: "ELX-002",
    title: "Municipal Election 2026",
    type: "Municipal",
    startDate: "2026-10-05",
    endDate: "2026-10-06",
    status: "Draft",
    candidates: 8,
  },
];

const ManageElections = () => {
  const [elections, setElections] = useState(defaultElections);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    title: "",
    type: "General",
    startDate: "",
    endDate: "",
    status: "Draft",
  });

  const filtered = useMemo(() => {
    return elections.filter((election) => {
      const text = search.toLowerCase();

      const matchesSearch =
        election.title.toLowerCase().includes(text) ||
        election.id.toLowerCase().includes(text);

      const matchesFilter =
        filter === "All" || election.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [elections, search, filter]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newElection = {
      id: `ELX-${String(elections.length + 1).padStart(3, "0")}`,
      ...form,
      candidates: 0,
    };

    setElections((previous) => [...previous, newElection]);

    setForm({
      title: "",
      type: "General",
      startDate: "",
      endDate: "",
      status: "Draft",
    });

    setShowModal(false);
  };

  const updateStatus = (id, status) => {
    setElections((previous) =>
      previous.map((election) =>
        election.id === id ? { ...election, status } : election
      )
    );
  };

  const deleteElection = (id) => {
    if (!window.confirm("Delete this election?")) return;

    setElections((previous) =>
      previous.filter((election) => election.id !== id)
    );
  };

  return (
    <section className="manage-elections">
      <div className="me-header">
        <div>
          <span className="me-eyebrow">ELECTION ADMINISTRATION</span>
          <h1>Manage Elections</h1>
          <p>Create and manage election campaigns and schedules.</p>
        </div>

        <button className="me-primary-btn" onClick={() => setShowModal(true)}>
          + Create Election
        </button>
      </div>

      <div className="me-stats">
        <div>
          <span>Total Elections</span>
          <strong>{elections.length}</strong>
        </div>

        <div>
          <span>Scheduled</span>
          <strong>
            {elections.filter((e) => e.status === "Scheduled").length}
          </strong>
        </div>

        <div>
          <span>Drafts</span>
          <strong>
            {elections.filter((e) => e.status === "Draft").length}
          </strong>
        </div>

        <div>
          <span>Completed</span>
          <strong>
            {elections.filter((e) => e.status === "Completed").length}
          </strong>
        </div>
      </div>

      <div className="me-panel">
        <div className="me-toolbar">
          <div className="me-search">
            <span>⌕</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search elections..."
            />
          </div>

          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Draft">Draft</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="me-table-wrapper">
          <table className="me-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Election</th>
                <th>Type</th>
                <th>Schedule</th>
                <th>Candidates</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((election) => (
                <tr key={election.id}>
                  <td className="me-id">{election.id}</td>

                  <td>
                    <strong className="me-title">{election.title}</strong>
                  </td>

                  <td>{election.type}</td>

                  <td>
                    <div className="me-date">
                      <span>{election.startDate}</span>
                      <small>to</small>
                      <span>{election.endDate}</span>
                    </div>
                  </td>

                  <td>{election.candidates}</td>

                  <td>
                    <span
                      className={`me-status ${election.status.toLowerCase()}`}
                    >
                      {election.status}
                    </span>
                  </td>

                  <td>
                    <div className="me-actions">
                      {election.status === "Draft" && (
                        <button
                          onClick={() =>
                            updateStatus(election.id, "Scheduled")
                          }
                        >
                          Schedule
                        </button>
                      )}

                      {election.status === "Scheduled" && (
                        <button
                          onClick={() => updateStatus(election.id, "Active")}
                        >
                          Activate
                        </button>
                      )}

                      <button
                        className="danger"
                        onClick={() => deleteElection(election.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan="7">
                    <div className="me-empty">No elections found.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="me-overlay">
          <div className="me-modal">
            <div className="me-modal-header">
              <div>
                <h2>Create Election</h2>
                <p>Configure a new election.</p>
              </div>

              <button onClick={() => setShowModal(false)}>×</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="me-form">
                <label>
                  Election Name
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter election name"
                    required
                  />
                </label>

                <label>
                  Election Type
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                  >
                    <option>General</option>
                    <option>Municipal</option>
                    <option>State</option>
                    <option>Student</option>
                    <option>Organizational</option>
                  </select>
                </label>

                <label>
                  Start Date
                  <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  End Date
                  <input
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Initial Status
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option>Draft</option>
                    <option>Scheduled</option>
                  </select>
                </label>
              </div>

              <div className="me-modal-footer">
                <button
                  type="button"
                  className="me-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="me-primary-btn">
                  Create Election
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ManageElections;