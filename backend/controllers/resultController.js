import pool from '../config/db.js';

export const getResultsByElection = async (req, res) => {
  try {
    const { electionId } = req.params;

    // 1. Get election info
    const [elections] = await pool.query('SELECT id, title FROM elections WHERE id = ?', [electionId]);
    if (elections.length === 0) {
      return res.status(404).json({ success: false, message: 'Election not found' });
    }
    const election = elections[0];

    // 2. Calculate total votes cast
    const [totalVotesResult] = await pool.query('SELECT COUNT(*) as total FROM votes WHERE electionId = ?', [electionId]);
    const totalVotes = totalVotesResult[0].total;

    // 3. Get results per candidate
    const [candidateResults] = await pool.query(`
      SELECT c.id as candidateId, c.name as candidateName, c.party, 
             COUNT(v.id) as votes
      FROM candidates c
      LEFT JOIN votes v ON c.id = v.candidateId AND v.electionId = ?
      WHERE c.electionId = ?
      GROUP BY c.id
      ORDER BY votes DESC
    `, [electionId, electionId]);

    // 4. Format results with percentage
    const formattedResults = candidateResults.map(cr => ({
      candidateId: cr.candidateId,
      candidateName: cr.candidateName,
      party: cr.party,
      votes: cr.votes,
      percentage: totalVotes > 0 ? ((cr.votes / totalVotes) * 100).toFixed(2) : 0
    }));

    res.status(200).json({
      success: true,
      election,
      totalVotes,
      results: formattedResults
    });

  } catch (error) {
    console.error("Get results error:", error);
    res.status(500).json({ success: false, message: 'Server error fetching results' });
  }
};

export const getCandidateResults = async (req, res) => {
  // Essentially the same logic, but maybe they just want the raw list
  // For now, we can just redirect or return the same response
  return getResultsByElection(req, res);
};
