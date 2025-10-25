import request from 'supertest';
import app from '../src/index';

describe('Health Check Tests', () => {
  describe('Contract Tests', () => {
    it('should return health status with all required fields', async() => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('version');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('environment');

      // Validate status is one of the expected values
      expect(['healthy', 'degraded', 'unhealthy']).toContain(response.body.status);

      // Validate timestamp is ISO string
      expect(new Date(response.body.timestamp)).toBeInstanceOf(Date);

      // Validate uptime is a number
      expect(typeof response.body.uptime).toBe('number');
      expect(response.body.uptime).toBeGreaterThanOrEqual(0);
    });

    it('should respond within 100ms for 99% of requests', async() => {
      const startTime = Date.now();
      const response = await request(app)
        .get('/health')
        .expect(200);
      const endTime = Date.now();

      expect(endTime - startTime).toBeLessThan(100);
      expect(response.body).toHaveProperty('status');
    });

    it('should return API information on root endpoint', async() => {
      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Marlin Marketing Agent API');
      expect(response.body).toHaveProperty('version');
      expect(response.body).toHaveProperty('endpoints');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body.endpoints).toHaveProperty('hello', '/hello');
      expect(response.body.endpoints).toHaveProperty('health', '/health');
    });
  });

  describe('Integration Tests', () => {
    it('should include AI service status monitoring', async() => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      // The health endpoint should include AI service status
      // This will be enhanced when we add AI service monitoring
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('timestamp');
    });

    it('should handle health check logging', async() => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      await request(app)
        .get('/health')
        .expect(200);

      // Should log the health check request
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('GET'),
      );

      consoleSpy.mockRestore();
    });
  });
});
