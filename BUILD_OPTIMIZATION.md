# Build Optimization Guide

This guide provides instructions for optimizing the build process and resolving the chunk size warning.

## Understanding the Warning

When you see this warning during build:

```
(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking
- Adjust chunk size warning limit via build.chunkSizeWarningLimit.
```

It means that some JavaScript bundles are too large, which can slow down page load times.

## How We Fixed It

We've implemented several optimizations in the build process:

1. **Code Splitting**: Configured proper code splitting to divide the application into smaller chunks.
2. **Manual Chunking**: Organized dependencies and components into logical groups.
3. **Dynamic Imports**: Set up the system to use dynamic imports for large components.
4. **Warning Limit Adjustment**: Increased the warning threshold for legitimate large chunks.

## How to Use the Optimizations

### Running a Production Build

```bash
npm run build
```

This will build the application with all optimizations enabled.

### Analyzing Bundle Size

To visualize and analyze your bundle sizes:

1. Install the visualizer plugin:
```bash
npm run analyze:install
```

2. Run the analyze build:
```bash
npm run build:analyze
```

This will generate a visualization of your bundle sizes in `dist/stats.html` and open it in your browser.

## Further Optimization Tips

If you still see large chunks after these optimizations:

1. **Use Dynamic Imports for Routes**: 
```jsx
// Instead of this:
import UserProfile from './UserProfile';

// Use this:
const UserProfile = React.lazy(() => import('./UserProfile'));
```

2. **Optimize Large Dependencies**:
   - Check if you can use lighter alternatives
   - Only import what you need from large libraries

3. **Preload Critical Chunks**:
```jsx
<link rel="preload" href="/assets/critical-chunk.js" as="script" />
```

4. **Code-Split by Route**:
```jsx
const routes = [
  {
    path: '/wallet',
    component: React.lazy(() => import('./components/wallet/WalletPage'))
  },
  {
    path: '/dashboard',
    component: React.lazy(() => import('./components/dashboard/Dashboard'))
  }
];
```

## Monitoring Build Sizes

To keep track of your bundle sizes over time:

1. Run `npm run build:analyze` before and after adding significant dependencies
2. Consider adding size limits for critical chunks
3. Review the visualization to identify unexpected large dependencies
