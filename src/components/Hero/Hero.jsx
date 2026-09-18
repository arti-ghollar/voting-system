import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "./Hero.css";

const Hero = () => {
  const { t } = useLanguage();
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            {t('heroBadgeText')}
          </div>

          <h1 className="hero__title">
            {t('heroTitlePart1')}
            <span>{t('heroTitlePart2')}</span>
          </h1>

          <p className="hero__subtitle">
            {t('heroSubtitle')}
          </p>

          <div className="hero__actions">
            <Link to="/register" className="hero__primary-btn">
              {t('heroStartVotingBtn')}
              <span aria-hidden="true">→</span>
            </Link>

            <Link to="/how-it-works" className="hero__secondary-btn">
              {t('heroLearnHowBtn')}
            </Link>
          </div>

          <div className="hero__trust">
            <div className="hero__trust-item">
              <span className="hero__trust-icon">✓</span>
              <span>{t('heroTrustSecureAuth')}</span>
            </div>

            <div className="hero__trust-item">
              <span className="hero__trust-icon">⬡</span>
              <span>{t('heroTrustBlockchainRecords')}</span>
            </div>

            <div className="hero__trust-item">
              <span className="hero__trust-icon">◉</span>
              <span>{t('heroTrustVerifiableResults')}</span>
            </div>
          </div>
        </div>

        <div className="hero__visual" aria-label="Secure digital voting illustration">
          <div className="hero__glow" />

          <div className="hero__card">
            <div className="hero__card-header">
              <div>
                <span>{t('heroActiveElection')}</span>
                <strong>{t('heroStudentCouncil')}</strong>
              </div>

              <span className="hero__live">{t('heroLiveBadge')}</span>
            </div>

            <div className="hero__candidate">
              <div className="hero__candidate-avatar">A</div>

              <div className="hero__candidate-info">
                <strong>{t('heroCandidateA')}</strong>
                <span>{t('heroComputerScience')}</span>
              </div>

              <span className="hero__candidate-check">✓</span>
            </div>

            <div className="hero__candidate">
              <div className="hero__candidate-avatar">B</div>

              <div className="hero__candidate-info">
                <strong>{t('heroCandidateB')}</strong>
                <span>{t('heroInfoTech')}</span>
              </div>

              <span className="hero__candidate-check">✓</span>
            </div>

            <div className="hero__secure-line">
              <span>🔒</span>
              <span>{t('heroSecureLine')}</span>
            </div>

            <div className="hero__card-footer">
              <span>{t('heroVotesRecorded')}</span>
              <span>{t('heroNetworkVerified')}</span>
            </div>
          </div>

          <div className="hero__floating hero__floating--top">
            <span>✓</span>
            <div>
              <strong>{t('heroVoteVerified')}</strong>
              <small>{t('heroTxConfirmed')}</small>
            </div>
          </div>

          <div className="hero__floating hero__floating--bottom">
            <span>⬡</span>
            <div>
              <strong>{t('heroBlockchain')}</strong>
              <small>{t('heroTamperEvident')}</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;