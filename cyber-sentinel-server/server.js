import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import alertRoutes from './routes/alertRoutes.js';
import logRoutes from './routes/logRoutes.js';
import predictRoutes from './routes/predictRoutes.js'; // 1. Import predict routes

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/alerts', alertRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/predict', predictRoutes); // 2. Use predict routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});