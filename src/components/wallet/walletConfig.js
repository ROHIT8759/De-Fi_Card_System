// src/components/wallet/walletConfig.js
import { useState, useEffect } from 'react';

// Available wallet providers configuration
export const walletProviders = [
  {
    id: 'petra',
    name: 'Petra',
    icon: '🟠',
    description: 'The most popular Aptos wallet',
    downloadUrl: 'https://petra.app/',
    detectMethod: () => !!(window.aptos && typeof window.aptos.connect === 'function'),
    connect: async () => {
      if (!window.aptos) throw new Error('Petra wallet not found');
      const response = await window.aptos.connect();
      const account = await window.aptos.account();
      return {
        address: response.address,
        publicKey: account?.publicKey || '',
        networkName: typeof window.aptos.network === 'function' ? await window.aptos.network() : '',
        walletName: 'Petra'
      };
    }
  },
  {
    id: 'martian',
    name: 'Martian',
    icon: '🔴',
    description: 'Multi-chain wallet for Aptos',
    downloadUrl: 'https://martianwallet.xyz/',
    detectMethod: () => !!window.martian,
    connect: async () => {
      if (!window.martian) throw new Error('Martian wallet not found');
      const response = await window.martian.connect();
      return {
        address: response.address,
        publicKey: response.publicKey || '',
        walletName: 'Martian'
      };
    }
  },
  {
    id: 'pontem',
    name: 'Pontem',
    icon: '🟣',
    description: 'First wallet for Aptos',
    downloadUrl: 'https://pontem.network/',
    detectMethod: () => !!window.pontem,
    connect: async () => {
      if (!window.pontem) throw new Error('Pontem wallet not found');
      const response = await window.pontem.connect();
      return {
        address: response.address,
        walletName: 'Pontem'
      };
    }
  },
  {
    id: 'nightly',
    name: 'Nightly',
    icon: '🟦',
    description: 'Multi-chain DeFi wallet',
    downloadUrl: 'https://nightly.app/',
    detectMethod: () => !!window.nightly && !!window.nightly.aptos,
    connect: async () => {
      if (!window.nightly || !window.nightly.aptos) throw new Error('Nightly wallet not found');
      const response = await window.nightly.aptos.connect();
      return {
        address: response.address,
        walletName: 'Nightly'
      };
    }
  },
  {
    id: 'fewcha',
    name: 'Fewcha',
    icon: '🟡',
    description: 'Simple and secure Aptos wallet',
    downloadUrl: 'https://fewcha.app/',
    detectMethod: () => !!window.fewcha,
    connect: async () => {
      if (!window.fewcha) throw new Error('Fewcha wallet not found');
      const response = await window.fewcha.connect();
      return {
        address: response.address,
        walletName: 'Fewcha'
      };
    }
  },
  {
    id: 'rise',
    name: 'Rise',
    icon: '🔵',
    description: 'Professional Aptos wallet',
    downloadUrl: 'https://risewallet.io/',
    detectMethod: () => !!window.rise,
    connect: async () => {
      if (!window.rise) throw new Error('Rise wallet not found');
      const response = await window.rise.connect();
      return {
        address: response.address,
        walletName: 'Rise'
      };
    }
  }
];

/**
 * Fast, robust wallet detection hook
 */
export const useWalletDetection = () => {
  const [detectedWallets, setDetectedWallets] = useState({});
  const [isDetecting, setIsDetecting] = useState(true);

  useEffect(() => {
    let active = true;
    const detectWallets = () => {
      const detected = {};
      for (const wallet of walletProviders) {
        try {
          detected[wallet.id] = !!wallet.detectMethod();
        } catch {
          detected[wallet.id] = false;
        }
      }
      if (active) {
        setDetectedWallets(detected);
        setIsDetecting(false);
      }
    };
    detectWallets();
    const interval = setInterval(detectWallets, 1500); // Fast detection
    window.addEventListener('focus', detectWallets);
    document.addEventListener('visibilitychange', detectWallets);
    return () => {
      active = false;
      clearInterval(interval);
      window.removeEventListener('focus', detectWallets);
      document.removeEventListener('visibilitychange', detectWallets);
    };
  }, []);
  return { detectedWallets, isDetecting };
};

/**
 * Connect to any supported wallet by ID
 */
export const connectToWallet = async (walletId) => {
  const wallet = walletProviders.find(w => w.id === walletId);
  if (!wallet) throw new Error('Wallet not supported');
  return wallet.connect();
};

// Local storage keys
const WALLET_CONNECTION_KEY = 'wallet_connection';

/**
 * Save wallet connection info to localStorage
 * @param {Object} connectionInfo - Wallet connection information
 */
export const saveWalletConnection = (connectionInfo) => {
  if (!connectionInfo) return;
  try {
    localStorage.setItem(WALLET_CONNECTION_KEY, JSON.stringify(connectionInfo));
  } catch (error) {
    console.error('Failed to save wallet connection:', error);
  }
};

/**
 * Get saved wallet connection from localStorage
 * @returns {Object|null} Saved wallet connection or null
 */
export const getSavedWalletConnection = () => {
  try {
    const saved = localStorage.getItem(WALLET_CONNECTION_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to get saved wallet connection:', error);
    return null;
  }
};

/**
 * Clear saved wallet connection from localStorage
 */
export const clearSavedWalletConnection = () => {
  try {
    localStorage.removeItem(WALLET_CONNECTION_KEY);
  } catch (error) {
    console.error('Failed to clear wallet connection:', error);
  }
};
