import React, { useState, useEffect, useCallback } from 'react';
import { ShieldAlert, Signal, Cpu, AlertTriangle, RefreshCw } from 'lucide-react';
import { getAlerts, resolveAlert } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const NidsMonitoring = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  const fetchAlerts = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      setLoading(true);
      const response = await getAlerts();
      setAlerts(response.data);
    } catch (error) {
      console.error("Failed to fetch alerts:", error);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000);
    return () => clearInterval(interval);
  }, [fetchAlerts]);

  const handleResolve = async (alertId) => {
    try {
      await resolveAlert(alertId);
      fetchAlerts();
    } catch (error) {
      console.error("Failed to resolve alert:", error);
    }
  };

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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">1. Real-Time Threat Monitoring & NIDS</h2>
        <button onClick={fetchAlerts} className="p-2 rounded-full hover:bg-base-300 transition-colors" title="Refresh Alerts">
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-center">
        <div className="p-4 bg-base-100 rounded-lg"><Signal className="mx-auto mb-2" /><div className="text-2xl font-bold">1.48M</div><div className="text-sm text-text-secondary">Packets/sec</div></div>
        <div className="p-4 bg-base-100 rounded-lg"><AlertTriangle className="mx-auto mb-2 text-orange-400" /><div className="text-2xl font-bold text-orange-400">{alerts.filter(a => a.status === 'new').length}</div><div className="text-sm text-text-secondary">Active Alerts</div></div>
        <div className="p-4 bg-base-100 rounded-lg"><Cpu className="mx-auto mb-2" /><div className="text-lg font-bold">Random Forest</div><div className="text-sm text-text-secondary">Active Model</div></div>
        <div className="p-4 bg-base-100 rounded-lg"><ShieldAlert className="mx-auto mb-2 text-green-400" /><div className="text-lg font-bold">99.7%</div><div className="text-sm text-text-secondary">Accuracy</div></div>
      </div>

      <h3 className="font-semibold mb-2 text-white">Active Alerts (from Database)</h3>
      <div className="overflow-y-auto max-h-72">
        <table className="w-full text-sm text-left">
          <thead className="bg-base-300 sticky top-0">
            <tr>
              <th className="p-3">Time</th>
              <th className="p-3">Severity</th>
              <th className="p-3 hidden md:table-cell">Description</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-base-300">
            {loading ? (
              <tr><td colSpan="5" className="text-center p-4">Loading alerts...</td></tr>
            ) : (
              alerts.map((alert) => (
                <tr key={alert._id} className={`hover:bg-base-300 ${alert.status === 'resolved' ? 'opacity-50' : ''}`}>
                  {/* These 5 cells now correctly match the 5 header columns */}
                  <td className="p-3">{new Date(alert.timestamp).toLocaleTimeString()}</td>
                  <td className="p-3"><span className={`px-2 py-1 text-xs font-bold rounded-full ${getSeverityClass(alert.severity)}`}>{alert.severity.toUpperCase()}</span></td>
                  <td className="p-3 hidden md:table-cell">{alert.description}</td>
                  <td className="p-3 capitalize">{alert.status}</td>
                  <td className="p-3">
                    {alert.status === 'new' && (
                      <button 
                        onClick={() => handleResolve(alert._id)}
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-full transition-colors"
                      >
                        Resolve
                      </button>
                    )}
                  </td>
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