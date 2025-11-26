import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // For GitHub Pages deployment - change 'wine-terroir-simulator' to your repo name
  base: '/wine-terroir-simulator/',
  build: {
    sourcemap: false,
  },
})
