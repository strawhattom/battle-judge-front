import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin(), VitePWA()],
  build: {
    outDir: 'dist'
  },
  server: {
    open: true,
    port: 5173,
    strictPort: true
  }
});
