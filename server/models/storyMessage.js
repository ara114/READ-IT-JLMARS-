import mongoose from 'mongoose';

const storySchema = mongoose.Schema({
    storyID: String,
    title: String,
    author: {
        type: [String],
        default: []
    },
    image: String,
    category: String,
    story: Object,
    reports: {
        type: [String],
        default: []
    },
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    clear: {
        type: Boolean,
        default: false
    },
    finished: {
        type: Boolean,
        default: false
    }
});

const StoryMessage = mongoose.model('Story', storySchema);

export default StoryMessage;