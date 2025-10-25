# Quickstart Guide: Marlin Marketing Agent Server

**Feature**: 001-this-should-operate  
**Date**: 2024-12-19  
**Purpose**: Get up and running with the Marlin Marketing Agent server quickly

## Prerequisites

- Node.js 20 or higher
- npm or yarn package manager
- OpenAI API key
- Git (for development)

## Installation

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd marlin-marketing-agent
npm install
```

### 2. Environment Configuration

Create a `.env` file in the project root:

```bash
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-3.5-turbo
OPENAI_TEMPERATURE=0.7
OPENAI_MAX_TOKENS=150
OPENAI_TIMEOUT=30000

# Server Configuration
PORT=3000
NODE_ENV=development

# Security Configuration
API_KEY=your_secure_api_key_here
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3. Start the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## API Usage

### Authentication

All endpoints require an API key. Include it in the request header:

```bash
curl -H "X-API-Key: your_secure_api_key_here" \
     http://localhost:3000/hello
```

### Hello Endpoint

Get an AI-generated welcome message with current time and day:

```bash
curl -H "X-API-Key: your_secure_api_key_here" \
     http://localhost:3000/hello
```

**Response:**
```json
{
  "message": "Hello! Welcome to Marlin Marketing Agent. Today is Thursday, December 19th, 2024, and the current time is 2:35 PM. I'm here to help you with your marketing automation needs!",
  "timestamp": "2024-12-19T14:35:00.000Z",
  "model": "gpt-3.5-turbo"
}
```

### Health Check

Monitor server and AI service status:

```bash
curl http://localhost:3000/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-12-19T14:35:00.000Z",
  "version": "1.0.0",
  "uptime": 3600,
  "ai_service": {
    "available": true,
    "response_time": 1250,
    "last_check": "2024-12-19T14:35:00.000Z"
  }
}
```

## Development

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

### API Documentation

The API documentation is available at:
- Swagger UI: `http://localhost:3000/api-docs`
- OpenAPI spec: `http://localhost:3000/api-docs.json`

## Deployment

### Heroku Deployment

1. **Create Heroku App:**
```bash
heroku create marlin-marketing-agent
```

2. **Set Environment Variables:**
```bash
heroku config:set OPENAI_API_KEY=your_openai_api_key_here
heroku config:set API_KEY=your_secure_api_key_here
heroku config:set NODE_ENV=production
```

3. **Deploy:**
```bash
git push heroku main
```

### Environment Variables for Production

```bash
# Required
OPENAI_API_KEY=your_openai_api_key_here
API_KEY=your_secure_api_key_here

# Optional (with defaults)
OPENAI_MODEL=gpt-3.5-turbo
OPENAI_TEMPERATURE=0.7
OPENAI_MAX_TOKENS=150
OPENAI_TIMEOUT=30000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Monitoring

### Health Checks

The `/health` endpoint provides comprehensive server status:

- **Server Status**: Overall health (healthy/degraded/unhealthy)
- **AI Service Status**: OpenAI API availability and response time
- **Uptime**: Server uptime in seconds
- **Version**: Application version

### Logging

The server includes structured logging for:

- All API requests and responses
- AI service interactions
- Error conditions and stack traces
- Performance metrics

### Rate Limiting

- Default: 100 requests per 15 minutes per IP
- Configurable via environment variables
- Returns 429 status when limit exceeded

## Troubleshooting

### Common Issues

**1. AI Service Unavailable**
- Check OpenAI API key is valid
- Verify network connectivity
- Check OpenAI service status

**2. Authentication Errors**
- Verify API key is correct
- Check header format: `X-API-Key: your_key`
- Ensure API key is not expired

**3. Rate Limiting**
- Reduce request frequency
- Implement exponential backoff
- Check rate limit configuration

**4. Timeout Errors**
- Check OpenAI API response times
- Verify network connectivity
- Consider increasing timeout values

### Debug Mode

Enable debug logging:

```bash
DEBUG=marlin:* npm run dev
```

### Performance Monitoring

Monitor key metrics:

- Response times for `/hello` endpoint
- AI service response times
- Error rates and types
- Rate limiting triggers

## Security Considerations

### API Key Security
- Use strong, unique API keys
- Rotate keys regularly
- Never commit keys to version control
- Use environment variables for configuration

### Rate Limiting
- Configure appropriate limits for your use case
- Monitor for abuse patterns
- Implement client-side backoff strategies

### CORS Configuration
- Configure allowed origins for production
- Use HTTPS in production
- Validate all incoming requests

## Support

For issues and questions:

1. Check the API documentation
2. Review server logs
3. Monitor health endpoint
4. Contact the development team

## Next Steps

After getting the basic server running:

1. **Integrate with Marketing Platforms**: Connect to your existing marketing tools
2. **Customize AI Prompts**: Modify prompts for your specific use cases
3. **Add More Endpoints**: Extend the API with additional marketing features
4. **Implement Analytics**: Add detailed tracking and reporting
5. **Scale Deployment**: Configure for production workloads
