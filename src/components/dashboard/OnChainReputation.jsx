// src/components/dashboard/OnChainReputation.jsx
import React from 'react';

const OnChainReputation = ({ walletAddress }) => {
  // Mock reputation data - in real app, this would come from blockchain analysis
  const reputationScore = walletAddress ? Math.floor(Math.random() * 400) + 600 : 0;
  const reputationLevel = reputationScore >= 800 ? 'Excellent' : 
                         reputationScore >= 700 ? 'Good' : 
                         reputationScore >= 600 ? 'Fair' : 'Building';
  
  const getScoreColor = (score) => {
    if (score >= 800) return 'text-green-600 dark:text-green-400';
    if (score >= 700) return 'text-blue-600 dark:text-blue-400';
    if (score >= 600) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  const metrics = [
    { label: 'Transaction History', value: walletAddress ? '156 txns' : '--', icon: '📊' },
    { label: 'Account Age', value: walletAddress ? '8 months' : '--', icon: '⏰' },
    { label: 'DeFi Interactions', value: walletAddress ? '23 protocols' : '--', icon: '🔗' },
    { label: 'Loan History', value: walletAddress ? '3 repaid' : '--', icon: '💳' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        🏆 On-Chain Reputation
      </h3>
      
      <div className="text-center mb-6">
        <div className={`text-4xl font-bold ${getScoreColor(reputationScore)} mb-2`}>
          {reputationScore || '--'}
        </div>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
          Credit Score ({reputationLevel})
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${Math.min((reputationScore / 1000) * 100, 100)}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Score out of 1000
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm">{metric.icon}</span>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                {metric.label}
              </span>
            </div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {metric.value}
            </div>
          </div>
        ))}
      </div>
      
      {walletAddress && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="text-sm text-blue-800 dark:text-blue-200">
            💡 <strong>Tip:</strong> Increase your score by maintaining active DeFi participation and timely loan repayments.
          </div>
        </div>
      )}
    </div>
  );
};

export default OnChainReputation;
