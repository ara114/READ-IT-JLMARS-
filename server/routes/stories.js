import express from 'express';
import {getStories, createStory, likeStory, deleteStory} from '../controllers/stories.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/', getStories); // localhost:5000/stories not just localhost:5000/
router.post('/', createStory);
router.patch('/:id/likeStory', auth, likeStory);
router.delete('/:id', deleteStory);
export default router;