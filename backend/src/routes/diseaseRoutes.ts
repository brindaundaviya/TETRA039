import { Router } from 'express';
import { getDiseases } from '../controllers/diseaseController.js';

const router = Router();

router.get('/', getDiseases);

export default router;
