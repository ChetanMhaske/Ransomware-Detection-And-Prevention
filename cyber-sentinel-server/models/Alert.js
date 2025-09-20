import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  severity: {
    type: String,
    required: true,
    enum: ['Low', 'Medium', 'High'],
  },
  description: {
    type: String,
    required: true,
  },
  source_ip: {
    type: String,
    required: true,
  },
  action_taken: {
    type: String,
    required: true,
  },
});

const Alert = mongoose.model('Alert', alertSchema);

export default Alert;