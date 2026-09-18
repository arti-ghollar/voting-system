import bcrypt from 'bcryptjs';
import db from '../config/db.js';

export const registerVoter = async (name, email, voterId, password) => {
  const [existingEmail] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  if (existingEmail.length > 0) {
    throw new Error('User already exists with this email');
  }

  const [existingVoter] = await db.query('SELECT * FROM users WHERE id = ?', [voterId]);
  if (existingVoter.length > 0) {
    throw new Error('Voter ID already registered');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await db.query(
    'INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)',
    [voterId, name, email.toLowerCase(), hashedPassword, 'voter']
  );

  return { id: voterId, name, email, role: 'voter', voterId: voterId };
};

export const loginUser = async (email, password) => {
  const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email.toLowerCase()]);
  
  if (users.length === 0) {
    throw new Error('Invalid credentials');
  }

  const user = users[0];
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  return { id: user.id, name: user.name, email: user.email, role: user.role, voterId: user.id };
};

export const getUserProfile = async (userId) => {
  const [users] = await db.query('SELECT id, name, email, role FROM users WHERE id = ?', [userId]);
  if (users.length === 0) {
    throw new Error('User not found');
  }
  return users[0];
};
