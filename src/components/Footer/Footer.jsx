import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__main">
          <div className="footer__brand">
            <Link to="/" className="footer__brand-link">
              <span className="footer__logo" aria-hidden="true">
                ✓
              </span>

              <span className="footer__brand-name">EduVote</span>
            </Link>

            <p className="footer__description">
              A secure and transparent blockchain-based voting platform
              designed for college and small-scale elections.
            </p>
          </div>

          <div className="footer__column">
            <h3>Platform</h3>
            <Link to="/about">About</Link>
            <Link to="/how-it-works">How It Works</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>

          <div className="footer__column">
            <h3>Voting</h3>
            <Link to="/elections">Elections</Link>
            <Link to="/voting-status">Voting Status</Link>
            <Link to="/results">Results</Link>
          </div>

          <div className="footer__column">
            <h3>Security</h3>
            <span>Blockchain Records</span>
            <span>Vote Verification</span>
            <span>Secure Authentication</span>
            <span>Audit Trail</span>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {currentYear} EduVote. Built for secure college-level elections.
          </p>

          <div className="footer__legal">
            <span>Privacy</span>
            <span>Security</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;