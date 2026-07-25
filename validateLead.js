import { body, validationResult } from 'express-validator';
import { ValidationError } from '../utils/errors.js';

export const leadValidationRules = () => [
  body('full_name').trim().isLength({ min: 2, max: 150 }).withMessage('Full name must be between 2 and 150 characters'),
  body('email').trim().isEmail().normalizeEmail().withMessage('Valid email address required'),
  body('budget').isNumeric().custom(val => val >= 0).withMessage('Budget must be a non-negative number'),
  body('message').trim().isLength({ min: 10, max: 2000 }).withMessage('Message must be between 10 and 2000 characters')
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const extractedErrors = errors.array().map(err => ({
    field: err.path || err.param,
    message: err.msg
  }));

  next(new ValidationError('Field validation failed', extractedErrors));
};
