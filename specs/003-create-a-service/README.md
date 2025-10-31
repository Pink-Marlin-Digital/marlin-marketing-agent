# Social Posting Service - Environment Setup

This service posts content to Facebook and Instagram. Configure the following environment variables and obtain credentials as described below.

## Required Environment Variables

```
API_KEY=your-internal-api-key
SOCIAL_DEFAULT_CHANNELS=FACEBOOK,INSTAGRAM

# Facebook (Facebook Graph API)
FACEBOOK_APP_ID=...
FACEBOOK_APP_SECRET=...
FACEBOOK_PAGE_ID=...
FACEBOOK_PAGE_ACCESS_TOKEN=...

# Instagram (Instagram Graph API)
IG_APP_ID=...
IG_APP_SECRET=...
IG_USER_ID=...
IG_LONG_LIVED_ACCESS_TOKEN=...
```

## How to obtain Facebook credentials

1. Create a Facebook App in Facebook for Developers.
2. Add the "Pages API" permissions.
3. Create a Page (or use an existing one) and retrieve the Page ID.
4. Generate a User Access Token with required scopes and exchange it for a Long-Lived Token.
5. Get a Page Access Token for the Page (linked to the Long-Lived User Token).
6. Set `FACEBOOK_APP_ID`, `FACEBOOK_APP_SECRET`, `FACEBOOK_PAGE_ID`, and `FACEBOOK_PAGE_ACCESS_TOKEN`.

References: Facebook Graph API docs for Pages Publishing and Access Tokens.

## How to obtain Instagram credentials

1. Convert your Instagram account to a Business Account and link it to a Facebook Page.
2. In Facebook for Developers, ensure Instagram Graph API is enabled.
3. Retrieve the Instagram User (IG Business Account) ID.
4. Generate a Long-Lived User Access Token with appropriate scopes.
5. Set `IG_APP_ID`, `IG_APP_SECRET`, `IG_USER_ID`, and `IG_LONG_LIVED_ACCESS_TOKEN`.

References: Instagram Graph API docs for Content Publishing.

## Defaults and Idempotency
- `SOCIAL_DEFAULT_CHANNELS` controls which channels are used if none are specified on the request.
- Provide `idempotencyKey` in requests to enable safe retries without duplicate posts.
