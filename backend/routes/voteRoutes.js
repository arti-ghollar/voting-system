import express from 'express';
import { castVote, getMyVotes, checkVote } from '../controllers/voteController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, castVote);
router.get('/my-votes', authMiddleware, getMyVotes);
router.get('/check/:electionId', authMiddleware, checkVote);

export default router;
