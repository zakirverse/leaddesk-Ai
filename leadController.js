import { LeadService } from '../services/leadService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createLead = asyncHandler(async (req, res) => {
  const lead = await LeadService.createLead(req.body);
  res.status(201).json({
    success: true,
    data: lead
  });
});

export const getLeads = asyncHandler(async (req, res) => {
  const { search, status, score_tier, page, limit } = req.query;
  const result = await LeadService.listLeads({
    search,
    status,
    score_tier,
    page,
    limit,
    user: req.user
  });

  res.status(200).json({
    success: true,
    data: result.leads,
    meta: {
      total: result.total,
      page: result.page,
      limit: result.limit,
      total_pages: result.total_pages
    }
  });
});

export const getLeadById = asyncHandler(async (req, res) => {
  const lead = await LeadService.getLeadById(req.params.id);
  res.status(200).json({
    success: true,
    data: lead
  });
});

export const updateStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const updatedLead = await LeadService.updateStatus(req.params.id, status, req.user?.sub);
  res.status(200).json({
    success: true,
    data: updatedLead
  });
});

export const addNote = asyncHandler(async (req, res) => {
  const { note_text } = req.body;
  const note = await LeadService.addNote(req.params.id, note_text, req.user?.sub);
  res.status(201).json({
    success: true,
    data: note
  });
});
