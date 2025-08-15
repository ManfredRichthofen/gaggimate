import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';

const isProd = process.env.NODE_ENV === 'production'

// Optimize for smaller bundle sizes
const optimizeDeps = {
  include: ['preact', 'preact/hooks', '@lingui/core', '@lingui/macro'],
  exclude: ['@lingui/vite-plugin'],
}

// https://vitejs.dev/config/
export default defineConfig({
<<<<<<< Updated upstream
  plugins: [preact(), tailwindcss()],
=======
  optimizeDeps,
  plugins: [preact({
    babel: {
      plugins: ["@lingui/babel-plugin-lingui-macro"],
    }
  }), tailwindcss(), lingui()],
>>>>>>> Stashed changes

  build: {
    target: 'es2020',
    cssCodeSplit: false,           // Single CSS file for smaller size
    modulePreload: false,          // Disable for smaller size
    minify: 'esbuild',
    // strip logs
    esbuild: { 
      drop: isProd ? ['console', 'debugger'] : [],
      pure: isProd ? ['console.log', 'console.info', 'console.debug', 'console.warn'] : [],
      mangleProps: isProd ? /^_/ : undefined, // Mangle private properties
    },
    rollupOptions: {
      output: {
        // Single chunk for smallest size (no chunk splitting overhead)
        manualChunks: undefined,
      },
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false,
      },
    },
  },

  server: {
    proxy: {
      '/api': {
        target: 'http://gaggimate.local/',
        changeOrigin: true,
      },
      '/ws': {
        target: 'ws://gaggimate.local',
        ws: true,
      },
    },
  },
});
