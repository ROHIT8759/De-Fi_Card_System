// src/components/dashboard/BalanceOverview.jsx
import React from 'react';

const BalanceOverview = ({ aptosBalance }) => {
  // Mock portfolio data
  const portfolioData = {
    totalValue: aptosBalance ? aptosBalance * 8.5 + 1250 : 0,
    apt: {
      amount: aptosBalance || 0,
      value: aptosBalance ? aptosBalance * 8.5 : 0,
      change24h: 5.2
    },
    nfts: {
      count: aptosBalance ? 3 : 0,
      value: aptosBalance ? 850 : 0
    },
    staked: {
      amount: aptosBalance ? aptosBalance * 0.3 : 0,
      value: aptosBalance ? aptosBalance * 0.3 * 8.5 : 0,
      apy: 12.4
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        💰 Balance Overview
      </h3>
      
      {/* Total Portfolio Value */}
      <div className="text-center mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
          Total Portfolio Value
        </div>
        <div className="text-3xl font-bold text-gray-900 dark:text-white">
          ${portfolioData.totalValue.toFixed(2)}
        </div>
        <div className="text-sm text-green-600 dark:text-green-400 flex items-center justify-center gap-1">
          <span>↗</span> +2.8% today
        </div>
      </div>
      
      {/* Asset Breakdown */}
      <div className="space-y-4">
        {/* APT Holdings */}
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Aptos (APT)</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {portfolioData.apt.amount.toFixed(4)} APT
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium text-gray-900 dark:text-white">
              ${portfolioData.apt.value.toFixed(2)}
            </div>
            <div className="text-sm text-green-600 dark:text-green-400">
              +{portfolioData.apt.change24h}%
            </div>
          </div>
        </div>
        
        {/* NFTs */}
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              N
            </div>
            <div>
              <div className="font-medium text-gray-900 dark:text-white">NFTs</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {portfolioData.nfts.count} items
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium text-gray-900 dark:text-white">
              ${portfolioData.nfts.value.toFixed(2)}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Est. value
            </div>
          </div>
        </div>
        
        {/* Staked APT */}
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              S
            </div>
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Staked APT</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {portfolioData.staked.amount.toFixed(4)} APT
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium text-gray-900 dark:text-white">
              ${portfolioData.staked.value.toFixed(2)}
            </div>
            <div className="text-sm text-green-600 dark:text-green-400">
              {portfolioData.staked.apy}% APY
            </div>
          </div>
        </div>
      </div>
      
      {/* Available for Collateral */}
      <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <div className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">
          💎 Available for Collateral
        </div>
        <div className="text-lg font-bold text-green-900 dark:text-green-100">
          ${(portfolioData.totalValue * 0.8).toFixed(2)}
        </div>
        <div className="text-xs text-green-700 dark:text-green-300">
          80% of portfolio value (standard LTV ratio)
        </div>
      </div>
    </div>
  );
};

export default BalanceOverview;
