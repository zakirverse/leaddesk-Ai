import { inMemoryDB } from '../config/db.js';
import { run, query, getOne } from '../config/sqliteDb.js';
import { ScoringEngine } from './scoringEngine.js';
import { AIService } from './aiService.js';
import { AuditService } from './auditService.js';
import { NotFoundError, ValidationError } from '../utils/errors.js';
import { v4 as uuidv4 } from 'uuid';

export class LeadService {
  static async createLead(leadData) {
    const aiAnalysis = AIService.analyzeLead(leadData);

    const newLead = {
      id: uuidv4(),
      full_name: leadData.full_name,
      email: leadData.email,
      phone: leadData.phone || '',
      company: leadData.company || '',
      budget: Number(leadData.budget) || 0,
      message: leadData.message,
      status: 'New',
      score_value: aiAnalysis.score_value,
      score_tier: aiAnalysis.score_tier,
      sentiment: aiAnalysis.sentiment,
      summary: aiAnalysis.summary,
      ai_email_subject: aiAnalysis.ai_email_subject,
      ai_email_body: aiAnalysis.ai_email_body,
      assigned_to: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null
    };

    try {
      await run(`
        INSERT INTO leads (id, full_name, email, phone, company, budget, message, status, score_value, score_tier, sentiment, summary, ai_email_subject, ai_email_body, assigned_to, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        newLead.id, newLead.full_name, newLead.email, newLead.phone, newLead.company,
        newLead.budget, newLead.message, newLead.status, newLead.score_value,
        newLead.score_tier, newLead.sentiment, newLead.summary, newLead.ai_email_subject,
        newLead.ai_email_body, newLead.assigned_to, newLead.created_at, newLead.updated_at
      ]);
    } catch (e) {
      console.warn('[DB] SQLite insert fallback to inMemoryDB:', e.message);
    }

    inMemoryDB.leads.unshift(newLead);
    await AuditService.log({ action: 'LEAD_CREATED', lead_id: newLead.id, new_state: newLead });

    return newLead;
  }

  static async listLeads({ search, status, score_tier, page = 1, limit = 10, user }) {
    let result = [];
    try {
      result = await query(`SELECT * FROM leads WHERE deleted_at IS NULL ORDER BY created_at DESC`);
    } catch (e) {
      result = inMemoryDB.leads.filter(l => !l.deleted_at);
    }

    if (!result || result.length === 0) {
      result = inMemoryDB.leads.filter(l => !l.deleted_at);
    }

    // Search filter
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(l => 
        l.full_name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        (l.company && l.company.toLowerCase().includes(q))
      );
    }

    // Status filter
    if (status && status !== 'All') {
      result = result.filter(l => l.status === status);
    }

    // Tier filter
    if (score_tier && score_tier !== 'All') {
      result = result.filter(l => l.score_tier === score_tier);
    }

    // Role isolation
    if (user && user.role === 'sales_rep') {
      result = result.filter(l => !l.assigned_to || l.assigned_to === user.id);
    }

    const total = result.length;
    const startIndex = (page - 1) * limit;
    const paginatedLeads = result.slice(startIndex, startIndex + Number(limit));

    return {
      leads: paginatedLeads,
      total,
      page: Number(page),
      limit: Number(limit),
      total_pages: Math.ceil(total / limit)
    };
  }

  static async getLeadById(id) {
    let lead = null;
    try {
      lead = await getOne(`SELECT * FROM leads WHERE id = ? AND deleted_at IS NULL`, [id]);
    } catch (e) {
      lead = inMemoryDB.leads.find(l => l.id === id && !l.deleted_at);
    }

    if (!lead) lead = inMemoryDB.leads.find(l => l.id === id && !l.deleted_at);
    if (!lead) throw new NotFoundError(`Lead with ID ${id} not found`);

    let notes = [];
    try {
      notes = await query(`SELECT * FROM lead_notes WHERE lead_id = ?`, [id]);
    } catch (e) {
      notes = inMemoryDB.notes.filter(n => n.lead_id === id);
    }

    return { ...lead, notes };
  }

  static async updateStatus(id, newStatus, actorId) {
    let lead = await this.getLeadById(id);
    if (!lead) throw new NotFoundError(`Lead with ID ${id} not found`);

    const validStatuses = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed Won', 'Closed Lost'];
    if (!validStatuses.includes(newStatus)) {
      throw new ValidationError(`Invalid status '${newStatus}'`);
    }

    // State machine rule: Closed Won/Lost cannot revert to New
    if (['Closed Won', 'Closed Lost'].includes(lead.status) && newStatus === 'New') {
      throw new ValidationError(`Cannot revert terminal status '${lead.status}' back to 'New'`);
    }

    const previousState = { ...lead };
    lead.status = newStatus;
    lead.updated_at = new Date().toISOString();

    try {
      await run(`UPDATE leads SET status = ?, updated_at = ? WHERE id = ?`, [newStatus, lead.updated_at, id]);
    } catch (e) {
      console.warn('[DB] SQLite update fallback:', e.message);
    }

    const memoryMatch = inMemoryDB.leads.find(l => l.id === id);
    if (memoryMatch) memoryMatch.status = newStatus;

    await AuditService.log({
      actor_id: actorId,
      lead_id: lead.id,
      action: 'STATUS_UPDATED',
      previous_state: { status: previousState.status },
      new_state: { status: lead.status }
    });

    return lead;
  }

  static async addNote(leadId, noteText, authorId) {
    const lead = await this.getLeadById(leadId);
    if (!lead) throw new NotFoundError(`Lead with ID ${leadId} not found`);

    const newNote = {
      id: uuidv4(),
      lead_id: leadId,
      author_id: authorId,
      note_text: noteText,
      created_at: new Date().toISOString()
    };

    try {
      await run(`INSERT INTO lead_notes (id, lead_id, author_id, note_text, created_at) VALUES (?, ?, ?, ?, ?)`, [
        newNote.id, newNote.lead_id, newNote.author_id, newNote.note_text, newNote.created_at
      ]);
    } catch (e) {
      console.warn('[DB] SQLite note insert fallback:', e.message);
    }

    inMemoryDB.notes.push(newNote);
    await AuditService.log({ actor_id: authorId, lead_id: leadId, action: 'NOTE_ADDED', new_state: newNote });

    return newNote;
  }
}

