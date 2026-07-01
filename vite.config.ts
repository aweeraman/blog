import { defineConfig } from 'vite'
import vike from 'vike/plugin'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { compression } from 'vite-plugin-compression2'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vike({ prerender: true }),
    nodePolyfills({
      include: ['buffer'],
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
    }),
    compression({ algorithms: ['gzip', 'brotliCompress'] }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Separate React and React-DOM into their own chunk
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          // Separate markdown rendering into its own chunk
          if (id.includes('node_modules/react-markdown') || id.includes('node_modules/remark-gfm')) {
            return 'markdown-vendor';
          }
          // Vike runtime
          if (id.includes('node_modules/vike')) {
            return 'vike-vendor';
          }
        },
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 600,
  },
  server: {
    port: 8000,
    strictPort: false,
    open: true,
  },
  preview: {
    port: 8000,
    strictPort: false,
    open: true,
  },
})
