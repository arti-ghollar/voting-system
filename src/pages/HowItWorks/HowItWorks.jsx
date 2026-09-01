import React from "react";
import { Link } from "react-router-dom";
import "./HowItWorks.css";

const steps = [
  {
    number: "01",
    icon: "👤",
    title: "Register as a Voter",
    description:
      "Create your voter account by providing the required information and completing the registration process.",
  },
  {
    number: "02",
    icon: "✓",
    title: "Verify Your Identity",
    description:
      "Complete the identity verification process to ensure that only eligible voters can participate.",
  },
  {
    number: "03",
    icon: "🗳",
    title: "Choose an Election",
    description:
      "Browse available elections and select an active election in which you are eligible to vote.",
  },
  {
    number: "04",
    icon: "✓",
    title: "Cast Your Vote",
    description:
      "Select your preferred candidate and securely submit your vote through the voting portal.",
  },
  {
    number: "05",
    icon: "⛓",
    title: "Blockchain Recording",
    description:
      "Your vote is recorded as a blockchain transaction to provide a tamper-resistant voting record.",
  },
  {
    number: "06",
    icon: "🔍",
    title: "Verify Your Vote",
    description:
      "Use your transaction information to verify that your vote was successfully recorded.",
  },
];

const securityFeatures = [
  {
    icon: "🔐",
    title: "Secure Authentication",
    description:
      "Voter accounts are protected through secure authentication and identity verification.",
  },
  {
    icon: "⛓",
    title: "Blockchain Technology",
    description:
      "Voting records are designed to be tamper-resistant and independently verifiable.",
  },
  {
    icon: "🛡",
    title: "Privacy Protection",
    description:
      "The voting process is designed to protect voter identity and ballot privacy.",
  },
  {
    icon: "✓",
    title: "Transparent Verification",
    description:
      "Transaction records provide a way to verify that a submitted vote was recorded.",
  },
];

const HowItWorks = () => {
  return (
    <main className="how-it-works-page">
      <div className="how-it-works-container">

        {/* ================= HEADER ================= */}
        <header className="how-it-works-header">
          <div className="how-it-works-header-content">
            <span className="how-it-works-eyebrow">
              HOW IT WORKS
            </span>

            <h1>
              Simple, Secure &amp; Transparent Voting
            </h1>

            <p>
              Understand how the blockchain-based voting platform
              works, from voter registration to secure vote
              verification.
            </p>
          </div>

          <Link
            to="/"
            className="how-it-works-back-button"
          >
            <span aria-hidden="true">←</span>
            Back to Home
          </Link>
        </header>

        {/* ================= INTRO CARD ================= */}
        <section className="how-it-works-intro">
          <div className="how-it-works-intro-icon" aria-hidden="true">
            ⛓
          </div>

          <div className="how-it-works-intro-content">
            <span className="how-it-works-card-label">
              BLOCKCHAIN VOTING
            </span>

            <h2>
              A modern approach to digital elections
            </h2>

            <p>
              Our voting workflow combines voter verification,
              secure ballot submission and blockchain-based
              transaction records to create a transparent voting
              experience.
            </p>
          </div>
        </section>

        {/* ================= STEPS ================= */}
        <section className="how-it-works-steps-section">
          <div className="how-it-works-section-heading">
            <div>
              <span className="how-it-works-card-label">
                VOTING PROCESS
              </span>

              <h2>How the Voting Process Works</h2>
            </div>

            <span className="how-it-works-step-count">
              6 Simple Steps
            </span>
          </div>

          <div className="how-it-works-steps-grid">
            {steps.map((step) => (
              <article
                className="how-it-works-step-card"
                key={step.number}
              >
                <div className="how-it-works-step-top">
                  <div className="how-it-works-step-icon" aria-hidden="true">
                    {step.icon}
                  </div>

                  <span className="how-it-works-step-number">
                    {step.number}
                  </span>
                </div>

                <div className="how-it-works-step-content">
                  <h3>{step.title}</h3>

                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ================= SECURITY ================= */}
        <section className="how-it-works-security-section">
          <div className="how-it-works-section-heading">
            <div>
              <span className="how-it-works-card-label">
                SECURITY &amp; TRUST
              </span>

              <h2>Built Around Secure Voting</h2>
            </div>
          </div>

          <div className="how-it-works-security-grid">
            {securityFeatures.map((feature) => (
              <article
                className="how-it-works-security-card"
                key={feature.title}
              >
                <div
                  className="how-it-works-security-icon"
                  aria-hidden="true"
                >
                  {feature.icon}
                </div>

                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="how-it-works-cta">
          <div className="how-it-works-cta-content">
            <span className="how-it-works-card-label">
              READY TO PARTICIPATE?
            </span>

            <h2>Explore Available Elections</h2>

            <p>
              View current and upcoming elections and continue
              to the voter portal when you are ready.
            </p>
          </div>

          <div className="how-it-works-cta-actions">
            <Link
              to="/elections"
              className="how-it-works-primary-button"
            >
              View Elections
              <span aria-hidden="true">→</span>
            </Link>

            <Link
              to="/register"
              className="how-it-works-secondary-button"
            >
              Register as Voter
            </Link>
          </div>
        </section>

        {/* ================= NOTICE ================= */}
        <aside className="how-it-works-notice">
          <div
            className="how-it-works-notice-icon"
            aria-hidden="true"
          >
            i
          </div>

          <div>
            <h3>Important Information</h3>

            <p>
              The exact registration, identity verification,
              authentication and blockchain implementation may
              depend on the backend and smart-contract configuration
              used by the application.
            </p>
          </div>
        </aside>

      </div>
    </main>
  );
};

export default HowItWorks;