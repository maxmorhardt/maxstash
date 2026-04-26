import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,vue}'],
      thresholds: {
        lines: 0,
        functions: 0,
        branches: 0,
        statements: 0,
      },
      reporter: ['text', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/setupTests.ts',
        'src/types/',
        'src/vite-env.d.ts',
        'src/main.ts',
        'src/**/*.test.{ts,tsx}',
        'coverage/',
        'test/',
        'public/',
        '*.config.*',
      ],
    },
  },
});
