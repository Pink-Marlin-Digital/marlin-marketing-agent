import { Router } from 'express';
import { generateHelloWorldMessage } from '../services/llmService';
import { logInfo, logError } from '../middleware/logger';

export const helloRouter = Router();

// GET /hello - Generate AI-powered hello world message
helloRouter.get('/', async(req, res, next) => {
  try {
    const startTime = Date.now();

    logInfo('Hello world request received', {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    });

    // Generate AI message
    const aiResponse = await generateHelloWorldMessage();

    const processingTime = Date.now() - startTime;

    logInfo('Hello world request completed', {
      processingTime,
      tokensUsed: aiResponse.tokensUsed,
    });

    res.json({
      message: aiResponse.message,
      metadata: {
        processingTime,
        tokensUsed: aiResponse.tokensUsed,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    logError(error as Error, {
      endpoint: '/hello',
      method: 'GET',
    });
    next(error);
  }
});
