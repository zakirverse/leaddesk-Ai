import { Router } from 'express';
import { getDashboardStats } from '../controllers/analyticsController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/rbacMiddleware.js';

const router = Router();

router.get('/dashboard', authenticateJWT, authorizeRoles('super_admin', 'sales_manager'), getDashboardStats);

export const analyticsRoutes = router;
