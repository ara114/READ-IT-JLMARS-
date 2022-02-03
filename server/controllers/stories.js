import StoryMessage from '../models/storyMessage.js';

export const getStories = async (req, res) => {
    try {
        // trying to retreive all stories in db
        const storyMessages = await StoryMessage.find();
        res.status(200).json(storyMessages);
    } catch (error) {
        res.status(404).json({message: error.message});
    }

}

export const createStory = async (req, res) => {
    const story = req.body;
    const newStory = new StoryMessage(story);
    try {
        await newStory.save();
        res.status(201).json(newStory);
    } catch (error) {
        res.status(409).json({message: error.message});
    }

}

export const likeStory = async (req, res) => {
    const { id } = req.params;

    const story = await StoryMessage.findOne({storyID: id});
    const updatedStory = await StoryMessage.findOneAndUpdate({storyID: id}, {likeCount: story.likeCount + 1}, {new: true})

    res.json({message: 'Liked story'});

}

export const deleteStory = async (req, res) => {
    const { id } = req.params;

    await StoryMessage.findOneAndRemove({storyID: id});

    res.json({message: 'Story deleted.'});

}