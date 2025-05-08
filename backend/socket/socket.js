import Message from "../models/messageSchema.js";
import User from "../models/user.js";

const onlineUsers = new Map(); // username -> socket.id

const registerSocketHandlers = (io) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle user registration
    socket.on("register", async (username) => {
      const user = await User.findOne({ username });

      if (!user) {
        console.log("User not found in DB:", username);
        return socket.emit("error", {
          message: "User not registered in database",
        });
      }

      onlineUsers.set(username, socket.id);
      console.log(`${username} registered with socket ID: ${socket.id}`);

      io.emit("userList", Array.from(onlineUsers.keys()));
    });

    // Typing status
    socket.on("typing", ({ to }) => {
      const from = User[socket.id];
      const recipientSocketId = Object.keys(users).find(
        (key) => User[key] === to
      );
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("typing", { from });
      }
    });

    socket.on("stopTyping", ({ to }) => {
      const from = User[socket.id];
      const recipientSocketId = Object.keys(users).find(
        (key) => User[key] === to
      );
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("stopTyping", { from });
      }
    });

    // Mark messages as read
socket.on('markAsRead', async ({ from, to }) => {
  try {
    // Find the receiver's socket ID
    const recipientSocketId = Object.keys(User).find(
      (key) => User[key] === from
    );

    // Update all unread messages from 'from' → 'to'
    await Message.updateMany(
      { sender: from, receiver: to, isRead: false },
      { $set: { isRead: true } }
    );

    // Notify the sender that messages were read
    if (recipientSocketId) {
      io.to(recipientSocketId).emit('messagesRead', { by: to });
    }
  } catch (error) {
    console.error('Error marking messages as read:', error);
  }
});

    // Handle private message
    socket.on("privateMessage", async ({ to, message }) => {
      const fromUsername = [...onlineUsers.entries()].find(
        ([name, id]) => id === socket.id
      )?.[0];

      if (!fromUsername)
        return socket.emit("error", { message: "Sender not identified" });

      const senderUser = await User.findOne({ username: fromUsername });
      const receiverUser = await User.findOne({ username: to });

      if (!receiverUser || !senderUser) {
        return socket.emit("error", { message: "User not found" });
      }

      // Save message to MongoDB
      const newMessage = new Message({
        sender: senderUser._id,
        receiver: receiverUser._id,
        content: message,
      });

      await newMessage.save();

      // Send live message to receiver if online
      const receiverSocketId = onlineUsers.get(to);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("privateMessage", {
          from: fromUsername,
          message,
        });
      }

      // Also send back to sender (for their own UI)
      socket.emit("privateMessage", {
        from: fromUsername,
        message,
      });
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      const disconnectedUser = [...onlineUsers.entries()].find(
        ([_, id]) => id === socket.id
      )?.[0];
      if (disconnectedUser) {
        onlineUsers.delete(disconnectedUser);
        io.emit("userList", Array.from(onlineUsers.keys()));
        console.log(`${disconnectedUser} disconnected`);
      }
    });
  });
};

export default registerSocketHandlers;
