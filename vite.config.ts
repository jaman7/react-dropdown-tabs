import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sass from 'sass';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      App: path.resolve(__dirname, './src'),
      Components: path.resolve(__dirname, './src/components'),
      Store: path.resolve(__dirname, './src/store'),
      Helpers: path.resolve(__dirname, './src/helpers'),
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          ['@babel/plugin-transform-class-properties', { loose: true }],
        ],
      },
    }),
    tsconfigPaths(),
    svgr({ include: '**/*.svgr.svg' }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
  build: {
    target: 'esnext',
  },
  define: {
    'process.env': {
      ...process.env,
    },
  },
});
