import cors from 'cors';
import express from 'express';
import { env } from '../config/env.js';
import { errorHandler, notFoundHandler } from '../middleware/errorHandler.js';
import { requestLogger } from '../middleware/requestLogger.js';
import apiRoutes from '../routes/index.js';
import { logger } from '../utils/logger.js';

const app = express();

// Request logging middleware
app.use(requestLogger);

// Security & Parsing middleware
app.use(cors({ origin: env.corsOrigin, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Root info endpoint
app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Crop Disease Detection API',
    version: '1.0.0',
    environment: env.nodeEnv,
  });
});

// Mount Central API Routes (/api)
app.use('/api', apiRoutes);

// Fallback & Error Handling Middlewares
app.use(notFoundHandler);
app.use(errorHandler);

// Start Server if launched directly
if (process.env.NODE_ENV !== 'test') {
  app.listen(env.port, () => {
    logger.info(`Server running on port ${env.port}`, {
      environment: env.nodeEnv,
      corsOrigin: env.corsOrigin,
      apiVersion: env.apiVersion,
    });
  });
}

export default app;
