import db from '../config/db.js';

export const getElectionResults = async (req, res) => {
  try {
    const { electionId } = req.params;

    // Get total votes
    const [totalVotesRes] = await db.query('SELECT COUNT(*) as total FROM votes WHERE election_id = ?', [electionId]);
    const totalVotes = totalVotesRes[0].total;

    // Get candidate vote counts
    const [results] = await db.query(`
      SELECT 
        c.id, c.name, c.party, c.image, c.symbol, c.position,
        COUNT(v.id) as votes
      FROM candidates c
      LEFT JOIN votes v ON c.id = v.candidate_id
      WHERE c.election_id = ?
      GROUP BY c.id
      ORDER BY votes DESC
    `, [electionId]);

    const formattedResults = results.map(r => ({
      ...r,
      percentage: totalVotes > 0 ? ((r.votes / totalVotes) * 100).toFixed(2) : 0
    }));

    res.status(200).json({ success: true, results: formattedResults, totalVotes });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error fetching results' });
  }
};
