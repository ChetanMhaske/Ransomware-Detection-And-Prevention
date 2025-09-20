import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  level: {
    type: String,
    required: true,
    enum: ['INFO', 'WARN', 'ERROR', 'FATAL'], // Predefined log levels
  },
  message: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
    default: 'General', // e.g., 'API', 'Database', 'Auth'
  },
});

const Log = mongoose.model('Log', logSchema);

export default Log;