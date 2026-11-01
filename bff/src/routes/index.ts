import { Router } from 'express';
import healthRoutes from './v1/health.routes';
import userRoutes from "./v1/user.routes";
const router = Router();

router.use('/v1', healthRoutes);
router.use('/v1/users', userRoutes);

export default router;