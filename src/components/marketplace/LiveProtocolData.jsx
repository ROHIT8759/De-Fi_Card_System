// src/components/marketplace/LiveProtocolData.jsx
import React, { useState, useEffect } from 'react';

const LiveProtocolData = () => {
  const [protocolData, setProtocolData] = useState([
    {
      name: 'AptosLend',
      tvl: 15200000,
      apy: 8.5,
      utilization: 76,
      trend: 'up',
      logo: '🌊'
    },
    {
      name: 'DefiSpace',
      tvl: 12800000,
      apy: 9.2,
      utilization: 68,
      trend: 'up',
      logo: '🚀'
    },
    {
      name: 'LiquidAptos',
      tvl: 8900000,
      apy: 7.8,
      utilization: 82,
      trend: 'down',
      logo: '💧'
    },
    {
      name: 'StakeVault',
      tvl: 6500000,
      apy: 11.5,
      utilization: 45,
      trend: 'up',
      logo: '🏦'
    }
  ]);

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setProtocolData(prev => prev.map(protocol => ({
        ...protocol,
        apy: Math.max(5, protocol.apy + (Math.random() - 0.5) * 0.2),
        utilization: Math.max(20, Math.min(95, protocol.utilization + (Math.random() - 0.5) * 5))
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`;
    }
    return `$${(num / 1000).toFixed(0)}K`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          📡 Live Protocol Data
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500 dark:text-gray-400">Live</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {protocolData.map((protocol, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{protocol.logo}</span>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {protocol.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    TVL: {formatNumber(protocol.tvl)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-lg ${
                  protocol.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {protocol.trend === 'up' ? '📈' : '📉'}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400">APY:</span>
                <div className="font-semibold text-green-600 dark:text-green-400">
                  {protocol.apy.toFixed(2)}%
                </div>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Utilization:</span>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {protocol.utilization.toFixed(0)}%
                </div>
              </div>
            </div>
            
            {/* Utilization bar */}
            <div className="mt-3">
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    protocol.utilization > 80 ? 'bg-red-500' :
                    protocol.utilization > 60 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${protocol.utilization}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="text-sm text-blue-800 dark:text-blue-200">
          💡 <strong>Tip:</strong> Higher utilization rates often indicate strong demand but may lead to higher borrowing costs.
        </div>
      </div>
    </div>
  );
};

export default LiveProtocolData;
