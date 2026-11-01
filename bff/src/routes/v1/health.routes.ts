import { Router } from 'express';
import {
    getHealth,
    getDatabaseHealth,
} from '../../controllers/health.controller';

const router = Router();

router.get('/health', getHealth);
router.get('/health/database', getDatabaseHealth);

export default router;