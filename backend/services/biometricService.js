import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from '@simplewebauthn/server';
import pool from '../config/db.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const RP_NAME = process.env.RP_NAME || 'BlockVote Digital Voting System';
const RP_ID = process.env.RP_ID || 'localhost';
const EXPECTED_ORIGIN = [
  process.env.RP_ORIGIN || 'http://localhost:5173',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://localhost:5000'
];

const CHALLENGE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 10;

/**
 * Check if an identifier (email, user id, or IP) is currently locked out
 */
export const checkRateLimit = async (identifier) => {
  const [rows] = await pool.query(
    'SELECT failed_count, locked_until FROM biometric_failed_attempts WHERE identifier = ?',
    [String(identifier)]
  );

  if (rows.length > 0) {
    const { locked_until } = rows[0];
    if (locked_until && new Date(locked_until) > new Date()) {
      const remainingSeconds = Math.ceil((new Date(locked_until) - new Date()) / 1000);
      return {
        isLocked: true,
        remainingSeconds,
        message: `Too many failed attempts. Biometric authentication is locked for ${Math.ceil(remainingSeconds / 60)} more minutes. Please use your password.`,
      };
    }
  }

  return { isLocked: false };
};

/**
 * Record a failed attempt and lock out if threshold exceeded
 */
export const recordFailedAttempt = async (identifier) => {
  const [rows] = await pool.query(
    'SELECT id, failed_count FROM biometric_failed_attempts WHERE identifier = ?',
    [String(identifier)]
  );

  if (rows.length === 0) {
    await pool.query(
      'INSERT INTO biometric_failed_attempts (identifier, failed_count) VALUES (?, 1)',
      [String(identifier)]
    );
  } else {
    const newCount = rows[0].failed_count + 1;
    let lockUntil = null;
    if (newCount >= MAX_FAILED_ATTEMPTS) {
      lockUntil = new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000);
    }
    await pool.query(
      'UPDATE biometric_failed_attempts SET failed_count = ?, locked_until = ?, last_failed_at = CURRENT_TIMESTAMP WHERE id = ?',
      [newCount, lockUntil, rows[0].id]
    );
  }
};

/**
 * Reset failed attempts upon successful authentication
 */
export const resetFailedAttempts = async (identifier) => {
  await pool.query(
    'DELETE FROM biometric_failed_attempts WHERE identifier = ?',
    [String(identifier)]
  );
};

/**
 * Record audit log entry (Never stores biometric templates or vote choices)
 */
export const logAuditEvent = async ({
  userId = null,
  voterId = null,
  action,
  status,
  failureReason = null,
  ipAddress = null,
  userAgent = null,
}) => {
  try {
    await pool.query(
      `INSERT INTO biometric_audit_logs 
       (user_id, voter_id, action, status, failure_reason, ip_address, user_agent) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, voterId, action, status, failureReason, ipAddress, userAgent]
    );
  } catch (err) {
    console.error('Audit logging error:', err);
  }
};

/**
 * Get current biometric status for a user
 */
export const getBiometricStatus = async (userId) => {
  // 1. Fetch credentials
  const [credentials] = await pool.query(
    `SELECT id, credential_id, device_type, backed_up, transports, status, created_at, last_used_at 
     FROM biometric_credentials 
     WHERE user_id = ? AND status = 'ACTIVE' 
     ORDER BY created_at DESC`,
    [userId]
  );

  // 2. Fetch last audit log
  const [lastAudit] = await pool.query(
    `SELECT action, status, failure_reason, created_at 
     FROM biometric_audit_logs 
     WHERE user_id = ? 
     ORDER BY created_at DESC LIMIT 1`,
    [userId]
  );

  // 3. Check rate limit
  const rateLimitStatus = await checkRateLimit(userId);

  return {
    hasBiometric: credentials.length > 0,
    credentialCount: credentials.length,
    credentials: credentials.map((c) => ({
      id: c.id,
      credentialId: c.credential_id.substring(0, 16) + '...',
      deviceType: c.device_type,
      backedUp: Boolean(c.backed_up),
      transports: c.transports ? JSON.parse(c.transports) : [],
      status: c.status,
      createdAt: c.created_at,
      lastUsedAt: c.last_used_at,
    })),
    lastVerification: lastAudit.length > 0 ? {
      action: lastAudit[0].action,
      status: lastAudit[0].status,
      failureReason: lastAudit[0].failure_reason,
      timestamp: lastAudit[0].created_at,
    } : null,
    isLocked: rateLimitStatus.isLocked,
    remainingSeconds: rateLimitStatus.remainingSeconds || 0,
  };
};

/**
 * Generate WebAuthn Registration Options
 */
export const generateBiometricRegistrationOptions = async (user) => {
  // Check rate limit
  const rateLimit = await checkRateLimit(user.id);
  if (rateLimit.isLocked) {
    throw new Error(rateLimit.message);
  }

  // Fetch any existing credentials so authenticator doesn't register duplicates on same device
  const [existingCreds] = await pool.query(
    'SELECT credential_id, transports FROM biometric_credentials WHERE user_id = ? AND status = "ACTIVE"',
    [user.id]
  );

  const excludeCredentials = existingCreds.map((c) => ({
    id: c.credential_id,
    transports: c.transports ? JSON.parse(c.transports) : undefined,
  }));

  const options = await generateRegistrationOptions({
    rpName: RP_NAME,
    rpID: RP_ID,
    userID: new Uint8Array(Buffer.from(String(user.id))),
    userName: user.email,
    userDisplayName: user.fullName || user.name || user.email,
    attestationType: 'none',
    excludeCredentials,
    authenticatorSelection: {
      authenticatorAttachment: 'platform', // Platform biometric authenticator (Fingerprint / Touch ID / Windows Hello)
      userVerification: 'required',        // Requires physical fingerprint / biometric check
      residentKey: 'preferred',
    },
    timeout: 60000,
  });

  // Store challenge with 5-minute expiry in DB
  const expiresAt = new Date(Date.now() + CHALLENGE_TTL_MS);
  await pool.query(
    'INSERT INTO biometric_challenges (user_id, challenge, type, expires_at) VALUES (?, ?, ?, ?)',
    [user.id, options.challenge, 'REGISTRATION', expiresAt]
  );

  return options;
};

/**
 * Verify and save WebAuthn Registration Response
 */
export const verifyAndSaveBiometricRegistration = async ({
  user,
  response,
  ipAddress = null,
  userAgent = null,
}) => {
  const rateLimit = await checkRateLimit(user.id);
  if (rateLimit.isLocked) {
    throw new Error(rateLimit.message);
  }

  // 1. Fetch active unused challenge
  const [challenges] = await pool.query(
    `SELECT id, challenge, expires_at FROM biometric_challenges 
     WHERE user_id = ? AND type = 'REGISTRATION' AND is_used = FALSE AND expires_at > NOW() 
     ORDER BY created_at DESC LIMIT 1`,
    [user.id]
  );

  if (challenges.length === 0) {
    await logAuditEvent({
      userId: user.id,
      voterId: user.voter_id,
      action: 'REGISTRATION',
      status: 'FAILED',
      failureReason: 'Challenge expired, missing, or already used',
      ipAddress,
      userAgent,
    });
    throw new Error('Registration challenge expired or invalid. Please try registering again.');
  }

  const expectedChallenge = challenges[0].challenge;

  // Immediately mark challenge as used to prevent replay attacks
  await pool.query('UPDATE biometric_challenges SET is_used = TRUE WHERE id = ?', [challenges[0].id]);

  let verification;
  try {
    verification = await verifyRegistrationResponse({
      response,
      expectedChallenge,
      expectedOrigin: EXPECTED_ORIGIN,
      expectedRPID: RP_ID,
      requireUserVerification: true,
    });
  } catch (err) {
    await recordFailedAttempt(user.id);
    await logAuditEvent({
      userId: user.id,
      voterId: user.voter_id,
      action: 'REGISTRATION',
      status: 'FAILED',
      failureReason: err.message,
      ipAddress,
      userAgent,
    });
    throw new Error(`Biometric verification failed: ${err.message}`);
  }

  const { verified, registrationInfo } = verification;
  if (!verified || !registrationInfo) {
    await recordFailedAttempt(user.id);
    await logAuditEvent({
      userId: user.id,
      voterId: user.voter_id,
      action: 'REGISTRATION',
      status: 'FAILED',
      failureReason: 'Verification returned unverified status',
      ipAddress,
      userAgent,
    });
    throw new Error('Biometric registration could not be verified by the server.');
  }

  const { credential, credentialDeviceType, credentialBackedUp, aaguid } = registrationInfo;
  const credentialID = credential.id;
  const credentialPublicKey = Buffer.from(credential.publicKey).toString('base64url');
  const counter = credential.counter;
  const transports = response.response?.transports ? JSON.stringify(response.response.transports) : null;

  // Check duplicate credential ID
  const [existing] = await pool.query(
    'SELECT id, user_id FROM biometric_credentials WHERE credential_id = ?',
    [credentialID]
  );

  if (existing.length > 0) {
    if (existing[0].user_id !== user.id) {
      await logAuditEvent({
        userId: user.id,
        voterId: user.voter_id,
        action: 'REGISTRATION',
        status: 'FAILED',
        failureReason: 'Credential already registered by another user',
        ipAddress,
        userAgent,
      });
      throw new Error('This biometric credential is already registered with another account.');
    } else {
      // Re-activating existing credential
      await pool.query(
        `UPDATE biometric_credentials 
         SET public_key = ?, counter = ?, device_type = ?, backed_up = ?, transports = ?, aaguid = ?, status = 'ACTIVE', last_used_at = CURRENT_TIMESTAMP 
         WHERE id = ?`,
        [credentialPublicKey, counter, credentialDeviceType, credentialBackedUp, transports, aaguid, existing[0].id]
      );
    }
  } else {
    // Insert new credential securely
    await pool.query(
      `INSERT INTO biometric_credentials 
       (user_id, voter_id, credential_id, public_key, counter, device_type, backed_up, transports, aaguid, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'ACTIVE')`,
      [user.id, user.voter_id || null, credentialID, credentialPublicKey, counter, credentialDeviceType, credentialBackedUp, transports, aaguid]
    );
  }

  // Clear failed attempts
  await resetFailedAttempts(user.id);

  // Audit log success
  await logAuditEvent({
    userId: user.id,
    voterId: user.voter_id,
    action: 'REGISTRATION',
    status: 'SUCCESS',
    ipAddress,
    userAgent,
  });

  return { verified: true };
};

/**
 * Generate WebAuthn Authentication Options
 */
export const generateBiometricAuthenticationOptions = async ({
  userId = null,
  emailOrVoterId = null,
}) => {
  let targetUser = null;

  if (userId) {
    const [users] = await pool.query('SELECT id, email, fullName FROM users WHERE id = ?', [userId]);
    if (users.length > 0) targetUser = users[0];
  } else if (emailOrVoterId) {
    // Try email first
    const [byEmail] = await pool.query('SELECT id, email, fullName FROM users WHERE email = ?', [emailOrVoterId.trim().toLowerCase()]);
    if (byEmail.length > 0) {
      targetUser = byEmail[0];
    } else {
      // Try voterId
      const [byVoter] = await pool.query(
        `SELECT u.id, u.email, u.fullName 
         FROM voters v 
         JOIN users u ON v.user_id = u.id 
         WHERE v.voterId = ?`,
        [emailOrVoterId.trim()]
      );
      if (byVoter.length > 0) targetUser = byVoter[0];
    }
  }

  // Check rate limit if user identified
  if (targetUser) {
    const rateLimit = await checkRateLimit(targetUser.id);
    if (rateLimit.isLocked) {
      throw new Error(rateLimit.message);
    }
  }

  let allowCredentials = [];
  if (targetUser) {
    const [creds] = await pool.query(
      'SELECT credential_id, transports FROM biometric_credentials WHERE user_id = ? AND status = "ACTIVE"',
      [targetUser.id]
    );
    if (creds.length === 0) {
      throw new Error('No fingerprint registered for this account. Please log in with password and register your fingerprint in the dashboard.');
    }
    allowCredentials = creds.map((c) => ({
      id: c.credential_id,
      transports: c.transports ? JSON.parse(c.transports) : undefined,
    }));
  }

  const options = await generateAuthenticationOptions({
    rpID: RP_ID,
    allowCredentials: allowCredentials.length > 0 ? allowCredentials : undefined,
    userVerification: 'required',
    timeout: 60000,
  });

  // Store challenge
  const expiresAt = new Date(Date.now() + CHALLENGE_TTL_MS);
  await pool.query(
    'INSERT INTO biometric_challenges (user_id, challenge, type, expires_at) VALUES (?, ?, ?, ?)',
    [targetUser ? targetUser.id : null, options.challenge, 'AUTHENTICATION', expiresAt]
  );

  return {
    options,
    targetUserId: targetUser ? targetUser.id : null,
  };
};

/**
 * Verify WebAuthn Authentication Response
 */
export const verifyBiometricAuthentication = async ({
  response,
  userId = null,
  ipAddress = null,
  userAgent = null,
}) => {
  const credentialId = response.id;

  // 1. Find credential in DB
  const [creds] = await pool.query(
    `SELECT c.*, u.fullName, u.email, u.role, v.id as voter_primary_id, v.voterId 
     FROM biometric_credentials c
     JOIN users u ON c.user_id = u.id
     LEFT JOIN voters v ON u.id = v.user_id
     WHERE c.credential_id = ? AND c.status = 'ACTIVE'`,
    [credentialId]
  );

  if (creds.length === 0) {
    if (userId) await recordFailedAttempt(userId);
    await logAuditEvent({
      userId,
      action: 'AUTHENTICATION',
      status: 'FAILED',
      failureReason: 'Unknown or revoked biometric credential',
      ipAddress,
      userAgent,
    });
    throw new Error('Unrecognized or revoked biometric credential.');
  }

  const storedCred = creds[0];
  const authenticatedUserId = storedCred.user_id;

  // Check rate limit
  const rateLimit = await checkRateLimit(authenticatedUserId);
  if (rateLimit.isLocked) {
    throw new Error(rateLimit.message);
  }

  // 2. Find active challenge
  let [challenges] = await pool.query(
    `SELECT id, challenge, expires_at FROM biometric_challenges 
     WHERE (user_id = ? OR user_id IS NULL) AND type = 'AUTHENTICATION' AND is_used = FALSE AND expires_at > NOW() 
     ORDER BY created_at DESC LIMIT 1`,
    [authenticatedUserId]
  );

  if (challenges.length === 0) {
    await recordFailedAttempt(authenticatedUserId);
    await logAuditEvent({
      userId: authenticatedUserId,
      voterId: storedCred.voter_primary_id,
      action: 'AUTHENTICATION',
      status: 'FAILED',
      failureReason: 'Authentication challenge expired or invalid',
      ipAddress,
      userAgent,
    });
    throw new Error('Authentication challenge expired or invalid. Please try again.');
  }

  const expectedChallenge = challenges[0].challenge;

  // Mark challenge used immediately to prevent replay
  await pool.query('UPDATE biometric_challenges SET is_used = TRUE WHERE id = ?', [challenges[0].id]);

  // 3. Verify with SimpleWebAuthn
  const credentialPublicKey = new Uint8Array(Buffer.from(storedCred.public_key, 'base64url'));
  let verification;

  try {
    verification = await verifyAuthenticationResponse({
      response,
      expectedChallenge,
      expectedOrigin: EXPECTED_ORIGIN,
      expectedRPID: RP_ID,
      credential: {
        id: storedCred.credential_id,
        publicKey: credentialPublicKey,
        counter: Number(storedCred.counter),
        transports: storedCred.transports ? JSON.parse(storedCred.transports) : undefined,
      },
      requireUserVerification: true,
    });
  } catch (err) {
    await recordFailedAttempt(authenticatedUserId);
    await logAuditEvent({
      userId: authenticatedUserId,
      voterId: storedCred.voter_primary_id,
      action: 'AUTHENTICATION',
      status: 'FAILED',
      failureReason: err.message,
      ipAddress,
      userAgent,
    });
    throw new Error(`Biometric verification failed: ${err.message}`);
  }

  const { verified, authenticationInfo } = verification;
  if (!verified) {
    await recordFailedAttempt(authenticatedUserId);
    await logAuditEvent({
      userId: authenticatedUserId,
      voterId: storedCred.voter_primary_id,
      action: 'AUTHENTICATION',
      status: 'FAILED',
      failureReason: 'Verification check failed',
      ipAddress,
      userAgent,
    });
    throw new Error('Biometric verification failed.');
  }

  // 4. Update counter and last_used_at in DB
  const newCounter = authenticationInfo.newCounter;
  await pool.query(
    'UPDATE biometric_credentials SET counter = ?, last_used_at = CURRENT_TIMESTAMP WHERE id = ?',
    [newCounter, storedCred.id]
  );

  // 5. Reset failed attempts
  await resetFailedAttempts(authenticatedUserId);

  // 6. Audit log
  await logAuditEvent({
    userId: authenticatedUserId,
    voterId: storedCred.voter_primary_id,
    action: 'AUTHENTICATION',
    status: 'SUCCESS',
    ipAddress,
    userAgent,
  });

  // 7. Create JWT token
  const token = jwt.sign(
    {
      id: storedCred.user_id,
      email: storedCred.email,
      role: storedCred.role,
      voter_id: storedCred.voter_primary_id,
      authMethod: 'BIOMETRIC_FINGERPRINT',
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  // Also issue short-lived biometric verification proof token (for voting confirmation)
  const verificationProofToken = jwt.sign(
    {
      userId: storedCred.user_id,
      voterId: storedCred.voter_primary_id,
      purpose: 'VOTE_VERIFICATION',
      timestamp: Date.now(),
    },
    process.env.JWT_SECRET,
    { expiresIn: '10m' }
  );

  return {
    verified: true,
    token,
    verificationProofToken,
    user: {
      id: storedCred.user_id,
      fullName: storedCred.fullName,
      email: storedCred.email,
      role: storedCred.role.toLowerCase(),
      voterId: storedCred.voterId,
    },
  };
};

/**
 * Revoke a registered biometric credential
 */
export const revokeBiometricCredential = async (userId, credentialId) => {
  const [result] = await pool.query(
    'UPDATE biometric_credentials SET status = "REVOKED" WHERE id = ? AND user_id = ?',
    [credentialId, userId]
  );

  if (result.affectedRows === 0) {
    throw new Error('Credential not found or unauthorized');
  }

  await logAuditEvent({
    userId,
    action: 'REGISTRATION',
    status: 'SUCCESS',
    failureReason: 'User revoked biometric credential',
  });

  return { success: true, message: 'Fingerprint credential removed successfully' };
};
