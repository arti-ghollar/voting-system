import express from 'express';
import { getElections, getElectionById, createElection, updateElection, deleteElection } from '../controllers/electionController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getElections);
router.get('/:id', authMiddleware, getElectionById);

// Admin only routes
router.post('/', authMiddleware, adminMiddleware, createElection);
router.put('/:id', authMiddleware, adminMiddleware, updateElection);
router.delete('/:id', authMiddleware, adminMiddleware, deleteElection);

export default router;
