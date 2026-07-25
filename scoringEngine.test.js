import test from 'node:test';
import assert from 'node:assert/strict';
import { ScoringEngine } from '../src/services/scoringEngine.js';

test('ScoringEngine — High Intent Enterprise Lead gets Hot tier (score >= 70)', () => {
  const result = ScoringEngine.evaluateLead({
    budget: 75000,
    email: 'vp.sales@enterprise.com',
    message: 'We need an enterprise CRM demo and contract details for our team.'
  });

  assert.equal(result.tier, 'Hot');
  assert.ok(result.score >= 70, `Expected score >= 70, got ${result.score}`);
});

test('ScoringEngine — Low budget and generic domain gets Cold tier', () => {
  const result = ScoringEngine.evaluateLead({
    budget: 2000,
    email: 'user@gmail.com',
    message: 'Just looking around.'
  });

  assert.equal(result.tier, 'Cold');
  assert.ok(result.score < 40, `Expected score < 40, got ${result.score}`);
});

test('ScoringEngine — Mid-tier lead gets Warm tier', () => {
  const result = ScoringEngine.evaluateLead({
    budget: 15000,
    email: 'contact@midsizecompany.com',
    message: 'Inquiring about product features.'
  });

  assert.equal(result.tier, 'Warm');
  assert.ok(result.score >= 40 && result.score < 70);
});
