import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';
import { serverConfig } from '../config/server';

export const createRateLimit = (): RateLimitRequestHandler => {
  return rateLimit({
    windowMs: serverConfig.rateLimit.windowMs,
    max: serverConfig.rateLimit.maxRequests,
    message: {
      error: 'Too many requests from this IP, please try again later.',
      retryAfter: Math.ceil(serverConfig.rateLimit.windowMs / 1000),
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};
