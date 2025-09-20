import express from 'express';
import Log from '../models/Log.js'; // Import the Log model

const router = express.Router();

// @route   POST /api/logs
// @desc    Create a new log entry
router.post('/', async (req, res) => {
  try {
    const newLog = new Log({
      level: req.body.level,
      message: req.body.message,
      service: req.body.service,
    });

    const log = await newLog.save();
    res.status(201).json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/logs
// @desc    Get all logs
router.get('/', async (req, res) => {
  try {
    const logs = await Log.find().sort({ timestamp: -1 }); // Get newest first
    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;