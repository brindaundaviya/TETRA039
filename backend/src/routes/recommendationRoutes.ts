import { Router } from 'express';
import { getRecommendation } from '../controllers/recommendationController.js';
import { commonRules, validateRequest } from '../middleware/validate.js';

const router = Router();

router.post(
  '/',
  validateRequest([
    commonRules.requireBodyField('crop'),
    commonRules.requireBodyField('disease'),
  ]),
  getRecommendation
);

export default router;
