// src/routes/pollRoutes.ts
import { Router } from 'express';
import { getPolls,addPoll,deletePoll, updatePoll, votePollOption } from '../controllers/pollcontroller';
const pollrouter = Router();

pollrouter.post('/polls', addPoll);
pollrouter.get('/polls', getPolls);
pollrouter.delete('/polls/:id', deletePoll);
pollrouter.put('/api/polls/:id', updatePoll);
pollrouter.post('/polls/:pollId/vote', votePollOption);

export default pollrouter;

