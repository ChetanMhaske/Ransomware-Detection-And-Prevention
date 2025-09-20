import React, { useState, useEffect } from 'react';

const Header = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      // Simulate the date for consistency with the demo
      const now = new Date('2025-09-19T21:54:00');
      now.setSeconds(now.getSeconds() + (Date.now() / 1000) % 60); // Make it tick
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

  return (
    <header>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Cyber-Sentinel Pro</h1>
          <p className="text-text-secondary">Unified Threat Management Dashboard</p>
        </div>
        <div className="text-right mt-4 sm:mt-0">
          <p className="text-lg font-medium text-text-primary">{currentTime}</p>
          <p className="text-sm text-text-secondary">Last Login: Admin</p>
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
