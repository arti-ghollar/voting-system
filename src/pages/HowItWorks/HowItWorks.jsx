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

        {/* ================= ELECTION INFO CENTER ================= */}
        <section className="how-it-works-info-section" style={{ padding: '80px 0', borderTop: '1px solid var(--color-border)' }}>
          <div className="how-it-works-section-heading">
            <div>
              <span className="how-it-works-card-label">ELECTION INFORMATION CENTER</span>
              <h2>Important Updates & Schedules</h2>
            </div>
          </div>
          
          <div className="how-it-works-info-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>📅 Election Schedule</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
                  <span>Voter Registration Deadline</span>
                  <strong>10 Aug 2026</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
                  <span>General Election Starts</span>
                  <strong>15 Aug 2026</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
                  <span>Voting Period Ends</span>
                  <strong>31 Aug 2026</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Results Declaration</span>
                  <strong>02 Sep 2026</strong>
                </li>
              </ul>
            </div>
            
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>🏢 Voting Centers</h3>
              <p style={{ marginBottom: '12px' }}>For voters who prefer in-person voting, verified centers are open from 8:00 AM to 6:00 PM during the election period.</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '20px', listStyleType: 'disc' }}>
                <li>Central District Hall (Downtown)</li>
                <li>Northside Community Center</li>
                <li>West End Library</li>
              </ul>
            </div>
            
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>♿ Accessibility Services</h3>
              <p style={{ marginBottom: '12px' }}>We are committed to accessible elections:</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '20px', listStyleType: 'disc' }}>
                <li>Screen-reader friendly platform</li>
                <li>High-contrast & large text options available via the NavBar</li>
                <li>Authorized Home Visits for eligible elderly and disabled citizens</li>
                <li>Wheelchair accessible physical voting centers</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="how-it-works-faq-section" style={{ padding: '80px 0', borderTop: '1px solid var(--color-border)' }}>
          <div className="how-it-works-section-heading text-center" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="how-it-works-card-label">SUPPORT</span>
            <h2>Frequently Asked Questions</h2>
          </div>
          
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="card" style={{ padding: '24px' }}>
              <h4 style={{ marginBottom: '8px' }}>Can I vote from my mobile phone?</h4>
              <p>Yes. If you have a verified account and are comfortable using digital technology, you can securely cast your vote from any smartphone or computer.</p>
            </div>
            <div className="card" style={{ padding: '24px' }}>
              <h4 style={{ marginBottom: '8px' }}>Who is eligible for an Authorized Home Visit?</h4>
              <p>Home visit voting is strictly subject to applicable rules and verification. It is generally available for senior citizens, individuals with mobility impairments, or those with severe medical conditions. You must submit a request which will be reviewed for approval.</p>
            </div>
            <div className="card" style={{ padding: '24px' }}>
              <h4 style={{ marginBottom: '8px' }}>How is my vote kept private?</h4>
              <p>Your identity is verified separately from your vote. The system encrypts your candidate selection and it is never publicly associated with your personal identity in the blockchain ledger or administrative audit logs.</p>
            </div>
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