/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
    coverage: {
      provider: 'v8',
      all: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/main.tsx', 'src/test-setup.ts', 'src/**/*.test.{ts,tsx}', 'src/vite-env.d.ts'],
      // Cliquet : seuil posé au niveau réel mesuré, à remonter, jamais à baisser.
      thresholds: { lines: 100, functions: 100, branches: 100, statements: 100 },
    },
  },
});
