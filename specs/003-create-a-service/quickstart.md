# Quickstart: Social Posting Service

## Prerequisites
- Node.js LTS, npm
- API key configured (for service authentication)
- Facebook and Instagram credentials (see README to be created in implementation)

## Environment Variables
Set the following (example values):

```
API_KEY=your-internal-api-key
SOCIAL_DEFAULT_CHANNELS=FACEBOOK,INSTAGRAM
# Facebook
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

## Run
```
npm install
npm run build
npm start
```
Server runs on `http://localhost:3000` by default.

## API Usage
- POST `/api/social/posts`
- GET `/api/social/posts/status?idempotencyKey=...`

Include API key via `X-API-Key: <API_KEY>` or `Authorization: Bearer <API_KEY>`.

### Example Request
```
POST /api/social/posts
Content-Type: application/json
X-API-Key: $API_KEY

{
  "text": "New product drop!",
  "mediaUrls": ["https://example.com/image.jpg"],
  "channels": ["FACEBOOK", "INSTAGRAM"],
  "idempotencyKey": "abcd-1234"
}
```

### Example Response (200)
```
{
  "overallStatus": "partial_success",
  "results": {
    "FACEBOOK": {"channel":"FACEBOOK","status":"success","externalId":"123"},
    "INSTAGRAM": {"channel":"INSTAGRAM","status":"failed","errorCode":"AUTH","errorMessage":"Invalid token"}
  },
  "correlationId": "corr-xyz"
}
```
