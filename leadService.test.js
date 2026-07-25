import test from 'node:test';
import assert from 'node:assert/strict';
import { LeadService } from '../src/services/leadService.js';

test('LeadService — creates a new lead and calculates AI intent score', async () => {
  const newLead = await LeadService.createLead({
    full_name: 'David Miller',
    email: 'david@globalfintech.com',
    company: 'Global Fintech',
    budget: 100000,
    message: 'Need enterprise AI lead management implementation.'
  });

  assert.ok(newLead.id);
  assert.equal(newLead.full_name, 'David Miller');
  assert.equal(newLead.score_tier, 'Hot');
  assert.ok(newLead.summary);
  assert.ok(newLead.ai_email_body);
});

test('LeadService — listLeads supports filtering and pagination', async () => {
  const listResult = await LeadService.listLeads({ status: 'All', page: 1, limit: 5 });
  assert.ok(Array.isArray(listResult.leads));
  assert.ok(listResult.total >= 1);
});

test('LeadService — state machine prevents reverting terminal Closed Won back to New', async () => {
  const lead = await LeadService.createLead({
    full_name: 'Test Lead',
    email: 'test@company.com',
    company: 'Test Co',
    budget: 20000,
    message: 'Testing state machine'
  });

  await LeadService.updateStatus(lead.id, 'Closed Won', 'admin-id');

  await assert.rejects(
    async () => {
      await LeadService.updateStatus(lead.id, 'New', 'admin-id');
    },
    { message: "Cannot revert terminal status 'Closed Won' back to 'New'" }
  );
});
