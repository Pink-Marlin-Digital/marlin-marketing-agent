/**
 * ErrorResponse interface for standardized error responses
 * Contains error information with context and details
 */
export interface ErrorResponse {
  error: string;
  message: string;
  code: number;
  timestamp: string;
  details?: Record<string, unknown>;
}
