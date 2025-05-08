import Message from "../models/messageSchema.js";

export const messageCreate = async (req,res)=>{
    try {
        const newMessage = new Message(req.body);
        await newMessage.save();
        res.status(201).json(newMessage);
      } catch (error) {
        console.log(error, "something went wrong");
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

 export const getMessagesForReceiver = async (req, res) => {
    try {
      const { receiverId } = req.params;
      const messages = await Message.find({ receiver: receiverId }).populate('sender receiver');
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch messages for receiver', error });
    }
  };

  export const getConversationBetweenUsers = async (req, res) => {
    const { user1, user2 } = req.params;
  
    try {
      const messages = await Message.find({
        $or: [
          { sender: user1, receiver: user2 },
          { sender: user2, receiver: user1 }
        ]
      }).sort({ timestamp: 1 }) // optional: sort by time
        .populate('sender receiver');
  
      res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching conversation:', error);
      res.status(500).json({ message: 'Failed to fetch conversation', error });
    }
  };

  export const markMessagesAsRead = async (req, res) => {
    const { senderId, receiverId } = req.params;
  
    try {
      const result = await Message.updateMany(
        {
          sender: senderId,
          receiver: receiverId,
          isRead: false,
        },
        { $set: { isRead: true } }
      );
  
      res.status(200).json({
        message: 'Messages marked as read',
        modifiedCount: result.modifiedCount,
      });
    } catch (error) {
      console.error('Error marking messages as read:', error);
      res.status(500).json({ message: 'Failed to update messages', error });
    }
  };

  export const getUnreadMessages = async (req, res) => {
    const { receiverId } = req.params;
  
    try {
      const messages = await Message.find({
        receiver: receiverId,
        isRead: false
      }).populate('sender', 'username');
  
      res.status(200).json({
        message: 'Unread messages fetched successfully',
        data: messages
      });
    } catch (error) {
      console.error('Error fetching unread messages:', error);
      res.status(500).json({ message: 'Failed to fetch unread messages', error });
    }
  };
  