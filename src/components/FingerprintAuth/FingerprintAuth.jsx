import React, { useState, useEffect, useCallback } from 'react';
import FingerprintIcon from './FingerprintIcon';
import {
  checkBiometricSupport,
  registerFingerprint,
  verifyFingerprint,
  getBiometricStatus,
  revokeFingerprint,
} from '../../services/biometricService';
import './FingerprintAuth.css';

export const FingerprintAuth = ({
  onVerified = null,
  mode = 'dashboard', // 'dashboard' | 'verify-modal' | 'ballot-step'
  title = 'Fingerprint Authentication',
  actionLabel = 'Verify Fingerprint to Cast Ballot',
}) => {
  const [support, setSupport] = useState({
    isSupported: true,
    isPlatformSupported: true,
    canUseBiometrics: true,
  });
  const [status, setStatus] = useState({
    hasBiometric: false,
    credentialCount: 0,
    credentials: [],
    lastVerification: null,
    isLocked: false,
    remainingSeconds: 0,
  });
  const [loading, setLoading] = useState(false);
  const [fetchingStatus, setFetchingStatus] = useState(true);
  const [activeAction, setActiveAction] = useState(null); // 'register' | 'verify' | 'revoke'
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  // 1. Initial check of browser support and backend status
  const loadStatus = useCallback(async () => {
    try {
      const sup = await checkBiometricSupport();
      setSupport(sup);

      const st = await getBiometricStatus();
      if (st.success) {
        setStatus({
          hasBiometric: st.hasBiometric,
          credentialCount: st.credentialCount,
          credentials: st.credentials || [],
          lastVerification: st.lastVerification,
          isLocked: st.isLocked,
          remainingSeconds: st.remainingSeconds || 0,
        });
      }
    } catch (err) {
      console.error('Error initializing fingerprint auth:', err);
    } finally {
      setFetchingStatus(false);
    }
  }, []);

  useEffect(() => {
    loadStatus();
  }, [loadStatus]);

  // 2. Handle Biometric Registration
  const handleRegister = async () => {
    setFeedback({ type: '', message: '' });
    setLoading(true);
    setActiveAction('register');

    try {
      const result = await registerFingerprint();
      setFeedback({
        type: 'success',
        message: result.message || 'Fingerprint credential registered successfully! You can now verify with biometrics.',
      });
      await loadStatus();
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err.message || 'Registration failed. Please try again.',
      });
    } finally {
      setLoading(false);
      setActiveAction(null);
    }
  };

  // 3. Handle Biometric Verification
  const handleVerify = async () => {
    setFeedback({ type: '', message: '' });
    setLoading(true);
    setActiveAction('verify');

    try {
      const result = await verifyFingerprint();
      setFeedback({
        type: 'success',
        message: result.message || 'Fingerprint verified successfully! Identity authenticated.',
      });
      await loadStatus();

      if (onVerified && typeof onVerified === 'function') {
        onVerified({
          verified: true,
          token: result.token,
          verificationProofToken: result.verificationProofToken,
        });
      }
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err.message || 'Verification failed. Please try again or use your secure password.',
      });
      await loadStatus();
    } finally {
      setLoading(false);
      setActiveAction(null);
    }
  };

  // 4. Handle Credential Revocation
  const handleRevoke = async (id) => {
    if (!window.confirm('Are you sure you want to remove this registered fingerprint credential?')) {
      return;
    }

    setLoading(true);
    setActiveAction('revoke');
    try {
      const res = await revokeFingerprint(id);
      setFeedback({
        type: 'success',
        message: res.message || 'Fingerprint credential removed successfully.',
      });
      await loadStatus();
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err.message || 'Failed to remove credential.',
      });
    } finally {
      setLoading(false);
      setActiveAction(null);
    }
  };

  const formatTimestamp = (ts) => {
    if (!ts) return 'None yet';
    try {
      return new Date(ts).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      });
    } catch {
      return ts;
    }
  };

  return (
    <section className={`fingerprint-auth-card mode-${mode}`} aria-labelledby="fingerprint-auth-heading">
      {/* ================= CARD HEADER ================= */}
      <div className="fingerprint-auth-header">
        <div className="fingerprint-auth-icon-wrap" aria-hidden="true">
          <div className={`fingerprint-icon-aura ${loading ? 'scanning' : status.hasBiometric ? 'active' : ''}`}>
            <FingerprintIcon size={34} color={status.hasBiometric ? '#2563eb' : '#64748b'} />
          </div>
        </div>

        <div className="fingerprint-auth-title-area">
          <div className="fingerprint-eyebrow">
            <span className="fingerprint-eyebrow-dot" />
            WEBAUTHN FIDO2 PLATFORM BIOMETRICS
          </div>
          <h2 id="fingerprint-auth-heading">{title}</h2>
          <p className="fingerprint-auth-subtitle">
            Secure client-side biometric verification via Touch ID, Windows Hello, or Android fingerprint sensors.
            Raw fingerprint templates never leave your device.
          </p>
        </div>

        <div className="fingerprint-header-status-badge">
          {fetchingStatus ? (
            <span className="fp-badge fp-badge-neutral">Checking status...</span>
          ) : status.isLocked ? (
            <span className="fp-badge fp-badge-locked">
              <span className="fp-dot red" /> Locked ({Math.ceil(status.remainingSeconds / 60)}m)
            </span>
          ) : status.hasBiometric ? (
            <span className="fp-badge fp-badge-active">
              <span className="fp-dot green" /> Biometrics Enrolled
            </span>
          ) : (
            <span className="fp-badge fp-badge-unregistered">
              <span className="fp-dot amber" /> Not Enrolled
            </span>
          )}
        </div>
      </div>

      {/* ================= BROWSER / DEVICE COMPATIBILITY ALERT ================= */}
      {!support.isSupported && (
        <div className="fp-alert fp-alert-warning" role="alert">
          <span className="fp-alert-icon">⚠️</span>
          <div>
            <strong>Browser Incompatible</strong>
            <p>
              Your current browser does not support the WebAuthn standard. You can continue using your secure password
              authentication for all voting activities.
            </p>
          </div>
        </div>
      )}

      {support.isSupported && !support.isPlatformSupported && (
        <div className="fp-alert fp-alert-info" role="note">
          <span className="fp-alert-icon">ℹ️</span>
          <div>
            <strong>No Platform Biometric Sensor Detected</strong>
            <p>
              A platform biometric sensor (Fingerprint reader, Touch ID, or Windows Hello) was not detected on this device.
              If you have an external security key or biometric device, you may still connect it, or use password authentication.
            </p>
          </div>
        </div>
      )}

      {/* ================= NOTIFICATIONS & FEEDBACK ================= */}
      {feedback.message && (
        <div className={`fp-alert fp-alert-${feedback.type}`} role="alert" aria-live="polite">
          <span className="fp-alert-icon">{feedback.type === 'success' ? '✓' : '⚠️'}</span>
          <div>
            <strong>{feedback.type === 'success' ? 'Success' : 'Notice'}</strong>
            <p>{feedback.message}</p>
          </div>
          <button
            type="button"
            className="fp-alert-close"
            onClick={() => setFeedback({ type: '', message: '' })}
            aria-label="Close message"
          >
            ×
          </button>
        </div>
      )}

      {/* ================= STATUS GRID ================= */}
      <div className="fingerprint-status-grid">
        {/* Status Item 1: Enrollment */}
        <div className="fingerprint-status-item">
          <span className="fp-status-label">Biometric Authentication Status</span>
          <div className="fp-status-value-row">
            <span className={`fp-status-indicator ${status.hasBiometric ? 'enrolled' : 'not-enrolled'}`} />
            <strong className="fp-status-value">
              {fetchingStatus
                ? 'Loading...'
                : status.hasBiometric
                ? `Enrolled (${status.credentialCount} ${status.credentialCount === 1 ? 'Credential' : 'Credentials'})`
                : 'Not Enrolled'}
            </strong>
          </div>
          <small className="fp-status-desc">
            {status.hasBiometric
              ? 'Platform biometric public key securely registered on server.'
              : 'Register your device fingerprint sensor for instant 1-tap verification.'}
          </small>
        </div>

        {/* Status Item 2: Last Verification */}
        <div className="fingerprint-status-item">
          <span className="fp-status-label">Last Verification Status</span>
          <div className="fp-status-value-row">
            {status.lastVerification ? (
              <span className={`fp-status-indicator ${status.lastVerification.status === 'SUCCESS' ? 'enrolled' : 'failed'}`} />
            ) : (
              <span className="fp-status-indicator neutral" />
            )}
            <strong className="fp-status-value">
              {status.lastVerification
                ? `${status.lastVerification.status} (${formatTimestamp(status.lastVerification.timestamp)})`
                : 'No verifications recorded'}
            </strong>
          </div>
          <small className="fp-status-desc">
            {status.lastVerification?.failureReason
              ? `Reason: ${status.lastVerification.failureReason}`
              : 'Cryptographic assertion audit record preserved with zero knowledge.'}
          </small>
        </div>
      </div>

      {/* ================= CREDENTIAL DETAILS (IF ENROLLED) ================= */}
      {status.hasBiometric && status.credentials.length > 0 && (
        <div className="fingerprint-credentials-list">
          <span className="fp-credentials-title">Registered Biometric Devices</span>
          <div className="fp-cred-chips">
            {status.credentials.map((cred) => (
              <div key={cred.id} className="fp-cred-chip">
                <div className="fp-cred-chip-info">
                  <span className="fp-cred-type">
                    🛡️ {cred.deviceType === 'singleDevice' ? 'Platform Authenticator' : 'Security Key'}
                  </span>
                  <span className="fp-cred-id">ID: {cred.credentialId}</span>
                  <span className="fp-cred-date">Registered: {formatTimestamp(cred.createdAt)}</span>
                </div>
                <button
                  type="button"
                  className="fp-cred-remove-btn"
                  onClick={() => handleRevoke(cred.id)}
                  disabled={loading}
                  title="Remove credential"
                  aria-label="Remove biometric credential"
                >
                  Revoke
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= ACTION BUTTONS & CONTROLS ================= */}
      <div className="fingerprint-actions-bar">
        {/* Register Fingerprint Button */}
        <button
          type="button"
          id="btn-register-fingerprint"
          className="fp-button fp-btn-register"
          onClick={handleRegister}
          disabled={loading || status.isLocked || !support.isSupported}
        >
          {loading && activeAction === 'register' ? (
            <>
              <span className="fp-spinner" aria-hidden="true" />
              <span>Touch sensor to register...</span>
            </>
          ) : (
            <>
              <FingerprintIcon size={18} />
              <span>{status.hasBiometric ? 'Add / Re-register Fingerprint' : 'Register Fingerprint'}</span>
            </>
          )}
        </button>

        {/* Verify Fingerprint Button */}
        <button
          type="button"
          id="btn-verify-fingerprint"
          className={`fp-button fp-btn-verify ${!status.hasBiometric ? 'fp-btn-disabled-hint' : ''}`}
          onClick={handleVerify}
          disabled={loading || status.isLocked || !support.isSupported || !status.hasBiometric}
        >
          {loading && activeAction === 'verify' ? (
            <>
              <span className="fp-spinner" aria-hidden="true" />
              <span>Scan fingerprint now...</span>
            </>
          ) : (
            <>
              <span className="fp-check-icon">✓</span>
              <span>{mode === 'ballot-step' ? actionLabel : 'Verify Fingerprint'}</span>
            </>
          )}
        </button>
      </div>

      {/* ================= SECURITY FOOTNOTE ================= */}
      <footer className="fingerprint-security-footnote">
        <span className="fp-lock-icon">🔒</span>
        <span>
          <strong>Zero-Knowledge Privacy:</strong> Your fingerprint never leaves your physical device hardware.
          The server only verifies an asymmetric public-key signature conforming to W3C WebAuthn Level 3 specifications.
        </span>
      </footer>
    </section>
  );
};

export default FingerprintAuth;
