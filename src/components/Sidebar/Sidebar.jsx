import { NavLink } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "./Sidebar.css";

const Sidebar = ({ role = "voter", isOpen = false, onClose }) => {
  const { t } = useLanguage();

  const voterLinks = [
    { label: t('navDashboard'), path: "/voter-dashboard", icon: "▦" },
    { label: t('navElections'), path: "/elections", icon: "◉" },
    { label: t('navVotingStatus'), path: "/voting-status", icon: "✓" },
    { label: t('navProfile'), path: "/profile", icon: "○" },
  ];

  const adminLinks = [
    { label: t('navDashboard'), path: "/admin-dashboard", icon: "▦" },
    { label: t('navManageVoters'), path: "/manage-voters", icon: "♙" },
    { label: t('navCandidates'), path: "/manage-candidates", icon: "♟" },
    { label: t('navElections'), path: "/manage-elections", icon: "◉" },
    { label: t('navVotingMonitor'), path: "/voting-monitor", icon: "◌" },
    { label: t('navBlockchainRecords'), path: "/blockchain-records", icon: "⬡" },
    { label: t('navResults'), path: "/results", icon: "▥" },
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
              <strong>{role === "admin" ? t('sidebarAdminRole') : t('sidebarVoterRole')}</strong>
              <span>{role === "admin" ? t('sidebarAdminPanel') : t('sidebarVoterPortal')}</span>
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
          <span className="sidebar__section-title">{t('sidebarMainMenu')}</span>

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
            <strong>{t('sidebarSecureSystem')}</strong>
            <span>{t('sidebarBlockchainVerified')}</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;