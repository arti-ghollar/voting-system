import express from 'express';
import {
  getBiometricStatus,
  getRegistrationOptions,
  verifyRegistration,
  getAuthenticationOptions,
  verifyAuthentication,
  revokeCredential,
} from '../controllers/biometricController.js';
import { authMiddleware, optionalAuthMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Biometric enrollment status & history
router.get('/status', authMiddleware, getBiometricStatus);

// Biometric registration (enrollment) workflow - Authenticated voter only
router.post('/register/options', authMiddleware, getRegistrationOptions);
router.post('/register/verify', authMiddleware, verifyRegistration);

// Biometric authentication & verification - Supports voter login & dashboard verification
router.post('/authenticate/options', optionalAuthMiddleware, getAuthenticationOptions);
router.post('/authenticate/verify', optionalAuthMiddleware, verifyAuthentication);

// Revoke a registered credential
router.delete('/credentials/:id', authMiddleware, revokeCredential);

export default router;
