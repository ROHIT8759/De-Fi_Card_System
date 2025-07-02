// src/components/dashboard/PersonalDetails.jsx
import React from 'react';

const PersonalDetails = ({ walletAddress, aptosBalance }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        👤 Personal Details
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Wallet Address</label>
          <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg font-mono text-sm break-all">
            {walletAddress || 'Not connected'}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">APT Balance</label>
            <div className="mt-1 text-2xl font-bold text-green-600 dark:text-green-400">
              {aptosBalance ? `${aptosBalance.toFixed(4)} APT` : '--'}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">USD Value</label>
            <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
              {aptosBalance ? `$${(aptosBalance * 8.5).toFixed(2)}` : '--'}
            </div>
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Status</label>
          <div className="mt-1 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-green-600 dark:text-green-400 font-medium">
              {walletAddress ? 'Connected & Verified' : 'Not Connected'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
