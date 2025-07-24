import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: 'Swol',
      short_name: 'Swol',
      description: "Swol is a collection of strength sports tools.",
      theme_color: '#ffffff',
      icons: [
        {
          src: "/src/assets/SWOLa36.png",
          sizes: "36x36",
          type: "image/png",
        },
        {
          src: "/src/assets/SWOLa48.png",
          sizes: "48x48",
          type: "image/png",
        },
        {
          src: "/src/assets/SWOLa72.png",
          sizes: "72x72",
          type: "image/png",
        },
        {
          src: "/src/assets/SWOLa96.png",
          sizes: "96x96",
          type: "image/png",
        },
        {
          src: "/src/assets/SWOLa120.png",
          sizes: "120x120",
          type: "image/png",
        },
        {
          src: "/src/assets/SWOLa152.png",
          sizes: "152x152",
          type: "image/png",
        },
        {
          src: "/src/assets/SWOLa167.png",
          sizes: "167x167",
          type: "image/png",
        },
        {
          src: "/src/assets/SWOLa180.png",
          sizes: "180x180",
          type: "image/png",
        },
        {
          src: '/src/assets/SWOLa192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/src/assets/SWOLa512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/src/assets/SWOLa512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable', // For maskable icons on Android
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
    },
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@api': path.resolve(__dirname, '../api/src'),
    },
  },
})
