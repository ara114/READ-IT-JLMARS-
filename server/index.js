import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import storyRoutes from './routes/stories.js';
import dotenv from 'dotenv';
import { Server } from "socket.io";
import { createServer } from 'http';
import storyText from './models/storyText.js';

const app = express();
const server = createServer(app); 
const io = new Server(server
    , {
    cors: {
        origin: 'http://localhost:3000',
        method: ['GET', 'POST']
    }
}
);

const defaultValue = "";

io.on('connection', socket => {

    socket.on('get-document', async docID => {
        const story = await findOrCreateStory(docID);
        socket.join(docID);
        socket.emit('load-document', story.data);
        socket.on('send-changes', delta => {
        socket.broadcast.to(docID).emit('receive-changes', delta);
        });

        socket.on('save-document', async data => {
            await storyText.findByIdAndUpdate(docID, {data})
            // const s = await storyText.find({storyID: docID});
            // console.log(s);
        })
    });

    console.log('connected');
});
dotenv.config();

app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());

app.use('/stories', storyRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => server.listen(PORT, () => console.log(`Server running on port ${PORT}`))) // if successful connection
    .catch((err) => console.log(err.message)); // if failure

async function findOrCreateStory(id){
    if(id == null) return;

    const story = await storyText.findById(id);
    if(story) return story;
    return await storyText.create({_id: id, data: defaultValue});
}