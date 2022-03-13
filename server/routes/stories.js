import express from 'express';
import {getStories, createStory, likeStory, commentStory, reportStory, unreportStory, deleteStory} from '../controllers/stories.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/', getStories); // localhost:5000/stories not just localhost:5000/
router.post('/', createStory);
router.patch('/:id/likeStory', auth, likeStory);
router.post('/:id/commentStory', auth, commentStory);
router.patch('/:id/reportStory', auth, reportStory);
router.patch('/:id/unreportStory', unreportStory);
router.delete('/:id', deleteStory);
export default router;