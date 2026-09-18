import React, { useMemo, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
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
  const { t } = useLanguage();

  // Re-declare defaultElections to use translation context
  const defaultElections = [
    {
      id: "ELX-001",
      title: t('ge2026Title'),
      type: t('generalType'),
      startDate: "2026-09-10",
      endDate: "2026-09-12",
      status: "Scheduled",
      candidates: 12,
    },
    {
      id: "ELX-002",
      title: t('municipalElectionTitle'),
      type: t('municipalType'),
      startDate: "2026-10-05",
      endDate: "2026-10-06",
      status: "Draft",
      candidates: 8,
    },
  ];

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
    if (!window.confirm(t('deleteElectionConfirm'))) return;

    setElections((previous) =>
      previous.filter((election) => election.id !== id)
    );
  };

  return (
    <section className="manage-elections">
      <div className="me-header">
        <div>
          <span className="me-eyebrow">{t('electionAdminEyebrow')}</span>
          <h1>{t('manageElectionsPageTitle')}</h1>
          <p>{t('manageElectionsPageDesc')}</p>
        </div>

        <button className="me-primary-btn" onClick={() => setShowModal(true)}>
          {t('createElectionBtn')}
        </button>
      </div>

      <div className="me-stats">
        <div>
          <span>{t('totalElectionsLabel')}</span>
          <strong>{elections.length}</strong>
        </div>

        <div>
          <span>{t('scheduledLabel')}</span>
          <strong>
            {elections.filter((e) => e.status === "Scheduled").length}
          </strong>
        </div>

        <div>
          <span>{t('draftsLabel')}</span>
          <strong>
            {elections.filter((e) => e.status === "Draft").length}
          </strong>
        </div>

        <div>
          <span>{t('completedLabel')}</span>
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
              placeholder={t('searchElectionsPlaceholder')}
            />
          </div>

          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            <option value="All">{t('statusAll')}</option>
            <option value="Draft">{t('statusDraft')}</option>
            <option value="Scheduled">{t('statusScheduled')}</option>
            <option value="Active">{t('statusActive')}</option>
            <option value="Completed">{t('statusCompleted')}</option>
          </select>
        </div>

        <div className="me-table-wrapper">
          <table className="me-table">
            <thead>
              <tr>
                <th>{t('idTh')}</th>
                <th>{t('electionTh')}</th>
                <th>{t('typeTh')}</th>
                <th>{t('scheduleTh')}</th>
                <th>{t('candidatesTh')}</th>
                <th>{t('statusTh')}</th>
                <th>{t('actionsTh')}</th>
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
                      <small>{t('toLabel')}</small>
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
                          {t('scheduleBtn')}
                        </button>
                      )}

                      {election.status === "Scheduled" && (
                        <button
                          onClick={() => updateStatus(election.id, "Active")}
                        >
                          {t('activateBtn')}
                        </button>
                      )}

                      <button
                        className="danger"
                        onClick={() => deleteElection(election.id)}
                      >
                        {t('deleteBtn')}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan="7">
                    <div className="me-empty">{t('noElectionsFound')}</div>
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
                <h2>{t('createElectionModalTitle')}</h2>
                <p>{t('createElectionModalDesc')}</p>
              </div>

              <button onClick={() => setShowModal(false)}>×</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="me-form">
                <label>
                  {t('electionNameLabel')}
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder={t('enterElectionNamePlaceholder')}
                    required
                  />
                </label>

                <label>
                  {t('electionTypeLabel')}
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                  >
                    <option value="General">{t('generalType')}</option>
                    <option value="Municipal">{t('municipalType')}</option>
                    <option value="State">{t('stateType')}</option>
                    <option value="Student">{t('studentType')}</option>
                    <option value="Organizational">{t('organizationalType')}</option>
                  </select>
                </label>

                <label>
                  {t('startDateLabel')}
                  <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  {t('endDateLabel')}
                  <input
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  {t('initialStatusLabel')}
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="Draft">{t('statusDraft')}</option>
                    <option value="Scheduled">{t('statusScheduled')}</option>
                  </select>
                </label>
              </div>

              <div className="me-modal-footer">
                <button
                  type="button"
                  className="me-cancel"
                  onClick={() => setShowModal(false)}
                >
                  {t('cancelBtn')}
                </button>

                <button type="submit" className="me-primary-btn">
                  {t('createElectionModalTitle')}
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