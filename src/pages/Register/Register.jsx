import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    voterId: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
    setSuccess("");
  };

  const getPasswordStrength = () => {
    const password = formData.password;

    if (!password) {
      return {
        label: "",
        className: "",
      };
    }

    if (password.length < 6) {
      return {
        label: t('weak'),
        className: "weak",
      };
    }

    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialCharacter = /[^A-Za-z0-9]/.test(password);

    if (
      password.length >= 8 &&
      hasUppercase &&
      hasNumber &&
      hasSpecialCharacter
    ) {
      return {
        label: t('strong'),
        className: "strong",
      };
    }

    return {
      label: t('medium'),
      className: "medium",
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fullName = formData.fullName.trim();
    const email = formData.email.trim();
    const voterId = formData.voterId.trim();

    if (!fullName || !email || !voterId) {
      setError("Please fill in all required fields.");
      return;
    }

    if (fullName.length < 3) {
      setError("Please enter a valid full name.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!formData.agreeTerms) {
      setError("Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await register({
        name: fullName,
        email: email,
        voterId: voterId,
        password: formData.password
      });

      if (response.success) {
        setSuccess("Registration completed successfully.");
        window.setTimeout(() => {
          navigate("/voter-dashboard");
        }, 700);
      } else {
        setError(response.message || "Registration failed.");
      }
    } catch (err) {
      setError(err.message || "Registration failed due to a network or server error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const passwordStrength = getPasswordStrength();

  return (
    <main className="register-page">
      <section className="register-container">

        {/* LEFT INFORMATION PANEL */}
        <aside className="register-info-panel">
          <Link to="/" className="register-brand">
            <span className="register-brand-icon" aria-hidden="true">
              ⛓
            </span>
            <span>BlockVote</span>
          </Link>

          <div className="register-info-content">
            <span className="register-eyebrow">
              {t('secureDigitalVoting')}
            </span>

            <h1>
              {t('createSecureAccount')}
              <span> {t('voterAccount')}</span>
            </h1>

            <p>
              {t('registerDesc')}
            </p>

            <div className="register-benefits">
              <div className="register-benefit">
                <span
                  className="register-benefit-icon"
                  aria-hidden="true"
                >
                  ✓
                </span>

                <div>
                  <strong>{t('secureIdentity')}</strong>
                  <p>
                    {t('secureIdentityDesc')}
                  </p>
                </div>
              </div>

              <div className="register-benefit">
                <span
                  className="register-benefit-icon"
                  aria-hidden="true"
                >
                  ⛓
                </span>

                <div>
                  <strong>{t('blockchainVerification')}</strong>
                  <p>
                    {t('blockchainVerificationDesc')}
                  </p>
                </div>
              </div>

              <div className="register-benefit">
                <span
                  className="register-benefit-icon"
                  aria-hidden="true"
                >
                  🔐
                </span>

                <div>
                  <strong>{t('privacyFirst')}</strong>
                  <p>
                    {t('privacyFirstDesc')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="register-info-footer">
            <span>© 2026 BlockVote</span>
            <span>Secure • Transparent • Verifiable</span>
          </div>
        </aside>

        {/* REGISTRATION FORM */}
        <section className="register-form-panel">
          <div className="register-form-header">
            <span className="register-mobile-eyebrow">
              {t('voterRegistration')}
            </span>

            <h2>{t('createYourAccount')}</h2>

            <p>
              {t('enterDetailsBelow')}
            </p>
          </div>

          {error && (
            <div className="register-message register-error" role="alert">
              <span aria-hidden="true">!</span>
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div
              className="register-message register-success"
              role="status"
            >
              <span aria-hidden="true">✓</span>
              <p>{success}</p>
            </div>
          )}

          <form
            className="register-form"
            onSubmit={handleSubmit}
            noValidate
          >
            {/* FULL NAME */}
            <div className="register-field">
              <label htmlFor="fullName">
                {t('fullNameLabel')} <span>*</span>
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder={t('fullNamePlaceholder')}
                autoComplete="name"
              />
            </div>

            {/* EMAIL */}
            <div className="register-field">
              <label htmlFor="email">
                {t('emailLabel')} <span>*</span>
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('emailPlaceholder')}
                autoComplete="email"
              />
            </div>

            {/* VOTER ID */}
            <div className="register-field">
              <label htmlFor="voterId">
                {t('voterIdLabel')} <span>*</span>
              </label>

              <input
                id="voterId"
                name="voterId"
                type="text"
                value={formData.voterId}
                onChange={handleChange}
                placeholder={t('voterIdPlaceholder')}
                autoComplete="off"
              />

              <small>
                {t('voterIdHint')}
              </small>
            </div>

            {/* PASSWORD */}
            <div className="register-field">
              <label htmlFor="password">
                {t('passwordLabel')} <span>*</span>
              </label>

              <div className="register-password-wrapper">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={t('createPassword')}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="register-password-toggle"
                  onClick={() =>
                    setShowPassword((previousValue) => !previousValue)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? t('hide') : t('show')}
                </button>
              </div>

              {passwordStrength.label && (
                <div className="register-password-strength">
                  <div className="register-strength-bar">
                    <span
                      className={passwordStrength.className}
                    />
                  </div>

                  <span
                    className={`register-strength-label ${passwordStrength.className}`}
                  >
                    {passwordStrength.label}
                  </span>
                </div>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="register-field">
              <label htmlFor="confirmPassword">
                {t('confirmPasswordLabel')} <span>*</span>
              </label>

              <div className="register-password-wrapper">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={
                    showConfirmPassword ? "text" : "password"
                  }
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder={t('confirmPasswordPlaceholder')}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="register-password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      (previousValue) => !previousValue
                    )
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? t('hide') : t('show')}
                </button>
              </div>
            </div>

            {/* TERMS */}
            <label className="register-terms">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
              />

              <span
                className="register-custom-checkbox"
                aria-hidden="true"
              />

              <span className="register-terms-text">
                {t('agreeTermsText1')}{" "}
                <Link to="/terms">{t('terms')}</Link>{" "}
                {t('agreeTermsText2')}{" "}
                <Link to="/privacy">{t('privacy')}</Link>.
              </span>
            </label>

            {/* SUBMIT */}
            <button
              type="submit"
              className="register-submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('creatingAccount') : t('createVoterAccount')}
              {!isSubmitting && <span aria-hidden="true">→</span>}
            </button>
          </form>

          {/* LOGIN */}
          <div className="register-login">
            <span>{t('alreadyHaveAccount')}</span>
            <Link to="/login">{t('signIn')}</Link>
          </div>

          {/* SECURITY */}
          <div className="register-security-notice">
            <span aria-hidden="true">🔒</span>

            <p>
              {t('infoProtected')}
            </p>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Register;