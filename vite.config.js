import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/pomodoro-app/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'إنجاز بومودورو',
        short_name: 'إنجاز',
        description: 'تطبيق احترافي لإدارة المهام بتقنية البومودورو',
        theme_color: '#1a202c', // Dark theme color for PWA
        icons: [
          {
            src: 'https://cdn-icons-png.flaticon.com/512/2097/2097276.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'https://cdn-icons-png.flaticon.com/512/2097/2097276.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})