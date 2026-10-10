import pool from '../config/db.js';

export const getElections = async (req, res) => {
  try {
    const [elections] = await pool.query('SELECT * FROM elections ORDER BY created_at DESC');
    res.status(200).json({ success: true, elections });
  } catch (error) {
    console.error("Get elections error:", error);
    res.status(500).json({ success: false, message: 'Server error fetching elections' });
  }
};

export const getElectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const [elections] = await pool.query('SELECT * FROM elections WHERE id = ?', [id]);
    
    if (elections.length === 0) {
      return res.status(404).json({ success: false, message: 'Election not found' });
    }
    
    res.status(200).json({ success: true, election: elections[0] });
  } catch (error) {
    console.error("Get election error:", error);
    res.status(500).json({ success: false, message: 'Server error fetching election' });
  }
};

export const createElection = async (req, res) => {
  try {
    const { title, description, startDate, endDate, status } = req.body;
    
    if (!title || !startDate || !endDate) {
      return res.status(400).json({ success: false, message: 'Title, start date, and end date are required' });
    }

    const [result] = await pool.query(
      'INSERT INTO elections (title, description, startDate, endDate, status) VALUES (?, ?, ?, ?, ?)',
      [title, description || '', startDate, endDate, status || 'UPCOMING']
    );

    res.status(201).json({ 
      success: true, 
      message: 'Election created successfully',
      election: { id: result.insertId, title, description, startDate, endDate, status: status || 'UPCOMING' }
    });
  } catch (error) {
    console.error("Create election error:", error);
    res.status(500).json({ success: false, message: 'Server error creating election' });
  }
};

export const updateElection = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, startDate, endDate, status } = req.body;
    
    const [result] = await pool.query(
      'UPDATE elections SET title = ?, description = ?, startDate = ?, endDate = ?, status = ? WHERE id = ?',
      [title, description, startDate, endDate, status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Election not found' });
    }

    res.status(200).json({ success: true, message: 'Election updated successfully' });
  } catch (error) {
    console.error("Update election error:", error);
    res.status(500).json({ success: false, message: 'Server error updating election' });
  }
};

export const deleteElection = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await pool.query('DELETE FROM elections WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Election not found' });
    }

    res.status(200).json({ success: true, message: 'Election deleted successfully' });
  } catch (error) {
    console.error("Delete election error:", error);
    res.status(500).json({ success: false, message: 'Server error deleting election' });
  }
};
