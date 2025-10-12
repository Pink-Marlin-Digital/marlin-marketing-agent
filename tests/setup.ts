// Test setup file
import 'jest';

// Mock environment variables for testing
process.env['OPENAI_API_KEY'] = 'test-key';
process.env['OPENAI_MODEL'] = 'gpt-4';
process.env['OPENAI_TEMPERATURE'] = '0.7';
process.env['OPENAI_MAX_TOKENS'] = '1000';
process.env['NODE_ENV'] = 'test';
process.env['PORT'] = '3000';
process.env['LOG_LEVEL'] = 'info';
process.env['RATE_LIMIT_WINDOW_MS'] = '900000';
process.env['RATE_LIMIT_MAX_REQUESTS'] = '100';
