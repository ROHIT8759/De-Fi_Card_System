// Example file: src/lazyComponents.js
// This file demonstrates how to use lazy loading for components

import React, { lazy } from 'react';

// Lazy load components to reduce initial bundle size
export const LazyWalletConnectionModal = lazy(() => 
  import('./components/wallet/WalletConnectionModal')
);

export const LazyWalletStatus = lazy(() => 
  import('./components/wallet/WalletStatus')
);

export const LazyWalletIntegrationExample = lazy(() => 
  import('./components/wallet/WalletIntegrationExample')
);

// Example of lazy loading dashboard components
export const LazyProfileDashboard = lazy(() => 
  import('./components/dashboard/ProfileDashboard')
);

// Example of lazy loading marketplace components
export const LazyMarketStats = lazy(() => 
  import('./components/marketplace/MarketStats')
);

// Create a HOC to easily wrap lazy components with Suspense
export function withSuspense(Component, FallbackComponent = null) {
  return function WithSuspense(props) {
    return (
      <React.Suspense fallback={FallbackComponent || <div>Loading...</div>}>
        <Component {...props} />
      </React.Suspense>
    );
  };
}
