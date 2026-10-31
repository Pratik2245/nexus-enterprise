import { Router } from 'express';
import healthRoutes from './v1/health.routes';

const router = Router();

router.use('/v1', healthRoutes);

export default router;