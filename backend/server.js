import express from "express";
import cors from "cors";
import "dotenv/config"
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js"

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use('/users', userRoutes);
app.use('/message', messageRoutes);

app.listen(process.env.PORT, ()=>{
    console.log("server is running on", process.env.PORT);
  })