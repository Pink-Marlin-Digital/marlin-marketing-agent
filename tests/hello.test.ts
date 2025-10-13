import nock from 'nock';
import request from 'supertest';
import app from '../src/index';

// Mock OpenAI API calls for successful responses
nock('https://api.openai.com')
  .post('/v1/chat/completions')
  .reply(200, {
    choices: [
      {
        message: {
          content:
            "Welcome to Marlin Marketing Agent! Today is Monday, January 1, 2024 and the time is 12:00 PM. We're excited to help you with your marketing needs.",
        },
      },
    ],
    usage: {
      total_tokens: 45,
    },
  });

describe('Hello Endpoint Tests', () => {
  afterEach(() => {
    nock.cleanAll();
  });

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
    // Mock OpenAI API to return an error
    nock('https://api.openai.com')
      .post('/v1/chat/completions')
      .reply(500, { error: { message: 'LLM service unavailable' } });

    const response = await request(app).get('/hello').expect(502);

    expect(response.body).toHaveProperty('error');
  });
});
