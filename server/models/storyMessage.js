import mongoose from 'mongoose';

const storySchema = mongoose.Schema({
    storyID: String,
    title: String,
    author: String,
    image: String,
    category: String,
    story: Object,
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