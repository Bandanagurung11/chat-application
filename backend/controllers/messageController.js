import Message from "../models/messageSchema.js";

export const messageCreate = async (req,res)=>{
    try {
        const newMessage = new Message(req.body);
        await newMessage.save();
        res.status(201).json(newMessage);
      } catch (error) {
        res.status(500).json({ message: 'Failed to send message', error });
      }
};

export const messageGet = async (req,res)=>{
    try {
        const messages = await Message.find().populate('sender receiver');
        res.status(200).json(messages);
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch messages', error });
      }
 };

 export const messageGetById = async (req,res)=>{
    try {
        const message = await Message.findById(req.params.id);
        return res.status(200).json({message:"single message fetch sucessfully", data:message});

    } catch (error) {
        console.log("something went wrong",error);
        return res.status(500).json("internal server error");
    }
 };

 export const messageUpdate = async (req,res)=>{
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
 };

 export const messageDelete = async (req,res)=>{
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
 };