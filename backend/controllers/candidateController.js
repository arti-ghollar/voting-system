import db from '../config/db.js';

export const getCandidatesByElection = async (req, res) => {
  try {
    const { electionId } = req.params;
    const [candidates] = await db.query('SELECT * FROM candidates WHERE election_id = ?', [electionId]);
    
    res.status(200).json({ success: true, candidates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error fetching candidates' });
  }
};
