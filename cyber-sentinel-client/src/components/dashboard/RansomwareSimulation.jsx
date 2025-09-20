import React, { useState } from 'react';
import { PlayCircle, Search } from 'lucide-react';
import { createAlert } from '../../services/api'; // Import the createAlert function

const RansomwareSimulation = () => {
  const [feedback, setFeedback] = useState('');

  const handleRunSimulation = async () => {
    setFeedback('Initializing simulation...');
    try {
      // This is the data for our new alert
      const simulationAlert = {
        severity: 'High',
        description: 'Ransomware simulation started',
        source_ip: '127.0.0.1 (Internal)',
        action_taken: 'Simulation Triggered',
      };
      
      // Call the API to create the new alert
      await createAlert(simulationAlert);

      setFeedback('Simulation alert created successfully!');
      // In a full app, we would also trigger a refresh of the alerts list
    } catch (error) {
      console.error('Failed to create simulation alert:', error);
      setFeedback('Error: Could not create alert.');
    }

    // Clear feedback message after a few seconds
    setTimeout(() => setFeedback(''), 5000);
  };

  return (
    <div className="card bg-base-200 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">2. Ransomware Simulation & Forensics</h2>
      {/* ... other divs ... */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-grow card p-4 bg-base-300">
          <h3 className="font-semibold mb-2 text-white">Run New Attack Simulation</h3>
          <div className="mb-2">
            <label className="text-sm text-text-secondary">Attack Vector:</label>
            <select className="w-full bg-base-200 border border-gray-600 rounded p-2 mt-1 text-text-primary">
              <option>Phishing Email</option>
              <option>DLL Injection (Whitelist Bypass)</option>
              <option>Malicious Website</option>
            </select>
          </div>
          <button 
            onClick={handleRunSimulation} 
            className="flex items-center justify-center w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
          >
            <PlayCircle className="mr-2" size={20} /> Run Simulation
          </button>
        </div>
        <div className="flex-grow card p-4 bg-base-300">
          <h3 className="font-semibold mb-2 text-white">Launch Forensic Toolkit</h3>
          <p className="text-sm text-text-secondary mb-2 h-12">Analyze post-incident artifacts with integrated tools.</p>
          <button className="flex items-center justify-center w-full py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition-colors">
            <Search className="mr-2" size={20} /> Launch Tools
          </button>
        </div>
      </div>
      {feedback && <div className="mt-4 text-center text-blue-300 font-mono h-6">{feedback}</div>}
    </div>
  );
};

export default RansomwareSimulation;