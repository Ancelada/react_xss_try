/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import { SHOULD_GENERATE_SOURCEMAP } from "./src/settings";

export default defineConfig({
  // depending on your application, base can also be "/"
  base: '/',
  plugins: [react(), viteTsconfigPaths()],
  server: {
    host: true,
    port: 2000,
    // this ensures that the browser opens upon server start
    open: false,
    watch: {
      usePolling: true
    }
  },
  build: {
    sourcemap: SHOULD_GENERATE_SOURCEMAP,
    rollupOptions: {
      onwarn(warning, defaultHandler) {
        if (warning.code === 'SOURCEMAP_ERROR') {
          return
        }
        defaultHandler(warning)
      },
    },
  },
  define: {
    'process.env': {}
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    exclude: [
      'node_modules/',
      'src/setupTests.ts',
    ],
    include: [
      "src/components/**/__tests__/**/*.{ts,tsx}",
      "src/common/__tests__/**/*.{ts,tsx}",
      "src/common/utils/__tests__/**/*.{ts,tsx}"
    ],
    coverage: {
      reporter: ['text', 'html', 'json'],
      exclude: [
        'node_modules/',
        'src/setupTests.ts',
      ]
    },
  },
})
