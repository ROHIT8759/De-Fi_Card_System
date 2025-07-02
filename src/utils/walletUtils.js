// src/utils/walletUtils.js
/**
 * Wallet utility functions for common wallet operations
 */

/**
 * Formats a blockchain address to a shortened display format
 * @param {string} address - The full address to format
 * @param {number} prefixLength - Number of characters to keep at the start
 * @param {number} suffixLength - Number of characters to keep at the end
 * @returns {string} Formatted address
 */
export const formatAddress = (address, prefixLength = 6, suffixLength = 4) => {
  if (!address || address.length < prefixLength + suffixLength) {
    return address || '';
  }
  
  const prefix = address.slice(0, prefixLength);
  const suffix = address.slice(-suffixLength);
  return `${prefix}...${suffix}`;
};

/**
 * Validates an Aptos blockchain address
 * @param {string} address - The address to validate
 * @returns {boolean} Whether the address is valid
 */
export const isValidAptosAddress = (address) => {
  if (!address) return false;
  
  // Basic validation for Aptos addresses
  // Aptos addresses are hex strings starting with 0x and are 66 characters long (including 0x)
  const aptosAddressRegex = /^0x[a-fA-F0-9]{64}$/;
  return aptosAddressRegex.test(address);
};

/**
 * Gets the current network information based on a chain ID
 * @param {string|number} chainId - The chain ID to lookup
 * @returns {Object} Network information
 */
export const getNetworkInfo = (chainId) => {
  const networks = {
    // Aptos networks
    '1': { name: 'Aptos Mainnet', explorer: 'https://explorer.aptoslabs.com' },
    '2': { name: 'Aptos Testnet', explorer: 'https://testnet.explorer.aptoslabs.com' },
    '33': { name: 'Aptos Devnet', explorer: 'https://devnet.explorer.aptoslabs.com' },
    // Add more networks as needed
  };
  
  return networks[chainId] || { name: 'Unknown Network', explorer: '' };
};

/**
 * Copies text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Whether the copy was successful
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

/**
 * Opens an address in the appropriate blockchain explorer
 * @param {string} address - The address to view
 * @param {string|number} chainId - The chain ID for determining the explorer URL
 */
export const openInExplorer = (address, chainId = '1') => {
  const network = getNetworkInfo(chainId);
  if (!network.explorer) return;
  
  const url = `${network.explorer}/account/${address}`;
  window.open(url, '_blank');
};

/**
 * Creates a signature message for Aptos wallets
 * @param {string} nonce - A unique nonce for the signature
 * @param {string} purpose - Purpose of the signature (e.g., "login", "transaction")
 * @returns {string} Formatted message for signing
 */
export const createSignatureMessage = (nonce, purpose = 'login') => {
  return `Sign this message to ${purpose} with your wallet.\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nNonce: ${nonce}\nTimestamp: ${Date.now()}`;
};

/**
 * Tracks wallet events like connects and disconnects for analytics
 * @param {string} eventName - Name of the event
 * @param {Object} eventData - Data related to the event
 */
export const trackWalletEvent = (eventName, eventData = {}) => {
  // If you have analytics set up:
  if (window.analytics) {
    window.analytics.track(`wallet_${eventName}`, {
      timestamp: new Date().toISOString(),
      ...eventData
    });
  }
  
  // Log for development
  console.log(`Wallet Event: ${eventName}`, eventData);
};
