import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),    tailwindcss(),
],
  server:{
    allowedHosts: [
      '5173-alibyte2001-recurringda-fketq3owh6a.ws-us120.gitpod.io'
    ],
  }
})
