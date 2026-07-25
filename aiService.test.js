import test from 'node:test';
import assert from 'node:assert/strict';
import { AIService } from '../src/services/aiService.js';

test('AIService — generates sentiment, executive summary, and AI email draft', () => {
  const analysis = AIService.analyzeLead({
    full_name: 'Samantha Ray',
    email: 'samantha@techcorp.io',
    company: 'TechCorp Solutions',
    budget: 50000,
    message: 'Urgent demo request for Enterprise AI implementation.'
  });

  assert.equal(analysis.sentiment, 'Urgent');
  assert.equal(analysis.score_tier, 'Hot');
  assert.ok(analysis.summary.includes('TechCorp Solutions'));
  assert.ok(analysis.ai_email_subject.includes('TechCorp Solutions'));
  assert.ok(analysis.ai_email_body.includes('Hi Samantha'));
});
