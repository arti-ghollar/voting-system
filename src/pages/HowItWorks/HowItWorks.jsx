import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "./HowItWorks.css";

const HowItWorks = () => {
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      icon: "👤",
      title: t('step1TitleHiw'),
      description: t('step1DescHiw'),
    },
    {
      number: "02",
      icon: "✓",
      title: t('step2TitleHiw'),
      description: t('step2DescHiw'),
    },
    {
      number: "03",
      icon: "🗳",
      title: t('step3TitleHiw'),
      description: t('step3DescHiw'),
    },
    {
      number: "04",
      icon: "✓",
      title: t('step4TitleHiw'),
      description: t('step4DescHiw'),
    },
    {
      number: "05",
      icon: "⛓",
      title: t('step5TitleHiw'),
      description: t('step5DescHiw'),
    },
    {
      number: "06",
      icon: "🔍",
      title: t('step6TitleHiw'),
      description: t('step6DescHiw'),
    },
  ];

  const securityFeatures = [
    {
      icon: "🔐",
      title: t('secureAuthHiw'),
      description: t('secureAuthDescHiw'),
    },
    {
      icon: "⛓",
      title: t('blockchainHiw'),
      description: t('blockchainDescHiw'),
    },
    {
      icon: "🛡",
      title: t('privacyHiw'),
      description: t('privacyDescHiw'),
    },
    {
      icon: "✓",
      title: t('transparentHiw'),
      description: t('transparentDescHiw'),
    },
  ];

  return (
    <main className="how-it-works-page">
      <div className="how-it-works-container">

        {/* ================= HEADER ================= */}
        <header className="how-it-works-header">
          <div className="how-it-works-header-content">
            <span className="how-it-works-eyebrow">
              {t('howItWorksEyebrow')}
            </span>

            <h1>
              {t('simpleSecureVoting')}
            </h1>

            <p>
              {t('howItWorksDesc')}
            </p>
          </div>

          <Link
            to="/"
            className="how-it-works-back-button"
          >
            <span aria-hidden="true">←</span>
            {t('backToHome')}
          </Link>
        </header>

        {/* ================= INTRO CARD ================= */}
        <section className="how-it-works-intro">
          <div className="how-it-works-intro-icon" aria-hidden="true">
            ⛓
          </div>

          <div className="how-it-works-intro-content">
            <span className="how-it-works-card-label">
              {t('blockchainVotingLabel')}
            </span>

            <h2>
              {t('modernApproach')}
            </h2>

            <p>
              {t('modernApproachDesc')}
            </p>
          </div>
        </section>

        {/* ================= STEPS ================= */}
        <section className="how-it-works-steps-section">
          <div className="how-it-works-section-heading">
            <div>
              <span className="how-it-works-card-label">
                {t('votingProcessLabel')}
              </span>

              <h2>{t('howProcessWorks')}</h2>
            </div>

            <span className="how-it-works-step-count">
              {t('sixSimpleSteps')}
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
                {t('securityTrustLabel')}
              </span>

              <h2>{t('builtAroundSecure')}</h2>
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
              <span className="how-it-works-card-label">{t('electionInfoCenter')}</span>
              <h2>{t('importantUpdates')}</h2>
            </div>
          </div>
          
          <div className="how-it-works-info-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>📅 {t('electionSchedule')}</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
                  <span>{t('voterRegDeadline')}</span>
                  <strong>10 Aug 2026</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
                  <span>{t('genElectionStarts')}</span>
                  <strong>15 Aug 2026</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
                  <span>{t('votingPeriodEnds')}</span>
                  <strong>31 Aug 2026</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{t('resultsDeclaration')}</span>
                  <strong>02 Sep 2026</strong>
                </li>
              </ul>
            </div>
            
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>🏢 {t('votingCentersLabel')}</h3>
              <p style={{ marginBottom: '12px' }}>{t('votingCentersDesc')}</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '20px', listStyleType: 'disc' }}>
                <li>{t('center1')}</li>
                <li>{t('center2')}</li>
                <li>{t('center3')}</li>
              </ul>
            </div>
            
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>♿ {t('accessibilityServices')}</h3>
              <p style={{ marginBottom: '12px' }}>{t('accessibilityDescHiw')}</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '20px', listStyleType: 'disc' }}>
                <li>{t('access1')}</li>
                <li>{t('access2')}</li>
                <li>{t('access3')}</li>
                <li>{t('access4')}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="how-it-works-faq-section" style={{ padding: '80px 0', borderTop: '1px solid var(--color-border)' }}>
          <div className="how-it-works-section-heading text-center" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="how-it-works-card-label">{t('supportLabel')}</span>
            <h2>{t('faqHiw')}</h2>
          </div>
          
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="card" style={{ padding: '24px' }}>
              <h4 style={{ marginBottom: '8px' }}>{t('faq1Q')}</h4>
              <p>{t('faq1A')}</p>
            </div>
            <div className="card" style={{ padding: '24px' }}>
              <h4 style={{ marginBottom: '8px' }}>{t('faq2Q')}</h4>
              <p>{t('faq2A')}</p>
            </div>
            <div className="card" style={{ padding: '24px' }}>
              <h4 style={{ marginBottom: '8px' }}>{t('faq3Q')}</h4>
              <p>{t('faq3A')}</p>
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="how-it-works-cta">
          <div className="how-it-works-cta-content">
            <span className="how-it-works-card-label">
              {t('readyToParticipate')}
            </span>

            <h2>{t('exploreElections')}</h2>

            <p>
              {t('exploreElectionsDesc')}
            </p>
          </div>

          <div className="how-it-works-cta-actions">
            <Link
              to="/elections"
              className="how-it-works-primary-button"
            >
              {t('viewElections')}
              <span aria-hidden="true">→</span>
            </Link>

            <Link
              to="/register"
              className="how-it-works-secondary-button"
            >
              {t('registerAsVoter')}
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
            <h3>{t('importantInfoTitle')}</h3>

            <p>
              {t('importantInfoDesc')}
            </p>
          </div>
        </aside>

      </div>
    </main>
  );
};

export default HowItWorks;