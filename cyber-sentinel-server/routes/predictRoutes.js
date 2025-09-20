import express from 'express';
import axios from 'axios';
import Alert from '../models/Alert.js'; // We'll need this to create alerts

const router = express.Router();

const ML_SERVICE_URL = 'http://localhost:8000/predict';

// @route   POST /api/predict/network
// @desc    Analyze network data and create an alert if it's an anomaly
router.post('/network', async (req, res) => {
  try {
    // 1. Forward the data to the Python ML service
    const mlResponse = await axios.post(ML_SERVICE_URL, req.body);
    const { prediction } = mlResponse.data;

    // 2. Check the prediction from the ML service
    if (prediction === 'anomaly') {
      // 3. If it's an anomaly, create a high-severity alert
      const newAlert = new Alert({
        severity: 'High',
        description: `Anomaly detected in network traffic by ML model.`,
        source_ip: req.body.source_ip || 'N/A',
        action_taken: 'Auto-Flagged by ML',
      });
      await newAlert.save();
      
      // 4. Send a response back to the frontend
      return res.status(201).json({ 
        message: 'Anomaly detected and alert created.',
        prediction: prediction,
        alert: newAlert 
      });
    }

    // If the prediction is 'normal', just send a success response
    res.status(200).json({ message: 'Traffic is normal.', prediction: prediction });

  } catch (error) {
    console.error('Error in prediction route:', error.message);
    res.status(500).send('Server Error');
  }
});

export default router;