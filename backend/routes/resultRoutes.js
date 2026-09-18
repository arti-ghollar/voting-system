import express from 'express';
import { getElectionResults } from '../controllers/resultController.js';
import { verifySession } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:electionId', verifySession, getElectionResults);

export default router;
