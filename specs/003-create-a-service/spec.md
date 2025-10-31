# Feature Specification: Social Posting Service (Facebook & Instagram)

**Feature Branch**: `003-create-a-service`  
**Created**: 2025-10-31  
**Status**: Draft  
**Input**: User description: "Create a service that can post to social media channels. It should be able to do Facebook and Instagram to start. The Channel should be an optional input Enum and should allow for multiple."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Post to one or more channels (Priority: P1)

An operator submits a message payload and selects zero or more channels (Facebook, Instagram). If no channels are specified, the system uses a configurable default. The system posts the content to each selected channel and returns per-channel results.

**Why this priority**: This is the core value—being able to publish to supported social channels from a single service.

**Independent Test**: Post a message specifying both channels; verify both succeed independently and results are reported per channel.

**Acceptance Scenarios**:

1. **Given** a valid message and a selection of Facebook and Instagram, **When** the user submits, **Then** the system posts to both and returns per-channel success metadata.
2. **Given** a valid message and no channel specified, **When** the user submits, **Then** the system posts to the default channel(s) and returns per-channel results.

---

### User Story 2 - Validate input and report detailed errors (Priority: P2)

The service validates message content and required credentials for each selected channel. If some channels fail validation or posting, the system still attempts other channels and reports detailed per-channel errors.

**Why this priority**: Enables reliable operation and actionable troubleshooting without blocking other postings.

**Independent Test**: Submit with one valid channel credential and one missing; verify one success result and one error result without overall failure.

**Acceptance Scenarios**:

1. **Given** invalid Instagram credentials and valid Facebook credentials, **When** posting to both, **Then** Facebook succeeds and Instagram returns an authorization error with a human-readable message.

---

### User Story 3 - Idempotent retry support (Priority: P3)

The service supports caller-provided idempotency keys to safely retry post requests without creating duplicate channel posts.

**Why this priority**: Reduces risk of duplicate social posts during network or transient failures.

**Independent Test**: Submit the same payload with the same idempotency key twice; verify at most one post per channel and consistent response.

**Acceptance Scenarios**:

1. **Given** an idempotency key K used for a successful post, **When** the same request is retried with K, **Then** the system does not create duplicate posts and returns the original result metadata.

---

### Edge Cases

- Empty message or media-only post requested; system rejects with validation error describing minimum required fields.
- Mixed success: one channel times out while the other succeeds; results report timeout for the failing channel and success for the other.
- Duplicate request via idempotency key; system returns original results without new posts.
- Oversized media or unsupported format; system returns validation error indicating platform constraints.
- Rate limiting from a platform; system returns rate-limit error with recommended retry-after guidance.

### API Testing Requirements

- **Postman Collection**: Include endpoints to create a post and to retrieve post status by idempotency key.
- **Test Coverage**: Provide tests for success, per-channel failure, mixed outcomes, validation errors, and idempotency behavior.
- **Environment Testing**: Parameterize credentials via environment variables for dev/staging/production.
- **Deployment Validation**: Collection runnable as part of CI to perform smoke tests in non-production environments.

### Documentation Requirements

- **Swagger Documentation**: Document request/response schemas including channel enum and per-channel result structure.
- **Example Quality**: Include examples for single-channel and multi-channel posts with mixed outcomes.
- **Error Coverage**: Document validation, authentication, timeout, and rate-limit errors with guidance to resolve.
- **Code Synchronization**: Keep examples aligned with current request/response models.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST accept a post request containing text content, optional media references, and an optional list of channels.
- **FR-002**: System MUST support the channel enum values: `FACEBOOK`, `INSTAGRAM` and allow multiple selections per request.
- **FR-003**: If no channels are provided, System MUST use a configurable default channel set.
- **FR-004**: System MUST validate inputs (required fields, media constraints, size/format) before attempting to post.
- **FR-005**: System MUST attempt posting independently per channel and return a per-channel result map with status and message identifiers where available.
- **FR-006**: System MUST handle partial failures without aborting other channels.
- **FR-007**: System MUST require channel-specific credentials via environment configuration and fail safely when missing.
- **FR-008**: System SHOULD support an optional idempotency key to deduplicate repeated requests within a defined time window.
- **FR-009**: System MUST log per-channel attempts and outcomes for observability and audit.
- **FR-010**: System MUST expose an endpoint to submit a post and return results synchronously; MAY also return a correlation id for later lookup.

### Key Entities *(include if feature involves data)*

- **PostRequest**: text, mediaUrls[], channels[], idempotencyKey (optional), metadata (optional)
- **Channel**: enum of supported platforms; initially `FACEBOOK`, `INSTAGRAM`
- **ChannelResult**: channel, status (success|failed), externalId (if provided by platform), errorCode, errorMessage
- **PostResponse**: overallStatus, results{channel -> ChannelResult}, correlationId

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 95% of single-channel post requests complete with results in under 3 seconds under nominal load.
- **SC-002**: For multi-channel requests, 95% complete in under 5 seconds under nominal load.
- **SC-003**: 99% of valid requests return per-channel outcomes even if at least one channel fails.
- **SC-004**: Support inquiries related to “unknown posting status” remain below 1% of total posts after launch.
