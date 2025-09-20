import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MlModelPerformance = () => {
  const data = {
    labels: ['Random Forest', 'XGBoost', 'Decision Tree', 'SVM'],
    datasets: [
      {
        label: 'Accuracy (%)',
        data: [99.7, 99.3, 99.4, 53.6],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(34, 197, 94, 0.7)',
          'rgba(168, 85, 247, 0.7)',
          'rgba(239, 68, 68, 0.7)',
        ],
        borderColor: [
          '#3B82F6',
          '#22C55E',
          '#A855F7',
          '#EF4444',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Model Accuracy Comparison',
        color: '#E5E7EB',
        font: {
          size: 16
        }
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        ticks: { color: '#9CA3AF' },
        grid: { color: 'rgba(156, 163, 175, 0.2)' }
      },
      y: {
        ticks: { color: '#9CA3AF' },
        grid: { display: false }
      }
    }
  };

  return (
    <div className="card bg-base-200 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">4. ML Model Performance</h2>
      <Bar options={options} data={data} />
    </div>
  );
};

export default MlModelPerformance;
