import express from 'express';
import Alert from '../models/Alert.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/metrics/response-time
// @desc    Calculate the average incident response time
// @access  Private
router.get('/response-time', protect, async (req, res) => {
  try {
    const stats = await Alert.aggregate([
      // 1. Filter for only the alerts that have been resolved
      { $match: { status: 'resolved', resolvedAt: { $exists: true } } },

      // 2. Calculate the time difference in milliseconds for each alert
      {
        $project: {
          duration: { $subtract: ['$resolvedAt', '$timestamp'] },
        },
      },

      // 3. Calculate the average of all durations
      {
        $group: {
          _id: null,
          avgResponseTime: { $avg: '$duration' },
        },
      },
    ]);

    if (stats.length > 0) {
      // Convert milliseconds to hours for display
      const avgHours = stats[0].avgResponseTime / (1000 * 60 * 60);
      res.json({ avgResponseTimeHours: avgHours });
    } else {
      // If no resolved alerts, return 0
      res.json({ avgResponseTimeHours: 0 });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;