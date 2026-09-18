import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import "./Navbar.css";
import logoImg from "../../assets/votebridge-logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [voterOpen, setVoterOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    if (accessibilityMode) {
      document.body.classList.add("accessibility-mode");
    } else {
      document.body.classList.remove("accessibility-mode");
    }
  }, [accessibilityMode]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [darkMode]);

  const toggleAccessibility = () => {
    setAccessibilityMode((prev) => !prev);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const closeAllMenus = () => {
    setMenuOpen(false);
    setVoterOpen(false);
    setAdminOpen(false);
  };

  const toggleVoterMenu = () => {
    setVoterOpen((prev) => !prev);
    setAdminOpen(false);
  };

  const toggleAdminMenu = () => {
    setAdminOpen((prev) => !prev);
    setVoterOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `navbar__link ${isActive ? "active" : ""}`;

  const dropdownLinkClass = ({ isActive }) =>
    `navbar__dropdown-link ${isActive ? "active" : ""}`;

  return (
    <header className="navbar">
      <div className="navbar__container">

        {/* =====================================================
            BRAND
        ====================================================== */}
        <Link
          to="/"
          className="navbar__brand"
          onClick={closeAllMenus}
        >
          <img
            src={logoImg}
            alt="VoteBridge Logo"
            className="navbar__brand-logo"
            style={{ height: "95px", objectFit: "contain" }}
          />

          <span className="navbar__brand-text">
            <span className="navbar__brand-tagline">
              {t('tagline')}
            </span>
          </span>
        </Link>

        {/* =====================================================
            MOBILE TOGGLE
        ====================================================== */}
        <button
          type="button"
          className={`navbar__toggle ${
            menuOpen ? "is-active" : ""
          }`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* =====================================================
            NAVIGATION
        ====================================================== */}
        <nav
          className={`navbar__nav ${
            menuOpen ? "is-open" : ""
          }`}
        >

          {/* =================================================
              PUBLIC NAVIGATION
          ================================================== */}

          <NavLink
            to="/"
            end
            className={navLinkClass}
            onClick={closeAllMenus}
          >
            {t('home')}
          </NavLink>

          <NavLink
            to="/about"
            className={navLinkClass}
            onClick={closeAllMenus}
          >
            {t('about')}
          </NavLink>

          <NavLink
            to="/how-it-works"
            className={navLinkClass}
            onClick={closeAllMenus}
          >
            {t('howItWorks')}
          </NavLink>

          <NavLink
            to="/contact"
            className={navLinkClass}
            onClick={closeAllMenus}
          >
            {t('contact')}
          </NavLink>

          {/* =================================================
              VOTER DROPDOWN
          ================================================== */}

          <div
            className={`navbar__dropdown ${
              voterOpen ? "is-open" : ""
            }`}
          >
            <button
              type="button"
              className="navbar__dropdown-button"
              onClick={toggleVoterMenu}
              aria-expanded={voterOpen}
            >
              {t('voterPortal')}
              <span className="navbar__arrow">⌄</span>
            </button>

            <div className="navbar__dropdown-menu">

              <NavLink
                to="/voter-dashboard"
                className={dropdownLinkClass}
                onClick={closeAllMenus}
              >
                <span className="dropdown-icon">▣</span>
                <span>
                  <strong>{t('dashboard')}</strong>
                  <small>{t('dashboardDescVoter')}</small>
                </span>
              </NavLink>

              <NavLink
                to="/elections"
                className={dropdownLinkClass}
                onClick={closeAllMenus}
              >
                <span className="dropdown-icon">◈</span>
                <span>
                  <strong>{t('elections')}</strong>
                  <small>{t('electionsDescVoter')}</small>
                </span>
              </NavLink>

              <NavLink
                to="/voting-status"
                className={dropdownLinkClass}
                onClick={closeAllMenus}
              >
                <span className="dropdown-icon">✓</span>
                <span>
                  <strong>{t('votingStatus')}</strong>
                  <small>{t('votingStatusDesc')}</small>
                </span>
              </NavLink>

              <NavLink
                to="/profile"
                className={dropdownLinkClass}
                onClick={closeAllMenus}
              >
                <span className="dropdown-icon">◎</span>
                <span>
                  <strong>{t('profile')}</strong>
                  <small>{t('profileDesc')}</small>
                </span>
              </NavLink>

              <div className="navbar__dropdown-divider"></div>

              <Link
                to="/elections"
                className="navbar__dropdown-action"
                onClick={closeAllMenus}
              >
                {t('viewElections')}
              </Link>

            </div>
          </div>

          {/* =================================================
              ADMIN DROPDOWN
          ================================================== */}

          <div
            className={`navbar__dropdown ${
              adminOpen ? "is-open" : ""
            }`}
          >
            <button
              type="button"
              className="navbar__dropdown-button"
              onClick={toggleAdminMenu}
              aria-expanded={adminOpen}
            >
              {t('admin')}
              <span className="navbar__arrow">⌄</span>
            </button>

            <div className="navbar__dropdown-menu navbar__dropdown-menu--admin">

              <NavLink
                to="/admin-dashboard"
                className={dropdownLinkClass}
                onClick={closeAllMenus}
              >
                <span className="dropdown-icon">▣</span>
                <span>
                  <strong>{t('adminDashboard')}</strong>
                  <small>{t('dashboardDescAdmin')}</small>
                </span>
              </NavLink>

              <NavLink
                to="/admin/voters"
                className={dropdownLinkClass}
                onClick={closeAllMenus}
              >
                <span className="dropdown-icon">♙</span>
                <span>
                  <strong>{t('manageVoters')}</strong>
                  <small>{t('manageVotersDesc')}</small>
                </span>
              </NavLink>

              <NavLink
                to="/admin/candidates"
                className={dropdownLinkClass}
                onClick={closeAllMenus}
              >
                <span className="dropdown-icon">♟</span>
                <span>
                  <strong>{t('manageCandidates')}</strong>
                  <small>{t('manageCandidatesDesc')}</small>
                </span>
              </NavLink>

              <NavLink
                to="/admin/elections"
                className={dropdownLinkClass}
                onClick={closeAllMenus}
              >
                <span className="dropdown-icon">◈</span>
                <span>
                  <strong>{t('manageElections')}</strong>
                  <small>{t('manageElectionsDesc')}</small>
                </span>
              </NavLink>

              <NavLink
                to="/admin/voting-monitor"
                className={dropdownLinkClass}
                onClick={closeAllMenus}
              >
                <span className="dropdown-icon">◉</span>
                <span>
                  <strong>{t('votingMonitor')}</strong>
                  <small>{t('votingMonitorDesc')}</small>
                </span>
              </NavLink>

              <NavLink
                to="/admin/blockchain-records"
                className={dropdownLinkClass}
                onClick={closeAllMenus}
              >
                <span className="dropdown-icon">⬡</span>
                <span>
                  <strong>{t('blockchainRecords')}</strong>
                  <small>{t('blockchainRecordsDesc')}</small>
                </span>
              </NavLink>

              <NavLink
                to="/admin/results"
                className={dropdownLinkClass}
                onClick={closeAllMenus}
              >
                <span className="dropdown-icon">▥</span>
                <span>
                  <strong>{t('results')}</strong>
                  <small>{t('resultsDesc')}</small>
                </span>
              </NavLink>

            </div>
          </div>

          {/* =================================================
              SETTINGS (LANG/ACCESSIBILITY/THEME)
          ================================================== */}
          <div className="navbar__settings" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '0 15px' }}>
            <button
              type="button"
              className={`navbar__theme-toggle ${darkMode ? 'active' : ''}`}
              onClick={toggleDarkMode}
              aria-pressed={darkMode}
              title="Toggle Dark Mode"
              style={{
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: darkMode ? '#eab308' : '#64748b'
              }}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button
              type="button"
              className={`navbar__accessibility-toggle ${accessibilityMode ? 'active' : ''}`}
              onClick={toggleAccessibility}
              aria-pressed={accessibilityMode}
              title="Toggle Accessibility Mode"
              style={{
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: accessibilityMode ? '#2563eb' : '#64748b'
              }}
            >
              ♿
            </button>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="navbar__language-select"
              aria-label="Select Language"
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '4px 8px',
                fontSize: '14px',
                color: '#475569',
                background: '#f8fafc',
                cursor: 'pointer'
              }}
            >
              <option value="EN">English</option>
              <option value="HI">हिंदी</option>
              <option value="MR">मराठी</option>
            </select>
          </div>

          {/* =================================================
              AUTH ACTIONS
          ================================================== */}

          <div className="navbar__actions">

            <Link
              to="/login"
              className="navbar__login"
              onClick={closeAllMenus}
            >
              {t('login')}
            </Link>

            <Link
              to="/register"
              className="navbar__register"
              onClick={closeAllMenus}
            >
              {t('getStarted')}
            </Link>

          </div>

        </nav>
      </div>
    </header>
  );
};

export default Navbar;