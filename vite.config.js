import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3333',
       '/auth': 'http://localhost:3333',
      '/comments': 'http://localhost:3333',
    }
  }
})
