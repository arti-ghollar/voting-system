import db from '../config/db.js';

// ---- USERS ----
export const getAllUsers = async (req, res) => {
  try {
    const [users] = await db.query('SELECT id, name, email, role, created_at FROM users');
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error fetching users' });
  }
};

// ---- ELECTIONS ----
export const createElection = async (req, res) => {
  try {
    const { title, description, type, status, start_date, end_date } = req.body;
    const electionId = `ELX-${Math.floor(Math.random() * 900) + 100}`;
    
    await db.query(
      'INSERT INTO elections (id, title, description, type, status, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [electionId, title, description, type, status || 'UPCOMING', start_date, end_date]
    );

    res.status(201).json({ success: true, message: 'Election created', id: electionId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error creating election' });
  }
};

export const updateElection = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, type, status, start_date, end_date } = req.body;

    await db.query(
      'UPDATE elections SET title=?, description=?, type=?, status=?, start_date=?, end_date=? WHERE id=?',
      [title, description, type, status, start_date, end_date, id]
    );

    res.status(200).json({ success: true, message: 'Election updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error updating election' });
  }
};

export const deleteElection = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM elections WHERE id=?', [id]);
    res.status(200).json({ success: true, message: 'Election deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error deleting election' });
  }
};

// ---- CANDIDATES ----
export const addCandidate = async (req, res) => {
  try {
    const { election_id, name, party, position, symbol, image, description } = req.body;
    const candidateId = `CAN-${Math.floor(Math.random() * 9000) + 1000}`;

    await db.query(
      'INSERT INTO candidates (id, election_id, name, party, position, symbol, image, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [candidateId, election_id, name, party, position, symbol, image, description]
    );

    res.status(201).json({ success: true, message: 'Candidate added', id: candidateId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error adding candidate' });
  }
};

export const updateCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, party, position, symbol, image, description } = req.body;

    await db.query(
      'UPDATE candidates SET name=?, party=?, position=?, symbol=?, image=?, description=? WHERE id=?',
      [name, party, position, symbol, image, description, id]
    );

    res.status(200).json({ success: true, message: 'Candidate updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error updating candidate' });
  }
};

export const deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM candidates WHERE id=?', [id]);
    res.status(200).json({ success: true, message: 'Candidate deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error deleting candidate' });
  }
};

// ---- STATISTICS ----
export const getStatistics = async (req, res) => {
  try {
    const [votersCount] = await db.query("SELECT COUNT(*) as count FROM users WHERE role='voter'");
    const [electionsCount] = await db.query('SELECT COUNT(*) as count FROM elections');
    const [activeElectionsCount] = await db.query("SELECT COUNT(*) as count FROM elections WHERE status='ACTIVE'");
    const [candidatesCount] = await db.query('SELECT COUNT(*) as count FROM candidates');
    const [votesCount] = await db.query('SELECT COUNT(*) as count FROM votes');

    res.status(200).json({
      success: true,
      statistics: {
        totalVoters: votersCount[0].count,
        totalElections: electionsCount[0].count,
        activeElections: activeElectionsCount[0].count,
        totalCandidates: candidatesCount[0].count,
        totalVotes: votesCount[0].count
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error fetching statistics' });
  }
};
