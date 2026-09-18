CREATE DATABASE IF NOT EXISTS voting_system;
USE voting_system;

CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'voter', 'center_operator', 'home_officer') DEFAULT 'voter',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS elections (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(255) NOT NULL,
  status ENUM('UPCOMING', 'ACTIVE', 'CLOSED') DEFAULT 'UPCOMING',
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS candidates (
  id VARCHAR(255) PRIMARY KEY,
  election_id VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  party VARCHAR(255),
  position VARCHAR(255),
  symbol VARCHAR(255),
  image TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (election_id) REFERENCES elections(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS votes (
  id VARCHAR(255) PRIMARY KEY,
  election_id VARCHAR(255) NOT NULL,
  candidate_id VARCHAR(255) NOT NULL,
  voter_id VARCHAR(255) NOT NULL,
  voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (election_id) REFERENCES elections(id) ON DELETE CASCADE,
  FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE,
  FOREIGN KEY (voter_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(election_id, voter_id)
);

-- Insert demo admin user (password: admin123)
-- Hash generated via bcrypt (cost 10) for 'admin123'
INSERT IGNORE INTO users (id, name, email, password, role) VALUES 
('admin_001', 'System Admin', 'admin@blockvote.local', '$2a$10$tZ2R.dKxS.o8E/0n/1F3u.bA.nZz1gP3nO/5rFmZk6sK.zN/u.1hS', 'admin');
