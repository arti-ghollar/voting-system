import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useVoting } from "../../context/VotingContext";
import "./VotingCenter.css";

const VotingCenter = () => {
  const navigate = useNavigate();
  const { hasVoted } = useVoting();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedVoter, setSearchedVoter] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setError("");
    setSearchedVoter(null);

    // Simulate API search
    setTimeout(() => {
      setIsSearching(false);
      
      // Mock voter data
      if (searchQuery.startsWith("VT-")) {
        const voterAlreadyVoted = hasVoted("GE-2026", searchQuery);
        setSearchedVoter({
          voterId: searchQuery.toUpperCase(),
          name: "Verified Voter",
          status: "Eligible",
          hasVoted: voterAlreadyVoted
        });
      } else {
        setError("Voter not found. Please enter a valid Voter ID (e.g., VT-12345).");
      }
    }, 800);
  };

  const startAssistedVoting = () => {
    if (searchedVoter && !searchedVoter.hasVoted) {
      navigate("/cast-vote/GE-2026", {
        state: {
          votingMethod: "CENTER",
          voterId: searchedVoter.voterId
        }
      });
    }
  };

  return (
    <main className="voting-center-page">
      <div className="voting-center-container">
        {/* ================= HEADER ================= */}
        <header className="voting-center-header">
          <div className="voting-center-welcome">
            <span className="voting-center-eyebrow">
              CENTER OPERATOR PORTAL
            </span>
            <h1>Voting Center Dashboard</h1>
            <p>
              Verify voters and conduct authorized assisted voting sessions. 
              Candidate selections remain entirely private.
            </p>
          </div>
          <div className="voting-center-profile">
            <div className="voting-center-avatar">O</div>
            <div className="voting-center-profile-info">
              <strong>Center Operator</strong>
              <span>Center #42 (Central District)</span>
            </div>
            <span className="voting-center-verified">
              <span aria-hidden="true">✓</span> Active
            </span>
          </div>
        </header>

        {/* ================= SEARCH CARD ================= */}
        <section className="voting-center-card">
          <div className="voting-center-card-header">
            <div>
              <span className="voting-center-card-label">VOTER LOOKUP</span>
              <h2>Verify Voter Eligibility</h2>
            </div>
          </div>
          
          <form className="voting-center-search-form" onSubmit={handleSearch}>
            <div className="voting-center-search-wrapper">
              <input 
                type="text" 
                placeholder="Enter Voter ID (e.g., VT-12345)" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                required
              />
              <button type="submit" disabled={isSearching} className="voting-center-search-btn">
                {isSearching ? "Searching..." : "Search"}
              </button>
            </div>
            {error && <p className="voting-center-error">{error}</p>}
          </form>
        </section>

        {/* ================= VOTER DETAILS ================= */}
        {searchedVoter && (
          <section className="voting-center-card voter-details">
            <div className="voting-center-card-header">
              <div>
                <span className="voting-center-card-label">VERIFICATION RESULT</span>
                <h2>Voter Information</h2>
              </div>
              <span className={`voting-center-status-badge ${searchedVoter.hasVoted ? 'status-voted' : 'status-eligible'}`}>
                {searchedVoter.hasVoted ? "Already Voted" : "Eligible"}
              </span>
            </div>

            <div className="voting-center-details-grid">
              <div className="voting-center-detail">
                <span>Voter ID</span>
                <strong>{searchedVoter.voterId}</strong>
              </div>
              <div className="voting-center-detail">
                <span>Name</span>
                <strong>{searchedVoter.name}</strong>
              </div>
              <div className="voting-center-detail">
                <span>Election</span>
                <strong>General Election 2026</strong>
              </div>
              <div className="voting-center-detail">
                <span>Voting Status</span>
                <strong style={{ color: searchedVoter.hasVoted ? "var(--color-danger, #ef4444)" : "var(--color-success, #22c55e)" }}>
                  {searchedVoter.hasVoted ? "Vote Cast" : "Not Voted"}
                </strong>
              </div>
            </div>

            <div className="voting-center-actions">
              {searchedVoter.hasVoted ? (
                <div className="voting-center-warning-box">
                  <span className="warning-icon">⚠</span>
                  <div>
                    <strong>Voting Blocked</strong>
                    <p>This voter has already cast a vote in the current election. Double voting is strictly prohibited.</p>
                  </div>
                </div>
              ) : (
                <div className="voting-center-start-box">
                  <div className="voting-center-privacy-notice">
                    <span className="privacy-icon">🔐</span>
                    <p><strong>Privacy Check:</strong> Please ensure the voter has privacy to select their candidate on the next screen. You will not be able to see their selection.</p>
                  </div>
                  <button 
                    className="voting-center-primary-btn"
                    onClick={startAssistedVoting}
                  >
                    Start Assisted Voting Session
                    <span>→</span>
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

      </div>
    </main>
  );
};

export default VotingCenter;
