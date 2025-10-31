import { PostRequestBody, PostResponseBody, ChannelResult } from '../../models/SocialTypes';
import { SocialChannel, parseChannels } from './SocialChannel';
import { loadConfig } from '../../lib/config';
import { postToFacebook } from './providers/FacebookProvider';
import { postToInstagram } from './providers/InstagramProvider';

const idempotencyStore = new Map<string, PostResponseBody>();

export async function createSocialPost(body: PostRequestBody): Promise<PostResponseBody> {
  const config = loadConfig();
  const channels = parseChannels(body.channels as unknown as string[] | undefined, config.defaultChannels);

  if ((!body.text || body.text.trim().length === 0) && (!body.mediaUrls || body.mediaUrls.length === 0)) {
    return {
      overallStatus: 'failed',
      results: {},
      correlationId: undefined,
    };
  }

  if (body.idempotencyKey) {
    const existing = idempotencyStore.get(body.idempotencyKey);
    if (existing) return existing;
  }

  const results: Record<string, ChannelResult> = {};

  const tasks = channels.map(async (channel) => {
    switch (channel) {
      case SocialChannel.FACEBOOK: {
        const r = await postToFacebook(body.text, body.mediaUrls);
        results[SocialChannel.FACEBOOK] = r;
        break;
      }
      case SocialChannel.INSTAGRAM: {
        const r = await postToInstagram(body.text, body.mediaUrls);
        results[SocialChannel.INSTAGRAM] = r;
        break;
      }
      default:
        break;
    }
  });

  await Promise.all(tasks);

  const statuses = Object.values(results).map((r) => r.status);
  let overall: PostResponseBody['overallStatus'] = 'failed';
  if (statuses.every((s) => s === 'success')) overall = 'success';
  else if (statuses.some((s) => s === 'success')) overall = 'partial_success';

  const response: PostResponseBody = {
    overallStatus: overall,
    results,
    correlationId: body.idempotencyKey,
  };

  if (body.idempotencyKey) idempotencyStore.set(body.idempotencyKey, response);

  return response;
}

export function getPostStatus(idempotencyKey: string): PostResponseBody | null {
  return idempotencyStore.get(idempotencyKey) || null;
}
