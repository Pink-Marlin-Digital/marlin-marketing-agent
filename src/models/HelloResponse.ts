/**
 * HelloResponse interface for the /hello endpoint
 * Contains AI-generated welcome message with time and day information
 */
export interface HelloResponse {
  message: string;
  timestamp: string;
  model?: string;
}
