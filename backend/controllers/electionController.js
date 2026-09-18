import db from '../config/db.js';

export const getAllElections = async (req, res) => {
  try {
    const [elections] = await db.query('SELECT * FROM elections');
    res.status(200).json({ success: true, elections });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error fetching elections' });
  }
};

export const getElectionById = async (req, res) => {
  try {
    const [elections] = await db.query('SELECT * FROM elections WHERE id = ?', [req.params.id]);
    
    if (elections.length === 0) {
      return res.status(404).json({ success: false, message: 'Election not found' });
    }

    res.status(200).json({ success: true, election: elections[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error fetching election' });
  }
};
