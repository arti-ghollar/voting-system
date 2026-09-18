import React, { useMemo, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./BlockchainRecords.css";

const records = [
  {
    id: 1,
    block: "#184521",
    transaction: "0x8f2a7c91...9bc1",
    type: "Vote Cast",
    network: "Ethereum",
    timestamp: "31 Aug 2026, 10:42 AM",
    status: "Confirmed",
  },
  {
    id: 2,
    block: "#184520",
    transaction: "0x4c7d2e18...21ef",
    type: "Vote Cast",
    network: "Ethereum",
    timestamp: "31 Aug 2026, 10:39 AM",
    status: "Confirmed",
  },
  {
    id: 3,
    block: "#184519",
    transaction: "0x9ab14d72...77cd",
    type: "Vote Cast",
    network: "Ethereum",
    timestamp: "31 Aug 2026, 10:31 AM",
    status: "Pending",
  },
];

const BlockchainRecords = () => {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const text = search.toLowerCase();

      const matchesSearch =
        record.block.toLowerCase().includes(text) ||
        record.transaction.toLowerCase().includes(text) ||
        record.type.toLowerCase().includes(text);

      const matchesFilter =
        filter === "All" || record.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <section className="blockchain-records">
      <div className="br-header">
        <div>
          <span className="br-eyebrow">{t('blockchainLedgerEyebrow')}</span>
          <h1>{t('blockchainRecordsPageTitle')}</h1>
          <p>{t('blockchainRecordsPageDesc')}</p>
        </div>

        <div className="br-actions-right">
          <div className="br-network" style={{ marginBottom: "12px", justifyContent: "flex-end" }}>
            <span></span>
            {t('ethereumNetworkLabel')}
          </div>
          <button
            className="br-verify-btn"
            onClick={() => {
              setIsVerifying(true);
              setVerifySuccess(false);
              setTimeout(() => {
                setIsVerifying(false);
                setVerifySuccess(true);
              }, 1500);
            }}
            disabled={isVerifying}
            style={{
              padding: "8px 16px",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
              cursor: isVerifying ? "not-allowed" : "pointer",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s"
            }}
          >
            {isVerifying ? t('verifyingBtnText') : t('verifyBlockchainIntegrityBtn')}
          </button>
          {verifySuccess && (
            <div style={{ color: "var(--color-success)", fontSize: "0.85rem", marginTop: "8px", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px", justifyContent: "flex-end" }}>
              {t('blockchainIntegrityVerified')}
            </div>
          )}
        </div>
      </div>

      <div className="br-info-grid">
        <div>
          <span>{t('latestBlockLabel')}</span>
          <strong>#184521</strong>
        </div>

        <div>
          <span>{t('totalTransactionsLabel')}</span>
          <strong>18,452</strong>
        </div>

        <div>
          <span>{t('networkStatusLabel')}</span>
          <strong className="online">{t('onlineStatus')}</strong>
        </div>
      </div>

      <div className="br-panel">
        <div className="br-toolbar">
          <div className="br-search">
            <span>⌕</span>
            <input
              placeholder={t('searchBlockTransactionPlaceholder')}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            <option value="All">{t('allRecordsOption')}</option>
            <option value="Confirmed">{t('confirmedOption')}</option>
            <option value="Pending">{t('pendingOption')}</option>
          </select>
        </div>

        <div className="br-table-wrapper">
          <table className="br-table">
            <thead>
              <tr>
                <th>{t('blockTh')}</th>
                <th>{t('transactionHashTh')}</th>
                <th>{t('typeTh')}</th>
                <th>{t('networkTh')}</th>
                <th>{t('timestampTh')}</th>
                <th>{t('statusTh')}</th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id}>
                  <td>
                    <strong>{record.block}</strong>
                  </td>

                  <td>
                    <code>{record.transaction}</code>
                  </td>

                  <td>{record.type}</td>
                  <td>{record.network}</td>
                  <td>{record.timestamp}</td>

                  <td>
                    <span
                      className={`br-status ${record.status.toLowerCase()}`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredRecords.length === 0 && (
                <tr>
                  <td colSpan="6">
                    <div className="br-empty">{t('noRecordsFound')}</div>
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

export default BlockchainRecords;