import React, { useMemo, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
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
  const { t } = useLanguage();

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
      t('removeCandidateConfirm')
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
          <span className="mc-eyebrow">{t('managementLabel')}</span>
          <h1>{t('manageCandidatesPageTitle')}</h1>
          <p>
            {t('manageCandidatesPageDesc')}
          </p>
        </div>

        <button className="mc-primary-btn" onClick={openAddModal}>
          <span>+</span>
          {t('addCandidateBtn')}
        </button>
      </div>

      <div className="mc-stats">
        <div className="mc-stat-card">
          <span>{t('totalCandidatesLabel')}</span>
          <strong>{candidates.length}</strong>
        </div>

        <div className="mc-stat-card">
          <span>{t('activeLabel')}</span>
          <strong>
            {candidates.filter((item) => item.status === "Active").length}
          </strong>
        </div>

        <div className="mc-stat-card">
          <span>{t('inactiveLabel')}</span>
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
              placeholder={t('searchCandidatesPlaceholder')}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="All">{t('statusAll')}</option>
            <option value="Active">{t('statusActive')}</option>
            <option value="Inactive">{t('statusInactive')}</option>
          </select>
        </div>

        <div className="mc-table-wrapper">
          <table className="mc-table">
            <thead>
              <tr>
                <th>{t('idTh')}</th>
                <th>{t('candidateTh')}</th>
                <th>{t('partyTh')}</th>
                <th>{t('electionTh')}</th>
                <th>{t('symbolTh')}</th>
                <th>{t('statusTh')}</th>
                <th>{t('actionsTh')}</th>
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
                          {t('editBtn')}
                        </button>

                        <button
                          className="mc-delete-btn"
                          onClick={() => handleDelete(candidate.id)}
                        >
                          {t('deleteBtn')}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">
                    <div className="mc-empty">
                      <strong>{t('noCandidatesFoundTitle')}</strong>
                      <span>{t('noCandidatesFoundDesc')}</span>
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
                  {editingCandidate ? t('editCandidateTitle') : t('addCandidateTitle')}
                </h2>
                <p>
                  {editingCandidate
                    ? t('editCandidateDesc')
                    : t('addCandidateDesc')}
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
                  {t('candidateNameLabel')}
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t('enterCandidateNamePlaceholder')}
                    required
                  />
                </label>

                <label>
                  {t('politicalPartyLabel')}
                  <input
                    name="party"
                    value={form.party}
                    onChange={handleChange}
                    placeholder={t('enterPartyPlaceholder')}
                    required
                  />
                </label>

                <label>
                  {t('electionLabel')}
                  <input
                    name="election"
                    value={form.election}
                    onChange={handleChange}
                    placeholder={t('enterElectionPlaceholder')}
                    required
                  />
                </label>

                <label>
                  {t('electionSymbolLabel')}
                  <input
                    name="symbol"
                    value={form.symbol}
                    onChange={handleChange}
                    placeholder={t('symbolPlaceholder')}
                    maxLength="3"
                  />
                </label>

                <label>
                  {t('statusLabel')}
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="Active">{t('statusActive')}</option>
                    <option value="Inactive">{t('statusInactive')}</option>
                  </select>
                </label>
              </div>

              <div className="mc-modal-footer">
                <button
                  type="button"
                  className="mc-cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  {t('cancelBtn')}
                </button>

                <button type="submit" className="mc-primary-btn">
                  {editingCandidate ? t('updateCandidateBtn') : t('addCandidateBtn')}
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