import React from 'react';
import Header from '../components/common/Header';
import NidsMonitoring from '../components/dashboard/NidsMonitoring';
import RansomwareSimulation from '../components/dashboard/RansomwareSimulation';
import SystemResilience from '../components/dashboard/SystemResilience';
import MlModelPerformance from '../components/dashboard/MlModelPerformance';
import LogsPanel from '../components/dashboard/LogsPanel';
import NetworkAnalysisPanel from '../components/dashboard/NetworkAnalysisPanel';

const DashboardPage = () => {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2 space-y-6">
            <NidsMonitoring />
            <NetworkAnalysisPanel />
            <RansomwareSimulation />
            <LogsPanel />
          </div>
          <div className="lg:col-span-1 space-y-6">
            <SystemResilience />
            <MlModelPerformance />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;

