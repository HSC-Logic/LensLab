import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/LensLab/' : '/',
  plugins: [react()],
  test: { environment: 'jsdom', setupFiles: './src/tests/setup.ts', exclude: ['e2e/**', 'node_modules/**'] },
}));
