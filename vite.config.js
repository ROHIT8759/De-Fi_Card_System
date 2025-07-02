import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isAnalyze = mode === 'analyze';
  
  // Base configuration
  const config = {
    plugins: [react()],
    build: {
      // Increase the warning limit to avoid unnecessary warnings
      chunkSizeWarningLimit: 1000, // in kB
      
      // Configure Rollup options for better chunking
      rollupOptions: {
        output: {
          // Manual chunks configuration to split large dependencies
          manualChunks: (id) => {
            // Group React dependencies in one chunk
            if (id.includes('node_modules/react') || 
                id.includes('node_modules/react-dom')) {
              return 'react-vendor';
            }
            
            // Group Chart.js in its own chunk
            if (id.includes('node_modules/chart.js') || 
                id.includes('node_modules/react-chartjs-2')) {
              return 'chart-vendor';
            }
            
            // Group Aptos wallet adapter in its own chunk
            if (id.includes('node_modules/@aptos-labs/wallet-adapter-core') || 
                id.includes('node_modules/@aptos-labs/wallet-adapter-react')) {
              return 'aptos-vendor';
            }
          }
        }
      }
    },
    
    // Optimize dependency pre-bundling
    optimizeDeps: {
      include: ['react', 'react-dom', 'framer-motion']
    },
    
    // Resolve paths for better imports
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  };
  
  // Add visualizer plugin in analyze mode
  if (isAnalyze) {
    try {
      // Dynamically import visualizer
      const visualizer = require('rollup-plugin-visualizer').visualizer;
      config.plugins.push(
        visualizer({
          filename: './dist/stats.html',
          open: true,
          gzipSize: true,
          brotliSize: true,
        })
      );
    } catch (e) {
      console.warn('Visualizer plugin not found. Run `npm run analyze:install` first.');
    }
  }
  
  return config;
});
