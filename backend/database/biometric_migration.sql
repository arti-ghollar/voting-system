-- ====================================================================
-- BIOMETRIC FINGERPRINT AUTHENTICATION MIGRATION
-- Project: Secure Fingerprint Authentication for Voting System
-- Standards: WebAuthn / FIDO2 Level 2/3 platform authenticator integration
-- Note: Raw fingerprint images and templates are NEVER stored in this database.
-- ====================================================================

USE voting_system;

-- 1. Table: biometric_credentials
-- Stores public key credentials registered by voters via platform authenticators.
CREATE TABLE IF NOT EXISTS biometric_credentials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  voter_id INT NULL,
  credential_id VARCHAR(512) NOT NULL UNIQUE,
  public_key LONGTEXT NOT NULL,
  counter BIGINT NOT NULL DEFAULT 0,
  device_type VARCHAR(64) DEFAULT 'singleDevice',
  backed_up BOOLEAN DEFAULT FALSE,
  transports VARCHAR(255) DEFAULT NULL,
  aaguid VARCHAR(128) DEFAULT NULL,
  status ENUM('ACTIVE', 'REVOKED') DEFAULT 'ACTIVE',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_used_at TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (voter_id) REFERENCES voters(id) ON DELETE SET NULL,
  INDEX idx_biometric_user_id (user_id),
  INDEX idx_biometric_voter_id (voter_id),
  INDEX idx_biometric_credential_id (credential_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Table: biometric_challenges
-- Cryptographically secure server-generated challenges with strict 5-minute TTL & single-use consumption.
CREATE TABLE IF NOT EXISTS biometric_challenges (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  challenge VARCHAR(255) NOT NULL,
  type ENUM('REGISTRATION', 'AUTHENTICATION') NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  is_used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_challenge_lookup (challenge, is_used)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Table: biometric_audit_logs
-- Audit log of authentication and enrollment attempts.
-- Preserves voter privacy: never contains raw biometric data or secret vote choices.
CREATE TABLE IF NOT EXISTS biometric_audit_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  voter_id INT NULL,
  action ENUM('REGISTRATION', 'AUTHENTICATION', 'VOTE_VERIFICATION') NOT NULL,
  status ENUM('SUCCESS', 'FAILED') NOT NULL,
  failure_reason VARCHAR(255) NULL,
  ip_address VARCHAR(128) NULL,
  user_agent VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_audit_user (user_id),
  INDEX idx_audit_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Table: biometric_failed_attempts
-- Protection against brute force and replay attacks via temporary lockout.
CREATE TABLE IF NOT EXISTS biometric_failed_attempts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  identifier VARCHAR(255) NOT NULL UNIQUE,
  failed_count INT DEFAULT 1,
  last_failed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  locked_until TIMESTAMP NULL,
  INDEX idx_failed_identifier (identifier)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
