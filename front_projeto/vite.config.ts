import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/postcss'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: false,         // desabilita HMR (causa erros de WebSocket no Minikube)
    proxy: {
      '/api': {
        target: 'http://backend-service:3000',  // DNS interno do Kubernetes
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
})