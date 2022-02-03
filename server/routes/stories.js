import express from 'express';
import {getStories, createStory, deleteStory} from '../controllers/stories.js';
const router = express.Router();

router.get('/', getStories); // localhost:5000/stories not just localhost:5000/
router.post('/', createStory);
router.delete('/:id', deleteStory);
export default router;