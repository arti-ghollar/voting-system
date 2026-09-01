import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ role = "voter", isOpen = false, onClose }) => {
  const voterLinks = [
    { label: "Dashboard", path: "/voter-dashboard", icon: "▦" },
    { label: "Elections", path: "/elections", icon: "◉" },
    { label: "Voting Status", path: "/voting-status", icon: "✓" },
    { label: "Profile", path: "/profile", icon: "○" },
  ];

  const adminLinks = [
    { label: "Dashboard", path: "/admin-dashboard", icon: "▦" },
    { label: "Manage Voters", path: "/manage-voters", icon: "♙" },
    { label: "Candidates", path: "/manage-candidates", icon: "♟" },
    { label: "Elections", path: "/manage-elections", icon: "◉" },
    { label: "Voting Monitor", path: "/voting-monitor", icon: "◌" },
    { label: "Blockchain Records", path: "/blockchain-records", icon: "⬡" },
    { label: "Results", path: "/results", icon: "▥" },
  ];

  const links = role === "admin" ? adminLinks : voterLinks;

  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="sidebar__overlay"
          onClick={onClose}
          aria-label="Close sidebar"
        />
      )}

      <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        <div className="sidebar__header">
          <div className="sidebar__profile">
            <div className="sidebar__avatar">
              {role === "admin" ? "A" : "V"}
            </div>

            <div>
              <strong>{role === "admin" ? "Administrator" : "Voter"}</strong>
              <span>{role === "admin" ? "Election Panel" : "Student Portal"}</span>
            </div>
          </div>

          <button
            type="button"
            className="sidebar__close"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>

        <nav className="sidebar__nav" aria-label="Dashboard navigation">
          <span className="sidebar__section-title">MAIN MENU</span>

          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={onClose}
              className={({ isActive }) =>
                `sidebar__link ${isActive ? "active" : ""}`
              }
            >
              <span className="sidebar__icon" aria-hidden="true">
                {link.icon}
              </span>

              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar__security">
          <div className="sidebar__security-icon">✓</div>

          <div>
            <strong>Secure System</strong>
            <span>Blockchain verified</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;