import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config"


const app = express();
app.use(cors());
app.use(express.json());
 try{
    mongoose.connect(process.env.MONGODB_URL);
    console.log("databse connected sucessfully");
 }catch(error){
    console.log("mongodb connection fail");
 }

 const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: { type: String }, // Optional profile picture
    status: { type: String, enum: ['online', 'offline', 'away'], default: 'offline' }, // Online status
    lastSeen: { type: Date, default: Date.now }, // Last activity time
    lastTypingAt: { type: Date }, // Last time they were typing
  }, { timestamps: true });
  
  const User = new mongoose.model('User', userSchema);

  const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true }, // The actual text message
    type: { type: String, enum: ['text', 'image', 'video'], default: 'text' }, // Message type
    isRead: { type: Boolean, default: false },
    attachment: {
        url: { type: String }, // URL for the uploaded file/image
        fileType: { type: String } // e.g. 'image/png', 'application/pdf'
      },
    timestamp: { type: Date, default: Date.now }
  });
  
const Message = new mongoose.model('Message', messageSchema);

// Routes for users
app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch users', error });
    }
  });

  app.get("/users/:id", async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        return res.status(200).json({message:"single user fetch sucessfully", data:user});

    } catch (error) {
        console.log("something went wrong",error);
        return res.status(500).json("internal server error");
    }
  })
  
  app.post('/users', async (req, res) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create user', error });
    }
  });

  app.patch("/users/:id", async(req,res)=>{
    const userExit =await User.findById(req.params.id);
    if(!userExit){
        return res.status(404).json("user doesnot exist");
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
          });
          return res.status(200).json({message:"user updated successfully", data:updatedUser})
        
    } catch (error) {
        console.log("something went wrong", error);
        return res.status(500).json("internal server error");
    }
  })

  app.delete("/users/:id", async (req,res)=>{
    const userExit = await User.findById(req.params.id);
    if(!userExit){
        return res.status(404).json("user not found");
    }
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"user deleted succefully", data:user});
    } catch (error) {
        console.log("something went wrong", error);
        res.status(500).json("internal server error");
    }
  })


  
  // Routes for messages
  app.get('/messages', async (req, res) => {
    try {
      const messages = await Message.find().populate('sender receiver');
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch messages', error });
    }
  });

  app.get("/messages/:id", async(req,res)=>{
    try {
        const message = await Message.findById(req.params.id);
        return res.status(200).json({message:"single message fetch sucessfully", data:message});

    } catch (error) {
        console.log("something went wrong",error);
        return res.status(500).json("internal server error");
    }
  })
  
  app.post('/messages', async (req, res) => {
    try {
      const newMessage = new Message(req.body);
      await newMessage.save();
      res.status(201).json(newMessage);
    } catch (error) {
      res.status(500).json({ message: 'Failed to send message', error });
    }
  });
  
  app.patch("/messages/:id", async(req,res)=>{
    const userExit =await Message.findById(req.params.id);
    if(!userExit){
        return res.status(404).json("user doesnot exist");
    }
    try {
        const updatedMessage = await Message.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
          });
          return res.status(200).json({message:"message updated successfully", data:updatedMessage})
        
    } catch (error) {
        console.log("something went wrong", error);
        return res.status(500).json("internal server error");
    }
  })
 
  app.delete("/messages/:id", async (req,res)=>{
    const messageExit = await Message.findById(req.params.id);
    if(!messageExit){
        return res.status(404).json("message not found");
    }
    try {
        const message = await Message.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"message deleted succefully", data:message});
    } catch (error) {
        console.log("something went wrong", error);
        res.status(500).json("internal server error");
    }
  })

  app.listen(process.env.PORT, ()=>{
    console.log("server is running on", process.env.PORT);
  })