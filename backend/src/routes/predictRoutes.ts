import { Router } from 'express';
import { predictCropDisease, uploadImage } from '../controllers/predictController.js';
import { uploadSingleImage } from '../middleware/uploadMiddleware.js';
import { commonRules, validateRequest } from '../middleware/validate.js';

const router = Router();

router.post(
  '/',
  validateRequest([
    commonRules.requireOneOfBodyFields(['uploadId', 'cropId', 'imageUrl', 'imageBase64']),
  ]),
  predictCropDisease
);

router.post('/upload', uploadSingleImage, uploadImage);

export default router;
