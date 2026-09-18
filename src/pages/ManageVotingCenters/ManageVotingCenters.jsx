import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./ManageVotingCenters.css";

const CENTERS = [
  { id: "VC-101", name: "Central District Hall", location: "Downtown", capacity: 500, active: true },
  { id: "VC-102", name: "Northside Community Center", location: "North District", capacity: 300, active: true },
  { id: "VC-103", name: "West End Library", location: "West District", capacity: 200, active: false },
];

const ManageVotingCenters = () => {
  const { t } = useLanguage();
  const [centers, setCenters] = useState(CENTERS);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleStatus = (id) => {
    setCenters(centers.map(center => 
      center.id === id ? { ...center, active: !center.active } : center
    ));
  };

  const filteredCenters = centers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="manage-centers-page">
      <div className="manage-centers-container">
        <header className="manage-centers-header">
          <div>
            <span className="manage-centers-eyebrow">{t('administrationEyebrow')}</span>
            <h1>{t('manageCentersPageTitle')}</h1>
            <p>{t('manageCentersPageDesc')}</p>
          </div>
          <button className="btn btn-primary" onClick={() => alert(t('addCenterAlert'))}>{t('addCenterBtn')}</button>
        </header>

        <section className="manage-centers-panel card">
          <div className="manage-centers-toolbar">
            <input 
              type="text" 
              placeholder={t('searchCentersPlaceholder')} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="manage-centers-search"
            />
          </div>

          <div className="manage-centers-table-wrapper">
            <table className="manage-centers-table">
              <thead>
                <tr>
                  <th>{t('centerIdTh')}</th>
                  <th>{t('centerNameTh')}</th>
                  <th>{t('locationTh')}</th>
                  <th>{t('capacityTh')}</th>
                  <th>{t('statusTh')}</th>
                  <th>{t('actionsTh')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredCenters.map(center => (
                  <tr key={center.id}>
                    <td><strong>{center.id}</strong></td>
                    <td>{center.name}</td>
                    <td>{center.location}</td>
                    <td>{center.capacity}</td>
                    <td>
                      <span className={`center-status ${center.active ? 'active' : 'inactive'}`}>
                        {center.active ? t('operationalStatus') : t('closedStatus')}
                      </span>
                    </td>
                    <td>
                      <button 
                        className={`btn ${center.active ? 'btn-danger' : 'btn-success'}`}
                        onClick={() => toggleStatus(center.id)}
                        style={{ padding: '6px 12px', minHeight: '32px', fontSize: '0.8rem' }}
                      >
                        {center.active ? t('deactivateBtn') : t('activateBtn')}
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredCenters.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center" style={{ padding: "32px" }}>{t('noCentersFound')}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ManageVotingCenters;
