import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useVoting } from "../../context/VotingContext";
import "./HomeVotingOfficer.css";

const HomeVotingOfficer = () => {
  const navigate = useNavigate();
  const { hasVoted } = useVoting();
  
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
              OFFICER PORTAL
            </span>
            <h1>Home Voting Assignments</h1>
            <p>
              Manage your assigned home voting requests and conduct secure, authorized assisted voting sessions.
            </p>
          </div>
          <div className="home-officer-profile">
            <div className="home-officer-avatar">H</div>
            <div className="home-officer-profile-info">
              <strong>Home Voting Officer</strong>
              <span>Central District Squad</span>
            </div>
          </div>
        </header>

        <div className="home-officer-grid">
          {/* ================= REQUEST LIST ================= */}
          <section className="home-officer-list-col">
            <div className="home-officer-card">
              <h2 className="home-officer-section-title">Assigned Visits</h2>
              
              <div className="home-officer-request-list">
                {requests.length === 0 ? (
                  <p>No assigned requests.</p>
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
                            {voterAlreadyVoted ? "Voted" : req.status}
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
                    <span className="home-officer-card-label">REQUEST DETAILS</span>
                    <h2>{selectedRequest.name}</h2>
                  </div>
                  <span className="home-officer-req-id">{selectedRequest.id}</span>
                </div>

                <div className="home-officer-info-grid">
                  <div className="home-officer-info-item">
                    <span>Voter ID</span>
                    <strong>{selectedRequest.voterId}</strong>
                  </div>
                  <div className="home-officer-info-item">
                    <span>Contact</span>
                    <strong>{selectedRequest.contact}</strong>
                  </div>
                  <div className="home-officer-info-item">
                    <span>Date & Time</span>
                    <strong>{selectedRequest.preferredDate} ({selectedRequest.preferredTime})</strong>
                  </div>
                  <div className="home-officer-info-item">
                    <span>Eligibility</span>
                    <strong style={{ textTransform: 'capitalize' }}>{selectedRequest.reason}</strong>
                  </div>
                  <div className="home-officer-info-item full-width">
                    <span>Address</span>
                    <strong>{selectedRequest.address}</strong>
                  </div>
                  {selectedRequest.notes && (
                    <div className="home-officer-info-item full-width">
                      <span>Notes</span>
                      <p>{selectedRequest.notes}</p>
                    </div>
                  )}
                </div>

                <div className="home-officer-actions">
                  {hasVoted("GE-2026", selectedRequest.voterId) ? (
                    <div className="home-officer-warning-box">
                      <span className="warning-icon">✓</span>
                      <div>
                        <strong>Voting Completed</strong>
                        <p>This voter has already successfully cast their vote.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="home-officer-start-box">
                      <div className="home-officer-privacy-notice">
                        <span className="privacy-icon">🔐</span>
                        <p><strong>Privacy Check:</strong> Pass the device to the voter to ensure privacy during candidate selection. You will not see their choice.</p>
                      </div>
                      <button 
                        className="home-officer-primary-btn"
                        onClick={startAssistedVoting}
                      >
                        Start Voting Session
                        <span>→</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="home-officer-empty-state">
                <span className="empty-icon">📝</span>
                <h3>Select a Request</h3>
                <p>Choose an assigned home visit from the list to view details and start a voting session.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default HomeVotingOfficer;
