import express from 'express';
import { 
  getAllUsers, 
  createElection, updateElection, deleteElection,
  addCandidate, updateCandidate, deleteCandidate,
  getStatistics 
} from '../controllers/adminController.js';
import { verifySession } from '../middleware/authMiddleware.js';
import { verifyAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.use(verifySession, verifyAdmin);

router.get('/users', getAllUsers);

router.post('/elections', createElection);
router.put('/elections/:id', updateElection);
router.delete('/elections/:id', deleteElection);

router.post('/candidates', addCandidate);
router.put('/candidates/:id', updateCandidate);
router.delete('/candidates/:id', deleteCandidate);

router.get('/statistics', getStatistics);

export default router;
