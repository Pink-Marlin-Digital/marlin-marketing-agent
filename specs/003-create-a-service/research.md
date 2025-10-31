# Research: Social Posting Service

## Decisions

- Decision: Use Node.js (TypeScript) with Express for API
  - Rationale: Aligns with repository JS tooling and constitution references (nock, supertest)
  - Alternatives considered: Fastify (performance), NestJS (structure). Rejected for simplicity/overhead.

- Decision: API Key Authentication via middleware
  - Rationale: Constitution mandates API key auth across endpoints
  - Alternatives considered: OAuth app-level tokens. Rejected for internal service scope.

- Decision: zod for request validation
  - Rationale: Strong schema validation with good TypeScript support
  - Alternatives considered: joi, yup. zod chosen for DX and TS.

- Decision: Idempotency via in-memory cache with pluggable store
  - Rationale: Simple MVP; easy to swap with Redis later
  - Alternatives considered: DB persistence. Deferred.

- Decision: HTTP client with axios (or fetch)
  - Rationale: Mature, interceptors, pleasant error handling
  - Alternatives considered: node-fetch. Either acceptable; choose axios for familiarity.

- Decision: OpenAPI contract-first
  - Rationale: Enables documentation, Postman import, and testing alignment
  - Alternatives considered: Ad-hoc docs. Rejected.

## Platform Integrations

- Facebook: Use Page access tokens to post content to a Facebook Page
  - Requirements: App ID/Secret, long-lived Page Access Token, Page ID
  - Posting endpoint: Graph API `/PAGE_ID/feed` (text) and `/PAGE_ID/photos` (media)

- Instagram: Use Instagram Graph API for Instagram Business Account linked to a Facebook Page
  - Requirements: App ID/Secret, long-lived User Access Token, Instagram Business Account ID
  - Posting endpoints: `/ig_hashtag_search` not needed; use `/IG_USER_ID/media` create + `/IG_USER_ID/media_publish`

## Resolved Unknowns

- Language/Runtime: Node.js LTS with TypeScript (resolved)
- Storage: No durable DB in MVP; in-memory with interface for Redis (resolved)
- Credentials model: Environment variables documented in quickstart (resolved)
- Default channels: Configurable env `SOCIAL_DEFAULT_CHANNELS` (resolved)

## Risks & Mitigations

- Risk: External rate limits
  - Mitigation: Per-channel error reporting, retry-after surfacing; optional backoff later
- Risk: Duplicate posts on retry
  - Mitigation: Idempotency key cache; deterministic provider request building
- Risk: Token expiration
  - Mitigation: Document token refresh; surface clear auth errors
