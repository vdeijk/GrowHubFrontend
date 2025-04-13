import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/farmManagement/' : '/',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 5173,
    open: true,
  },
}));
