import cors from 'cors';
import express from 'express';
import { env } from '../config/env.js';
import { errorHandler, notFoundHandler } from '../middleware/errorHandler.js';
import apiRoutes from '../routes/index.js';
import { logger } from '../utils/logger.js';

const app = express();

app.use(cors({ origin: env.corsOrigin, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Crop Disease Detection API',
    version: '1.0.0',
  });
});

app.use('/api', apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(env.port, () => {
  logger.info(`Server running on port ${env.port}`, {
    environment: env.nodeEnv,
    corsOrigin: env.corsOrigin,
  });
});

export default app;
