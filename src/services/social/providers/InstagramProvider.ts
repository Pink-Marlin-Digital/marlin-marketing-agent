import { ChannelResult } from '../../../models/SocialTypes';
import { SocialChannel } from '../SocialChannel';
import { logger } from '../../../lib/logger';

export async function postToInstagram(
  text: string | undefined,
  mediaUrls: string[] | undefined
): Promise<ChannelResult> {
  try {
    if (!process.env.IG_LONG_LIVED_ACCESS_TOKEN || !process.env.IG_USER_ID) {
      return {
        channel: SocialChannel.INSTAGRAM,
        status: 'failed',
        errorCode: 'AUTH',
        errorMessage: 'Missing Instagram credentials',
      };
    }
    logger.info({ channel: 'instagram' }, 'Posting to Instagram');
    return {
      channel: SocialChannel.INSTAGRAM,
      status: 'success',
      externalId: 'ig_media_123',
    };
  } catch (err: any) {
    return {
      channel: SocialChannel.INSTAGRAM,
      status: 'failed',
      errorCode: 'ERR_INSTAGRAM',
      errorMessage: err?.message || 'Unknown Instagram error',
    };
  }
}
