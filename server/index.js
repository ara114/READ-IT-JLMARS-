import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import storyRoutes from './routes/stories.js';
import dotenv from 'dotenv';
// import { Server } from "socket.io";
// import { createServer } from 'http';

const app = express();
// const server = createServer(app); 
// const io = new Server(server, {
//     cors: {
//         origin: 'http://localhost:3000',
//         method: ['GET', 'POST']
//     }
// });

// io.on('connection', socket => {
//     console.log('connected');
// })
dotenv.config();

app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());

app.use('/stories', storyRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`))) // if successful connection
    .catch((err) => console.log(err.message)); // if failure
