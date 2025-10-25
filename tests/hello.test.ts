// Mock the LLM service before importing the app
const mockGenerateHelloWorldMessage = jest.fn();
jest.mock('../src/services/llmService', () => ({
  generateHelloWorldMessage: mockGenerateHelloWorldMessage
}));

import request from 'supertest';
import app from '../src/index';

describe('Hello Endpoint Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Contract Tests', () => {
    it('should generate hello world message successfully', async () => {
      mockGenerateHelloWorldMessage.mockResolvedValue({
        message: 'Welcome to Marlin Marketing Agent! Today is Monday, January 1, 2024 and the time is 12:00 PM. We\'re excited to help you with your marketing needs.',
        tokensUsed: 45
      });

      const response = await request(app)
        .get('/hello')
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('metadata');
      expect(response.body.metadata).toHaveProperty('processingTime');
      expect(response.body.metadata).toHaveProperty('tokensUsed', 45);
      expect(response.body.metadata).toHaveProperty('timestamp');
      expect(typeof response.body.metadata.processingTime).toBe('number');
    });

    it('should return JSON response with message field', async () => {
      mockGenerateHelloWorldMessage.mockResolvedValue({
        message: 'Hello! Today is Monday and it\'s 12:00 PM.',
        tokensUsed: 20
      });

      const response = await request(app)
        .get('/hello')
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(typeof response.body.message).toBe('string');
      expect(response.body.message.length).toBeGreaterThan(0);
    });

    it('should include current time and day in message', async () => {
      const mockMessage = 'Welcome! Today is Monday, January 1, 2024 and the time is 12:00 PM.';
      mockGenerateHelloWorldMessage.mockResolvedValue({
        message: mockMessage,
        tokensUsed: 30
      });

      const response = await request(app)
        .get('/hello')
        .expect(200);

      expect(response.body.message).toContain('time');
      expect(response.body.message).toContain('day');
    });

    it('should respond within 5 seconds', async () => {
      mockGenerateHelloWorldMessage.mockResolvedValue({
        message: 'Quick response',
        tokensUsed: 10
      });

      const startTime = Date.now();
      const response = await request(app)
        .get('/hello')
        .expect(200);
      const endTime = Date.now();

      expect(endTime - startTime).toBeLessThan(5000);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('Integration Tests', () => {
    it('should handle LLM service errors gracefully', async () => {
      mockGenerateHelloWorldMessage.mockRejectedValue(new Error('LLM service unavailable'));

      const response = await request(app)
        .get('/hello')
        .expect(500);

      expect(response.body).toHaveProperty('error');
    });

    it('should handle LLM timeout errors', async () => {
      mockGenerateHelloWorldMessage.mockRejectedValue(new Error('LLM request timed out'));

      const response = await request(app)
        .get('/hello')
        .expect(500);

      expect(response.body).toHaveProperty('error');
    });

    it('should handle LLM rate limit errors', async () => {
      mockGenerateHelloWorldMessage.mockRejectedValue(new Error('LLM rate limit exceeded'));

      const response = await request(app)
        .get('/hello')
        .expect(500);

      expect(response.body).toHaveProperty('error');
    });

    it('should log AI interactions for analytics', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      mockGenerateHelloWorldMessage.mockResolvedValue({
        message: 'Test message',
        tokensUsed: 15
      });

      await request(app)
        .get('/hello')
        .expect(200);

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Hello world request received')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Hello world request completed')
      );

      consoleSpy.mockRestore();
    });
  });
});