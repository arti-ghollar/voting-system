import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");

    if (!formData.email.trim() || !formData.password.trim()) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await login({ email: formData.email, password: formData.password });
      
      if (response.success) {
        const role = response.user.role;
        
        if (role === "admin") {
          navigate("/admin-dashboard");
        } else if (role === "center_operator") {
          navigate("/voting-center");
        } else if (role === "home_officer") {
          navigate("/home-voting-officer");
        } else {
          navigate("/voter-dashboard");
        }
      } else {
        setErrorMessage(response.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="login-page">
      {/* =====================================================
          BACKGROUND
          ===================================================== */}
      <div className="login-background">
        <div className="login-grid"></div>

        <div className="login-orb login-orb-one"></div>
        <div className="login-orb login-orb-two"></div>

        <div className="login-network">
          <span className="login-node login-node-one"></span>
          <span className="login-node login-node-two"></span>
          <span className="login-node login-node-three"></span>
          <span className="login-node login-node-four"></span>
          <span className="login-node login-node-five"></span>

          <span className="login-line login-line-one"></span>
          <span className="login-line login-line-two"></span>
          <span className="login-line login-line-three"></span>
        </div>
      </div>

      <div className="login-container">
        {/* ===================================================
            LEFT BRAND PANEL
            =================================================== */}
        <section className="login-brand-panel">
          <Link to="/" className="login-brand">
            <span className="login-brand-mark">
              <span className="login-brand-shield">✓</span>
            </span>

            <span className="login-brand-text">
              <strong>BLOCKVOTE</strong>
              <small>DECENTRALIZED VOTING</small>
            </span>
          </Link>

          <div className="login-brand-content">
            <div className="login-eyebrow">
              <span></span>
              SECURE DIGITAL ELECTIONS
            </div>

            <h1>
              Your vote.
              <br />
              <strong>Your voice.</strong>
            </h1>

            <p>
              Access your secure voting account and participate in digital
              elections with confidence, transparency, and integrity.
            </p>
          </div>

          {/* Security Illustration */}
          <div className="login-visual">
            <div className="login-visual-ring login-visual-ring-one"></div>
            <div className="login-visual-ring login-visual-ring-two"></div>
            <div className="login-visual-ring login-visual-ring-three"></div>

            <div className="login-block block-left-top">
              <span></span>
            </div>

            <div className="login-block block-right-top">
              <span></span>
            </div>

            <div className="login-block block-left-bottom">
              <span></span>
            </div>

            <div className="login-block block-right-bottom">
              <span></span>
            </div>

            <div className="login-core">
              <div className="login-core-shield">
                <span>✓</span>
              </div>

              <small>VERIFIED</small>
            </div>
          </div>

          <div className="login-security-points">
            <div className="login-security-item">
              <span className="login-security-icon">✓</span>
              <div>
                <strong>Secure Access</strong>
                <small>Protected account authentication</small>
              </div>
            </div>

            <div className="login-security-item">
              <span className="login-security-icon">⌁</span>
              <div>
                <strong>Blockchain Based</strong>
                <small>Transparent voting infrastructure</small>
              </div>
            </div>

            <div className="login-security-item">
              <span className="login-security-icon">◈</span>
              <div>
                <strong>Vote Integrity</strong>
                <small>Designed for trusted elections</small>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            LOGIN FORM PANEL
            =================================================== */}
        <section className="login-form-panel">
          <div className="login-form-card">
            <div className="login-mobile-brand">
              <Link to="/" className="login-brand">
                <span className="login-brand-mark">
                  <span className="login-brand-shield">✓</span>
                </span>

                <span className="login-brand-text">
                  <strong>BLOCKVOTE</strong>
                  <small>DECENTRALIZED VOTING</small>
                </span>
              </Link>
            </div>

            <div className="login-heading">
              <div className="login-eyebrow">
                <span></span>
                {t('welcomeBack')}
              </div>

              <h2>
                {t('loginHeading')}
                <br />
                <strong>{t('loginHeadingStrong')}</strong>
              </h2>

              <p>
                {t('loginSubheading')}
              </p>
            </div>

            {/* Error */}
            {errorMessage && (
              <div
                className="login-error"
                role="alert"
                aria-live="assertive"
              >
                <span className="login-error-icon">!</span>

                <div>
                  <strong>Unable to continue</strong>
                  <p>{errorMessage}</p>
                </div>
              </div>
            )}

            <form className="login-form" onSubmit={handleSubmit}>
              {/* Email */}
              <div className="login-field">
                <label htmlFor="login-email">
                  {t('emailLabel')} <span>*</span>
                </label>

                <div className="login-input-wrapper">
                  <span className="login-input-icon">@</span>

                  <input
                    id="login-email"
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

              {/* Password */}
              <div className="login-field">
                <div className="login-label-row">
                  <label htmlFor="login-password">
                    {t('passwordLabel')} <span>*</span>
                  </label>

                  <Link to="/forgot-password" className="login-forgot-link">
                    {t('forgotPassword')}
                  </Link>
                </div>

                <div className="login-input-wrapper">
                  <span className="login-input-icon">◆</span>

                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={t('passwordPlaceholder')}
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() => setShowPassword((previous) => !previous)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Remember */}
              <div className="login-options">
                <label className="login-checkbox">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                  />

                  <span className="login-checkmark"></span>

                  <span>{t('rememberMe')}</span>
                </label>

                <span className="login-session-note">
                  {t('sessionProtected')}
                </span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="login-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="login-spinner"></span>
                    {t('signingIn')}
                  </>
                ) : (
                  <>
                    {t('signIn')}
                    <span>→</span>
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="login-divider">
              <span>OR</span>
            </div>

            {/* Register */}
            <div className="login-register">
              <p>{t('noAccount')}</p>

              <Link to="/register" className="login-register-link">
                {t('createAccount')}
                <span>→</span>
              </Link>
            </div>

            {/* Security Footer */}
            <div className="login-form-security">
              <span>🔒</span>

              <p>
                {t('secureCreds')}
              </p>
            </div>

            <div className="login-back-home">
              <Link to="/">
                <span>←</span>
                {t('backToHome')}
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* =====================================================
          FOOTER
          ===================================================== */}
      <footer className="login-footer">
        <span>© {new Date().getFullYear()} BlockVote</span>
        <span className="login-footer-dot"></span>
        <span>Secure Digital Voting Platform</span>
      </footer>
    </main>
  );
};

export default Login;
