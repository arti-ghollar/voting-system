import pool from '../config/db.js';
import jwt from 'jsonwebtoken';
import { logAuditEvent } from '../services/biometricService.js';

export const castVote = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const { electionId, candidateId, biometricVerificationProofToken } = req.body;
    const userId = req.user.id;
    const voterId = req.user.voter_id; // Primary key in voters table

    if (!electionId || !candidateId) {
      connection.release();
      return res.status(400).json({ success: false, message: 'Election ID and Candidate ID are required' });
    }

    if (req.user.role.toUpperCase() !== 'VOTER' || !voterId) {
      connection.release();
      return res.status(403).json({ success: false, message: 'Only registered and eligible voters can cast a vote' });
    }

    // Start database transaction for concurrency safety & ACID guarantees
    await connection.beginTransaction();

    // 1. Resolve and verify election status (concurrency safe with row-level lock)
    let actualElectionId = electionId;
    let [elections] = await connection.query(
      'SELECT id, title, status FROM elections WHERE id = ? FOR UPDATE',
      [electionId]
    );

    if (elections.length === 0 && isNaN(electionId)) {
      // Allow matching by code/title e.g. "GE-2026"
      [elections] = await connection.query(
        'SELECT id, title, status FROM elections WHERE title LIKE ? FOR UPDATE',
        [`%${electionId}%`]
      );
    }

    if (elections.length === 0) {
      await connection.rollback();
      connection.release();
      return res.status(404).json({ success: false, message: 'Election not found' });
    }

    const currentElection = elections[0];
    actualElectionId = currentElection.id;

    if (currentElection.status !== 'ACTIVE') {
      await connection.rollback();
      connection.release();
      return res.status(400).json({
        success: false,
        message: `This election is currently ${currentElection.status.toLowerCase()}. Voting is only allowed on active elections.`,
      });
    }

    // 2. Resolve and verify candidate belongs to this election
    let actualCandidateId = candidateId;
    let [candidates] = await connection.query(
      'SELECT id, name FROM candidates WHERE id = ? AND electionId = ? FOR UPDATE',
      [candidateId, actualElectionId]
    );

    if (candidates.length === 0 && isNaN(candidateId)) {
      // Map candidate codes like "candidate-1"
      const candidateList = await connection.query(
        'SELECT id, name FROM candidates WHERE electionId = ? ORDER BY id ASC',
        [actualElectionId]
      );
      if (candidateList[0].length > 0) {
        const index = parseInt(String(candidateId).replace(/\D/g, ''), 10) - 1;
        if (index >= 0 && index < candidateList[0].length) {
          actualCandidateId = candidateList[0][index].id;
          candidates = [candidateList[0][index]];
        }
      }
    }

    if (candidates.length === 0) {
      await connection.rollback();
      connection.release();
      return res.status(400).json({ success: false, message: 'Invalid candidate for this election' });
    }

    // 3. One Voter, One Vote Enforcement: Check if user already voted with FOR UPDATE lock
    const [existingVotes] = await connection.query(
      'SELECT id FROM votes WHERE electionId = ? AND voterId = ? FOR UPDATE',
      [actualElectionId, voterId]
    );

    if (existingVotes.length > 0) {
      await connection.rollback();
      connection.release();
      return res.status(400).json({
        success: false,
        message: 'You have already voted in this election. One voter, one vote is strictly enforced.',
      });
    }

    // 4. Verify optional biometric verification proof token
    let biometricVerified = false;
    if (biometricVerificationProofToken) {
      try {
        const decoded = jwt.verify(biometricVerificationProofToken, process.env.JWT_SECRET);
        if (decoded.userId === userId && decoded.purpose === 'VOTE_VERIFICATION') {
          biometricVerified = true;
          // Log audit event for vote verification (Preserves secret ballot: does NOT store candidate or ballot choice)
          await logAuditEvent({
            userId,
            voterId,
            action: 'VOTE_VERIFICATION',
            status: 'SUCCESS',
            ipAddress: req.ip || req.connection?.remoteAddress,
            userAgent: req.headers['user-agent'],
          });
        }
      } catch (tokenErr) {
        console.warn('Biometric verification token invalid or expired:', tokenErr.message);
      }
    }

    // 5. Store vote securely in atomic transaction
    await connection.query(
      'INSERT INTO votes (electionId, candidateId, voterId) VALUES (?, ?, ?)',
      [actualElectionId, actualCandidateId, voterId]
    );

    // 6. Update results table
    const [results] = await connection.query(
      'SELECT id FROM results WHERE electionId = ? AND candidateId = ? FOR UPDATE',
      [actualElectionId, actualCandidateId]
    );

    if (results.length > 0) {
      await connection.query(
        'UPDATE results SET totalVotes = totalVotes + 1 WHERE electionId = ? AND candidateId = ?',
        [actualElectionId, actualCandidateId]
      );
    } else {
      await connection.query(
        'INSERT INTO results (electionId, candidateId, totalVotes) VALUES (?, ?, 1)',
        [actualElectionId, actualCandidateId]
      );
    }

    // Commit transaction
    await connection.commit();
    connection.release();

    const transactionId = `TX-BV-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    return res.status(201).json({
      success: true,
      message: 'Vote submitted successfully and recorded.',
      transactionId,
      biometricVerified,
    });
  } catch (error) {
    await connection.rollback();
    connection.release();
    console.error('Cast vote error:', error);

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        success: false,
        message: 'You have already voted in this election.',
      });
    }

    res.status(500).json({ success: false, message: 'Server error casting vote' });
  }
};

export const getMyVotes = async (req, res) => {
  try {
    const voterId = req.user.voter_id;
    if (!voterId) {
      return res.status(200).json({ success: true, votes: [] });
    }

    const [votes] = await pool.query(
      `SELECT v.id, v.electionId, v.electionId as election_id, v.candidateId, v.voted_at, 
              e.title as electionTitle, c.name as candidateName 
       FROM votes v
       JOIN elections e ON v.electionId = e.id
       JOIN candidates c ON v.candidateId = c.id
       WHERE v.voterId = ?
       ORDER BY v.voted_at DESC`,
      [voterId]
    );

    res.status(200).json({ success: true, votes });
  } catch (error) {
    console.error('Get my votes error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching votes' });
  }
};

export const checkVote = async (req, res) => {
  try {
    const { electionId } = req.params;
    const voterId = req.user.voter_id;

    if (!voterId) {
      return res.status(200).json({ success: true, hasVoted: false });
    }

    // Check by exact electionId or matching election
    let [votes] = await pool.query(
      'SELECT id FROM votes WHERE electionId = ? AND voterId = ?',
      [electionId, voterId]
    );

    if (votes.length === 0 && isNaN(electionId)) {
      const [elections] = await pool.query(
        'SELECT id FROM elections WHERE title LIKE ?',
        [`%${electionId}%`]
      );
      if (elections.length > 0) {
        [votes] = await pool.query(
          'SELECT id FROM votes WHERE electionId = ? AND voterId = ?',
          [elections[0].id, voterId]
        );
      }
    }

    res.status(200).json({ success: true, hasVoted: votes.length > 0 });
  } catch (error) {
    console.error('Check vote error:', error);
    res.status(500).json({ success: false, message: 'Server error checking vote status' });
  }
};
