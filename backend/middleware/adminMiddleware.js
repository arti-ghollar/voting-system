export const verifyAdmin = (req, res, next) => {
  if (req.session && req.session.role === 'admin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Access denied. Admin role required.' });
  }
};
