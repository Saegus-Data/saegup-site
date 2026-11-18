import { handleIdea } from '../src/server/idea';

/** Fonction Vercel : POST /api/idea → ticket ITSM dans AI Studio (en dev : middleware de vite.config.ts). */
export function POST(request: Request): Promise<Response> {
  return handleIdea(request, process.env);
}
