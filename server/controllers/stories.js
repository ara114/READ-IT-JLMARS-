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
    const newStory = new StoryMessage({...story, createdAt: new Date().toISOString()});
    try {
        await newStory.save();
        res.status(201).json(newStory);
    } catch (error) {
        res.status(409).json({message: error.message});
    }

}

export const likeStory = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({message: 'Unauthenticated'}); 

    const story = await StoryMessage.findOne({storyID: id});

    const index = story.likes.findIndex((id) => id === String(req.userId)); // if already liked

    if(index === -1){
        //like story
        story.likes.push(req.userId);
    }
    else{
        story.likes = story.likes.filter((id) => id !== String(req.userId));

    }
    const updatedStory = await StoryMessage.findOneAndUpdate({storyID: id}, story, {new: true})

    res.json(updatedStory);

}

export const deleteStory = async (req, res) => {
    const { id } = req.params;

    await StoryMessage.findOneAndRemove({storyID: id});

    res.json({message: 'Story deleted.'});

}