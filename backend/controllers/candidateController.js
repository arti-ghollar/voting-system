import pool from '../config/db.js';

export const getCandidates = async (req, res) => {
  try {
    const { electionId } = req.query;
    let query = 'SELECT * FROM candidates';
    let params = [];
    
    if (electionId) {
      query += ' WHERE electionId = ?';
      params.push(electionId);
    }
    query += ' ORDER BY created_at DESC';

    const [candidates] = await pool.query(query, params);
    res.status(200).json({ success: true, candidates });
  } catch (error) {
    console.error("Get candidates error:", error);
    res.status(500).json({ success: false, message: 'Server error fetching candidates' });
  }
};

export const getCandidateById = async (req, res) => {
  try {
    const { id } = req.params;
    const [candidates] = await pool.query('SELECT * FROM candidates WHERE id = ?', [id]);
    
    if (candidates.length === 0) {
      return res.status(404).json({ success: false, message: 'Candidate not found' });
    }
    
    res.status(200).json({ success: true, candidate: candidates[0] });
  } catch (error) {
    console.error("Get candidate error:", error);
    res.status(500).json({ success: false, message: 'Server error fetching candidate' });
  }
};

export const addCandidate = async (req, res) => {
  try {
    const { name, party, description, photo, electionId } = req.body;
    
    if (!name || !electionId) {
      return res.status(400).json({ success: false, message: 'Name and election ID are required' });
    }

    const [result] = await pool.query(
      'INSERT INTO candidates (name, party, description, photo, electionId) VALUES (?, ?, ?, ?, ?)',
      [name, party || '', description || '', photo || '', electionId]
    );

    res.status(201).json({ 
      success: true, 
      message: 'Candidate added successfully',
      candidate: { id: result.insertId, name, party, description, photo, electionId }
    });
  } catch (error) {
    console.error("Add candidate error:", error);
    res.status(500).json({ success: false, message: 'Server error adding candidate' });
  }
};

export const updateCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, party, description, photo, electionId } = req.body;
    
    const [result] = await pool.query(
      'UPDATE candidates SET name = ?, party = ?, description = ?, photo = ?, electionId = ? WHERE id = ?',
      [name, party, description, photo, electionId, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Candidate not found' });
    }

    res.status(200).json({ success: true, message: 'Candidate updated successfully' });
  } catch (error) {
    console.error("Update candidate error:", error);
    res.status(500).json({ success: false, message: 'Server error updating candidate' });
  }
};

export const deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await pool.query('DELETE FROM candidates WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Candidate not found' });
    }

    res.status(200).json({ success: true, message: 'Candidate deleted successfully' });
  } catch (error) {
    console.error("Delete candidate error:", error);
    res.status(500).json({ success: false, message: 'Server error deleting candidate' });
  }
};
