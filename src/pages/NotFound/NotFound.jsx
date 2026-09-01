import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <main className="not-found-page">
      <div className="not-found-card">
        <div className="not-found-code">404</div>

        <h1>Page Not Found</h1>

        <p>
          The page you are looking for does not exist or may have been
          moved.
        </p>

        <Link to="/" className="not-found-btn">
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;