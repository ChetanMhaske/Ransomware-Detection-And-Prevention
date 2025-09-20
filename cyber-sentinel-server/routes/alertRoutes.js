import express from 'express';
import Alert from '../models/Alert.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/alerts
// @desc    Create a new alert
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const newAlert = new Alert({
      severity: req.body.severity,
      description: req.body.description,
      source_ip: req.body.source_ip,
      action_taken: req.body.action_taken,
      status: 'new', // Explicitly set status on creation
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
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 });
    res.json(alerts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PATCH /api/alerts/:id/resolve
// @desc    Mark an alert as resolved
// @access  Private
router.patch('/:id/resolve', protect, async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);

    if (!alert) {
      return res.status(404).json({ msg: 'Alert not found' });
    }

    alert.status = 'resolved';
    alert.resolvedAt = Date.now();
    alert.resolvedBy = req.user.id; 

    await alert.save();
    res.json(alert);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;