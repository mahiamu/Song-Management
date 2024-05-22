import express from 'express';
import {
  createSong,
  getSongs,
  updateSong,
  deleteSong,
  getStatistics,
} from '../controllers/songController.js';

const router = express.Router();

router.post('/songs', createSong);
router.get('/songs', getSongs);
router.put('/songs/:id', updateSong);
router.delete('/songs/:id', deleteSong);
router.get('/stats', getStatistics);

export default router;
