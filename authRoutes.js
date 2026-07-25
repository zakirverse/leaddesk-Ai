import { Router } from 'express';
import { login, getMe } from '../controllers/authController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';
import { authRateLimiter } from '../middlewares/rateLimiter.js';

const router = Router();

router.post('/login', authRateLimiter, login);
router.get('/me', authenticateJWT, getMe);

export const authRoutes = router;
