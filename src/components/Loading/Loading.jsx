import { useLanguage } from "../../context/LanguageContext";
import "./Loading.css";

const Loading = ({
  text = "Loading...",
  fullScreen = false,
  size = "medium",
}) => {
  const { t } = useLanguage();
  const displayText = text === "Loading..." ? t('loadingText') : text;

  return (
    <div
      className={`loading loading--${size} ${
        fullScreen ? "loading--fullscreen" : ""
      }`}
      role="status"
      aria-live="polite"
      aria-label={displayText}
    >
      <div className="loading__spinner" />

      {displayText && <span className="loading__text">{displayText}</span>}
    </div>
  );
};

export default Loading;