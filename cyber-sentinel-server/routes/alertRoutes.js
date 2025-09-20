import express from 'express';
import Alert from '../models/Alert.js';

const router = express.Router();

// @route   POST /api/alerts
// @desc    Create a new alert
router.post('/', async (req, res) => {
  try {
    const newAlert = new Alert({
      severity: req.body.severity,
      description: req.body.description,
      source_ip: req.body.source_ip,
      action_taken: req.body.action_taken,
    });
    const alert = await newAlert.save();
    res.status(201).json(alert);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/alerts
// @desc    Get all alerts
router.get('/', async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 });
    res.json(alerts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;