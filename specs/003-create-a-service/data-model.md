# Data Model: Social Posting Service

## Entities

### PostRequest
- text: string (required if no mediaUrls)
- mediaUrls: string[] (optional)
- channels: Channel[] (optional; default from config)
- idempotencyKey: string (optional)
- metadata: object (optional)

Validation:
- At least one of `text` or `mediaUrls` required
- `mediaUrls` must be valid URLs; size/format constraints enforced per platform
- `channels` must be subset of supported enum values

### Channel (enum)
- FACEBOOK
- INSTAGRAM

### ChannelResult
- channel: Channel
- status: 'success' | 'failed'
- externalId: string (optional)
- errorCode: string (optional)
- errorMessage: string (optional)

### PostResponse
- overallStatus: 'success' | 'partial_success' | 'failed'
- results: Record<Channel, ChannelResult>
- correlationId: string

## Relationships
- PostResponse.results maps each requested Channel to its ChannelResult

## State
- Idempotent key maps to a stable PostResponse within a time window
- No durable storage in MVP; pluggable cache interface for future
