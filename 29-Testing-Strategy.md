# 29 - Testing Strategy

## Table of Contents
1. [Testing Strategy & Quality Pyramid](#1-testing-strategy--quality-pyramid)
2. [Unit Testing Methodology](#2-unit-testing-methodology)
3. [Integration & API Testing](#3-integration--api-testing)
4. [End-to-End & UI Automation](#4-end-to-end--ui-automation)
5. [Performance & Load Testing](#5-performance--load-testing)
6. [Security & Vulnerability Scanning](#6-security--vulnerability-scanning)
7. [Code Coverage Targets & CI Enforcement](#7-code-coverage-targets--ci-enforcement)

---

## 1. Testing Strategy & Quality Pyramid

**LeadDesk AI CRM** employs a multi-tiered automated testing pyramid designed to ensure functionality, security, performance, and UI reliability before any code enters production.

```mermaid
pyramid
  title Testing Pyramid Architecture
  top E2E & UI Automation (Playwright / Cypress)
  middle Integration & API Testing (Supertest / Vitest)
  bottom Unit Testing (Vitest / React Testing Library)
```

---

## 2. Unit Testing Methodology

* **Scope**: Individual utility functions, AI scoring rules, Zod schemas, Express Validator middleware, React custom hooks.
* **Framework**: `Vitest` (Fast, ESM-native test runner).
* **Mocking**: Isolation of external network calls and database interfaces using Vitest spies and stubs.

---

## 3. Integration & API Testing

* **Scope**: End-to-end Express route handlers, middleware integration, JWT token verification, Supabase database queries.
* **Framework**: `Supertest` + `Vitest`.
* **Database Setup**: Ephemeral PostgreSQL test database seeded and torn down per test run.

```javascript
// Example API Integration Test
import request from 'supertest';
import app from '../src/app.js';

describe('POST /api/v1/leads', () => {
  it('should ingest lead and return 201 Created with score', async () => {
    const res = await request(app)
      .post('/api/v1/leads')
      .send({
        full_name: 'Test Prospect',
        email: 'prospect@acme.com',
        budget: 60000,
        message: 'Requesting enterprise pricing quote'
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.score_tier).toBe('Hot');
  });
});
```

---

## 4. End-to-End & UI Automation

* **Scope**: Complete user journeys (Public Form Submission -> Admin Login -> Dashboard Filter -> Status Update).
* **Framework**: `Playwright` browser automation.

---

## 5. Performance & Load Testing

* **Scope**: System ingestion throughput under concurrent stress.
* **Tool**: `K6` load testing script simulating 500 virtual users submitting leads simultaneously.
* **Pass Threshold**: 95% of API requests completed in $< 200\text{ ms}$ with 0% error rate.

---

## 6. Security & Vulnerability Scanning

* **Dependency Auditing**: Automated `npm audit` and GitHub Dependabot checks.
* **Static Analysis**: ESLint security plugins checking for unhandled promise rejections and unsafe Regex patterns.

---

## 7. Code Coverage Targets & CI Enforcement

| Code Component | Unit Coverage Target | Integration Coverage Target |
| :--- | :--- | :--- |
| **AI Scoring Engine** | 100% | 100% |
| **Express Controllers** | 85% | 90% |
| **Express Middleware** | 95% | 95% |
| **React Components** | 80% | N/A |
| **Overall Codebase** | **> 85%** | **> 85%** |

---

## Cross-References
* Security Design: [17-Security-Design.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/17-Security-Design.md)
* Validation Rules: [18-Validation-Rules.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/18-Validation-Rules.md)
* Test Cases: [30-Test-Cases.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/30-Test-Cases.md)
* Git Workflow: [32-Git-Workflow.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/32-Git-Workflow.md)
