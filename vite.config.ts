import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  base: '/',
  preview: {
    allowedHosts: ['productsweb-production.up.railway.app'],
  },
});
