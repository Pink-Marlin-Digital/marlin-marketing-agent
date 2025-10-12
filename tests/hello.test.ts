// Mock the LLM service before importing the app
jest.mock('../src/services/llmService', () => ({
  generateHelloWorldMessage: jest.fn().mockResolvedValue({
    message:
      "Welcome to Marlin Marketing Agent! Today is Monday, January 1, 2024 and the time is 12:00 PM. We're excited to help you with your marketing needs.",
    tokensUsed: 45,
  }),
}));

import request from 'supertest';
import app from '../src/index';

describe('Hello Endpoint Tests', () => {
  it('should generate hello world message successfully', async() => {
    const response = await request(app).get('/hello').expect(200);

    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('metadata');
    expect(response.body.metadata).toHaveProperty('processingTime');
    expect(response.body.metadata).toHaveProperty('tokensUsed', 45);
    expect(response.body.metadata).toHaveProperty('timestamp');
    expect(typeof response.body.metadata.processingTime).toBe('number');
  });

  it('should handle LLM service errors gracefully', async() => {
    // Mock the LLM service to throw an error
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { generateHelloWorldMessage } = require('../src/services/llmService');
    generateHelloWorldMessage.mockRejectedValueOnce(new Error('LLM service unavailable'));

    const response = await request(app).get('/hello').expect(500);

    expect(response.body).toHaveProperty('error');
  });
});
