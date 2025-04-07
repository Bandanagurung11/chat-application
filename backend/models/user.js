import mongoose from 'mongoose';

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
export default User;
