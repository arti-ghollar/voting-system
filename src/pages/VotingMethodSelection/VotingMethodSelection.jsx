import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./VotingMethodSelection.css";

const VotingMethodSelection = () => {
  const navigate = useNavigate();

  return (
    <main className="voting-method-page">
      <div className="voting-method-container">
        {/* ================= HEADER ================= */}
        <header className="voting-method-header">
          <div className="voting-method-heading">
            <span className="voting-method-eyebrow">
              VOTING METHOD
            </span>
            <h1>How would you like to vote?</h1>
            <p>
              Choose the voting method that works best for you. 
              Our system is designed to provide secure and accessible voting for everyone.
            </p>
          </div>
          <Link to="/voter-dashboard" className="voting-method-back-button">
            <span aria-hidden="true">←</span>
            Back to Dashboard
          </Link>
        </header>

        {/* ================= METHOD CARDS ================= */}
        <section className="voting-method-grid">
          {/* ONLINE VOTING */}
          <article className="voting-method-card">
            <div className="voting-method-icon blue" aria-hidden="true">
              📱
            </div>
            <div className="voting-method-content">
              <h2>HOME / ONLINE VOTING</h2>
              <p>Vote securely from your smartphone, tablet, or personal computer.</p>
              <ul className="voting-method-features">
                <li><span aria-hidden="true">✓</span> Quick and convenient</li>
                <li><span aria-hidden="true">✓</span> Immediate confirmation</li>
                <li><span aria-hidden="true">✓</span> Highest privacy</li>
              </ul>
            </div>
            <button 
              className="voting-method-action-button blue-btn"
              onClick={() => navigate("/elections")}
            >
              Vote Online
              <span aria-hidden="true">→</span>
            </button>
          </article>

          {/* VOTING CENTER */}
          <article className="voting-method-card">
            <div className="voting-method-icon purple" aria-hidden="true">
              🏢
            </div>
            <div className="voting-method-content">
              <h2>VOTING CENTER</h2>
              <p>Get assistance at a verified center with dedicated digital kiosks.</p>
              <ul className="voting-method-features">
                <li><span aria-hidden="true">✓</span> Staff assistance available</li>
                <li><span aria-hidden="true">✓</span> Accessible devices provided</li>
                <li><span aria-hidden="true">✓</span> Secure private booths</li>
              </ul>
            </div>
            <div className="voting-method-info-badge">
              Log out to allow Center Operator to start a session.
            </div>
          </article>

          {/* HOME VISIT VOTING */}
          <article className="voting-method-card">
            <div className="voting-method-icon green" aria-hidden="true">
              🏠
            </div>
            <div className="voting-method-content">
              <h2>HOME VISIT VOTING</h2>
              <p>Request an authorized election officer to visit your home for assisted voting.</p>
              <ul className="voting-method-features">
                <li><span aria-hidden="true">✓</span> For elderly & mobility-impaired</li>
                <li><span aria-hidden="true">✓</span> Verified election officials</li>
                <li><span aria-hidden="true">✓</span> Authorized assistance</li>
              </ul>
            </div>
            <button 
              className="voting-method-action-button green-btn"
              onClick={() => navigate("/home-voting-request")}
            >
              Request Home Visit
              <span aria-hidden="true">→</span>
            </button>
          </article>
        </section>
      </div>
    </main>
  );
};

export default VotingMethodSelection;
