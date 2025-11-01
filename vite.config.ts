import { defineConfig } from 'vite'
import vike from 'vike/plugin'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vike({ prerender: true })
  ],
  define: {
    'global': 'globalThis',
  },
  resolve: {
    alias: {
      'buffer': 'buffer/',
    },
  },
  optimizeDeps: {
    include: ['buffer'],
  },
  preview: {
    port: 8000,
    strictPort: false,
    open: true,
  },
})
