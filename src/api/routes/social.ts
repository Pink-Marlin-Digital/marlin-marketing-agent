import { Router } from 'express';
import { z } from 'zod';
import { createSocialPost, getPostStatus } from '../../services/social/SocialService';
import { SocialChannel } from '../../services/social/SocialChannel';

const PostRequestSchema = z
  .object({
    text: z.string().optional(),
    mediaUrls: z.array(z.string().url()).optional(),
    channels: z.nativeEnum(SocialChannel).array().optional(),
    idempotencyKey: z.string().min(1).optional(),
    metadata: z.record(z.any()).optional(),
  })
  .refine((data) => Boolean((data.text && data.text.trim().length > 0) || (data.mediaUrls && data.mediaUrls.length > 0)), {
    message: 'Either text or mediaUrls is required',
    path: ['text'],
  });

export function createSocialRouter(): Router {
  const router = Router();

  router.post('/posts', async (req, res) => {
    const parsed = PostRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Validation error', details: parsed.error.issues.map((i) => i.message) });
    }
    const result = await createSocialPost(parsed.data);
    return res.json(result);
  });

  router.get('/posts/status', (req, res) => {
    const idempotencyKey = (req.query.idempotencyKey as string) || '';
    if (!idempotencyKey) return res.status(400).json({ error: 'idempotencyKey is required' });
    const status = getPostStatus(idempotencyKey);
    if (!status) return res.status(404).json({ error: 'Not found' });
    return res.json(status);
  });

  return router;
}
