import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { authRoutes } from './routes/authRoutes.js';
import { leadRoutes } from './routes/leadRoutes.js';
import { analyticsRoutes } from './routes/analyticsRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { apiRateLimiter } from './middlewares/rateLimiter.js';

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Rate Limiter
app.use('/api', apiRateLimiter);

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    service: 'LeadDesk AI CRM API'
  });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/leads', leadRoutes);
app.use('/api/v1/analytics', analyticsRoutes);

// Serve static frontend files if built
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const possibleDistPaths = [
  path.resolve(__dirname, '../../frontend/dist'),
  path.resolve(__dirname, '../frontend/dist'),
  path.resolve(__dirname, '../dist')
];
const frontendDist = possibleDistPaths.find(p => fs.existsSync(p));

if (frontendDist) {
  app.use(express.static(frontendDist));
  app.get('*', (req, res, next) => {
    if (req.url.startsWith('/api')) return next();
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
} else {
  // Unhandled Route 404 Handler
  app.use((req, res, next) => {
    res.status(404).json({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: `Cannot ${req.method} ${req.url}`
      }
    });
  });
}

// Global Error Handler Middleware
app.use(errorHandler);

export default app;
