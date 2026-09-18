import express from 'express';
import { getAllElections, getElectionById } from '../controllers/electionController.js';
import { verifySession } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifySession, getAllElections);
router.get('/:id', verifySession, getElectionById);

export default router;
