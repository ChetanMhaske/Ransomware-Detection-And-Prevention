import React, { useState, useEffect } from 'react';
import { Zap, ShieldCheck, Clock, HardDrive } from 'lucide-react';
import { getMetrics } from '../../services/api';

const Metric = ({ icon, label, value, improvement }) => (
  <div className="flex items-center justify-between py-3 border-b border-base-300">
    <div className="flex items-center">
      {icon}
      <p className="ml-3">{label}</p>
    </div>
    <div>
      <p className="font-bold text-right">{value}</p>
      {improvement && <p className="text-xs text-green-400 text-right">{improvement}</p>}
    </div>
  </div>
);

const SystemResilience = () => {
  const [responseTime, setResponseTime] = useState(0);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await getMetrics();
        setResponseTime(response.data.avgResponseTimeHours);
      } catch (error) {
        console.error('Failed to fetch metrics:', error);
      }
    };
    fetchMetrics();
  }, []);

  return (
    <div className="card bg-base-200 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">3. System Resilience</h2>
      <div className="space-y-2">
        <Metric icon={<Clock size={20} className="text-blue-400" />} label="Detection Time" value="3 hrs" improvement="95.8% improvement (Goal)" />
        <Metric icon={<Zap size={20} className="text-yellow-400" />} label="Avg. Response Time" value={`${responseTime.toFixed(2)} hrs`} improvement="Live Data" />
        <Metric icon={<ShieldCheck size={20} className="text-purple-400" />} label="Recovery Time" value="24 hrs" improvement="80.0% improvement (Goal)" />
        <Metric icon={<HardDrive size={20} className="text-green-400" />} label="Data Backup" value="Successful" improvement="Today, 06:00 AM" />
      </div>
      <button className="mt-6 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">
        Initiate Data Recovery
      </button>
    </div>
  );
};

export default SystemResilience;