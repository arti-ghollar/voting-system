import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

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
        label: "Weak",
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
        label: "Strong",
        className: "strong",
      };
    }

    return {
      label: "Medium",
      className: "medium",
    };
  };

  const handleSubmit = (event) => {
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

    setSuccess("Registration completed successfully.");

    window.setTimeout(() => {
      navigate("/voter-dashboard");
    }, 700);
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
              SECURE DIGITAL VOTING
            </span>

            <h1>
              Create your secure
              <span> voter account.</span>
            </h1>

            <p>
              Register with BlockVote and participate in secure,
              transparent and verifiable digital elections.
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
                  <strong>Secure Identity</strong>
                  <p>
                    Your voter information is securely protected.
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
                  <strong>Blockchain Verification</strong>
                  <p>
                    Vote records can be independently verified.
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
                  <strong>Privacy First</strong>
                  <p>
                    Your candidate selection remains private.
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
              VOTER REGISTRATION
            </span>

            <h2>Create your account</h2>

            <p>
              Enter your details below to register as a voter.
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
                Full Name <span>*</span>
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
              />
            </div>

            {/* EMAIL */}
            <div className="register-field">
              <label htmlFor="email">
                Email Address <span>*</span>
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                autoComplete="email"
              />
            </div>

            {/* VOTER ID */}
            <div className="register-field">
              <label htmlFor="voterId">
                Voter ID <span>*</span>
              </label>

              <input
                id="voterId"
                name="voterId"
                type="text"
                value={formData.voterId}
                onChange={handleChange}
                placeholder="Enter your voter ID"
                autoComplete="off"
              />

              <small>
                Enter the voter identification number issued to you.
              </small>
            </div>

            {/* PASSWORD */}
            <div className="register-field">
              <label htmlFor="password">
                Password <span>*</span>
              </label>

              <div className="register-password-wrapper">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
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
                  {showPassword ? "Hide" : "Show"}
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
                Confirm Password <span>*</span>
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
                  placeholder="Confirm your password"
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
                  {showConfirmPassword ? "Hide" : "Show"}
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
                I agree to the{" "}
                <Link to="/terms">Terms of Service</Link>{" "}
                and{" "}
                <Link to="/privacy">Privacy Policy</Link>.
              </span>
            </label>

            {/* SUBMIT */}
            <button
              type="submit"
              className="register-submit-button"
            >
              Create Voter Account
              <span aria-hidden="true">→</span>
            </button>
          </form>

          {/* LOGIN */}
          <div className="register-login">
            <span>Already have an account?</span>
            <Link to="/login">Sign In</Link>
          </div>

          {/* SECURITY */}
          <div className="register-security-notice">
            <span aria-hidden="true">🔒</span>

            <p>
              Your information is protected using secure
              authentication practices.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Register;