import { sites } from '@openai/sites-vite-plugin';
import tailwindcss from '@tailwindcss/postcss';
import vinext from 'vinext';
import { defineConfig } from 'vite';

// Every route is exported to static HTML. This portfolio needs no Worker,
// database, identity provider, or email credentials at runtime.
export default defineConfig({
  css: { postcss: { plugins: [tailwindcss()] } },
  server: { host: '127.0.0.1', watch: { ignored: ['**/.tools/**', '**/artifacts/**', '**/dist/**'] } },
  plugins: [vinext(), sites()],
});
