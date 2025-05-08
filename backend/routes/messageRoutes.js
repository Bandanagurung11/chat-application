import express from "express";
const router = express.Router();
import {
  messageCreate,
  messageGet,
  messageGetById,
  messageUpdate,
  messageDelete,
  getMessagesForReceiver,
  getConversationBetweenUsers,
  markMessagesAsRead,
  getUnreadMessages
} from "../controllers/messageController.js";
router.post("/", messageCreate);
router.get("/", messageGet);
router.get("/receiver/:receiverId", getMessagesForReceiver);
router.get("/conversation/:user1/:user2", getConversationBetweenUsers);
router.put('/mark-as-read/:senderId/:receiverId', markMessagesAsRead);
router.get('/unread/:receiverId', getUnreadMessages);
router.get("/:id", messageGetById);
router.patch("/:id", messageUpdate);
router.delete("/:id", messageDelete);

export default router;
