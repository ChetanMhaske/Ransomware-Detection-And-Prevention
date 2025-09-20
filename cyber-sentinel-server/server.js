import dotenv from 'dotenv';
dotenv.config(); // Correctly placed at the top

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import alertRoutes from './routes/alertRoutes.js';
import logRoutes from './routes/logRoutes.js';
import predictRoutes from './routes/predictRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Connect to DB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes (cleaned up - no duplicates)
app.use('/api/alerts', alertRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/predict', predictRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});