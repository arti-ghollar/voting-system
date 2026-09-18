import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "./Profile.css";

const Profile = () => {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "Arti Ghollar",
    email: "arti@example.com",
    phone: "+91 98765 43210",
    voterId: "VTR-2026-00125",
    dateOfBirth: "15 January 2000",
    address: "Maharashtra, India",
  });

  const [editForm, setEditForm] = useState(profile);

  const handleEdit = () => {
    setEditForm(profile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setEditForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setProfile(editForm);
    setIsEditing(false);
  };

  return (
    <main className="profile-page">
      <div className="profile-container">
        {/* Page Header */}
        <header className="profile-header">
          <div>
            <span className="profile-eyebrow">{t('accountSettingsEyebrow')}</span>
            <h1>{t('myProfileTitle')}</h1>
            <p>
              {t('myProfileDesc')}
            </p>
          </div>

          <Link to="/voter-dashboard" className="profile-back-button">
            <span aria-hidden="true">←</span>
            {t('backToDashboardBtn')}
          </Link>
        </header>

        {/* Profile Overview */}
        <section className="profile-overview-card">
          <div className="profile-avatar" aria-hidden="true">
            {profile.fullName
              .split(" ")
              .map((name) => name.charAt(0))
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>

          <div className="profile-overview-info">
            <h2>{profile.fullName}</h2>
            <p>{profile.email}</p>

            <div className="profile-badges">
              <span className="profile-role-badge">
                <span className="profile-badge-dot"></span>
                {t('verifiedVoterBadge')}
              </span>

              <span className="profile-active-badge">{t('accountActiveBadge')}</span>
            </div>
          </div>

          <button
            type="button"
            className="profile-edit-button"
            onClick={handleEdit}
          >
            <span aria-hidden="true">✎</span>
            {t('editProfileBtn')}
          </button>
        </section>

        {/* Main Content */}
        <div className="profile-content-grid">
          {/* Personal Information */}
          <section className="profile-card">
            <div className="profile-card-header">
              <div>
                <span className="profile-section-label">{t('personalDetailsEyebrow')}</span>
                <h2>{t('personalInformationTitle')}</h2>
              </div>
            </div>

            {!isEditing ? (
              <div className="profile-details-list">
                <div className="profile-detail-row">
                  <span className="profile-detail-label">{t('fullNameLabel')}</span>
                  <strong>{profile.fullName}</strong>
                </div>

                <div className="profile-detail-row">
                  <span className="profile-detail-label">{t('emailAddressLabel')}</span>
                  <strong>{profile.email}</strong>
                </div>

                <div className="profile-detail-row">
                  <span className="profile-detail-label">{t('phoneNumberLabel')}</span>
                  <strong>{profile.phone}</strong>
                </div>

                <div className="profile-detail-row">
                  <span className="profile-detail-label">{t('dateOfBirthLabel')}</span>
                  <strong>{profile.dateOfBirth}</strong>
                </div>

                <div className="profile-detail-row">
                  <span className="profile-detail-label">{t('addressLabel')}</span>
                  <strong>{profile.address}</strong>
                </div>
              </div>
            ) : (
              <form className="profile-edit-form" onSubmit={handleSubmit}>
                <div className="profile-form-grid">
                  <div className="profile-form-group">
                    <label htmlFor="fullName">{t('fullNameLabel')}</label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={editForm.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="profile-form-group">
                    <label htmlFor="email">{t('emailAddressLabel')}</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={editForm.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="profile-form-group">
                    <label htmlFor="phone">{t('phoneNumberLabel')}</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={editForm.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="profile-form-group">
                    <label htmlFor="dateOfBirth">{t('dateOfBirthLabel')}</label>
                    <input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="text"
                      value={editForm.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="profile-form-group profile-form-full">
                    <label htmlFor="address">{t('addressLabel')}</label>
                    <textarea
                      id="address"
                      name="address"
                      value={editForm.address}
                      onChange={handleChange}
                      rows="3"
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="profile-form-actions">
                  <button
                    type="button"
                    className="profile-cancel-button"
                    onClick={handleCancel}
                  >
                    {t('cancelBtn')}
                  </button>

                  <button type="submit" className="profile-save-button">
                    {t('saveChangesBtn')}
                  </button>
                </div>
              </form>
            )}
          </section>

          {/* Voter Information */}
          <section className="profile-card">
            <div className="profile-card-header">
              <div>
                <span className="profile-section-label">
                  {t('voterVerificationEyebrow')}
                </span>
                <h2>{t('voterInformationTitle')}</h2>
              </div>
            </div>

            <div className="profile-voter-info">
              <div className="profile-voter-id-box">
                <span>{t('voterIdLabel')}</span>
                <strong>{profile.voterId}</strong>
                <small>{t('verifiedVoterIdDesc')}</small>
              </div>

              <div className="profile-verification-row">
                <div className="profile-verification-icon">✓</div>

                <div>
                  <strong>{t('identityVerifiedTitle')}</strong>
                  <p>{t('identityVerifiedDesc')}</p>
                </div>
              </div>

              <div className="profile-verification-row">
                <div className="profile-verification-icon">✓</div>

                <div>
                  <strong>{t('voterRegistrationActiveTitle')}</strong>
                  <p>{t('voterRegistrationActiveDesc')}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Security Card */}
        <section className="profile-security-card">
          <div className="profile-security-icon" aria-hidden="true">
            🔒
          </div>

          <div className="profile-security-content">
            <span className="profile-section-label">{t('securityEyebrow')}</span>
            <h2>{t('keepAccountSecureTitle')}</h2>
            <p>
              {t('keepAccountSecureDesc')}
            </p>
          </div>

          <button
            type="button"
            className="profile-password-button"
            onClick={() =>
              window.alert(t('changePasswordAlert'))
            }
          >
            {t('changePasswordBtn')}
          </button>
        </section>

        {/* Account Status */}
        <section className="profile-account-status">
          <div className="profile-status-icon">✓</div>

          <div>
            <h3>{t('accountStatusActiveTitle')}</h3>
            <p>
              {t('accountStatusActiveDesc')}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Profile;
