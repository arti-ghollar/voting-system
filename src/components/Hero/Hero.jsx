import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            Blockchain-powered college voting
          </div>

          <h1 className="hero__title">
            Secure voting for a
            <span> smarter campus.</span>
          </h1>

          <p className="hero__subtitle">
            VoteBridge provides a secure, transparent and verifiable digital
            voting platform designed for modern student elections.
          </p>

          <div className="hero__actions">
            <Link to="/register" className="hero__primary-btn">
              Start Voting
              <span aria-hidden="true">→</span>
            </Link>

            <Link to="/how-it-works" className="hero__secondary-btn">
              Learn How It Works
            </Link>
          </div>

          <div className="hero__trust">
            <div className="hero__trust-item">
              <span className="hero__trust-icon">✓</span>
              <span>Secure authentication</span>
            </div>

            <div className="hero__trust-item">
              <span className="hero__trust-icon">⬡</span>
              <span>Blockchain records</span>
            </div>

            <div className="hero__trust-item">
              <span className="hero__trust-icon">◉</span>
              <span>Verifiable results</span>
            </div>
          </div>
        </div>

        <div className="hero__visual" aria-label="Secure digital voting illustration">
          <div className="hero__glow" />

          <div className="hero__card">
            <div className="hero__card-header">
              <div>
                <span>ACTIVE ELECTION</span>
                <strong>Student Council 2026</strong>
              </div>

              <span className="hero__live">LIVE</span>
            </div>

            <div className="hero__candidate">
              <div className="hero__candidate-avatar">A</div>

              <div className="hero__candidate-info">
                <strong>Candidate A</strong>
                <span>Computer Science</span>
              </div>

              <span className="hero__candidate-check">✓</span>
            </div>

            <div className="hero__candidate">
              <div className="hero__candidate-avatar">B</div>

              <div className="hero__candidate-info">
                <strong>Candidate B</strong>
                <span>Information Technology</span>
              </div>

              <span className="hero__candidate-check">✓</span>
            </div>

            <div className="hero__secure-line">
              <span>🔒</span>
              <span>Vote protected by blockchain verification</span>
            </div>

            <div className="hero__card-footer">
              <span>1,284 votes recorded</span>
              <span>Network verified</span>
            </div>
          </div>

          <div className="hero__floating hero__floating--top">
            <span>✓</span>
            <div>
              <strong>Vote Verified</strong>
              <small>Transaction confirmed</small>
            </div>
          </div>

          <div className="hero__floating hero__floating--bottom">
            <span>⬡</span>
            <div>
              <strong>Blockchain</strong>
              <small>Tamper-evident record</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;