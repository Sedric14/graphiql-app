import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy'
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import path from 'path';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';
import type { InlineConfig } from 'vitest';
import type { UserConfig } from 'vite';

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    eslint({ cache: false }),
    react(),
    viteStaticCopy({
      targets: [
        {
          src: './src/assets/favicon.ico',
          dest: './'
        }
      ]
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      provider: 'istanbul',
      all: true,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@P': path.resolve(__dirname, 'public'),
    },
  },
} as VitestConfigExport);
