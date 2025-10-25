import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './middleware/logger';
import { createRateLimit } from './middleware/rateLimit';
import { helloRouter } from './routes/hello';
import { serverConfig } from './config/server';

const app = express();
const PORT = serverConfig.port;

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
app.use(createRateLimit());

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(logger);

// Routes
app.use('/hello', helloRouter);

// Health check
app.get('/health', (_req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env['npm_package_version'] || '1.0.0',
    uptime: process.uptime(),
    environment: serverConfig.nodeEnv,
  });
});

// Root endpoint
app.get('/', (_req, res) => {
  res.json({
    message: 'Marlin Marketing Agent API',
    version: process.env['npm_package_version'] || '1.0.0',
    endpoints: {
      hello: '/hello',
      health: '/health'
    },
    timestamp: new Date().toISOString()
  });
});

// Error handling
app.use(errorHandler);

// Start server only if not in test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Marlin Marketing Agent server running on port ${PORT}`);
    console.log(`Environment: ${serverConfig.nodeEnv}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`Hello endpoint: http://localhost:${PORT}/hello`);
  });
}

export default app;
