import { defineConfig } from 'vite'
import babel from 'vite-plugin-babel'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [react(), svgr(), babel()],
  base: './',
  build: {
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
  resolve: {
    alias: {
      assets: '/src/assets/',
      components: '/src/components/',
      provider: '/src/provider/',
      hooks: '/src/hooks/',
      routes: '/src/routes/',
      pages: '/src/pages/',
      theme: '/src/theme/',
      types: '/src/types/',
      UI: '/src/UI/',
      utils: '/src/utils/',
      websocket: '/src/websocket/',
      api: '/src/api/',
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
    preprocessorOptions: {
      scss: {},
    },
  },
})
