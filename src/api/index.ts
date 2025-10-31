import express from 'express';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { apiKeyAuth } from './middleware/apiKeyAuth';
import { createSocialRouter } from './routes/social';
import { logger } from '../lib/logger';

const app = express();
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => res.json({ ok: true }));

// Swagger OpenAPI from feature contracts
try {
  const openapiPath = path.resolve(__dirname, '../../specs/003-create-a-service/contracts/openapi.yaml');
  const yaml = fs.readFileSync(openapiPath, 'utf8');
  // swagger-ui-express can accept raw YAML via custom middleware; keep simple by serving raw
  app.get('/docs/openapi.yaml', (_req, res) => res.type('text/yaml').send(yaml));
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(undefined, { swaggerUrl: '/docs/openapi.yaml' }));
} catch (e) {
  logger.warn('OpenAPI file not found; skipping Swagger setup');
}

// Secure API routes with API key
app.use('/api', apiKeyAuth);
app.use('/api/social', createSocialRouter());

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(port, () => logger.info({ port }, 'Server started'));

export default app;
