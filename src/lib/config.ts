export type Config = {
  apiKey: string | undefined;
  defaultChannels: string[];
  facebook: {
    appId?: string;
    appSecret?: string;
    pageId?: string;
    pageAccessToken?: string;
  };
  instagram: {
    appId?: string;
    appSecret?: string;
    userId?: string;
    longLivedAccessToken?: string;
  };
};

export function loadConfig(): Config {
  const defaultChannelsEnv = process.env.SOCIAL_DEFAULT_CHANNELS || '';
  const defaultChannels = defaultChannelsEnv
    .split(',')
    .map((c) => c.trim())
    .filter(Boolean);

  return {
    apiKey: process.env.API_KEY,
    defaultChannels,
    facebook: {
      appId: process.env.FACEBOOK_APP_ID,
      appSecret: process.env.FACEBOOK_APP_SECRET,
      pageId: process.env.FACEBOOK_PAGE_ID,
      pageAccessToken: process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
    },
    instagram: {
      appId: process.env.IG_APP_ID,
      appSecret: process.env.IG_APP_SECRET,
      userId: process.env.IG_USER_ID,
      longLivedAccessToken: process.env.IG_LONG_LIVED_ACCESS_TOKEN,
    },
  };
}
