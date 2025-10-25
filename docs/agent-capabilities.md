# Agent Capabilities API Specifications

## Overview

The Marlin Marketing Agent provides basic agent capabilities through a simple REST API. This document outlines the current and planned agent capabilities.

## Current Capabilities

### 1. Content Generation
- **AI-Powered Messages**: Generate contextual welcome messages
- **Time-Aware Content**: Include current time and day information
- **Professional Tone**: Maintain consistent, professional communication style

### 2. Health Monitoring
- **System Status**: Monitor server health and availability
- **AI Service Status**: Track OpenAI API availability
- **Performance Metrics**: Monitor response times and throughput

## API Specifications

### Content Generation Endpoint

#### GET /hello
Generates an AI-powered welcome message with current time and day information.

**Request:**
```http
GET /hello
X-API-Key: your-api-key
```

**Response:**
```json
{
  "message": "Hello! Welcome to Marlin Marketing Agent. Today is Thursday, December 19th, 2024, and the current time is 2:35 PM. I'm here to help you with your marketing automation needs!",
  "metadata": {
    "processingTime": 1250,
    "tokensUsed": 45,
    "timestamp": "2024-12-19T14:35:00.000Z"
  }
}
```

### Health Monitoring Endpoint

#### GET /health
Returns system health status and AI service availability.

**Request:**
```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-12-19T14:35:00.000Z",
  "version": "1.0.0",
  "uptime": 3600,
  "environment": "production",
  "ai_service": {
    "available": true,
    "response_time": 1200,
    "last_check": "2024-12-19T14:35:00.000Z"
  }
}
```

## Planned Capabilities

### 1. Enhanced Content Generation
- **Template Support**: Pre-defined content templates
- **Custom Prompts**: User-defined prompt templates
- **Content Variations**: Multiple content variations
- **Brand Voice**: Customizable brand voice and tone

### 2. Agent Tools
- **Tool Discovery**: List available agent tools
- **Tool Execution**: Execute specific agent tools
- **Tool Configuration**: Configure tool parameters
- **Tool Monitoring**: Monitor tool usage and performance

### 3. Workflow Automation
- **Workflow Definition**: Define automated workflows
- **Workflow Execution**: Execute defined workflows
- **Workflow Monitoring**: Monitor workflow performance
- **Workflow Scheduling**: Schedule workflow execution

### 4. Analytics & Reporting
- **Usage Analytics**: Track API usage and performance
- **Content Analytics**: Analyze generated content
- **Performance Metrics**: Monitor system performance
- **Custom Reports**: Generate custom analytics reports

## Integration Patterns

### 1. Webhook Integration
- **Event Notifications**: Send notifications on events
- **Status Updates**: Provide status updates via webhooks
- **Error Notifications**: Alert on errors and failures

### 2. API Integration
- **REST API**: Standard REST API for integration
- **GraphQL API**: GraphQL API for complex queries
- **WebSocket API**: Real-time communication via WebSockets

### 3. SDK Support
- **JavaScript SDK**: Client-side JavaScript SDK
- **Python SDK**: Python SDK for server-side integration
- **Node.js SDK**: Node.js SDK for server-side integration

## Security & Authentication

### API Key Authentication
- **X-API-Key Header**: Primary authentication method
- **Bearer Token**: Alternative authentication method
- **Rate Limiting**: Per-API-key rate limiting

### Access Control
- **Role-Based Access**: Different access levels
- **Permission Management**: Granular permission control
- **Audit Logging**: Comprehensive audit trails

## Performance Characteristics

### Response Times
- **Content Generation**: <5 seconds (95% of requests)
- **Health Checks**: <100ms (99% of requests)
- **Tool Execution**: <10 seconds (90% of requests)

### Throughput
- **Rate Limiting**: 100 requests per 15 minutes per API key
- **Concurrent Requests**: Handled by Node.js event loop
- **Scaling**: Horizontal scaling for increased throughput

## Error Handling

### Error Types
- **Authentication Errors**: 401 Unauthorized
- **Rate Limit Errors**: 429 Too Many Requests
- **Validation Errors**: 400 Bad Request
- **Service Errors**: 502 Bad Gateway
- **Server Errors**: 500 Internal Server Error

### Error Response Format
```json
{
  "error": {
    "message": "Error description",
    "statusCode": 400,
    "timestamp": "2024-12-19T14:35:00.000Z",
    "path": "/hello",
    "details": {
      "field": "additional context"
    }
  }
}
```

## Future Roadmap

### Phase 1: Basic Agent (Current)
- ✅ Content generation
- ✅ Health monitoring
- ✅ API authentication
- ✅ Rate limiting

### Phase 2: Enhanced Capabilities
- 🔄 Template support
- 🔄 Custom prompts
- 🔄 Tool discovery
- 🔄 Workflow automation

### Phase 3: Advanced Features
- 📋 Analytics and reporting
- 📋 Webhook integration
- 📋 SDK development
- 📋 Advanced security

### Phase 4: Enterprise Features
- 📋 Multi-tenant support
- 📋 Advanced analytics
- 📋 Custom integrations
- 📋 Enterprise security

## Conclusion

The Marlin Marketing Agent provides a solid foundation for basic agent capabilities with a clear roadmap for future enhancements. The API is designed for simplicity and ease of integration while maintaining security and performance standards.
