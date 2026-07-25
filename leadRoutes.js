import { Router } from 'express';
import { createLead, getLeads, getLeadById, updateStatus, addNote } from '../controllers/leadController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';
import { leadValidationRules, validate } from '../middlewares/validateLead.js';

const router = Router();

// Public lead submission endpoint
router.post('/', leadValidationRules(), validate, createLead);

// Protected endpoints
router.get('/', authenticateJWT, getLeads);
router.get('/:id', authenticateJWT, getLeadById);
router.patch('/:id/status', authenticateJWT, updateStatus);
router.post('/:id/notes', authenticateJWT, addNote);

export const leadRoutes = router;
