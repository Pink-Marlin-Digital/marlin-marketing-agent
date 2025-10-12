# Marlin Marketing Agent

A Node.js TypeScript server that provides AI-powered marketing responses via OpenAI.

## Features

- **Hello World API**: GET endpoint at `/hello` that returns AI-generated welcome messages with current time and day
- **Health Monitoring**: Standard `/health` endpoint for server status
- **AI Integration**: OpenAI GPT model integration for intelligent responses
- **Security**: Helmet, CORS, and rate limiting middleware
- **Logging**: Structured JSON logging for monitoring
- **TypeScript**: Full TypeScript support with strict type checking

## Quick Start

### Prerequisites

- Node.js 20 or higher
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd marlin-marketing-agent
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env
# Edit .env with your actual values
```

4. Build and run:
```bash
npm run build
npm start
```

### Development

```bash
# Run in development mode
npm run dev

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

## API Endpoints

### GET /hello

Returns an AI-generated welcome message with current time and day.

**Response:**
```json
{
  "message": "Welcome to Marlin Marketing Agent! It's currently 2:30 PM on Thursday, December 19th, 2024. We're excited to help you with your marketing needs!",
  "metadata": {
    "processingTime": 1250,
    "tokensUsed": 45,
    "timestamp": "2024-12-19T19:30:00.000Z"
  }
}
```

### GET /health

Returns server health status.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-12-19T19:30:00.000Z",
  "version": "1.0.0",
  "uptime": 3600,
  "environment": "production"
}
```

### GET /

Returns API information and available endpoints.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | OpenAI API key (required) | - |
| `OPENAI_MODEL` | OpenAI model to use | `gpt-4` |
| `OPENAI_TEMPERATURE` | AI response creativity (0-1) | `0.7` |
| `OPENAI_MAX_TOKENS` | Maximum tokens per response | `1000` |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `development` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window (ms) | `900000` |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `100` |
| `LOG_LEVEL` | Logging level | `info` |

## Deployment

### Heroku

1. Create a Heroku app:
```bash
heroku create your-app-name
```

2. Set environment variables:
```bash
# Copy from local .env
npm run env:sync-to-heroku

# Or set individually
heroku config:set OPENAI_API_KEY=your_key_here
```

3. Deploy:
```bash
git push heroku main
```

### Environment Sync Scripts

- **Sync to Heroku**: `npm run env:sync-to-heroku [app-name]`
- **Sync from Heroku**: `npm run env:sync-from-heroku [app-name]`

## Project Structure

```
src/
├── config/          # Configuration files
├── middleware/      # Express middleware
├── routes/          # API route handlers
├── services/        # Business logic services
└── index.ts         # Application entry point
```

## Development Scripts

- `npm run build` - Compile TypeScript
- `npm run dev` - Run in development mode
- `npm test` - Run tests
- `npm run lint` - Lint code
- `npm run format` - Format code
- `npm run type-check` - Type check without compilation
- `npm run clean` - Clean build artifacts

## License

UNLICENSED - Pink Marlin Digital
