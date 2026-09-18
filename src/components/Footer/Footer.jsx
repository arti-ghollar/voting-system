import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__main">
          <div className="footer__brand">
            <Link to="/" className="footer__brand-link">
              <span className="footer__logo" aria-hidden="true">
                <span className="footer__logo-check">✓</span>
              </span>
              <span className="footer__brand-name">VoteBridge</span>
            </Link>

            <p className="footer__description">
              {t('footerDesc')}
            </p>
          </div>

          <div className="footer__column">
            <h3>{t('platform')}</h3>
            <Link to="/about">{t('about')}</Link>
            <Link to="/how-it-works">{t('howItWorks')}</Link>
            <Link to="/login">{t('login')}</Link>
            <Link to="/register">{t('getStarted')}</Link>
          </div>

          <div className="footer__column">
            <h3>{t('voting')}</h3>
            <Link to="/elections">{t('elections')}</Link>
            <Link to="/voting-status">{t('votingStatus')}</Link>
            <Link to="/results">{t('results')}</Link>
          </div>

          <div className="footer__column">
            <h3>{t('security')}</h3>
            <span>{t('blockchainRecords')}</span>
            <span>{t('voteVerification')}</span>
            <span>{t('secureAuth')}</span>
            <span>{t('auditTrail')}</span>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__copyright">
            {t('copyright').replace('{year}', currentYear)}
          </div>

          <div className="footer__legal">
            <span>{t('privacy')}</span>
            <span>{t('security')}</span>
            <span>{t('terms')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;