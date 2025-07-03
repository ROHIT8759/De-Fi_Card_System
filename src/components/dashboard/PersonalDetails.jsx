// src/components/dashboard/PersonalDetails.jsx
import React from 'react';

const PersonalDetails = ({ walletAddress, aptosBalance }) => {
  return (
    <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg shadow-purple-500/10 transition-all hover:shadow-purple-500/20">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="text-purple-400"></span> Personal Details
      </h3>

      <div className="space-y-6 text-sm text-white/80">
        {/* Wallet Address */}
        <div>
          <label className="block text-white/60 mb-1">Wallet Address</label>
          <div className="p-3 bg-white/5 border border-white/10 rounded-lg font-mono break-all text-white text-sm">
            {walletAddress || 'Not connected'}
          </div>
        </div>

        {/* Balance Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white/60 mb-1">APT Balance</label>
            <div className="text-lg font-bold text-green-400">
              {aptosBalance ? `${aptosBalance.toFixed(4)} APT` : '--'}
            </div>
          </div>
          <div>
            <label className="block text-white/60 mb-1">USD Value</label>
            <div className="text-lg font-bold text-white">
              {aptosBalance ? `$${(aptosBalance * 8.5).toFixed(2)}` : '--'}
            </div>
          </div>
        </div>

        {/* Account Status */}
        <div>
          <label className="block text-white/60 mb-1">Account Status</label>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-green-400 font-medium">
              {walletAddress ? 'Connected & Verified' : 'Not Connected'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
