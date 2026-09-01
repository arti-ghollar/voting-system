import React from "react";
import "./About.css";

const About = () => {
  return (
    <main className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-container">
          <div className="about-hero-content">
            <span className="about-badge">ABOUT OUR PLATFORM</span>

            <h1>
              Building a More
              <span> Transparent Future</span>
            </h1>

            <p>
              Our blockchain-based voting platform is designed to make
              elections secure, transparent, accessible, and trustworthy for
              everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="about-introduction">
        <div className="about-container">
          <div className="about-grid">
            <div className="about-content">
              <span className="section-label">WHO WE ARE</span>

              <h2>
                Modern Voting for a
                <span> Digital World</span>
              </h2>

              <p>
                We are developing a modern digital voting solution that
                combines secure authentication, blockchain technology, and a
                simple user experience.
              </p>

              <p>
                Our goal is to reduce the limitations of traditional voting
                systems while providing voters with a reliable and transparent
                way to participate in elections.
              </p>

              <div className="about-features">
                <div className="about-feature">
                  <div className="feature-icon">🔐</div>
                  <div>
                    <h3>Secure</h3>
                    <p>Designed with security at every stage.</p>
                  </div>
                </div>

                <div className="about-feature">
                  <div className="feature-icon">⛓️</div>
                  <div>
                    <h3>Blockchain Powered</h3>
                    <p>Votes can be recorded with greater transparency.</p>
                  </div>
                </div>

                <div className="about-feature">
                  <div className="feature-icon">✓</div>
                  <div>
                    <h3>Easy to Use</h3>
                    <p>A simple experience for every voter.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-visual">
              <div className="visual-card">
                <div className="visual-icon">🗳️</div>

                <h3>Trusted Digital Voting</h3>

                <p>
                  Secure participation with a transparent and user-friendly
                  election experience.
                </p>

                <div className="visual-stats">
                  <div>
                    <strong>100%</strong>
                    <span>Digital Process</span>
                  </div>

                  <div>
                    <strong>24/7</strong>
                    <span>Accessible</span>
                  </div>

                  <div>
                    <strong>Secure</strong>
                    <span>Architecture</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="about-mission">
        <div className="about-container">
          <div className="mission-header">
            <span className="section-label">OUR MISSION</span>

            <h2>
              Making Elections
              <span> Safer & Smarter</span>
            </h2>

            <p>
              We believe technology can help create a voting process that is
              more transparent, efficient, and accessible.
            </p>
          </div>

          <div className="mission-cards">
            <article className="mission-card">
              <div className="mission-number">01</div>
              <h3>Transparency</h3>
              <p>
                Provide a voting environment where election information and
                results can be handled with greater transparency.
              </p>
            </article>

            <article className="mission-card">
              <div className="mission-number">02</div>
              <h3>Security</h3>
              <p>
                Use modern security practices to protect voter information and
                voting operations.
              </p>
            </article>

            <article className="mission-card">
              <div className="mission-number">03</div>
              <h3>Accessibility</h3>
              <p>
                Make the voting experience straightforward and accessible
                across modern devices.
              </p>
            </article>

            <article className="mission-card">
              <div className="mission-number">04</div>
              <h3>Trust</h3>
              <p>
                Build confidence through reliable technology and a clear
                election experience.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="about-technology">
        <div className="about-container">
          <div className="technology-box">
            <div>
              <span className="section-label">OUR TECHNOLOGY</span>

              <h2>
                Powered by Modern
                <span> Technology</span>
              </h2>

              <p>
                The platform is structured around modern web technologies and
                blockchain concepts to create a secure and scalable digital
                voting experience.
              </p>
            </div>

            <div className="technology-list">
              <div className="technology-item">
                <span>01</span>
                <strong>Modern Web Application</strong>
              </div>

              <div className="technology-item">
                <span>02</span>
                <strong>Secure Authentication</strong>
              </div>

              <div className="technology-item">
                <span>03</span>
                <strong>Blockchain Integration</strong>
              </div>

              <div className="technology-item">
                <span>04</span>
                <strong>Transparent Results</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="about-container">
          <div className="cta-content">
            <span className="about-badge">THE FUTURE OF VOTING</span>

            <h2>
              Your Vote.
              <span> Your Voice.</span>
            </h2>

            <p>
              Experience a modern approach to secure and transparent digital
              elections.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;