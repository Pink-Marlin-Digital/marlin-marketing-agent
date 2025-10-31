# Implementation Plan: Social Posting Service (Facebook & Instagram)

**Branch**: `003-create-a-service` | **Date**: 2025-10-31 | **Spec**: [/specs/003-create-a-service/spec.md](/Users/stargazer/trymarlin/marlin-marketing-agent/specs/003-create-a-service/spec.md)
**Input**: Feature specification from `/specs/003-create-a-service/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command.

## Summary

Provide a service to post marketing content to multiple social channels (initially Facebook and Instagram) with an optional multi-value channel enum, validation, per-channel results, and idempotent retries. Expose a secure API (API key auth) to submit posts and retrieve results. Define env variables for credentials, document setup, and include a Postman collection.

## Technical Context

**Language/Version**: Node.js (LTS) with TypeScript  
**Primary Dependencies**: Express (API), zod (validation), node-fetch/axios (HTTP), swagger-jsdoc/openapi, winston/pino (logging)  
**Storage**: In-memory cache for idempotency and result correlation initially (pluggable for Redis later)  
**Testing**: Jest, supertest, nock  
**Target Platform**: Linux/macOS server  
**Project Type**: single (backend service)  
**Performance Goals**: P95 under 3s for single-channel, 5s for multi-channel (as per spec)  
**Constraints**: External API latency and rate limits; strict API key auth per constitution  
**Scale/Scope**: Initial internal usage; < 100 RPS expected; horizontally scalable later

## Constitution Check

### Core Principle Compliance

- Marketing Automation Service: Feature supplies a standardized marketing posting service and APIs.
- API Key Authentication: All endpoints secured via API key header (`X-API-Key` or `Authorization: Bearer`).
- Content Generation Reliability: Not applicable to AI content generation; still provide health checks and retries to platforms.
- Comprehensive Logging & Analytics: Structured per-channel logging and metrics.
- Error Handling & Validation: zod-based validation; standardized error schema.
- Marketing Tool Organization: Dedicated folders for service, contracts, docs, tests.

### Security Requirements

- CORS, rate limiting, and security headers applied for new endpoints.
- Environment variables used for all credentials and config.
- API key handling follows existing pattern with middleware.

### Development Workflow

- ESLint/Prettier compliance; TypeScript strict mode.
- Unit and integration tests with mocked HTTP via nock and supertest.
- Health check endpoint extended if needed.
- OpenAPI/Swagger docs kept current.

### API Testing & Validation

- Central Postman Collection updated with endpoints and tests.
- Automated Postman tests to cover success/failure, auth, and validation.
- Environment variables for dev/staging/prod.
- Collection runnable in CI for deploy validation.

### Swagger Documentation Standards

- Comprehensive OpenAPI descriptions and examples.
- Error scenarios enumerated with example payloads.
- Docs generated from annotations and synced.

## Project Structure

### Documentation (this feature)

```
specs/003-create-a-service/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── openapi.yaml
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```
src/
├── models/
├── services/
│   └── social/
│       ├── SocialChannel.ts
│       ├── SocialService.ts
│       └── providers/
│           ├── FacebookProvider.ts
│           └── InstagramProvider.ts
├── api/
│   ├── index.ts
│   ├── middleware/
│   │   └── apiKeyAuth.ts
│   └── routes/
│       └── social.ts
└── lib/
    └── logger.ts

tests/
├── contract/
├── integration/
│   └── social.post.test.ts
└── unit/
    └── services/social.test.ts
```

**Structure Decision**: Single backend service. New `src/services/social` for providers and orchestration; `src/api/routes/social.ts` for endpoints; docs and contracts under `specs/003-create-a-service`.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | — | — |
