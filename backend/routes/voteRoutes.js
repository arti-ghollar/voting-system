import express from 'express';
import { castVote, getMyVotes } from '../controllers/voteController.js';
import { verifySession } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', verifySession, castVote);
router.get('/my-votes', verifySession, getMyVotes);

export default router;
