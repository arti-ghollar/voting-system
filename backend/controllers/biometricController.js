import * as biometricService from '../services/biometricService.js';

/**
 * GET /api/biometric/status
 * Returns voter biometric enrollment and last verification status
 */
export const getBiometricStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const status = await biometricService.getBiometricStatus(userId);
    res.status(200).json({
      success: true,
      ...status,
    });
  } catch (error) {
    console.error('Biometric status error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching biometric status',
    });
  }
};

/**
 * POST /api/biometric/register/options
 * Generates options and single-use challenge for WebAuthn fingerprint enrollment
 */
export const getRegistrationOptions = async (req, res) => {
  try {
    const user = req.user;
    const options = await biometricService.generateBiometricRegistrationOptions(user);
    res.status(200).json({
      success: true,
      options,
    });
  } catch (error) {
    console.error('Biometric registration options error:', error);
    const status = error.message.includes('locked') ? 429 : 400;
    res.status(status).json({
      success: false,
      message: error.message || 'Error generating biometric registration options',
    });
  }
};

/**
 * POST /api/biometric/register/verify
 * Verifies authenticator attestation response and stores credential metadata securely
 */
export const verifyRegistration = async (req, res) => {
  try {
    const user = req.user;
    const { response } = req.body;

    if (!response) {
      return res.status(400).json({
        success: false,
        message: 'Registration response payload is required',
      });
    }

    const ipAddress = req.ip || req.connection?.remoteAddress;
    const userAgent = req.headers['user-agent'];

    await biometricService.verifyAndSaveBiometricRegistration({
      user,
      response,
      ipAddress,
      userAgent,
    });

    res.status(200).json({
      success: true,
      message: 'Fingerprint credential registered successfully.',
    });
  } catch (error) {
    console.error('Biometric registration verify error:', error);
    const status = error.message.includes('locked') ? 429 : 400;
    res.status(status).json({
      success: false,
      message: error.message || 'Biometric registration verification failed',
    });
  }
};

/**
 * POST /api/biometric/authenticate/options
 * Generates authentication options for fingerprint login / verification
 */
export const getAuthenticationOptions = async (req, res) => {
  try {
    const emailOrVoterId = req.body.email || req.body.voterId || req.body.emailOrVoterId;
    const userId = req.user?.id || null;

    const result = await biometricService.generateBiometricAuthenticationOptions({
      userId,
      emailOrVoterId,
    });

    res.status(200).json({
      success: true,
      options: result.options,
    });
  } catch (error) {
    console.error('Biometric auth options error:', error);
    const status = error.message.includes('locked') ? 429 : 400;
    res.status(status).json({
      success: false,
      message: error.message || 'Error generating biometric authentication options',
    });
  }
};

/**
 * POST /api/biometric/authenticate/verify
 * Validates assertion response, checks challenge, origin, counter, signature
 */
export const verifyAuthentication = async (req, res) => {
  try {
    const { response } = req.body;
    const userId = req.user?.id || null;

    if (!response) {
      return res.status(400).json({
        success: false,
        message: 'Authentication response payload is required',
      });
    }

    const ipAddress = req.ip || req.connection?.remoteAddress;
    const userAgent = req.headers['user-agent'];

    const result = await biometricService.verifyBiometricAuthentication({
      response,
      userId,
      ipAddress,
      userAgent,
    });

    res.status(200).json({
      success: true,
      message: 'Fingerprint verified successfully.',
      token: result.token,
      verificationProofToken: result.verificationProofToken,
      user: result.user,
    });
  } catch (error) {
    console.error('Biometric auth verify error:', error);
    const status = error.message.includes('locked') ? 429 : 400;
    res.status(status).json({
      success: false,
      message: error.message || 'Biometric authentication failed',
    });
  }
};

/**
 * DELETE /api/biometric/credentials/:id
 * Revokes a registered biometric credential
 */
export const revokeCredential = async (req, res) => {
  try {
    const userId = req.user.id;
    const credentialId = req.params.id;

    const result = await biometricService.revokeBiometricCredential(userId, credentialId);
    res.status(200).json(result);
  } catch (error) {
    console.error('Biometric revoke credential error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Error revoking biometric credential',
    });
  }
};
