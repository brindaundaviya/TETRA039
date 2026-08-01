import { Router } from 'express';
import cropRoutes from './cropRoutes.js';
import diseaseRoutes from './diseaseRoutes.js';
import healthRoutes from './healthRoutes.js';
import historyRoutes from './historyRoutes.js';
import predictRoutes from './predictRoutes.js';
import recommendationRoutes from './recommendationRoutes.js';

const router = Router();
const v1Router = Router();

// Version 1 Sub-router
v1Router.use('/health', healthRoutes);
v1Router.use('/predict', predictRoutes);
v1Router.use('/history', historyRoutes);
v1Router.use('/crops', cropRoutes);
v1Router.use('/diseases', diseaseRoutes);
v1Router.use('/recommendation', recommendationRoutes);

// Register v1 routes under /v1 prefix
router.use('/v1', v1Router);

// Direct registration under /api for base endpoints
router.use('/health', healthRoutes);
router.use('/predict', predictRoutes);
router.use('/history', historyRoutes);
router.use('/crops', cropRoutes);
router.use('/diseases', diseaseRoutes);
router.use('/recommendation', recommendationRoutes);

export default router;
