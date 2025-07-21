import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
  sessionName: { type: String, required: true },
  createdBy: { type: String, required: true }, 
  participants: [String],
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Session = mongoose.model('Session', SessionSchema);
export default Session;
