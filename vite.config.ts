import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [tsconfigPaths()],
  base: command === 'serve' ? '/#' : '/ProductsWeb/',
}));
