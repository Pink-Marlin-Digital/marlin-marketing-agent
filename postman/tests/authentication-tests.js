/**
 * Authentication Test Suite for Marlin Marketing Agent
 * Tests API key authentication scenarios
 */

const authenticationTests = {
  /**
   * Test valid API key authentication
   */
  testValidApiKey: () => {
    pm.test('Valid API key should return 200', function () {
      pm.response.to.have.status(200);
    });
    
    pm.test('Response should not contain error', function () {
      const jsonData = pm.response.json();
      pm.expect(jsonData).to.not.have.property('error');
    });
  },

  /**
   * Test invalid API key authentication
   */
  testInvalidApiKey: () => {
    pm.test('Invalid API key should return 401', function () {
      pm.response.to.have.status(401);
    });
    
    pm.test('Response should contain error message', function () {
      const jsonData = pm.response.json();
      pm.expect(jsonData).to.have.property('error');
      pm.expect(jsonData.error).to.have.property('message');
    });
  },

  /**
   * Test missing API key authentication
   */
  testMissingApiKey: () => {
    pm.test('Missing API key should return 401', function () {
      pm.response.to.have.status(401);
    });
    
    pm.test('Response should contain error message', function () {
      const jsonData = pm.response.json();
      pm.expect(jsonData).to.have.property('error');
      pm.expect(jsonData.error).to.have.property('message');
    });
  }
};

module.exports = authenticationTests;
