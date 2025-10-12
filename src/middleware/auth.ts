import { Request, Response, NextFunction } from 'express';

// Basic API key authentication middleware
export const apiKeyAuth = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers['x-api-key'] as string;
  const expectedApiKey = process.env['API_KEY'];

  // Skip auth in development if no API key is configured
  if (process.env['NODE_ENV'] === 'development' && !expectedApiKey) {
    return next();
  }

  if (!expectedApiKey) {
    res.status(500).json({
      error: {
        message: 'API key not configured',
        statusCode: 500,
      },
    });
    return;
  }

  if (!apiKey || apiKey !== expectedApiKey) {
    res.status(401).json({
      error: {
        message: 'Invalid or missing API key',
        statusCode: 401,
      },
    });
    return;
  }

  next();
};
