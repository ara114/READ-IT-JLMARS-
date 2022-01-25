import mongoose from 'mongoose';

const storySchema = mongoose.Schema({
    title: String,
    author: String,
    story: String,
    image: String,
    category: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const StoryMessage = mongoose.model('Story', storySchema);

export default StoryMessage;