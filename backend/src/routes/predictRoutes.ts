import { Router } from 'express';
import { predictCropDisease } from '../controllers/predictController.js';
import { commonRules, validateRequest } from '../middleware/validate.js';

const router = Router();

router.post(
  '/',
  validateRequest([commonRules.requireOneOfBodyFields(['cropId', 'imageUrl', 'imageBase64'])]),
  predictCropDisease
);

export default router;
