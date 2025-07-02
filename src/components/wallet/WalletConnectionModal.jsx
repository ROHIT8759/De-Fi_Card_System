// src/components/wallet/WalletConnectionModal.jsx
import React, { useState } from 'react';
import {
  walletProviders,
  useWalletDetection,
  connectToWallet,
  saveWalletConnection
} from './walletConfig';

const WalletConnectionModal = ({ isOpen, onClose, onWalletConnect }) => {
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  
  // Use the wallet detection hook from walletConfig
  const { detectedWallets, isDetecting } = useWalletDetection();

  // Universal wallet connection handler for crypto wallets
  const handleWalletConnect = async (wallet) => {
    setIsConnecting(true);
    setSelectedWallet(wallet.id);
    setError(null);

    try {
      // Use the connectToWallet function from walletConfig.js
      const connectionResult = await connectToWallet(wallet.id);
      
      // Save connection to localStorage for persistence
      saveWalletConnection(connectionResult);
      
      // Call the parent component's callback with connection info
      onWalletConnect({
        ...connectionResult,
        walletType: wallet.name,
        connected: true
      });
      
      onClose();
    } catch (error) {
      console.error(`${wallet.name} connection error:`, error);
      setError(`Failed to connect with ${wallet.name}: ${error.message || 'Unknown error'}`);
    } finally {
      setIsConnecting(false);
      setSelectedWallet(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Select Wallet
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* AIP-62 Standard Notice */}
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border-b border-gray-200 dark:border-gray-700">
          <p className="text-sm text-green-700 dark:text-green-300 text-center">
            Powered by AIP-62 Wallet Standard
          </p>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm text-red-700 dark:text-red-300 text-center">
              {error}
            </p>
          </div>
        )}

        {/* Wallet Options */}
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Crypto Wallets
          </h3>
          <div className="space-y-2">
            {walletProviders.map((wallet) => {
              const isDetected = detectedWallets[wallet.id];
              const isCurrentlyConnecting = isConnecting && selectedWallet === wallet.id;

              return (
                <button
                  key={wallet.id}
                  onClick={() => isDetected ? handleWalletConnect(wallet) : window.open(wallet.downloadUrl, '_blank')}
                  disabled={isConnecting}
                  className="w-full flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  <span className="text-2xl">{wallet.icon}</span>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {wallet.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {isCurrentlyConnecting ? 'Connecting...' : 
                       isDetecting ? 'Detecting...' :
                       isDetected ? 'Installed' : 'Not Detected'}
                    </div>
                  </div>
                  {(isCurrentlyConnecting || (isDetecting && !isCurrentlyConnecting)) && (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent" />
                  )}
                  {!isDetected && (
                    <span className="text-xs text-blue-600 dark:text-blue-400">Install</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Network Reminder */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-start gap-2">
            <div className="text-blue-500 mt-0.5">ℹ️</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">
              <strong>REMIND</strong><br />
              Please switch your wallet to <span className="font-semibold">CORRECT NETWORK</span>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletConnectionModal;
