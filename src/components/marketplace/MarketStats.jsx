// src/components/marketplace/MarketStats.jsx
import React from 'react';

const MarketStats = () => {
  const stats = [
    {
      label: 'Total Value Locked',
      value: '$45.2M',
      change: '+12.5%',
      changeType: 'positive',
      icon: '🔒'
    },
    {
      label: 'Active Loans',
      value: '1,247',
      change: '+8.3%',
      changeType: 'positive',
      icon: '💰'
    },
    {
      label: 'Average APR',
      value: '9.2%',
      change: '-0.5%',
      changeType: 'negative',
      icon: '📊'
    },
    {
      label: 'Loan Volume (24h)',
      value: '$2.1M',
      change: '+15.7%',
      changeType: 'positive',
      icon: '📈'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">{stat.icon}</span>
            <span className={`text-sm font-medium ${
              stat.changeType === 'positive' 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {stat.change}
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {stat.value}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarketStats;
