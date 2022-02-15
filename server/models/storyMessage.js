import mongoose from 'mongoose';

const storySchema = mongoose.Schema({
    storyID: String,
    title: String,
    author: String,
    image: String,
    category: String,
    story: Object,
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const StoryMessage = mongoose.model('Story', storySchema);

export default StoryMessage;