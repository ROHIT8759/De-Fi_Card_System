// src/config/env.js
// This file exports environment variables for the application

/**
 * Environment variables for Particle Network integration
 */
export const PARTICLE_CONFIG = {
  projectId: import.meta.env.VITE_PARTICLE_PROJECT_ID || 'your_particle_project_id',
  clientKey: import.meta.env.VITE_PARTICLE_CLIENT_KEY || 'your_particle_client_key',
  appId: import.meta.env.VITE_PARTICLE_APP_ID || 'your_particle_app_id',
  chainName: 'Aptos',
  chainId: import.meta.env.VITE_DEFAULT_NETWORK === 'testnet' ? 2 : 1, // 1 for mainnet, 2 for testnet
};

/**
 * Environment validation
 * Checks if the required environment variables are set
 */
export const validateEnv = () => {
  const requiredVars = [
    'VITE_PARTICLE_PROJECT_ID',
    'VITE_PARTICLE_CLIENT_KEY',
    'VITE_PARTICLE_APP_ID',
  ];
  
  const missingVars = requiredVars.filter(varName => 
    !import.meta.env[varName] || import.meta.env[varName] === 'your_particle_project_id'
  );
  
  if (missingVars.length > 0) {
    console.warn(`⚠️ Missing environment variables: ${missingVars.join(', ')}`);
    return false;
  }
  
  return true;
};

// Run validation during development
if (import.meta.env.DEV) {
  validateEnv();
}
