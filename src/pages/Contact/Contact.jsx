import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "./Contact.css";

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (submitted) {
      setSubmitted(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const contactCards = [
    {
      icon: "✉",
      title: t('emailSupport'),
      value: "support@blockvote.com",
      description: t('emailSupportDesc'),
    },
    {
      icon: "◷",
      title: t('supportHours'),
      value: t('supportHoursValue'),
      description: t('supportHoursDesc'),
    },
    {
      icon: "⌖",
      title: t('office'),
      value: t('officeValue'),
      description: t('officeDesc'),
    },
  ];

  const faqs = [
    {
      question: "How can I get help with my voter account?",
      answer:
        "Use the contact form and select an appropriate subject. Include enough information for the support team to understand your issue without sharing passwords or sensitive credentials.",
    },
    {
      question: "What should I do if I cannot access my account?",
      answer:
        "First verify your registered email and login details. If the problem continues, contact support so your account access issue can be reviewed.",
    },
    {
      question: "Can I report a problem with an election?",
      answer:
        "Yes. Use the contact form and provide the election name, a clear description of the issue, and any relevant non-sensitive details.",
    },
    {
      question: "How quickly will I receive a response?",
      answer:
        "Response time depends on the type and priority of your request. Support requests are generally reviewed during normal support hours.",
    },
  ];

  return (
    <main className="contact-page">
      {/* =====================================================
          HERO
          ===================================================== */}
      <section className="contact-hero">
        <div className="contact-hero-grid"></div>
        <div className="contact-hero-glow contact-hero-glow-one"></div>
        <div className="contact-hero-glow contact-hero-glow-two"></div>

        <div className="contact-container">
          <div className="contact-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Contact</span>
          </div>

          <div className="contact-hero-content">
            <div className="contact-label">
              <span></span>
              {t('weAreHereToHelp')}
            </div>

            <h1>
              {t('startConversation')}
              <br />
              <strong>{t('conversation')}</strong>
            </h1>

            <p>
              {t('contactDesc')}
            </p>
          </div>

          <div className="contact-hero-stats">
            <div className="contact-stat">
              <strong>24/7</strong>
              <span>{t('platformAccess')}</span>
            </div>

            <div className="contact-stat-divider"></div>

            <div className="contact-stat">
              <strong>{t('secureBadge')}</strong>
              <span>{t('secureSupportProcess')}</span>
            </div>

            <div className="contact-stat-divider"></div>

            <div className="contact-stat">
              <strong>Trusted</strong>
              <span>{t('trustedDigitalVoting')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT CONTENT
          ===================================================== */}
      <section className="contact-main">
        <div className="contact-container">
          <div className="contact-main-grid">
            {/* LEFT SIDE */}
            <div className="contact-info">
              <div className="contact-label">
                <span></span>
                {t('contactInfoLabel')}
              </div>

              <h2>
                {t('readyToAssist')}
                <br />
                <strong>{t('assistYou')}</strong>
              </h2>

              <p className="contact-info-intro">
                {t('assistDesc')}
              </p>

              <div className="contact-cards">
                {contactCards.map((card) => (
                  <div className="contact-info-card" key={card.title}>
                    <div className="contact-info-icon">{card.icon}</div>

                    <div className="contact-info-card-content">
                      <span>{card.title}</span>
                      <strong>{card.value}</strong>
                      <p>{card.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="contact-security-note">
                <div className="contact-security-icon">🔒</div>

                <div>
                  <strong>{t('privacyMatters')}</strong>
                  <p>
                    {t('privacyMattersDesc')}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE FORM */}
            <div className="contact-form-wrapper">
              <div className="contact-form-header">
                <div>
                  <span>{t('messageSupport')}</span>
                  <h3>{t('sendUsMessage')}</h3>
                </div>

                <div className="contact-form-status">
                  <span></span>
                  {t('secureBadge')}
                </div>
              </div>

              {submitted && (
                  <div
                  className="contact-success-message"
                  role="status"
                  aria-live="polite"
                >
                  <span>✓</span>

                  <div>
                    <strong>{t('messageSubmitted')}</strong>
                    <p>
                      {t('messageSubmittedDesc')}
                    </p>
                  </div>
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form-row">
                  <div className="contact-field">
                    <label htmlFor="contact-name">
                      {t('fullNameLabel')} <span>*</span>
                    </label>

                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('fullNamePlaceholder')}
                      autoComplete="name"
                      required
                    />
                  </div>

                  <div className="contact-field">
                    <label htmlFor="contact-email">
                      {t('emailLabel')} <span>*</span>
                    </label>

                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('emailPlaceholder')}
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-subject">
                    {t('subjectLabel')} <span>*</span>
                  </label>

                  <select
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      {t('selectSubject')}
                    </option>
                    <option value="account">{t('subjAccount')}</option>
                    <option value="election">{t('subjElection')}</option>
                    <option value="voting">{t('subjVoting')}</option>
                    <option value="technical">{t('subjTech')}</option>
                    <option value="general">{t('subjGeneral')}</option>
                  </select>
                </div>

                <div className="contact-field">
                  <div className="contact-message-label">
                    <label htmlFor="contact-message">
                      {t('messageLabel')} <span>*</span>
                    </label>

                    <small>{formData.message.length}/1000</small>
                  </div>

                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('messagePlaceholder')}
                    maxLength={1000}
                    rows={7}
                    required
                  ></textarea>
                </div>

                <div className="contact-form-footer">
                  <p>
                    <span>🔒</span>
                    {t('secureWorkflow')}
                  </p>

                  <button type="submit" className="contact-submit-btn">
                    {t('sendMessageBtn')}
                    <span>→</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SUPPORT PROCESS
          ===================================================== */}
      <section className="contact-process">
        <div className="contact-container">
          <div className="contact-section-heading">
            <div className="contact-label">
              <span></span>
              {t('whatHappensNext')}
            </div>

            <h2>
              {t('simpleSupport')}
              <br />
              <strong>{t('clearCommunication')}</strong>
            </h2>

            <p>
              {t('processDesc')}
            </p>
          </div>

          <div className="contact-process-grid">
            <div className="contact-process-card">
              <div className="contact-process-number">01</div>

              <div className="contact-process-icon">✉</div>

              <h3>{t('step1Title')}</h3>

              <p>
                {t('step1Desc')}
              </p>
            </div>

            <div className="contact-process-connector">
              <span>→</span>
            </div>

            <div className="contact-process-card">
              <div className="contact-process-number">02</div>

              <div className="contact-process-icon">◉</div>

              <h3>{t('step2Title')}</h3>

              <p>
                {t('step2Desc')}
              </p>
            </div>

            <div className="contact-process-connector">
              <span>→</span>
            </div>

            <div className="contact-process-card">
              <div className="contact-process-number">03</div>

              <div className="contact-process-icon">✓</div>

              <h3>{t('step3Title')}</h3>

              <p>
                {t('step3Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ
          ===================================================== */}
      <section className="contact-faq">
        <div className="contact-container">
          <div className="contact-faq-grid">
            <div className="contact-faq-heading">
              <div className="contact-label">
                <span></span>
                {t('supportFaq')}
              </div>

              <h2>
                {t('beforeContactTitle')}
                <br />
                <strong>{t('beforeContactStrong')}</strong>
              </h2>

              <p>
                {t('beforeContactDesc')}
              </p>

              <Link to="/how-it-works" className="contact-faq-link">
                {t('learnHowWorks')}
                <span>→</span>
              </Link>
            </div>

            <div className="contact-faq-list">
              {faqs.map((faq) => (
                <details className="contact-faq-item" key={faq.question}>
                  <summary>
                    <span>{faq.question}</span>
                    <strong>+</strong>
                  </summary>

                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
          ===================================================== */}
      <section className="contact-cta">
        <div className="contact-container">
          <div className="contact-cta-card">
            <div className="contact-cta-content">
              <div className="contact-label">
                <span></span>
                {t('readyToGetStarted')}
              </div>

              <h2>
                {t('experienceStarts')}
                <br />
                <strong>{t('experienceStartsStrong')}</strong>
              </h2>

              <p>
                {t('experienceStartsDesc')}
              </p>

              <div className="contact-cta-actions">
                <Link to="/register" className="contact-cta-primary">
                  {t('createAccount')}
                  <span>→</span>
                </Link>

                <Link to="/login" className="contact-cta-secondary">
                  {t('signIn')}
                </Link>
              </div>
            </div>

            <div className="contact-cta-visual">
              <div className="contact-cta-ring contact-cta-ring-one"></div>
              <div className="contact-cta-ring contact-cta-ring-two"></div>

              <div className="contact-cta-shield">🛡</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
