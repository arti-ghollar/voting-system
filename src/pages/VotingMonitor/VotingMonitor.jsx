import React, { useMemo, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./VotingMonitor.css";

const initialVotes = [
  {
    id: "TX-10001",
    voter: "VTR-1045",
    election: "General Election 2026",
    candidate: "Aarav Sharma",
    time: "10:42 AM",
    status: "Confirmed",
    hash: "0x8f2a...9bc1",
  },
  {
    id: "TX-10002",
    voter: "VTR-1182",
    election: "General Election 2026",
    candidate: "Priya Patil",
    time: "10:47 AM",
    status: "Confirmed",
    hash: "0x4c7d...21ef",
  },
  {
    id: "TX-10003",
    voter: "VTR-1290",
    election: "General Election 2026",
    candidate: "Aarav Sharma",
    time: "11:02 AM",
    status: "Pending",
    hash: "0x9ab1...77cd",
  },
];

const VotingMonitor = () => {
  const { t } = useLanguage();
  const [votes] = useState(initialVotes);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredVotes = useMemo(() => {
    return votes.filter((vote) => {
      const text = search.toLowerCase();

      const matchesSearch =
        vote.id.toLowerCase().includes(text) ||
        vote.voter.toLowerCase().includes(text) ||
        vote.candidate.toLowerCase().includes(text);

      const matchesStatus =
        status === "All" || vote.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [votes, search, status]);

  const confirmed = votes.filter(
    (vote) => vote.status === "Confirmed"
  ).length;

  const pending = votes.filter(
    (vote) => vote.status === "Pending"
  ).length;

  return (
    <section className="voting-monitor">
      <div className="vm-header">
        <div>
          <span className="vm-eyebrow">{t('liveAdminMonitorEyebrow')}</span>
          <h1>{t('votingMonitorPageTitle')}</h1>
          <p>{t('votingMonitorPageDesc')}</p>
        </div>

        <div className="vm-live">
          <span></span>
          {t('liveMonitoringBadge')}
        </div>
      </div>

      <div className="vm-stats">
        <div className="vm-stat">
          <span>{t('totalVotesLabel')}</span>
          <strong>{votes.length}</strong>
        </div>

        <div className="vm-stat success">
          <span>{t('confirmedLabel')}</span>
          <strong>{confirmed}</strong>
        </div>

        <div className="vm-stat warning">
          <span>{t('pendingLabel')}</span>
          <strong>{pending}</strong>
        </div>

        <div className="vm-stat">
          <span>{t('confirmationRateLabel')}</span>
          <strong>
            {votes.length
              ? Math.round((confirmed / votes.length) * 100)
              : 0}
            %
          </strong>
        </div>
      </div>

      <div className="vm-panel">
        <div className="vm-toolbar">
          <div className="vm-search">
            <span>⌕</span>
            <input
              placeholder={t('searchTransactionsPlaceholder')}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="All">{t('allStatusOption')}</option>
            <option value="Confirmed">{t('confirmedOption')}</option>
            <option value="Pending">{t('pendingOption')}</option>
          </select>
        </div>

        <div className="vm-table-wrapper">
          <table className="vm-table">
            <thead>
              <tr>
                <th>{t('transactionTh')}</th>
                <th>{t('voterTh')}</th>
                <th>{t('electionTh')}</th>
                <th>{t('candidateTh')}</th>
                <th>{t('timeTh')}</th>
                <th>{t('blockchainHashTh')}</th>
                <th>{t('statusTh')}</th>
              </tr>
            </thead>

            <tbody>
              {filteredVotes.map((vote) => (
                <tr key={vote.id}>
                  <td>
                    <strong>{vote.id}</strong>
                  </td>

                  <td>{vote.voter}</td>
                  <td>{vote.election}</td>
                  <td>{vote.candidate}</td>
                  <td>{vote.time}</td>

                  <td>
                    <code>{vote.hash}</code>
                  </td>

                  <td>
                    <span
                      className={`vm-status ${vote.status.toLowerCase()}`}
                    >
                      {vote.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredVotes.length === 0 && (
                <tr>
                  <td colSpan="7">
                    <div className="vm-empty">{t('noVotingActivityFound')}</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default VotingMonitor;