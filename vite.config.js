import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: '/index-react.html'
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index-react.html'
      }
    }
  },
  publicDir: 'public'
})