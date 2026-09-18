import express from 'express';
import { getCandidatesByElection } from '../controllers/candidateController.js';
import { verifySession } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/election/:electionId', verifySession, getCandidatesByElection);

export default router;
