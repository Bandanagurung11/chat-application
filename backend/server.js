import express from "express";
import cors from "cors";
import "dotenv/config"
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js"
import registerSocketHandlers from './socket/socket.js';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
app.use(cors());
app.use(express.json());
connectDB();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

registerSocketHandlers(io);

app.get('/', (req, res) => {
  res.send('Chat server is running');
});

app.use('/users', userRoutes);
app.use('/message', messageRoutes);

app.listen(process.env.PORT, ()=>{
    console.log("server is running on", process.env.PORT);
  })