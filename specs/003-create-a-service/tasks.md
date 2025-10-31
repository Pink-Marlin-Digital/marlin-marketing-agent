# Tasks: Social Posting Service (Facebook & Instagram)

**Input**: Design documents from `/specs/003-create-a-service/`
**Prerequisites**: plan.md (required), spec.md, research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 Create project folders per plan: `src/models`, `src/services/social/providers`, `src/api/middleware`, `src/api/routes`, `src/lib`, `tests/{unit,integration,contract}`
- [ ] T002 Initialize Node.js TypeScript project; add deps: express, zod, axios, pino/winston, swagger-jsdoc, swagger-ui-express; devDeps: typescript, ts-node, jest, ts-jest, supertest, nock, eslint, prettier
- [ ] T003 [P] Add base `tsconfig.json`, ESLint, Prettier configs; npm scripts: build, start, test, lint
- [ ] T004 [P] Verify ignore files: `.gitignore`, `.eslintignore`, `.prettierignore`, `.npmignore` (if publishing)

---

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T005 Implement API key middleware `src/api/middleware/apiKeyAuth.ts` supporting `X-API-Key` and `Authorization: Bearer`
- [ ] T006 [P] Create logger `src/lib/logger.ts` with structured logging
- [ ] T007 [P] Create Express app bootstrap `src/api/index.ts` with health endpoint and Swagger serve; wire middleware
- [ ] T008 Implement config loader for envs (`src/lib/config.ts`) including default channels and credentials placeholders
- [ ] T009 Define enums and models `src/services/social/SocialChannel.ts` and `src/models/SocialTypes.ts`

**Checkpoint**: Foundation ready

---

## Phase 3: User Story 1 - Post to one or more channels (Priority: P1)

### Implementation
- [ ] T010 [P] [US1] Implement Facebook provider `src/services/social/providers/FacebookProvider.ts` (post text/media; stub integration; interface defined)
- [ ] T011 [P] [US1] Implement Instagram provider `src/services/social/providers/InstagramProvider.ts` (create + publish flow; stub integration; interface defined)
- [ ] T012 [US1] Implement orchestrator `src/services/social/SocialService.ts` to fan out per selected channels and aggregate results
- [ ] T013 [US1] Implement routes `src/api/routes/social.ts` with POST `/api/social/posts` using zod validation and idempotency key support (in-memory cache)
- [ ] T014 [US1] Wire routes in `src/api/index.ts`
- [ ] T015 [P] [US1] Add OpenAPI contract file from `specs/003-create-a-service/contracts/openapi.yaml` into Swagger setup
- [ ] T016 [P] [US1] Add Postman collection file `specs/003-create-a-service/postman/social.postman_collection.json` covering endpoints and tests

### Documentation
- [ ] T017 [US1] Create README `README.md` section detailing env variables and how to obtain FB/IG credentials
- [ ] T018 [US1] Ensure Swagger examples cover single and multi-channel requests

**Checkpoint**: US1 independently testable

---

## Phase 4: User Story 2 - Validate input and report detailed errors (Priority: P2)

- [ ] T019 [US2] Add comprehensive validation with zod schemas; map provider/platform errors to standardized error codes/messages
- [ ] T020 [US2] Extend provider stubs to surface auth/rate-limit errors distinctly; propagate to results map
- [ ] T021 [P] [US2] Add integration tests with supertest & nock for mixed success scenarios `tests/integration/social.mixed.test.ts`

**Checkpoint**: US2 independently testable

---

## Phase 5: User Story 3 - Idempotent retry support (Priority: P3)

- [ ] T022 [US3] Implement idempotency cache (in-memory) keyed by `idempotencyKey` with TTL; return original response on duplicate
- [ ] T023 [US3] Add GET `/api/social/posts/status` by idempotencyKey in `src/api/routes/social.ts`
- [ ] T024 [P] [US3] Add integration tests verifying no duplicates and stable responses `tests/integration/social.idempotency.test.ts`

**Checkpoint**: US3 independently testable

---

## Phase N: Polish & Cross-Cutting

- [ ] T025 [P] Update central Postman collection with all endpoints and test cases
- [ ] T026 Ensure environment-based configuration for dev/staging/prod
- [ ] T027 [P] Verify Swagger documentation completeness and examples
- [ ] T028 Security hardening: rate limiting, security headers
- [ ] T029 Run quickstart validation and update docs

---

## Dependencies & Execution Order

- Setup → Foundational → US1 → US2 → US3 → Polish
- Tasks marked [P] can run in parallel if files do not conflict
