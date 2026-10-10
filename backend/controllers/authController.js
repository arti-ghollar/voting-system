import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const fullName = req.body.fullName || req.body.name;
    const { email, voterId, password, confirmPassword } = req.body;
    
    if (!fullName || !email || !voterId || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    // Check if email exists
    const [existingUsers] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    // Check if voterId exists
    const [existingVoters] = await pool.query('SELECT * FROM voters WHERE voterId = ?', [voterId]);
    if (existingVoters.length > 0) {
      return res.status(400).json({ success: false, message: 'Voter ID already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user
    const [userResult] = await pool.query(
      'INSERT INTO users (fullName, email, password, role) VALUES (?, ?, ?, ?)',
      [fullName, email, hashedPassword, 'VOTER']
    );

    const userId = userResult.insertId;

    // Insert voter
    await pool.query(
      'INSERT INTO voters (user_id, voterId) VALUES (?, ?)',
      [userId, voterId]
    );

    // Create JWT token
    const token = jwt.sign(
      { 
        id: userId, 
        email: email, 
        role: 'VOTER',
        voter_id: userResult.insertId // Actually, this is wrong. voter_id is the insertId of voters table.
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );
    
    // Fix voter_id logic
    const [voterInsert] = await pool.query('SELECT id FROM voters WHERE user_id = ?', [userId]);
    const actualVoterId = voterInsert[0].id;

    const finalToken = jwt.sign(
      { 
        id: userId, 
        email: email, 
        role: 'VOTER',
        voter_id: actualVoterId
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );

    res.status(201).json({ 
      success: true, 
      message: 'Registration successful',
      token: finalToken,
      user: {
        id: userId,
        fullName: fullName,
        email: email,
        role: 'voter',
        voterId: voterId
      }
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // Get user
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const user = users[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Get voter ID if voter
    let voterInfo = null;
    if (user.role === 'VOTER') {
      const [voters] = await pool.query('SELECT id, voterId FROM voters WHERE user_id = ?', [user.id]);
      if (voters.length > 0) {
        voterInfo = voters[0];
      }
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role,
        voter_id: voterInfo ? voterInfo.id : null // primary key in voters table
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );

    res.status(200).json({ 
      success: true, 
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role.toLowerCase(),
        voterId: voterInfo ? voterInfo.voterId : null
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

export const getMe = async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, fullName, email, role FROM users WHERE id = ?', [req.user.id]);
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    const user = users[0];
    
    if (user.role === 'VOTER') {
      const [voters] = await pool.query('SELECT voterId FROM voters WHERE user_id = ?', [user.id]);
      if (voters.length > 0) {
        user.voterId = voters[0].voterId;
      }
    }
    
    user.role = user.role.toLowerCase();

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("GetMe error:", error);
    res.status(500).json({ success: false, message: 'Server error getting profile' });
  }
};

export const logout = (req, res) => {
  // With JWT, logout is handled client-side by deleting the token.
  // We just return success.
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};
