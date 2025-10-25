/**
 * HealthResponse interface for the /health endpoint
 * Contains server status and AI service availability information
 */
export interface HealthResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  version: string;
  uptime: number;
  ai_service: {
    available: boolean;
    response_time?: number;
    last_check?: string;
  };
}
