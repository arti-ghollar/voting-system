import express from 'express';
import { getCandidates, getCandidateById, addCandidate, updateCandidate, deleteCandidate } from '../controllers/candidateController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getCandidates);
router.get('/:id', authMiddleware, getCandidateById);

// Admin only routes
router.post('/', authMiddleware, adminMiddleware, addCandidate);
router.put('/:id', authMiddleware, adminMiddleware, updateCandidate);
router.delete('/:id', authMiddleware, adminMiddleware, deleteCandidate);

export default router;
