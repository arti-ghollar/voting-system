import express from 'express';
import { 
  getDashboardStats, 
  getUsers, 
  getVoters, 
  getElections, 
  getCandidates, 
  getVotes, 
  getResults,
  getBiometricLogs
} from '../controllers/adminController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';

const router = express.Router();

// All admin routes are protected by both auth and admin middlewares
router.use(authMiddleware, adminMiddleware);

router.get('/dashboard', getDashboardStats);
router.get('/users', getUsers);
router.get('/voters', getVoters);
router.get('/elections', getElections);
router.get('/candidates', getCandidates);
router.get('/votes', getVotes);
router.get('/results', getResults);
router.get('/biometric-logs', getBiometricLogs);

export default router;
