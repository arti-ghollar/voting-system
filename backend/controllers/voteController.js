import db from '../config/db.js';
import crypto from 'crypto';

export const castVote = async (req, res) => {
  try {
    const { electionId, candidateId } = req.body;
    const voterId = req.user.id;

    if (!electionId || !candidateId) {
      return res.status(400).json({ success: false, message: 'Missing election or candidate ID' });
    }

    // Verify election is active
    const [elections] = await db.query('SELECT status FROM elections WHERE id = ?', [electionId]);
    if (elections.length === 0) {
      return res.status(404).json({ success: false, message: 'Election not found' });
    }
    if (elections[0].status !== 'ACTIVE') {
      return res.status(400).json({ success: false, message: 'This election is not active' });
    }

    // Verify candidate belongs to election
    const [candidates] = await db.query('SELECT id FROM candidates WHERE id = ? AND election_id = ?', [candidateId, electionId]);
    if (candidates.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid candidate for this election' });
    }

    // Verify voter hasn't voted yet
    const [existingVotes] = await db.query('SELECT id FROM votes WHERE election_id = ? AND voter_id = ?', [electionId, voterId]);
    if (existingVotes.length > 0) {
      return res.status(400).json({ success: false, message: 'You have already voted in this election' });
    }

    // Insert vote
    const voteId = 'VOTE-' + crypto.randomBytes(8).toString('hex');
    await db.query(
      'INSERT INTO votes (id, election_id, candidate_id, voter_id) VALUES (?, ?, ?, ?)',
      [voteId, electionId, candidateId, voterId]
    );

    res.status(201).json({ success: true, message: 'Vote cast successfully', transactionId: voteId });

  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ success: false, message: 'You have already voted in this election' });
    }
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error casting vote' });
  }
};

export const getMyVotes = async (req, res) => {
  try {
    const voterId = req.user.id;
    const [votes] = await db.query('SELECT * FROM votes WHERE voter_id = ?', [voterId]);
    res.status(200).json({ success: true, votes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error fetching votes' });
  }
};
