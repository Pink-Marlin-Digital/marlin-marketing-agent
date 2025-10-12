import { Request, Response, NextFunction } from 'express';

export const logInfo = (message: string, meta?: Record<string, unknown>): void => {
  const logEntry = {
    level: 'info',
    message,
    timestamp: new Date().toISOString(),
    ...meta,
  };
  console.log(JSON.stringify(logEntry));
};

export const logError = (error: Error, meta?: Record<string, unknown>): void => {
  const logEntry = {
    level: 'error',
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    ...meta,
  };
  console.error(JSON.stringify(logEntry));
};

export const logWarn = (message: string, meta?: Record<string, unknown>): void => {
  const logEntry = {
    level: 'warn',
    message,
    timestamp: new Date().toISOString(),
    ...meta,
  };
  console.warn(JSON.stringify(logEntry));
};

export const logger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logEntry = {
      level: 'info',
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration,
      timestamp: new Date().toISOString(),
      userAgent: req.get('User-Agent'),
      ip: req.ip,
    };
    
    if (res.statusCode >= 400) {
      logEntry.level = 'warn';
    }
    
    console.log(JSON.stringify(logEntry));
  });
  
  next();
};
