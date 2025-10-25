/**
 * Error Handling Test Suite for Marlin Marketing Agent
 * Tests error response scenarios
 */

const errorHandlingTests = {
  /**
   * Test error response format
   */
  testErrorResponseFormat: () => {
    pm.test('Error response should have correct format', function () {
      const jsonData = pm.response.json();
      pm.expect(jsonData).to.have.property('error');
      pm.expect(jsonData.error).to.have.property('message');
      pm.expect(jsonData.error).to.have.property('statusCode');
      pm.expect(jsonData.error).to.have.property('timestamp');
    });
  },

  /**
   * Test 404 error handling
   */
  test404Error: () => {
    pm.test('404 error should return correct status', function () {
      pm.response.to.have.status(404);
    });
    
    pm.test('404 error should have appropriate message', function () {
      const jsonData = pm.response.json();
      pm.expect(jsonData.error.message).to.include('Not Found');
    });
  },

  /**
   * Test 500 error handling
   */
  test500Error: () => {
    pm.test('500 error should return correct status', function () {
      pm.response.to.have.status(500);
    });
    
    pm.test('500 error should have appropriate message', function () {
      const jsonData = pm.response.json();
      pm.expect(jsonData.error.message).to.include('Internal Server Error');
    });
  },

  /**
   * Test LLM service error handling
   */
  testLLMServiceError: () => {
    pm.test('LLM service error should return 502', function () {
      pm.response.to.have.status(502);
    });
    
    pm.test('LLM service error should have appropriate message', function () {
      const jsonData = pm.response.json();
      pm.expect(jsonData.error.message).to.include('LLM');
    });
  },

  /**
   * Test timeout error handling
   */
  testTimeoutError: () => {
    pm.test('Timeout error should return 502', function () {
      pm.response.to.have.status(502);
    });
    
    pm.test('Timeout error should have appropriate message', function () {
      const jsonData = pm.response.json();
      pm.expect(jsonData.error.message).to.include('timeout');
    });
  }
};

module.exports = errorHandlingTests;
