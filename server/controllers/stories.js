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

export const getStoriesBySearch = async (req, res) => {
    const {searchQuery} = req.query;
    try {
        const title = new RegExp(searchQuery, 'i');
        const story = await StoryMessage.find({ title });
        res.status(200).json(story);
    } catch (error) {
        res.status(404).json({message: error.message});
    }

}

export const createStory = async (req, res) => {
    const story = req.body;
    const update = await StoryMessage.findOneAndUpdate({storyID: story.storyID}, {finished: true}, {new: true})
    // const newStory = new StoryMessage({...story, finished: true, createdAt: new Date().toISOString()});
    const newStory = await StoryMessage.find({storyID: story.storyID});
    try {
        // await newStory.save();
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

export const reviewStory = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const story = await StoryMessage.findOne({storyID: id});

    story.reviews.push(value);

    const updatedStory = await StoryMessage.findOneAndUpdate({storyID: id}, story, {new: true});

    res.json(updatedStory);

}

export const reportStory = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({message: 'Unauthenticated'}); 

    const story = await StoryMessage.findOne({storyID: id});
    if(story.clear === false)
        story.reports.push(req.userId);
    console.log(story.reports);
    const updatedStory = await StoryMessage.findOneAndUpdate({storyID: id}, story, {new: true})

    res.json(updatedStory);

}

export const unreportStory = async (req, res) => {
    const { id } = req.params;

    const story = await StoryMessage.findOne({storyID: id});
    story.reports.length = 0;
    story.clear = true;
    story.warn = false;
    console.log(story.reports);
    const updatedStory = await StoryMessage.findOneAndUpdate({storyID: id}, story, {new: true})

    res.json(updatedStory);

}

export const deleteStory = async (req, res) => {
    const { id } = req.params;

    await StoryMessage.findOneAndRemove({storyID: id});

    res.json({message: 'Story deleted.'});

}