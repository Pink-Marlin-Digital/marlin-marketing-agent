import { SocialChannel } from '../services/social/SocialChannel';

export interface PostRequestBody {
  text?: string;
  mediaUrls?: string[];
  channels?: SocialChannel[];
  idempotencyKey?: string;
  metadata?: Record<string, unknown>;
}

export type ChannelStatus = 'success' | 'failed';

export interface ChannelResult {
  channel: SocialChannel;
  status: ChannelStatus;
  externalId?: string;
  errorCode?: string;
  errorMessage?: string;
}

export type OverallStatus = 'success' | 'partial_success' | 'failed';

export interface PostResponseBody {
  overallStatus: OverallStatus;
  results: Record<string, ChannelResult>;
  correlationId?: string;
}
