import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomeVotingRequest.css";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";

const HomeVotingRequest = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    voterId: user?.voterId || "",
    contact: "",
    address: "",
    reason: "elderly",
    preferredDate: "",
    preferredTime: "morning",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [requestId, setRequestId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call and saving to local storage
    setTimeout(() => {
      const newRequest = {
        id: `HVR-${Date.now()}`,
        ...formData,
        status: "Pending",
        timestamp: new Date().toISOString()
      };
      
      const existing = JSON.parse(localStorage.getItem("blockvote_home_requests") || "[]");
      localStorage.setItem("blockvote_home_requests", JSON.stringify([newRequest, ...existing]));
      
      setRequestId(newRequest.id);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  if (isSuccess) {
    return (
      <main className="home-voting-page">
        <div className="home-voting-container">
          <div className="home-voting-success-card">
            <div className="home-voting-success-icon">✓</div>
            <h2>{t('requestSubmittedSuccessTitle')}</h2>
            <p>{t('requestSubmittedSuccessDesc')}</p>
            <div className="home-voting-request-id">
              <span>{t('requestIdLabel')}</span>
              <strong>{requestId}</strong>
            </div>
            <p className="home-voting-success-note">
              {t('requestSuccessNote')}
            </p>
            <div className="home-voting-actions">
              <button 
                onClick={() => navigate("/voter-dashboard")} 
                className="home-voting-primary-btn"
              >
                {t('backToDashboard')}
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="home-voting-page">
      <div className="home-voting-container">
        <header className="home-voting-header">
          <div className="home-voting-heading">
            <span className="home-voting-eyebrow">{t('authorizedAssistanceLabel')}</span>
            <h1>{t('requestHomeVotingTitle')}</h1>
            <p>
              {t('requestHomeVotingDesc')}
            </p>
          </div>
          <Link to="/voting-method" className="home-voting-back-button">
            <span aria-hidden="true">←</span>
            {t('goBackBtn2')}
          </Link>
        </header>

        <section className="home-voting-form-card">
          <form onSubmit={handleSubmit} className="home-voting-form">
            <div className="home-voting-form-grid">
              <div className="home-voting-field">
                <label htmlFor="name">{t('fullNameLabel')}</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="home-voting-field">
                <label htmlFor="voterId">{t('voterIdLabelReq')}</label>
                <input 
                  type="text" 
                  id="voterId" 
                  name="voterId" 
                  value={formData.voterId} 
                  onChange={handleChange} 
                  required 
                  readOnly={!!user?.voterId}
                  className={user?.voterId ? "read-only-input" : ""}
                />
              </div>
              <div className="home-voting-field">
                <label htmlFor="contact">{t('contactNumberLabel')}</label>
                <input 
                  type="tel" 
                  id="contact" 
                  name="contact" 
                  value={formData.contact} 
                  onChange={handleChange} 
                  placeholder={t('enterPhoneNumberPlaceholder')} 
                  required 
                />
              </div>
              <div className="home-voting-field">
                <label htmlFor="reason">{t('eligibilityCategoryLabel')}</label>
                <select 
                  id="reason" 
                  name="reason" 
                  value={formData.reason} 
                  onChange={handleChange} 
                  required
                >
                  <option value="elderly">{t('seniorCitizenLabel')}</option>
                  <option value="mobility">{t('mobilityImpairedLabel')}</option>
                  <option value="medical">{t('medicalConditionLabel')}</option>
                  <option value="other">{t('otherAuthorizedReasonLabel')}</option>
                </select>
              </div>
            </div>

            <div className="home-voting-field full-width">
              <label htmlFor="address">{t('completeAddressLabel')}</label>
              <textarea 
                id="address" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                placeholder={t('enterFullAddressPlaceholder')}
                rows="3"
                required 
              />
            </div>

            <div className="home-voting-form-grid">
              <div className="home-voting-field">
                <label htmlFor="preferredDate">{t('preferredDateLabel')}</label>
                <input 
                  type="date" 
                  id="preferredDate" 
                  name="preferredDate" 
                  value={formData.preferredDate} 
                  onChange={handleChange} 
                  required 
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="home-voting-field">
                <label htmlFor="preferredTime">{t('preferredTimeLabel')}</label>
                <select 
                  id="preferredTime" 
                  name="preferredTime" 
                  value={formData.preferredTime} 
                  onChange={handleChange} 
                  required
                >
                  <option value="morning">{t('morningLabel')}</option>
                  <option value="afternoon">{t('afternoonLabel')}</option>
                  <option value="evening">{t('eveningLabel')}</option>
                </select>
              </div>
            </div>

            <div className="home-voting-field full-width">
              <label htmlFor="notes">{t('additionalNotesLabel')}</label>
              <textarea 
                id="notes" 
                name="notes" 
                value={formData.notes} 
                onChange={handleChange} 
                placeholder={t('additionalNotesPlaceholder')}
                rows="2"
              />
            </div>

            <div className="home-voting-form-actions">
              <button 
                type="button" 
                className="home-voting-cancel-btn"
                onClick={() => navigate("/voting-method")}
                disabled={isSubmitting}
              >
                {t('cancelBtn')}
              </button>
              <button 
                type="submit" 
                className="home-voting-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? t('submittingBtn') : t('submitRequestBtn')}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default HomeVotingRequest;
