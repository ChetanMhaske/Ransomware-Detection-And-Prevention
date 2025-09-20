import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import { analyzeNetworkTraffic } from '../../services/api';

const NetworkAnalysisPanel = () => {
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult('Analyzing...');
    const trafficData = {
      // Sample anomalous data for demonstration
      protocol_type: 'tcp',
      service: 'private',
      flag: 'REJ',
      src_bytes: 0,
      dst_bytes: 0,
      count: 229,
      srv_count: 10,
      source_ip: '192.168.1.105'
    };
    try {
      const response = await analyzeNetworkTraffic(trafficData);
      setResult(`Result: ${response.data.message}`);
    } catch (error) {
      setResult('Error during analysis.');
      console.error(error);
    }
  };

  return (
    <div className="card bg-base-200 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">Live Network Analysis</h2>
      <form onSubmit={handleSubmit}>
        <p className="text-sm text-text-secondary mb-4">
          Click the button to send sample network traffic to the ML model for analysis. If it's an anomaly, a new alert will be automatically created.
        </p>
        <button type="submit" className="flex items-center justify-center w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors">
          <Zap className="mr-2" size={20} /> Analyze Sample Traffic
        </button>
      </form>
      {result && <p className="mt-4 text-center font-mono">{result}</p>}
    </div>
  );
};

export default NetworkAnalysisPanel;