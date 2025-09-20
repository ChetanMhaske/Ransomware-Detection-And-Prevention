import React, { useState, useEffect } from 'react';
import { getLogs } from '../../services/api'; // Import our new getLogs function

const LogsPanel = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const response = await getLogs();
        setLogs(response.data);
      } catch (error) {
        console.error("Failed to fetch logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const getLevelClass = (level) => {
    switch (level) {
      case 'ERROR': return 'bg-red-500 text-white';
      case 'WARN': return 'bg-yellow-500 text-black';
      case 'INFO': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="card bg-base-200 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">System Logs (from Database)</h2>
      <div className="overflow-x-auto max-h-96">
        <table className="w-full text-sm text-left">
          <thead className="bg-base-300 sticky top-0">
            <tr>
              <th className="p-3">Time</th>
              <th className="p-3">Level</th>
              <th className="p-3">Service</th>
              <th className="p-3">Message</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" className="text-center p-4">Loading logs...</td></tr>
            ) : (
              logs.map((log) => (
                <tr key={log._id} className="border-b border-base-300 hover:bg-base-300">
                  <td className="p-3 whitespace-nowrap">{new Date(log.timestamp).toLocaleTimeString()}</td>
                  <td className="p-3"><span className={`px-2 py-1 text-xs font-bold rounded-full ${getLevelClass(log.level)}`}>{log.level}</span></td>
                  <td className="p-3">{log.service}</td>
                  <td className="p-3">{log.message}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogsPanel;