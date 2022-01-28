import mongoose from 'mongoose';

const textSchema = mongoose.Schema({
    _id: String,
    data: Object
})

const storyText = mongoose.model('storyText', textSchema);

export default storyText;