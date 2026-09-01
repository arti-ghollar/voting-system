import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <main className="home-page">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-container home-hero-grid">
          <div className="home-hero-content">
            <div className="home-badge">
              <span className="home-badge-dot"></span>
              Secure • Transparent • Decentralized
            </div>

            <h1>
              Vote with
              <span> Trust.</span>
              <br />
              Powered by Blockchain.
            </h1>

            <p className="home-hero-description">
              A modern blockchain-based voting platform designed to make
              elections secure, transparent, tamper-resistant, and accessible
              to every eligible voter.
            </p>

            <div className="home-hero-actions">
              <Link to="/register" className="home-btn home-btn-primary">
                Get Started
                <span>→</span>
              </Link>

              <Link to="/how-it-works" className="home-btn home-btn-secondary">
                How It Works
              </Link>
            </div>

            <div className="home-trust-row">
              <div className="home-trust-item">
                <strong>100%</strong>
                <span>Transparent</span>
              </div>

              <div className="home-trust-divider"></div>

              <div className="home-trust-item">
                <strong>Secure</strong>
                <span>Blockchain</span>
              </div>

              <div className="home-trust-divider"></div>

              <div className="home-trust-item">
                <strong>24/7</strong>
                <span>Accessible</span>
              </div>
            </div>
          </div>

          {/* Blockchain Voting Visual */}
          <div className="home-hero-visual">
            <div className="home-orbit home-orbit-one"></div>
            <div className="home-orbit home-orbit-two"></div>

            <div className="home-blockchain-card">
              <div className="home-card-header">
                <div>
                  <span className="home-card-label">BLOCKCHAIN NETWORK</span>
                  <h3>Secure Voting Ledger</h3>
                </div>

                <div className="home-live-indicator">
                  <span></span>
                  LIVE
                </div>
              </div>

              <div className="home-blockchain-chain">
                <div className="home-block">
                  <span className="home-block-number">01</span>
                  <div className="home-block-icon">✓</div>
                  <strong>Vote Block</strong>
                  <small>Verified</small>
                </div>

                <div className="home-chain-line"></div>

                <div className="home-block">
                  <span className="home-block-number">02</span>
                  <div className="home-block-icon">✓</div>
                  <strong>Vote Block</strong>
                  <small>Verified</small>
                </div>

                <div className="home-chain-line"></div>

                <div className="home-block">
                  <span className="home-block-number">03</span>
                  <div className="home-block-icon">✓</div>
                  <strong>Vote Block</strong>
                  <small>Verified</small>
                </div>
              </div>

              <div className="home-security-panel">
                <div className="home-security-icon">🔐</div>

                <div>
                  <strong>Cryptographically Secured</strong>
                  <span>Every vote is protected and tamper-resistant.</span>
                </div>
              </div>
            </div>

            <div className="home-floating-card home-floating-card-top">
              <span className="home-floating-icon">✓</span>
              <div>
                <strong>Vote Verified</strong>
                <small>Transaction confirmed</small>
              </div>
            </div>

            <div className="home-floating-card home-floating-card-bottom">
              <span className="home-floating-icon">◉</span>
              <div>
                <strong>Decentralized</strong>
                <small>No single point of failure</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="home-features">
        <div className="home-container">
          <div className="home-section-heading">
            <span className="home-section-label">WHY BLOCKCHAIN VOTING?</span>

            <h2>
              Built for a <span>Better Election</span>
            </h2>

            <p>
              Combining modern technology with election principles to create
              a safer and more transparent voting experience.
            </p>
          </div>

          <div className="home-feature-grid">
            <article className="home-feature-card">
              <div className="home-feature-icon">🔒</div>
              <h3>Highly Secure</h3>
              <p>
                Advanced cryptography and blockchain technology help protect
                votes against unauthorized changes and manipulation.
              </p>
            </article>

            <article className="home-feature-card">
              <div className="home-feature-icon">⛓</div>
              <h3>Immutable Records</h3>
              <p>
                Once a vote is recorded on the blockchain, its transaction
                history cannot be easily altered or deleted.
              </p>
            </article>

            <article className="home-feature-card">
              <div className="home-feature-icon">👁</div>
              <h3>Transparent</h3>
              <p>
                Election activity can be independently verified while keeping
                individual voter identities protected.
              </p>
            </article>

            <article className="home-feature-card">
              <div className="home-feature-icon">⚡</div>
              <h3>Fast & Efficient</h3>
              <p>
                Digital voting reduces manual processes and enables a faster
                and more efficient election workflow.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="home-process">
        <div className="home-container">
          <div className="home-section-heading">
            <span className="home-section-label">SIMPLE PROCESS</span>

            <h2>
              How <span>Voting Works</span>
            </h2>

            <p>
              Cast your vote through a simple and secure digital process.
            </p>
          </div>

          <div className="home-process-grid">
            <div className="home-process-step">
              <div className="home-step-number">01</div>
              <h3>Create Account</h3>
              <p>
                Register as an eligible voter and securely set up your account.
              </p>
            </div>

            <div className="home-process-connector"></div>

            <div className="home-process-step">
              <div className="home-step-number">02</div>
              <h3>Verify Identity</h3>
              <p>
                Complete the required voter verification before participating.
              </p>
            </div>

            <div className="home-process-connector"></div>

            <div className="home-process-step">
              <div className="home-step-number">03</div>
              <h3>Cast Your Vote</h3>
              <p>
                Select your preferred candidate and securely submit your vote.
              </p>
            </div>

            <div className="home-process-connector"></div>

            <div className="home-process-step">
              <div className="home-step-number">04</div>
              <h3>Blockchain Confirmation</h3>
              <p>
                Your vote is recorded and protected as a blockchain
                transaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-cta">
        <div className="home-container">
          <div className="home-cta-card">
            <div className="home-cta-content">
              <span className="home-section-label">READY TO PARTICIPATE?</span>

              <h2>
                Your Voice.
                <br />
                Your <span>Vote.</span>
              </h2>

              <p>
                Join a modern voting experience built around security,
                transparency, and trust.
              </p>

              <div className="home-cta-actions">
                <Link to="/register" className="home-btn home-btn-primary">
                  Register as Voter
                  <span>→</span>
                </Link>

                <Link to="/login" className="home-btn home-btn-outline">
                  Login
                </Link>
              </div>
            </div>

            <div className="home-cta-pattern">
              <div className="home-cta-circle home-cta-circle-one"></div>
              <div className="home-cta-circle home-cta-circle-two"></div>
              <div className="home-cta-lock">🔐</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
