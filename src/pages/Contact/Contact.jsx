import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Contact.css";

const Contact = () => {
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
      title: "Email Support",
      value: "support@blockvote.com",
      description: "For general questions and technical assistance.",
    },
    {
      icon: "◷",
      title: "Support Hours",
      value: "Mon – Fri, 9:00 AM – 6:00 PM",
      description: "Our support team is available during working hours.",
    },
    {
      icon: "⌖",
      title: "Office",
      value: "Digital Voting Center",
      description: "Secure digital election technology and support.",
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
              WE ARE HERE TO HELP
            </div>

            <h1>
              Let's Start a
              <br />
              <strong>Conversation.</strong>
            </h1>

            <p>
              Have a question about your account, an election, or our
              blockchain voting platform? Send us a message and our support
              team will help you.
            </p>
          </div>

          <div className="contact-hero-stats">
            <div className="contact-stat">
              <strong>24/7</strong>
              <span>Platform Access</span>
            </div>

            <div className="contact-stat-divider"></div>

            <div className="contact-stat">
              <strong>Secure</strong>
              <span>Support Process</span>
            </div>

            <div className="contact-stat-divider"></div>

            <div className="contact-stat">
              <strong>Trusted</strong>
              <span>Digital Voting</span>
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
                CONTACT INFORMATION
              </div>

              <h2>
                We’re ready to
                <br />
                <strong>assist you.</strong>
              </h2>

              <p className="contact-info-intro">
                Whether you need technical support or simply want to learn
                more about the platform, our team is ready to assist.
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
                  <strong>Your privacy matters.</strong>
                  <p>
                    Never send passwords, private keys, OTPs, or other
                    confidential credentials through the contact form.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE FORM */}
            <div className="contact-form-wrapper">
              <div className="contact-form-header">
                <div>
                  <span>MESSAGE SUPPORT</span>
                  <h3>Send us a message</h3>
                </div>

                <div className="contact-form-status">
                  <span></span>
                  SECURE
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
                    <strong>Message submitted successfully.</strong>
                    <p>
                      Thank you for contacting us. Our support team will review
                      your request.
                    </p>
                  </div>
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form-row">
                  <div className="contact-field">
                    <label htmlFor="contact-name">
                      Full Name <span>*</span>
                    </label>

                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      required
                    />
                  </div>

                  <div className="contact-field">
                    <label htmlFor="contact-email">
                      Email Address <span>*</span>
                    </label>

                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-subject">
                    Subject <span>*</span>
                  </label>

                  <select
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select a subject
                    </option>
                    <option value="account">Account & Login</option>
                    <option value="election">Election Support</option>
                    <option value="voting">Voting Issue</option>
                    <option value="technical">Technical Support</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div className="contact-field">
                  <div className="contact-message-label">
                    <label htmlFor="contact-message">
                      Message <span>*</span>
                    </label>

                    <small>{formData.message.length}/1000</small>
                  </div>

                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    maxLength={1000}
                    rows={7}
                    required
                  ></textarea>
                </div>

                <div className="contact-form-footer">
                  <p>
                    <span>🔒</span>
                    Your message is handled through a secure support workflow.
                  </p>

                  <button type="submit" className="contact-submit-btn">
                    Send Message
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
              WHAT HAPPENS NEXT
            </div>

            <h2>
              Simple Support.
              <br />
              <strong>Clear Communication.</strong>
            </h2>

            <p>
              We keep the support process straightforward so you know what to
              expect after submitting your request.
            </p>
          </div>

          <div className="contact-process-grid">
            <div className="contact-process-card">
              <div className="contact-process-number">01</div>

              <div className="contact-process-icon">✉</div>

              <h3>Send Your Request</h3>

              <p>
                Complete the contact form with a clear description of your
                question or issue.
              </p>
            </div>

            <div className="contact-process-connector">
              <span>→</span>
            </div>

            <div className="contact-process-card">
              <div className="contact-process-number">02</div>

              <div className="contact-process-icon">◉</div>

              <h3>Request Reviewed</h3>

              <p>
                Our support team reviews the request and identifies the best
                way to assist.
              </p>
            </div>

            <div className="contact-process-connector">
              <span>→</span>
            </div>

            <div className="contact-process-card">
              <div className="contact-process-number">03</div>

              <div className="contact-process-icon">✓</div>

              <h3>Get Assistance</h3>

              <p>
                You receive guidance or additional information based on your
                support request.
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
                SUPPORT FAQ
              </div>

              <h2>
                Before you
                <br />
                <strong>contact us.</strong>
              </h2>

              <p>
                You may find the answer to your question in our frequently
                asked questions.
              </p>

              <Link to="/how-it-works" className="contact-faq-link">
                Learn how the platform works
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
                READY TO GET STARTED?
              </div>

              <h2>
                Your secure voting
                <br />
                experience <strong>starts here.</strong>
              </h2>

              <p>
                Create an account or sign in to access your digital voting
                dashboard.
              </p>

              <div className="contact-cta-actions">
                <Link to="/register" className="contact-cta-primary">
                  Create Account
                  <span>→</span>
                </Link>

                <Link to="/login" className="contact-cta-secondary">
                  Sign In
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
