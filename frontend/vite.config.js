import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// Em desenvolvimento, faz proxy de /api e /uploads para o backend (porta 4000),
// evitando CORS e mantendo o front consumindo caminhos relativos.
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'apple-touch-icon.png', 'perfil.jpg', 'vai-logo.png'],
      manifest: {
        name: 'Coração Gaúcho',
        short_name: 'Coração Gaúcho',
        description: 'Coração Gaúcho — Juliana Brizola e Edegar Pretto. Mobilização, dados, atendimento e território numa só plataforma.',
        lang: 'pt-BR',
        start_url: '/',
        display: 'standalone',
        theme_color: '#004CA9',
        background_color: '#004CA9',
        icons: [
          { src: '/pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/pwa-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        navigateFallbackDenylist: [/^\/api/, /^\/uploads/],
        // Precache SÓ dos arquivos com hash no nome (imutáveis). O HTML fica
        // FORA do precache de propósito — senão o SW serviria a "casca" antiga
        // depois de um deploy. O HTML vai por NetworkFirst (sempre da rede).
        globPatterns: ['**/*.{js,css,svg,png,woff2}'],
        globIgnores: ['**/foto.png', '**/logo.png'],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        navigateFallback: null,
        // SW novo assume na hora e limpa caches antigos — sem versão presa.
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            // Navegações (o HTML): sempre busca a versão nova na rede;
            // só cai no cache se estiver offline.
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'app-html',
              networkTimeoutSeconds: 3,
              expiration: { maxEntries: 20 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'google-fonts-css' },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-files',
              expiration: { maxEntries: 24, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
    }),
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': { target: 'http://localhost:4000', changeOrigin: true },
      '/uploads': { target: 'http://localhost:4000', changeOrigin: true },
    },
  },
});
