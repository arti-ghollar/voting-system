import "./Loading.css";

const Loading = ({
  text = "Loading...",
  fullScreen = false,
  size = "medium",
}) => {
  return (
    <div
      className={`loading loading--${size} ${
        fullScreen ? "loading--fullscreen" : ""
      }`}
      role="status"
      aria-live="polite"
      aria-label={text}
    >
      <div className="loading__spinner" />

      {text && <span className="loading__text">{text}</span>}
    </div>
  );
};

export default Loading;