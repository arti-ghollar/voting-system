import express from 'express';
import { getResultsByElection, getCandidateResults } from '../controllers/resultController.js';

const router = express.Router();

router.get('/:electionId', getResultsByElection);
router.get('/:electionId/candidates', getCandidateResults);

export default router;
