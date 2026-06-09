import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      // FIX: Use prefixes that don't clash with the real API path segments.
      // /nvidia-proxy/v1/... → https://integrate.api.nvidia.com/v1/...
      '/nvidia-proxy': {
        target: 'https://integrate.api.nvidia.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/nvidia-proxy/, ''),
        secure: true,
      },
      // /gemini-proxy/v1beta/... → https://generativelanguage.googleapis.com/v1beta/...
      '/gemini-proxy': {
        target: 'https://generativelanguage.googleapis.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gemini-proxy/, ''),
        secure: true,
      },
    },
  },
});