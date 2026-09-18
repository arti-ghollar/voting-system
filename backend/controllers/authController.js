import { registerVoter, loginUser, getUserProfile } from '../services/authService.js';

export const register = async (req, res) => {
  try {
    const { name, email, voterId, password } = req.body;
    if (!name || !email || !voterId || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, voterId and password' });
    }

    const user = await registerVoter(name, email, voterId, password);
    
    // Set session
    req.session.userId = user.id;
    req.session.role = user.role;

    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error("Registration error:", error);
    
    let errorMessage = 'Server error during registration';
    
    if (error.message === 'User already exists with this email' || error.message === 'Voter ID already registered') {
      errorMessage = error.message;
      return res.status(400).json({ success: false, message: errorMessage });
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      errorMessage = 'Database connection failed: Invalid database credentials (password)';
    } else if (error.code === 'ECONNREFUSED') {
      errorMessage = 'Database connection failed: MySQL server is not running';
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      errorMessage = 'Database connection failed: Database "voting_system" does not exist';
    } else if (error.code === 'ER_DUP_ENTRY') {
      errorMessage = 'Email or Voter ID already exists';
    } else if (error.message) {
      errorMessage = `Database Error: ${error.message}`;
    }

    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await loginUser(email, password);

    // Set session
    req.session.userId = user.id;
    req.session.role = user.role;

    res.status(200).json({ success: true, user });
  } catch (error) {
    if (error.message === 'Invalid credentials') {
      return res.status(401).json({ success: false, message: error.message });
    }
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await getUserProfile(req.user.id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error getting profile' });
  }
};

export const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Could not log out.' });
    }
    res.clearCookie('connect.sid');
    return res.status(200).json({ success: true, message: 'Logged out successfully' });
  });
};
