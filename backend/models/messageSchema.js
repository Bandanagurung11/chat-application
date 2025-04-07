import mongoose from 'mongoose';

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
export default Message;
