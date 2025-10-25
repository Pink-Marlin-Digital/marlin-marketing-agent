# Data Model: Marlin Marketing Agent Server

**Feature**: 001-this-should-operate  
**Date**: 2024-12-19  
**Purpose**: Define entities, relationships, and validation rules for the marketing agent server

## Core Entities

### HelloResponse
**Purpose**: Response object for the /hello endpoint containing AI-generated welcome message

**Fields**:
- `message` (string, required): AI-generated welcome message including current time and day
- `timestamp` (string, ISO 8601, required): Response generation timestamp
- `model` (string, optional): AI model used for generation (e.g., "gpt-3.5-turbo")

**Validation Rules**:
- Message must be non-empty string
- Message must contain time and day information
- Timestamp must be valid ISO 8601 format
- Response time must be under 5 seconds

**State Transitions**: N/A (stateless response)

### HealthResponse
**Purpose**: Response object for the /health endpoint containing server status information

**Fields**:
- `status` (string, required): Server status ("healthy", "degraded", "unhealthy")
- `timestamp` (string, ISO 8601, required): Health check timestamp
- `version` (string, required): Application version
- `uptime` (number, required): Server uptime in seconds
- `ai_service` (object, required): AI service status information
  - `available` (boolean, required): Whether AI service is available
  - `response_time` (number, optional): AI service response time in ms
  - `last_check` (string, ISO 8601, optional): Last AI service check timestamp

**Validation Rules**:
- Status must be one of: "healthy", "degraded", "unhealthy"
- Timestamp must be valid ISO 8601 format
- Version must be non-empty string
- Uptime must be non-negative number
- AI service status must be included

**State Transitions**: N/A (stateless response)

### AIModelConfig
**Purpose**: Configuration object for AI model settings and parameters

**Fields**:
- `model` (string, required): OpenAI model identifier (e.g., "gpt-3.5-turbo")
- `temperature` (number, required): Model temperature (0.0-2.0)
- `max_tokens` (number, required): Maximum tokens for response
- `timeout` (number, required): Request timeout in milliseconds
- `retry_attempts` (number, required): Number of retry attempts on failure

**Validation Rules**:
- Model must be valid OpenAI model identifier
- Temperature must be between 0.0 and 2.0
- Max tokens must be positive integer
- Timeout must be positive number
- Retry attempts must be non-negative integer

**State Transitions**: N/A (configuration object)

### ErrorResponse
**Purpose**: Standardized error response object for all endpoints

**Fields**:
- `error` (string, required): Error type identifier
- `message` (string, required): Human-readable error message
- `code` (number, required): HTTP status code
- `timestamp` (string, ISO 8601, required): Error timestamp
- `details` (object, optional): Additional error context

**Validation Rules**:
- Error must be non-empty string
- Message must be non-empty string
- Code must be valid HTTP status code
- Timestamp must be valid ISO 8601 format

**State Transitions**: N/A (error response)

## Relationships

### HelloResponse → AIModelConfig
- HelloResponse uses AIModelConfig for generation parameters
- One-to-one relationship (each response uses one config)

### HealthResponse → AIModelConfig
- HealthResponse includes AI service status based on AIModelConfig
- One-to-one relationship (health check uses one config)

### ErrorResponse → All Entities
- ErrorResponse can be returned for any entity operation
- One-to-many relationship (any entity can generate errors)

## Validation Rules

### Input Validation
- All string fields must be non-empty
- All numeric fields must be within valid ranges
- All timestamp fields must be valid ISO 8601 format
- All enum fields must match allowed values

### Business Rules
- AI service must be available for /hello endpoint to return successful response
- Health endpoint must respond within 100ms for 99% of requests
- Hello endpoint must respond within 5 seconds for 95% of requests
- All endpoints must include proper error handling and logging

### Security Rules
- All endpoints must validate API key authentication
- All requests must be rate limited appropriately
- All responses must include proper security headers
- All errors must not expose sensitive information

## Data Flow

### Hello Endpoint Flow
1. Validate API key authentication
2. Check AI service availability
3. Generate AI prompt with current time/day
4. Call OpenAI API with configured parameters
5. Format response with timestamp and model info
6. Log interaction for analytics
7. Return HelloResponse or ErrorResponse

### Health Endpoint Flow
1. Check server status and uptime
2. Test AI service availability and response time
3. Determine overall health status
4. Format response with all status information
5. Log health check for monitoring
6. Return HealthResponse

### Error Handling Flow
1. Catch any errors in endpoint processing
2. Log error with context and severity
3. Determine appropriate error type and message
4. Format standardized error response
5. Return ErrorResponse with proper HTTP status

## Performance Considerations

### Response Time Requirements
- Hello endpoint: <5 seconds for 95% of requests
- Health endpoint: <100ms for 99% of requests
- AI service calls: <4 seconds for 95% of requests

### Caching Strategy
- No caching for Hello endpoint (dynamic AI responses)
- No caching for Health endpoint (real-time status)
- Configuration caching for AI model settings

### Monitoring Requirements
- Track response times for all endpoints
- Monitor AI service availability and performance
- Log all interactions for marketing analytics
- Alert on performance degradation or failures
