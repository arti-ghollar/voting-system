import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useVoting } from "../../context/VotingContext";
import { useLanguage } from "../../context/LanguageContext";
import "./HomeVotingOfficer.css";

const HomeVotingOfficer = () => {
  const navigate = useNavigate();
  const { hasVoted } = useVoting();
  const { t } = useLanguage();
  
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    // Load requests from localStorage or use defaults
    const stored = localStorage.getItem("blockvote_home_requests");
    if (stored) {
      setRequests(JSON.parse(stored));
    } else {
      setRequests([
        {
          id: "HVR-10029",
          name: "Suresh Gupta",
          voterId: "VT-90214",
          address: "142 Lotus Apartments, MG Road, Central District",
          contact: "+91 98765 43210",
          status: "Scheduled",
          preferredDate: "2026-08-20",
          preferredTime: "morning",
          reason: "elderly",
          notes: "Call upon reaching the gate."
        },
        {
          id: "HVR-10034",
          name: "Meera Reddy",
          voterId: "VT-55312",
          address: "Plot 42, Green Park Extension, South District",
          contact: "+91 91234 56789",
          status: "Approved",
          preferredDate: "2026-08-21",
          preferredTime: "afternoon",
          reason: "mobility",
          notes: "Wheelchair accessible entrance at the back."
        }
      ]);
    }
  }, []);

  const handleSelectRequest = (req) => {
    setSelectedRequest(req);
  };

  const startAssistedVoting = () => {
    if (selectedRequest && !hasVoted("GE-2026", selectedRequest.voterId)) {
      navigate("/cast-vote/GE-2026", {
        state: {
          votingMethod: "HOME_VISIT",
          voterId: selectedRequest.voterId
        }
      });
    }
  };

  return (
    <main className="home-officer-page">
      <div className="home-officer-container">
        {/* ================= HEADER ================= */}
        <header className="home-officer-header">
          <div className="home-officer-welcome">
            <span className="home-officer-eyebrow">
              {t('officerPortalEyebrow')}
            </span>
            <h1>{t('homeVotingAssignmentsTitle')}</h1>
            <p>
              {t('homeVotingAssignmentsDesc')}
            </p>
          </div>
          <div className="home-officer-profile">
            <div className="home-officer-avatar">H</div>
            <div className="home-officer-profile-info">
              <strong>{t('homeVotingOfficerRole')}</strong>
              <span>{t('centralDistrictSquad')}</span>
            </div>
          </div>
        </header>

        <div className="home-officer-grid">
          {/* ================= REQUEST LIST ================= */}
          <section className="home-officer-list-col">
            <div className="home-officer-card">
              <h2 className="home-officer-section-title">{t('assignedVisitsTitle')}</h2>
              
              <div className="home-officer-request-list">
                {requests.length === 0 ? (
                  <p>{t('noAssignedRequests')}</p>
                ) : (
                  requests.map(req => {
                    const isSelected = selectedRequest?.id === req.id;
                    const voterAlreadyVoted = hasVoted("GE-2026", req.voterId);
                    
                    return (
                      <div 
                        key={req.id} 
                        className={`home-officer-request-item ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleSelectRequest(req)}
                      >
                        <div className="home-officer-request-header">
                          <strong>{req.name}</strong>
                          <span className={`status-badge status-${req.status.toLowerCase()}`}>
                            {voterAlreadyVoted ? t('votedStatusBadge') : req.status}
                          </span>
                        </div>
                        <div className="home-officer-request-meta">
                          <span>{req.id}</span>
                          <span>•</span>
                          <span>{req.preferredDate}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </section>

          {/* ================= REQUEST DETAILS ================= */}
          <section className="home-officer-details-col">
            {selectedRequest ? (
              <div className="home-officer-card">
                <div className="home-officer-details-header">
                  <div>
                    <span className="home-officer-card-label">{t('requestDetailsLabel')}</span>
                    <h2>{selectedRequest.name}</h2>
                  </div>
                  <span className="home-officer-req-id">{selectedRequest.id}</span>
                </div>

                <div className="home-officer-info-grid">
                  <div className="home-officer-info-item">
                    <span>{t('voterIdLabel')}</span>
                    <strong>{selectedRequest.voterId}</strong>
                  </div>
                  <div className="home-officer-info-item">
                    <span>{t('contactLabel')}</span>
                    <strong>{selectedRequest.contact}</strong>
                  </div>
                  <div className="home-officer-info-item">
                    <span>{t('dateTimeLabel')}</span>
                    <strong>{selectedRequest.preferredDate} ({selectedRequest.preferredTime})</strong>
                  </div>
                  <div className="home-officer-info-item">
                    <span>{t('eligibilityLabel')}</span>
                    <strong style={{ textTransform: 'capitalize' }}>{selectedRequest.reason}</strong>
                  </div>
                  <div className="home-officer-info-item full-width">
                    <span>{t('addressLabel')}</span>
                    <strong>{selectedRequest.address}</strong>
                  </div>
                  {selectedRequest.notes && (
                    <div className="home-officer-info-item full-width">
                      <span>{t('notesLabel')}</span>
                      <p>{selectedRequest.notes}</p>
                    </div>
                  )}
                </div>

                <div className="home-officer-actions">
                  {hasVoted("GE-2026", selectedRequest.voterId) ? (
                    <div className="home-officer-warning-box">
                      <span className="warning-icon">✓</span>
                      <div>
                        <strong>{t('votingCompletedTitle')}</strong>
                        <p>{t('votingCompletedDesc')}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="home-officer-start-box">
                      <div className="home-officer-privacy-notice">
                        <span className="privacy-icon">🔐</span>
                        <p><strong>{t('privacyCheckTitle')}</strong> {t('privacyCheckDesc')}</p>
                      </div>
                      <button 
                        className="home-officer-primary-btn"
                        onClick={startAssistedVoting}
                      >
                        {t('startVotingSessionBtn')}
                        <span>→</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="home-officer-empty-state">
                <span className="empty-icon">📝</span>
                <h3>{t('selectRequestTitle')}</h3>
                <p>{t('selectRequestDesc')}</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default HomeVotingOfficer;
