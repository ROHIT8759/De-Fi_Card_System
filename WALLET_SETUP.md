# Wallet Integration Setup Guide

This document provides instructions for setting up the wallet integration in your application.

## Setup Steps

### 1. Install Required Dependencies

```bash
npm install @particle-network/auth @particle-network/connect-react-ui @particle-network/chains
```

### 2. Obtain API Keys from Particle Network

1. Create an account on [Particle Network Dashboard](https://dashboard.particle.network/)
2. Create a new project
3. Select "Aptos" as your blockchain
4. Copy your Project ID, Client Key, and App ID

### 3. Configure Environment Variables

Create or update your `.env` file with the following variables:

```
VITE_PARTICLE_PROJECT_ID=your_particle_project_id
VITE_PARTICLE_CLIENT_KEY=your_particle_client_key
VITE_PARTICLE_APP_ID=your_particle_app_id
VITE_DEFAULT_NETWORK=mainnet
```

Replace the placeholder values with your actual API keys.

### 4. Initialize Particle in Your App Entry Point

In your `main.jsx` or `App.jsx` file:

```jsx
import { ParticleProvider } from '@particle-network/connect-react-ui';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ParticleProvider
      options={{
        projectId: import.meta.env.VITE_PARTICLE_PROJECT_ID,
        clientKey: import.meta.env.VITE_PARTICLE_CLIENT_KEY,
        appId: import.meta.env.VITE_PARTICLE_APP_ID,
        chainName: 'Aptos',
        chainId: 1, // 1 for mainnet, 2 for testnet
      }}
    >
      <App />
    </ParticleProvider>
  </React.StrictMode>
);
```

### 5. Configure Allowed Origins in Particle Dashboard

1. Go to your Particle Network dashboard
2. Navigate to "Settings" > "Authentication"
3. Add your domain (e.g., `http://localhost:3000` for development)
4. Save changes

## Usage

Now you can use the wallet connection components in your application:

```jsx
import { WalletConnectionModal } from './components/wallet/WalletConnectionModal';
import { WalletStatus } from './components/wallet/WalletStatus';

function MyComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [walletInfo, setWalletInfo] = useState(null);
  
  const handleWalletConnect = (info) => {
    setWalletInfo(info);
    console.log('Wallet connected:', info);
  };
  
  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>
        Connect Wallet
      </button>
      
      {walletInfo && <WalletStatus walletInfo={walletInfo} />}
      
      <WalletConnectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onWalletConnect={handleWalletConnect}
      />
    </div>
  );
}
```

## Troubleshooting

If you encounter any issues:

1. Ensure all API keys are correctly set in your `.env` file
2. Verify your domain is added to allowed origins in Particle dashboard
3. Check browser console for detailed error messages
4. For wallet connections, ensure the user has the wallet extensions installed
