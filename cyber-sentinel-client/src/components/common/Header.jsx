import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut } from 'lucide-react';

const Header = () => {
  const [currentTime, setCurrentTime] = useState('');
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logout(); // This clears the token from localStorage and our context
    navigate('/login'); // Redirect the user to the login page
  };

  return (
    <header>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Cyber-Sentinel Pro</h1>
          <p className="text-text-secondary">Unified Threat Management Dashboard</p>
        </div>
        <div className="text-right mt-4 sm:mt-0">
          <p className="text-lg font-medium text-text-primary">{currentTime}</p>
          <div className="flex items-center justify-end gap-4 mt-1">
            <p className="text-sm text-text-secondary">Welcome, Admin</p>
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex items-center text-sm text-red-400 hover:text-red-500 transition-colors"
              >
                <LogOut size={16} className="mr-1" />
                Logout
              </button>
            )}
          </div>
          <p className="text-lg font-semibold text-green-400 flex items-center justify-end mt-1">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            SYSTEM STATUS: SECURE
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;

