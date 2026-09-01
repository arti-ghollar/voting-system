import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
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
            <span className="profile-eyebrow">ACCOUNT SETTINGS</span>
            <h1>My Profile</h1>
            <p>
              Manage your personal information and view your voter account
              details.
            </p>
          </div>

          <Link to="/voter-dashboard" className="profile-back-button">
            <span aria-hidden="true">←</span>
            Back to Dashboard
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
                Verified Voter
              </span>

              <span className="profile-active-badge">Account Active</span>
            </div>
          </div>

          <button
            type="button"
            className="profile-edit-button"
            onClick={handleEdit}
          >
            <span aria-hidden="true">✎</span>
            Edit Profile
          </button>
        </section>

        {/* Main Content */}
        <div className="profile-content-grid">
          {/* Personal Information */}
          <section className="profile-card">
            <div className="profile-card-header">
              <div>
                <span className="profile-section-label">PERSONAL DETAILS</span>
                <h2>Personal Information</h2>
              </div>
            </div>

            {!isEditing ? (
              <div className="profile-details-list">
                <div className="profile-detail-row">
                  <span className="profile-detail-label">Full Name</span>
                  <strong>{profile.fullName}</strong>
                </div>

                <div className="profile-detail-row">
                  <span className="profile-detail-label">Email Address</span>
                  <strong>{profile.email}</strong>
                </div>

                <div className="profile-detail-row">
                  <span className="profile-detail-label">Phone Number</span>
                  <strong>{profile.phone}</strong>
                </div>

                <div className="profile-detail-row">
                  <span className="profile-detail-label">Date of Birth</span>
                  <strong>{profile.dateOfBirth}</strong>
                </div>

                <div className="profile-detail-row">
                  <span className="profile-detail-label">Address</span>
                  <strong>{profile.address}</strong>
                </div>
              </div>
            ) : (
              <form className="profile-edit-form" onSubmit={handleSubmit}>
                <div className="profile-form-grid">
                  <div className="profile-form-group">
                    <label htmlFor="fullName">Full Name</label>
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
                    <label htmlFor="email">Email Address</label>
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
                    <label htmlFor="phone">Phone Number</label>
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
                    <label htmlFor="dateOfBirth">Date of Birth</label>
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
                    <label htmlFor="address">Address</label>
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
                    Cancel
                  </button>

                  <button type="submit" className="profile-save-button">
                    Save Changes
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
                  VOTER VERIFICATION
                </span>
                <h2>Voter Information</h2>
              </div>
            </div>

            <div className="profile-voter-info">
              <div className="profile-voter-id-box">
                <span>Voter ID</span>
                <strong>{profile.voterId}</strong>
                <small>Verified voter identification</small>
              </div>

              <div className="profile-verification-row">
                <div className="profile-verification-icon">✓</div>

                <div>
                  <strong>Identity Verified</strong>
                  <p>Your identity verification has been completed.</p>
                </div>
              </div>

              <div className="profile-verification-row">
                <div className="profile-verification-icon">✓</div>

                <div>
                  <strong>Voter Registration Active</strong>
                  <p>Your voter registration is currently active.</p>
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
            <span className="profile-section-label">SECURITY</span>
            <h2>Keep your account secure</h2>
            <p>
              Never share your password, authentication codes, or private
              account information with anyone.
            </p>
          </div>

          <button
            type="button"
            className="profile-password-button"
            onClick={() =>
              window.alert("Password change will be available with backend authentication.")
            }
          >
            Change Password
          </button>
        </section>

        {/* Account Status */}
        <section className="profile-account-status">
          <div className="profile-status-icon">✓</div>

          <div>
            <h3>Account Status: Active</h3>
            <p>
              Your voter account is active and eligible to participate in
              available elections.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Profile;
