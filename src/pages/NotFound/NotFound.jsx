import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "./NotFound.css";

const NotFound = () => {
  const { t } = useLanguage();
  return (
    <main className="not-found-page">
      <div className="not-found-card">
        <div className="not-found-code">404</div>

        <h1>{t('pageNotFoundTitle')}</h1>

        <p>
          {t('pageNotFoundDesc')}
        </p>

        <Link to="/" className="not-found-btn">
          {t('backToHomeBtn')}
        </Link>
      </div>
    </main>
  );
};

export default NotFound;