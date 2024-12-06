import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Ensure node_modules are resolved correctly
      firebase: '/node_modules/firebase'
    }
  },
  server: {
    port: 3000, // Optional: Set a specific port for the dev server
  }
});
