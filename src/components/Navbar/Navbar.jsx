import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [voterOpen, setVoterOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

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
          <span className="navbar__logo" aria-hidden="true">
            <span className="navbar__logo-check">✓</span>
          </span>

          <span className="navbar__brand-text">
            <span className="navbar__brand-name">
              EduVote
            </span>

            <span className="navbar__brand-tagline">
              Secure • Transparent • Trusted
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
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={navLinkClass}
            onClick={closeAllMenus}
          >
            About
          </NavLink>

          <NavLink
            to="/how-it-works"
            className={navLinkClass}
            onClick={closeAllMenus}
          >
            How It Works
          </NavLink>

          <NavLink
            to="/contact"
            className={navLinkClass}
            onClick={closeAllMenus}
          >
            Contact
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
              Voter Portal
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
                  <strong>Dashboard</strong>
                  <small>Voter overview</small>
                </span>
              </NavLink>

              <NavLink
                to="/elections"
                className={dropdownLinkClass}
                onClick={closeAllMenus}
              >
                <span className="dropdown-icon">◈</span>
                <span>
                  <strong>Elections</strong>
                  <small>View available elections</small>
                </span>
              </NavLink>

              <NavLink
                to="/voting-status"
                className={dropdownLinkClass}
                onClick={closeAllMenus}
              >
                <span className="dropdown-icon">✓</span>
                <span>
                  <strong>Voting Status</strong>
                  <small>Track your vote</small>
                </span>
              </NavLink>

              <NavLink
                to="/profile"
                className={dropdownLinkClass}
                onClick={closeAllMenus}
              >
                <span className="dropdown-icon">◎</span>
                <span>
                  <strong>Profile</strong>
                  <small>Manage your account</small>
                </span>
              </NavLink>

              <div className="navbar__dropdown-divider"></div>

              <Link
                to="/elections"
                className="navbar__dropdown-action"
                onClick={closeAllMenus}
              >
                View Elections →
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
              Admin
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
                  <strong>Admin Dashboard</strong>
                  <small>System overview</small>
                </span>
              </NavLink>

              <NavLink
                to="/admin/voters"
                className={dropdownLinkClass}
                onClick={closeAllMenus}
              >
                <span className="dropdown-icon">♙</span>
                <span>
                  <strong>Manage Voters</strong>
                  <small>Manage registered voters</small>
                </span>
              </NavLink>

              <NavLink
                to="/admin/candidates"
                className={dropdownLinkClass}
                onClick={closeAllMenus}
              >
                <span className="dropdown-icon">♟</span>
                <span>
                  <strong>Manage Candidates</strong>
                  <small>Candidate management</small>
                </span>
              </NavLink>

              <NavLink
                to="/admin/elections"
                className={dropdownLinkClass}
                onClick={closeAllMenus}
              >
                <span className="dropdown-icon">◈</span>
                <span>
                  <strong>Manage Elections</strong>
                  <small>Create and manage elections</small>
                </span>
              </NavLink>

              <NavLink
                to="/admin/voting-monitor"
                className={dropdownLinkClass}
                onClick={closeAllMenus}
              >
                <span className="dropdown-icon">◉</span>
                <span>
                  <strong>Voting Monitor</strong>
                  <small>Monitor live voting</small>
                </span>
              </NavLink>

              <NavLink
                to="/admin/blockchain-records"
                className={dropdownLinkClass}
                onClick={closeAllMenus}
              >
                <span className="dropdown-icon">⬡</span>
                <span>
                  <strong>Blockchain Records</strong>
                  <small>Verify voting records</small>
                </span>
              </NavLink>

              <NavLink
                to="/admin/results"
                className={dropdownLinkClass}
                onClick={closeAllMenus}
              >
                <span className="dropdown-icon">▥</span>
                <span>
                  <strong>Results</strong>
                  <small>Election results</small>
                </span>
              </NavLink>

            </div>
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
              Login
            </Link>

            <Link
              to="/register"
              className="navbar__register"
              onClick={closeAllMenus}
            >
              Get Started
            </Link>

          </div>

        </nav>
      </div>
    </header>
  );
};

export default Navbar;