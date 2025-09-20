import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { loginUser } from '../services/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await loginUser({ email, password });
      login(response.data.token); // Save the token using AuthContext
      navigate('/'); // Redirect to the dashboard
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100">
      <div className="p-8 rounded-lg shadow-lg bg-base-200 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Login to Cyber-Sentinel</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-text-secondary mb-2" htmlFor="email">Email</label>
            <input 
              className="w-full p-3 bg-base-300 rounded text-white focus:outline-none" 
              type="email" 
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="mb-6">
            <label className="block text-text-secondary mb-2" htmlFor="password">Password</label>
            <input 
              className="w-full p-3 bg-base-300 rounded text-white focus:outline-none" 
              type="password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;