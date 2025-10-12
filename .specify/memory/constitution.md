<!--
Sync Impact Report:
Version change: 0.0.0 → 1.0.0
Modified principles: N/A (initial creation)
Added sections: All core principles, security requirements, development workflow, governance
Removed sections: N/A
Templates requiring updates: 
  ✅ plan-template.md (updated for marketing agent principles)
  ✅ spec-template.md (updated for marketing agent scope)
  ✅ tasks-template.md (updated for marketing agent task types)
Follow-up TODOs: None
Amendment: Initial constitution creation for Marlin Marketing Agent
-->

# Marlin Marketing Agent Constitution

## Core Principles

### I. Marketing Automation Service (NON-NEGOTIABLE)
This agent MUST always be able to serve marketing automation tools and services. The system MUST provide comprehensive marketing campaign management, content generation, and client communication capabilities. All marketing tools, templates, and automation workflows MUST be accessible through standardized APIs. This ensures consistent marketing operations and enables seamless integration with external marketing platforms and client systems.

### II. API Key Authentication (NON-NEGOTIABLE)
All marketing agent endpoints MUST use API key authentication for security and consistency. The same authentication method MUST be used for both tool discovery and tool execution. API keys MUST be validated on every request and can be provided via `X-API-Key` header or `Authorization: Bearer <api-key>` header. This ensures consistent authentication across all marketing operations and simplifies client integration.

### III. Content Generation Reliability
The content generation service MUST maintain high reliability and availability. AI-powered content creation MUST be properly configured with fallback mechanisms, error handling, and retry logic. The system MUST provide health checks and status endpoints to monitor content generation service availability and quality metrics.

### IV. Comprehensive Logging & Analytics
All marketing operations MUST be logged with structured logging including campaign context, content details, and performance outcomes. Marketing events, content generation attempts, and client interactions MUST be tracked with detailed analytics. This enables campaign optimization, performance monitoring, and marketing ROI analysis.

### V. Error Handling & Validation
All marketing inputs MUST be validated with comprehensive error handling and consistent error responses. Content generation requests, campaign parameters, and client data MUST be validated before processing. The system MUST provide clear error messages and fallback content when generation fails. This ensures marketing operations continue smoothly even when individual components encounter issues.

## Security Requirements

### Authentication & Authorization
All marketing agent endpoints MUST implement secure API key authentication with proper validation and rate limiting. User sessions MUST be managed securely with appropriate session timeouts. Role-based access control MUST be implemented to ensure users can only access marketing tools and data appropriate to their permissions. Multi-factor authentication SHOULD be available for administrative functions.

### Data Protection
All client data, marketing campaigns, and generated content MUST be encrypted in transit and at rest. Personal information and marketing data MUST be handled according to GDPR, CCPA, and other applicable privacy regulations. Data retention policies MUST be clearly defined and automatically enforced. Client data MUST be isolated and protected from unauthorized access or cross-contamination between different clients.

### API Security
All API endpoints MUST implement proper CORS configuration, rate limiting, and input validation. Security headers MUST be included in all responses. API keys MUST be rotated regularly and invalidated when compromised. All external API integrations MUST use secure authentication methods and validate SSL certificates. Request logging MUST be implemented for security auditing and monitoring.

## Development Workflow

### Code Quality
All code MUST follow established linting and formatting standards with automated enforcement. TypeScript MUST be used for type safety and better development experience. Code reviews MUST verify compliance with constitution principles and coding standards. All functions and classes MUST be properly documented with JSDoc comments. Code complexity MUST be kept manageable with clear separation of concerns between marketing logic, data handling, and external integrations.

### Testing Standards
Comprehensive test coverage MUST be maintained for all marketing functionality including unit tests, integration tests, and end-to-end tests. All marketing campaigns, content generation, and client interactions MUST be tested with both success and failure scenarios. API mocking MUST be used to ensure tests don't make real external calls. Constitution compliance tests MUST verify all principles are properly implemented. Test data MUST be realistic and representative of actual marketing use cases.

### Documentation Requirements
All marketing APIs MUST be documented with comprehensive OpenAPI/Swagger specifications including examples and error responses. Postman collections MUST be maintained with test cases for all endpoints. Marketing workflows and campaign templates MUST be documented with clear usage instructions. All configuration options and environment variables MUST be documented. README files MUST provide clear setup and usage instructions for developers and users.

## Governance

This constitution supersedes all other development practices. All pull requests and code reviews MUST verify compliance with these principles. Any violations of the core principles MUST be justified with clear reasoning. Use the project README.md for runtime development guidance and API documentation.

**Version**: 1.0.0 | **Ratified**: 2025-01-27 | **Last Amended**: 2025-01-27