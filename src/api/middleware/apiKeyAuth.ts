import { Request, Response, NextFunction } from 'express';

function extractApiKey(req: Request): string | null {
  const header = req.header('X-API-Key') || req.header('x-api-key');
  if (header) return header;
  const auth = req.header('Authorization') || req.header('authorization');
  if (!auth) return null;
  const [scheme, token] = auth.split(' ');
  if (scheme?.toLowerCase() === 'bearer' && token) return token;
  return null;
}

export function apiKeyAuth(req: Request, res: Response, next: NextFunction) {
  const expected = process.env.API_KEY;
  const provided = extractApiKey(req);
  if (!expected) {
    return res.status(500).json({ error: 'Server misconfiguration: API_KEY not set' });
  }
  if (!provided || provided !== expected) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return next();
}
