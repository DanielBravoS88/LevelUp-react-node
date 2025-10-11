import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {               // ya estaba
        target: 'http://localhost:5000',
        changeOrigin: true
      },
      '/img': {               // ← NUEVO: para archivos estáticos
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
