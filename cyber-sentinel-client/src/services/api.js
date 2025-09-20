import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Alert Functions ---
export const getAlerts = () => {
  return apiClient.get('/alerts');
};
export const createAlert = (alertData) => {
  return apiClient.post('/alerts', alertData);
};

// --- Add this new function for Logs ---
export const getLogs = () => {
  return apiClient.get('/logs');
};


// --- Add this new function for Prediction ---
export const analyzeNetworkTraffic = (trafficData) => {
  return apiClient.post('/predict/network', trafficData);
};