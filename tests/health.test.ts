import request from 'supertest';
import app from '../src/index';

describe('Health Check Tests', () => {
  it('should return health status', async() => {
    const response = await request(app).get('/health').expect(200);

    expect(response.body).toHaveProperty('status', 'healthy');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('version');
    expect(response.body).toHaveProperty('uptime');
    expect(response.body).toHaveProperty('environment');
  });

  it('should return API information on root endpoint', async() => {
    const response = await request(app).get('/').expect(200);

    expect(response.body).toHaveProperty('message', 'Marlin Marketing Agent API');
    expect(response.body).toHaveProperty('version');
    expect(response.body).toHaveProperty('endpoints');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body.endpoints).toHaveProperty('hello', '/hello');
    expect(response.body.endpoints).toHaveProperty('health', '/health');
  });
});
