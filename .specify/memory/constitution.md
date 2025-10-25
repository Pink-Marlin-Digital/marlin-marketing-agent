<!--
Sync Impact Report:
Version change: 1.3.0 → 1.4.0
Modified principles: Testing Standards (expanded with supertest port management requirements)
Added sections: Test Port Management Standards
Removed sections: N/A
Templates requiring updates: 
  ✅ plan-template.md (updated for testing requirements)
  ✅ spec-template.md (updated for testing standards)
  ✅ tasks-template.md (updated for testing task types)
Follow-up TODOs: None
Amendment: Added comprehensive test port management requirements using supertest package
-->

# Marlin Marketing Agent Constitution

## Core Principles

### I. Basic Agent Functionality (NON-NEGOTIABLE)
This agent MUST always be able to serve basic agent functionality and services. The system MUST provide AI-powered content generation and basic agent capabilities. All agent tools and services MUST be accessible through standardized APIs. This ensures consistent agent operations and enables seamless integration with external systems.

### II. API Key Authentication (NON-NEGOTIABLE)
All agent endpoints MUST use API key authentication for security and consistency. The same authentication method MUST be used for both tool discovery and tool execution. API keys MUST be validated on every request and can be provided via `X-API-Key` header or `Authorization: Bearer <api-key>` header. This ensures consistent authentication across all agent operations and simplifies client integration.

### III. Content Generation Reliability
The content generation service MUST maintain high reliability and availability. AI-powered content creation MUST be properly configured with fallback mechanisms, error handling, and retry logic. The system MUST provide health checks and status endpoints to monitor content generation service availability and quality metrics.

### IV. Comprehensive Logging & Analytics
All agent operations MUST be logged with structured logging including context, content details, and outcomes. Agent events, content generation attempts, and client interactions MUST be tracked with detailed analytics. This enables agent optimization and performance analysis.

### V. Error Handling & Validation
All agent inputs MUST be validated with comprehensive error handling and consistent error responses. Content generation requests, agent parameters, and client data MUST be validated before processing. The system MUST provide clear error messages and fallback content when generation fails. All API endpoints MUST return standardized error responses with appropriate HTTP status codes, error codes, and descriptive messages. This ensures agent operations continue smoothly even when individual components encounter issues and provides consistent error handling across all client integrations.

## Security Requirements

### Authentication & Authorization
All agent endpoints MUST implement secure API key authentication with proper validation and rate limiting. User sessions MUST be managed securely with appropriate session timeouts. Role-based access control MUST be implemented to ensure users can only access agent tools and data appropriate to their permissions. Multi-factor authentication SHOULD be available for administrative functions.

### Data Protection
All client data, agent operations, and generated content MUST be encrypted in transit and at rest. Personal information and agent data MUST be handled according to GDPR, CCPA, and other applicable privacy regulations. Data retention policies MUST be clearly defined and automatically enforced. Client data MUST be isolated and protected from unauthorized access or cross-contamination between different clients.

### API Security
All API endpoints MUST implement proper CORS configuration, rate limiting, and input validation. Security headers MUST be included in all responses. API keys MUST be rotated regularly and invalidated when compromised. All external API integrations MUST use secure authentication methods and validate SSL certificates. Request logging MUST be implemented for security auditing and monitoring.

## Development Workflow

### Code Quality & Linting Standards (NON-NEGOTIABLE)
All code MUST pass ESLint validation with zero errors before any commit or deployment. The project MUST maintain comprehensive ESLint configuration with TypeScript support, enforcing consistent code style, proper error handling, and security best practices. Prettier MUST be configured for automatic code formatting to ensure consistent style across the codebase. All linting rules MUST be enforced in CI/CD pipelines with build failures for any linting errors. Code reviews MUST verify linting compliance and all developers MUST run `npm run lint` and `npm run lint:fix` before submitting changes. The linting configuration MUST include rules for TypeScript best practices, security vulnerabilities, and consistent formatting standards.

### Testing Standards
Comprehensive test coverage MUST be maintained for all agent functionality including unit tests, integration tests, and end-to-end tests. All agent operations, content generation, and client interactions MUST be tested with both success and failure scenarios. API mocking MUST be used to ensure tests don't make real external calls. Constitution compliance tests MUST verify all principles are properly implemented. Test data MUST be realistic and representative of actual agent use cases.

### HTTP Request Mocking Standards (NON-NEGOTIABLE)
All tests MUST use the npm package `nock` to mock outbound HTTP requests to external services including OpenAI, email services, and other third-party APIs. Tests MUST NOT make real external API calls to prevent test failures due to service unavailability, rate limiting, or network issues. All mocked HTTP responses MUST be deterministic and consistent across test runs. The `nock` package MUST be configured to intercept all outbound requests during testing, ensuring tests produce consistent results regardless of external service availability. This prevents test errors such as "LLM service unavailable" and ensures reliable, fast test execution.

### Test Port Management Standards (NON-NEGOTIABLE)
All integration and API tests MUST use the npm package `supertest` to manage application ports and avoid port allocation conflicts. Tests MUST NOT manually start Express servers or bind to specific ports during testing. The `supertest` package MUST be used to create test instances of the Express application without starting actual HTTP servers, eliminating port conflicts in CI/CD environments and parallel test execution. This prevents test failures due to "address already in use" errors and ensures consistent test execution across different environments including GitHub Actions.

### Documentation Requirements
All agent APIs MUST be documented with comprehensive OpenAPI/Swagger specifications including examples and error responses. Postman collections MUST be maintained with test cases for all endpoints. Agent workflows and templates MUST be documented with clear usage instructions. All configuration options and environment variables MUST be documented. README files MUST provide clear setup and usage instructions for developers and users.

## API Testing & Validation

### Central Postman Collection (NON-NEGOTIABLE)
There MUST be a central Postman collection that is always kept up to date with the current API implementation. This collection MUST include comprehensive test cases that can validate the server works correctly in deployed environments. The collection MUST be version-controlled and automatically updated with each API change. All test cases MUST cover both success and failure scenarios, including authentication, validation, and error handling. The collection MUST be executable in CI/CD pipelines and provide clear pass/fail results for deployment validation.

### Automated API Testing
All API endpoints MUST have corresponding Postman test cases that verify request/response formats, status codes, and data validation. Test cases MUST include authentication scenarios, rate limiting validation, and error response verification. The Postman collection MUST be configured to run against multiple environments (development, staging, production) with environment-specific variables. Test results MUST be integrated into the deployment pipeline to ensure API functionality before production releases.

## Swagger Documentation Standards

### Comprehensive API Documentation (NON-NEGOTIABLE)
All agent APIs MUST have extensive Swagger/OpenAPI documentation with quality examples covering all request/response scenarios. The documentation MUST include detailed descriptions for all endpoints, parameters, request bodies, and response schemas. Every API endpoint MUST have realistic example requests and responses that demonstrate proper usage patterns. The documentation MUST be automatically generated from code annotations and kept synchronized with the actual implementation.

### Error Scenario Coverage
The Swagger documentation MUST comprehensively cover all error scenarios including validation errors, authentication failures, rate limiting, service unavailability, and business logic errors. Each error response MUST include detailed descriptions, example error messages, and suggested remediation steps. Error response schemas MUST be consistent across all endpoints and include standardized error codes, messages, and additional context fields. The documentation MUST provide clear guidance on how clients should handle different error types and implement proper retry logic.

## Governance

This constitution supersedes all other development practices. All pull requests and code reviews MUST verify compliance with these principles. Any violations of the core principles MUST be justified with clear reasoning. Use the project README.md for runtime development guidance and API documentation.

**Version**: 1.4.0 | **Ratified**: 2025-01-27 | **Last Amended**: 2025-01-12