import { ForbiddenError } from '../utils/errors.js';

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(new ForbiddenError('Insufficient access permissions for this resource'));
    }
    next();
  };
};
