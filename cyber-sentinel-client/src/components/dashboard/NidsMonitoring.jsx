import React, { useState, useEffect } from 'react';
import { ShieldAlert, Signal, Cpu, AlertTriangle } from 'lucide-react';
import { getAlerts } from '../../services/api';

const NidsMonitoring = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        const response = await getAlerts();
        setAlerts(response.data);
      } catch (error) { // <-- The opening brace was missing here
        console.error("Failed to fetch alerts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
    // Optional: Fetch alerts every few seconds to see updates in real-time
    const interval = setInterval(fetchAlerts, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const getSeverityClass = (severity) => {
    switch (severity) {
      case 'High': return 'bg-red-500 text-white';
      case 'Medium': return 'bg-orange-500 text-white';
      case 'Low': return 'bg-yellow-500 text-black';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="card bg-base-200 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">1. Real-Time Threat Monitoring & NIDS</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-center">
        {/* ... metric cards ... */}
        <div className="p-4 bg-base-100 rounded-lg"><Signal className="mx-auto mb-2" /><div className="text-2xl font-bold">1.48M</div><div className="text-sm text-text-secondary">Packets/sec</div></div>
        <div className="p-4 bg-base-100 rounded-lg"><AlertTriangle className="mx-auto mb-2 text-orange-400" /><div className="text-2xl font-bold text-orange-400">{alerts.length}</div><div className="text-sm text-text-secondary">Active Alerts</div></div>
        <div className="p-4 bg-base-100 rounded-lg"><Cpu className="mx-auto mb-2" /><div className="text-lg font-bold">Random Forest</div><div className="text-sm text-text-secondary">Active Model</div></div>
        <div className="p-4 bg-base-100 rounded-lg"><ShieldAlert className="mx-auto mb-2 text-green-400" /><div className="text-lg font-bold">99.7%</div><div className="text-sm text-text-secondary">Accuracy</div></div>
      </div>
      <h3 className="font-semibold mb-2 text-white">Active Alerts (from Database)</h3>
      
      {/* This is the container with a max height and scrollbar */}
      <div className="overflow-y-auto max-h-64"> 
        <table className="w-full text-sm text-left">
          <thead className="bg-base-300 sticky top-0">
            <tr>
              <th className="p-3">Time</th>
              <th className="p-3">Severity</th>
              <th className="p-3 hidden md:table-cell">Description</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-base-300">
            {loading ? (
              <tr><td colSpan="4" className="text-center p-4">Loading alerts...</td></tr>
            ) : (
              // NOTE: The request was to show the latest 3 AND have a scrollbar.
              // To make the scrollbar useful, we should map over the full 'alerts' array.
              // If you truly only want 3 items visible with no scroll, use alerts.slice(0, 3).map(...)
              alerts.map((alert) => (
                <tr key={alert._id} className="hover:bg-base-300">
                  <td className="p-3">{new Date(alert.timestamp).toLocaleTimeString()}</td>
                  <td className="p-3"><span className={`px-2 py-1 text-xs font-bold rounded-full ${getSeverityClass(alert.severity)}`}>{alert.severity.toUpperCase()}</span></td>
                  <td className="p-3 hidden md:table-cell">{alert.description}</td>
                  <td className="p-3">{alert.action_taken}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NidsMonitoring;