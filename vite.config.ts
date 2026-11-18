/// <reference types="vitest/config" />
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { handleIdea } from './src/server/idea';

/** Une idée fait au plus 1 000 caractères : au-delà, on refuse sans tout lire. */
const MAX_BODY_BYTES = 16_000;

/**
 * Sert `/api/idea` depuis le serveur de l'appli (poste de démo ou VM de test).
 * Les variables ITSM_* viennent de `.env.local` ; sans elles, la route répond 503.
 */
function ideaApi(): Plugin {
  return {
    name: 'idea-api',
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), 'ITSM_');
      server.middlewares.use('/api/idea', async (req, res) => {
        const chunks: Buffer[] = [];
        let size = 0;
        for await (const chunk of req) {
          size += (chunk as Buffer).length;
          if (size > MAX_BODY_BYTES) {
            res.statusCode = 413;
            res.end(JSON.stringify({ ok: false, error: 'Corps trop volumineux' }));
            return;
          }
          chunks.push(chunk as Buffer);
        }
        const request = new Request('http://localhost/api/idea', {
          method: req.method,
          headers: { 'Content-Type': 'application/json' },
          body: req.method === 'POST' ? Buffer.concat(chunks) : undefined,
        });
        const response = await handleIdea(request, env);
        res.statusCode = response.status;
        res.setHeader('Content-Type', 'application/json');
        res.end(await response.text());
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), ideaApi()],
  // VM de test (GitHub Codespaces) : l'appli est servie sur *.app.github.dev.
  server: { port: 5173, strictPort: true, allowedHosts: ['.app.github.dev'] },
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
