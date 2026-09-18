import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "./About.css";

// Images for Three Ways to Vote
import onlineVotingImg from "../../assets/online_voting_home_1789640269295.jpg";
import centerVotingImg from "../../assets/voting_center_assistance_1789640280892.jpg";
import homeVisitImg from "../../assets/home_visit_voting_1789640353460.jpg";

const About = () => {
  const { t } = useLanguage();
  return (
    <main className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-container">
          <div className="about-hero-content">
            <span className="about-badge">{t('aboutOurPlatform')}</span>

            <h1>
              {t('buildingMore')}
              <span> {t('transparentFuture')}</span>
            </h1>

            <p>
              {t('aboutHeroDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="about-introduction">
        <div className="about-container">
          <div className="about-grid">
            <div className="about-content">
              <span className="section-label">{t('whoWeAre')}</span>

              <h2>
                {t('modernVoting')}
                <span> {t('digitalWorld')}</span>
              </h2>

              <p>
                {t('aboutIntro1')}
              </p>

              <p>
                {t('aboutIntro2')}
              </p>

              <div className="about-features">
                <div className="about-feature">
                  <div className="feature-icon">🔐</div>
                  <div>
                    <h3>{t('secureFeature')}</h3>
                    <p>{t('secureFeatureDesc')}</p>
                  </div>
                </div>

                <div className="about-feature">
                  <div className="feature-icon">⛓️</div>
                  <div>
                    <h3>{t('blockchainFeature')}</h3>
                    <p>{t('blockchainFeatureDesc')}</p>
                  </div>
                </div>

                <div className="about-feature">
                  <div className="feature-icon">✓</div>
                  <div>
                    <h3>{t('easyFeature')}</h3>
                    <p>{t('easyFeatureDesc')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-visual">
              <div className="visual-card">
                <div className="visual-icon">🗳️</div>

                <h3>{t('trustedDigital')}</h3>

                <p>
                  {t('trustedDigitalDesc')}
                </p>

                <div className="visual-stats">
                  <div>
                    <strong>100%</strong>
                    <span>{t('digitalProcess')}</span>
                  </div>

                  <div>
                    <strong>24/7</strong>
                    <span>{t('accessible')}</span>
                  </div>

                  <div>
                    <strong>{t('secureBadge')}</strong>
                    <span>{t('secureArchitecture')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Ways to Vote */}
      <section className="about-voting-ways">
        <div className="about-container">
          <div className="voting-ways-header">
            <span className="section-label">{t('howItWorks')}</span>
            <h2>
              {t('threeWaysToVote')}
              <span> {t('voteSpan')}</span>
            </h2>
            <p>
              {t('threeWaysDesc')}
            </p>
          </div>

          <div className="voting-ways-cards">
            {/* Card 1: Online Voting */}
            <article className="voting-way-card">
              <div className="way-card-image">
                <img src={onlineVotingImg} alt="Person securely voting from home on a smartphone" />
                <div className="way-icon">📱</div>
              </div>
              <div className="way-card-content">
                <h3>{t('onlineVoting')}</h3>
                <p>
                  {t('onlineVotingDesc')}
                </p>
                <ul className="way-features">
                  <li>{t('onlineFeat1')}</li>
                  <li>{t('onlineFeat2')}</li>
                  <li>{t('onlineFeat3')}</li>
                  <li>{t('onlineFeat4')}</li>
                  <li>{t('onlineFeat5')}</li>
                  <li>{t('onlineFeat6')}</li>
                </ul>
                <Link to="/voting-method" className="way-action-btn">
                  {t('voteOnlineBtn')}
                </Link>
              </div>
            </article>

            {/* Card 2: Voting Center */}
            <article className="voting-way-card">
              <div className="way-card-image">
                <img src={centerVotingImg} alt="Voter receiving assistance at an accessible voting center" />
                <div className="way-icon">🏢</div>
              </div>
              <div className="way-card-content">
                <h3>{t('assistedCenter')}</h3>
                <p>
                  {t('assistedCenterDesc')}
                </p>
                <ul className="way-features">
                  <li>{t('centerFeat1')}</li>
                  <li>{t('centerFeat2')}</li>
                  <li>{t('centerFeat3')}</li>
                  <li>{t('centerFeat4')}</li>
                  <li>{t('centerFeat5')}</li>
                  <li>{t('centerFeat6')}</li>
                </ul>
                <Link to="/voting-method" className="way-action-btn">
                  {t('findCenterBtn')}
                </Link>
              </div>
            </article>

            {/* Card 3: Home Visit */}
            <article className="voting-way-card">
              <div className="way-card-image">
                <img src={homeVisitImg} alt="Authorized officer assisting an elderly voter at home" />
                <div className="way-icon">🏠</div>
              </div>
              <div className="way-card-content">
                <h3>{t('homeVisit')}</h3>
                <p>
                  {t('homeVisitDesc')}
                </p>
                <ul className="way-features">
                  <li>{t('homeFeat1')}</li>
                  <li>{t('homeFeat2')}</li>
                  <li>{t('homeFeat3')}</li>
                  <li>{t('homeFeat4')}</li>
                  <li>{t('homeFeat5')}</li>
                  <li>{t('homeFeat6')}</li>
                </ul>
                <Link to="/home-voting-request" className="way-action-btn">
                  {t('requestHomeVisitBtn')}
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="about-mission">
        <div className="about-container">
          <div className="mission-header">
            <span className="section-label">{t('ourMission')}</span>

            <h2>
              {t('makingElections')}
              <span> {t('saferSmarter')}</span>
            </h2>

            <p>
              {t('missionDesc')}
            </p>
          </div>

          <div className="mission-cards">
            <article className="mission-card">
              <div className="mission-number">01</div>
              <h3>{t('transparencyLabel')}</h3>
              <p>
                {t('transparencyDesc')}
              </p>
            </article>

            <article className="mission-card">
              <div className="mission-number">02</div>
              <h3>{t('securityLabel')}</h3>
              <p>
                {t('securityDesc')}
              </p>
            </article>

            <article className="mission-card">
              <div className="mission-number">03</div>
              <h3>{t('accessibilityLabel')}</h3>
              <p>
                {t('accessibilityDesc')}
              </p>
            </article>

            <article className="mission-card">
              <div className="mission-number">04</div>
              <h3>{t('trustLabel')}</h3>
              <p>
                {t('trustDesc')}
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="about-technology">
        <div className="about-container">
          <div className="technology-box">
            <div>
              <span className="section-label">{t('ourTechnology')}</span>

              <h2>
                {t('poweredBy')}
                <span> {t('technologySpan')}</span>
              </h2>

              <p>
                {t('techDesc')}
              </p>
            </div>

            <div className="technology-list">
              <div className="technology-item">
                <span>01</span>
                <strong>{t('webAppTech')}</strong>
              </div>

              <div className="technology-item">
                <span>02</span>
                <strong>{t('secureAuthTech')}</strong>
              </div>

              <div className="technology-item">
                <span>03</span>
                <strong>{t('blockchainTech')}</strong>
              </div>

              <div className="technology-item">
                <span>04</span>
                <strong>{t('transparentTech')}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="about-container">
          <div className="cta-content">
            <span className="about-badge">{t('futureOfVoting')}</span>

            <h2>
              {t('yourVoteHero')}
              <span> {t('yourVoiceHero')}</span>
            </h2>

            <p>
              {t('futureDesc')}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;