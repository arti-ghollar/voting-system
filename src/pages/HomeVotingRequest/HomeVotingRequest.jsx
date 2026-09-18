import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomeVotingRequest.css";
import { useAuth } from "../../context/AuthContext";

const HomeVotingRequest = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
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
            <h2>Request Submitted Successfully</h2>
            <p>Your request for an authorized home visit has been recorded.</p>
            <div className="home-voting-request-id">
              <span>Request ID</span>
              <strong>{requestId}</strong>
            </div>
            <p className="home-voting-success-note">
              An election officer will review your request. You will be notified when an officer is assigned and a visit is scheduled.
            </p>
            <div className="home-voting-actions">
              <button 
                onClick={() => navigate("/voter-dashboard")} 
                className="home-voting-primary-btn"
              >
                Back to Dashboard
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
            <span className="home-voting-eyebrow">AUTHORIZED ASSISTANCE</span>
            <h1>Request Home Voting</h1>
            <p>
              Eligible voters can request an authorized election officer to visit their home for assisted voting. 
              Please provide the necessary details below.
            </p>
          </div>
          <Link to="/voting-method" className="home-voting-back-button">
            <span aria-hidden="true">←</span>
            Go Back
          </Link>
        </header>

        <section className="home-voting-form-card">
          <form onSubmit={handleSubmit} className="home-voting-form">
            <div className="home-voting-form-grid">
              <div className="home-voting-field">
                <label htmlFor="name">Full Name *</label>
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
                <label htmlFor="voterId">Voter ID *</label>
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
                <label htmlFor="contact">Contact Number *</label>
                <input 
                  type="tel" 
                  id="contact" 
                  name="contact" 
                  value={formData.contact} 
                  onChange={handleChange} 
                  placeholder="Enter phone number" 
                  required 
                />
              </div>
              <div className="home-voting-field">
                <label htmlFor="reason">Eligibility Category *</label>
                <select 
                  id="reason" 
                  name="reason" 
                  value={formData.reason} 
                  onChange={handleChange} 
                  required
                >
                  <option value="elderly">Senior Citizen (Elderly)</option>
                  <option value="mobility">Mobility Impaired / Disability</option>
                  <option value="medical">Medical Condition</option>
                  <option value="other">Other Authorized Reason</option>
                </select>
              </div>
            </div>

            <div className="home-voting-field full-width">
              <label htmlFor="address">Complete Address *</label>
              <textarea 
                id="address" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                placeholder="Enter your full residential address"
                rows="3"
                required 
              />
            </div>

            <div className="home-voting-form-grid">
              <div className="home-voting-field">
                <label htmlFor="preferredDate">Preferred Date *</label>
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
                <label htmlFor="preferredTime">Preferred Time *</label>
                <select 
                  id="preferredTime" 
                  name="preferredTime" 
                  value={formData.preferredTime} 
                  onChange={handleChange} 
                  required
                >
                  <option value="morning">Morning (9 AM - 12 PM)</option>
                  <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                  <option value="evening">Evening (4 PM - 6 PM)</option>
                </select>
              </div>
            </div>

            <div className="home-voting-field full-width">
              <label htmlFor="notes">Additional Notes (Optional)</label>
              <textarea 
                id="notes" 
                name="notes" 
                value={formData.notes} 
                onChange={handleChange} 
                placeholder="Any special instructions for the officer to find your home or assistance required."
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
                Cancel
              </button>
              <button 
                type="submit" 
                className="home-voting-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default HomeVotingRequest;
