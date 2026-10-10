import {
  startRegistration,
  startAuthentication,
  browserSupportsWebAuthn,
  platformAuthenticatorIsAvailable,
} from '@simplewebauthn/browser';
import { api } from './api';

/**
 * Check if the current browser and platform device support biometric WebAuthn
 */
export const checkBiometricSupport = async () => {
  const isWebAuthnSupported = browserSupportsWebAuthn();
  let isPlatformSupported = false;

  if (isWebAuthnSupported) {
    try {
      isPlatformSupported = await platformAuthenticatorIsAvailable();
    } catch (e) {
      console.warn('Error checking platform authenticator availability:', e);
      isPlatformSupported = false;
    }
  }

  return {
    isSupported: isWebAuthnSupported,
    isPlatformSupported,
    canUseBiometrics: isWebAuthnSupported && isPlatformSupported,
  };
};

/**
 * Perform secure biometric fingerprint registration workflow
 */
export const registerFingerprint = async () => {
  const support = await checkBiometricSupport();
  if (!support.isSupported) {
    throw new Error('Your browser does not support WebAuthn biometric authentication.');
  }

  // 1. Request options from server
  const optRes = await api.biometric.getRegisterOptions();
  if (!optRes.success || !optRes.options) {
    throw new Error(optRes.message || 'Failed to initialize biometric enrollment options.');
  }

  // 2. Invoke browser & platform biometric authenticator
  let attResp;
  try {
    attResp = await startRegistration({ optionsJSON: optRes.options });
  } catch (error) {
    if (error.name === 'NotAllowedError') {
      throw new Error('Fingerprint registration was cancelled or timed out.');
    } else if (error.name === 'InvalidStateError') {
      throw new Error('This fingerprint credential is already registered on this device.');
    } else if (error.name === 'NotSupportedError') {
      throw new Error('Platform biometric authenticator is not supported on this device/browser.');
    }
    throw new Error(error.message || 'Fingerprint registration failed on this device.');
  }

  // 3. Send authenticator response to backend for cryptographic verification
  const verifyRes = await api.biometric.verifyRegister(attResp);
  if (!verifyRes.success) {
    throw new Error(verifyRes.message || 'Server rejected biometric registration.');
  }

  return verifyRes;
};

/**
 * Perform secure biometric fingerprint verification / authentication workflow
 */
export const verifyFingerprint = async (emailOrVoterId = null) => {
  const support = await checkBiometricSupport();
  if (!support.isSupported) {
    throw new Error('Your browser does not support WebAuthn biometric authentication.');
  }

  // 1. Request options from server
  const optRes = await api.biometric.getAuthOptions(emailOrVoterId);
  if (!optRes.success || !optRes.options) {
    throw new Error(optRes.message || 'Failed to initialize biometric authentication.');
  }

  // 2. Invoke browser & platform biometric authenticator
  let asseResp;
  try {
    asseResp = await startAuthentication({ optionsJSON: optRes.options });
  } catch (error) {
    if (error.name === 'NotAllowedError') {
      throw new Error('Fingerprint verification was cancelled or timed out.');
    } else if (error.name === 'NotSupportedError') {
      throw new Error('Platform biometric authenticator is not available.');
    }
    throw new Error(error.message || 'Fingerprint verification failed.');
  }

  // 3. Send authentication response to backend for cryptographic verification
  const verifyRes = await api.biometric.verifyAuth(asseResp);
  if (!verifyRes.success) {
    throw new Error(verifyRes.message || 'Server rejected biometric verification.');
  }

  return verifyRes;
};

/**
 * Get current biometric enrollment status from backend
 */
export const getBiometricStatus = async () => {
  try {
    return await api.biometric.getStatus();
  } catch (err) {
    console.error('Failed to get biometric status:', err);
    return {
      success: false,
      hasBiometric: false,
      credentialCount: 0,
      message: err.message,
    };
  }
};

/**
 * Revoke registered fingerprint credential
 */
export const revokeFingerprint = async (credentialId) => {
  return await api.biometric.revokeCredential(credentialId);
};
