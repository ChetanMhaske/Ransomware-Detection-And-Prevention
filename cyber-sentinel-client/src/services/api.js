import axios from 'axios';

// Create a reusable Axios instance with a base URL
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Axios Request Interceptor
 * --------------------------
 * This function runs before every single request is sent from the frontend.
 * It checks if a token exists in localStorage, and if it does, it adds the
 * 'Authorization: Bearer <token>' header to the request. This is how we
 * authenticate with our protected backend routes.
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getAlerts = () => {
  return apiClient.get('/alerts');
};
export const createAlert = (alertData) => {
  return apiClient.post('/alerts', alertData);
};

// Add this function
export const resolveAlert = (alertId) => {
  return apiClient.patch(`/alerts/${alertId}/resolve`);
};


// --- Log Functions ---
export const getLogs = () => {
  return apiClient.get('/logs');
};
export const createLog = (logData) => {
  return apiClient.post('/logs', logData);
};


// --- User Auth Functions ---
export const loginUser = (credentials) => {
  return apiClient.post('/users/login', credentials);
};
export const registerUser = (userData) => {
  return apiClient.post('/users/register', userData);
};


// --- ML Prediction Function ---
export const analyzeNetworkTraffic = (trafficData) => {
  return apiClient.post('/predict/network', trafficData);
};
