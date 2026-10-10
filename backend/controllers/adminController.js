import pool from '../config/db.js';

export const getDashboardStats = async (req, res) => {
  try {
    const [[{ totalUsers }]] = await pool.query('SELECT COUNT(*) as totalUsers FROM users');
    const [[{ totalVoters }]] = await pool.query('SELECT COUNT(*) as totalVoters FROM voters');
    const [[{ totalElections }]] = await pool.query('SELECT COUNT(*) as totalElections FROM elections');
    const [[{ activeElections }]] = await pool.query('SELECT COUNT(*) as activeElections FROM elections WHERE status = "ACTIVE"');
    const [[{ totalCandidates }]] = await pool.query('SELECT COUNT(*) as totalCandidates FROM candidates');
    const [[{ totalVotes }]] = await pool.query('SELECT COUNT(*) as totalVotes FROM votes');
    const [[{ totalBiometrics }]] = await pool.query('SELECT COUNT(*) as totalBiometrics FROM biometric_credentials WHERE status = "ACTIVE"');
    
    const [recentActivity] = await pool.query(`
      SELECT v.id, v.voted_at, e.title as electionTitle, u.fullName as voterName
      FROM votes v
      JOIN elections e ON v.electionId = e.id
      JOIN voters vo ON v.voterId = vo.id
      JOIN users u ON vo.user_id = u.id
      ORDER BY v.voted_at DESC
      LIMIT 10
    `);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalVoters,
        totalElections,
        activeElections,
        totalCandidates,
        totalVotes,
        totalBiometrics,
        recentActivity
      }
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ success: false, message: 'Server error fetching dashboard stats' });
  }
};

export const getUsers = async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, fullName, email, role, created_at FROM users ORDER BY created_at DESC');
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ success: false, message: 'Server error fetching users' });
  }
};

export const getVoters = async (req, res) => {
  try {
    const [voters] = await pool.query(`
      SELECT v.id as voter_id, v.voterId, v.is_verified, u.fullName, u.email 
      FROM voters v
      JOIN users u ON v.user_id = u.id
    `);
    res.status(200).json({ success: true, voters });
  } catch (error) {
    console.error("Get voters error:", error);
    res.status(500).json({ success: false, message: 'Server error fetching voters' });
  }
};

export const getElections = async (req, res) => {
  try {
    const [elections] = await pool.query('SELECT * FROM elections ORDER BY created_at DESC');
    res.status(200).json({ success: true, elections });
  } catch (error) {
    console.error("Get elections admin error:", error);
    res.status(500).json({ success: false, message: 'Server error fetching elections' });
  }
};

export const getCandidates = async (req, res) => {
  try {
    const [candidates] = await pool.query(`
      SELECT c.*, e.title as electionTitle 
      FROM candidates c
      JOIN elections e ON c.electionId = e.id
    `);
    res.status(200).json({ success: true, candidates });
  } catch (error) {
    console.error("Get candidates admin error:", error);
    res.status(500).json({ success: false, message: 'Server error fetching candidates' });
  }
};

export const getVotes = async (req, res) => {
  try {
    const [votes] = await pool.query(`
      SELECT v.id, v.voted_at, e.title as electionTitle, c.name as candidateName, u.fullName as voterName
      FROM votes v
      JOIN elections e ON v.electionId = e.id
      JOIN candidates c ON v.candidateId = c.id
      JOIN voters vo ON v.voterId = vo.id
      JOIN users u ON vo.user_id = u.id
      ORDER BY v.voted_at DESC
    `);
    res.status(200).json({ success: true, votes });
  } catch (error) {
    console.error("Get votes admin error:", error);
    res.status(500).json({ success: false, message: 'Server error fetching votes' });
  }
};

export const getResults = async (req, res) => {
  // Returns all results for all elections
  try {
    const [results] = await pool.query(`
      SELECT e.title as electionTitle, c.name as candidateName, c.party, COUNT(v.id) as totalVotes
      FROM elections e
      JOIN candidates c ON e.id = c.electionId
      LEFT JOIN votes v ON c.id = v.candidateId
      GROUP BY e.id, c.id
      ORDER BY e.id, totalVotes DESC
    `);
    res.status(200).json({ success: true, results });
  } catch (error) {
    console.error("Get results admin error:", error);
    res.status(500).json({ success: false, message: 'Server error fetching results' });
  }
};

export const getBiometricLogs = async (req, res) => {
  try {
    const [logs] = await pool.query(`
      SELECT b.id, b.action, b.status, b.failure_reason, b.created_at, b.ip_address, u.fullName, u.email, v.voterId
      FROM biometric_audit_logs b
      LEFT JOIN users u ON b.user_id = u.id
      LEFT JOIN voters v ON b.voter_id = v.id
      ORDER BY b.created_at DESC
      LIMIT 100
    `);
    res.status(200).json({ success: true, logs });
  } catch (error) {
    console.error("Get biometric logs error:", error);
    res.status(500).json({ success: false, message: 'Server error fetching biometric audit logs' });
  }
};
