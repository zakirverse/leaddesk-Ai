import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/errors.js';

export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Authentication token required'));
  }

  const token = authHeader.split(' ')[1];
  try {
    const secret = process.env.JWT_SECRET || 'leaddesk_super_secret_jwt_key_2026_enterprise_secure';
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    return next(new UnauthorizedError('Token is invalid or expired'));
  }
};
