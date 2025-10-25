/**
 * Rate Limiting Test Suite for Marlin Marketing Agent
 * Tests rate limiting functionality
 */

const rateLimitingTests = {
  /**
   * Test rate limiting headers
   */
  testRateLimitHeaders: () => {
    pm.test('Rate limit headers should be present', function () {
      const rateLimitHeader = pm.response.headers.get('X-RateLimit-Limit');
      const rateLimitRemaining = pm.response.headers.get('X-RateLimit-Remaining');
      const rateLimitReset = pm.response.headers.get('X-RateLimit-Reset');
      
      pm.expect(rateLimitHeader).to.exist;
      pm.expect(rateLimitRemaining).to.exist;
      pm.expect(rateLimitReset).to.exist;
    });
  },

  /**
   * Test rate limit exceeded response
   */
  testRateLimitExceeded: () => {
    pm.test('Rate limit exceeded should return 429', function () {
      pm.response.to.have.status(429);
    });
    
    pm.test('Rate limit error should contain retry information', function () {
      const jsonData = pm.response.json();
      pm.expect(jsonData).to.have.property('error');
      pm.expect(jsonData.error).to.have.property('retryAfter');
    });
  },

  /**
   * Test rate limit within bounds
   */
  testRateLimitWithinBounds: () => {
    pm.test('Within rate limit should return 200', function () {
      pm.response.to.have.status(200);
    });
    
    pm.test('Rate limit remaining should be positive', function () {
      const rateLimitRemaining = pm.response.headers.get('X-RateLimit-Remaining');
      pm.expect(parseInt(rateLimitRemaining)).to.be.at.least(0);
    });
  }
};

module.exports = rateLimitingTests;
