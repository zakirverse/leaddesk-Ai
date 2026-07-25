# 30 - Test Cases

## Table of Contents
1. [Test Execution Suite Overview](#1-test-execution-suite-overview)
2. [Module 1: Authentication & Authorization Test Cases](#2-module-1-authentication--authorization-test-cases)
3. [Module 2: Inbound Lead Ingestion & Validation Test Cases](#3-module-2-inbound-lead-ingestion--validation-test-cases)
4. [Module 3: AI Scoring Engine Test Cases](#4-module-3-ai-scoring-engine-test-cases)
5. [Module 4: Lead Pipeline & Status Transition Test Cases](#5-module-4-lead-pipeline--status-transition-test-cases)
6. [Module 5: Security & Vulnerability Test Cases](#6-module-5-security--vulnerability-test-cases)

---

## 1. Test Execution Suite Overview

This document presents 25 structured test cases spanning functional, security, performance, and validation boundaries for **LeadDesk AI CRM**.

---

## 2. Module 1: Authentication & Authorization Test Cases

| Test ID | Scenario | Preconditions | Input Data | Expected Result | Type |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-AUTH-01** | Valid User Login | Active user exists in database | `email: "sarah.rep@leaddesk.io"`, `password: "Password123!"` | HTTP 200 OK, returns signed JWT token & user object | Automated Integration |
| **TC-AUTH-02** | Invalid Password Attempt | Active user exists | `email: "sarah.rep@leaddesk.io"`, `password: "WrongPassword"` | HTTP 401 Unauthorized, returns "Invalid credentials" error | Automated Integration |
| **TC-AUTH-03** | Access Protected Route Without Token | None | `GET /api/v1/leads` with missing Authorization header | HTTP 401 Unauthorized, returns "Token required" error | Automated Integration |
| **TC-AUTH-04** | Access Admin Endpoint with Sales Rep Role | Logged in as Sales Rep | `GET /api/v1/analytics/dashboard` with Rep JWT | HTTP 403 Forbidden, returns "Insufficient permissions" error | Automated Integration |
| **TC-AUTH-05** | Expired JWT Token Handling | Expired token generated | Request using token expired > 24 hours | HTTP 401 Unauthorized, client redirects to `/login` | Automated Integration |

---

## 3. Module 2: Inbound Lead Ingestion & Validation Test Cases

| Test ID | Scenario | Preconditions | Input Data | Expected Result | Type |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-ING-01** | Valid Public Form Submission | None | `name: "Alice"`, `email: "alice@acme.com"`, `budget: 60000`, `message: "Request demo"` | HTTP 201 Created, returns lead ID & calculated score | Automated Integration |
| **TC-ING-02** | Invalid Email Format | None | `email: "invalid-email-format"` | HTTP 400 Bad Request, returns inline field validation error | Automated Unit |
| **TC-ING-03** | Negative Budget Input | None | `budget: -500` | HTTP 400 Bad Request, error "Budget cannot be negative" | Automated Unit |
| **TC-ING-04** | Short Message Body | None | `message: "Hi"` (2 chars) | HTTP 400 Bad Request, error "Message must be at least 10 chars" | Automated Unit |
| **TC-ING-05** | Malicious XSS Script Injected | None | `name: "<script>alert('xss')</script>"` | HTTP 201 Created, script tags sanitized to HTML entities | Automated Integration |

---

## 4. Module 3: AI Scoring Engine Test Cases

| Test ID | Scenario | Preconditions | Input Data | Expected Result | Type |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-SCORE-01**| High Intent Corporate Lead | None | Budget: $75,000, Domain: `@acmecorp.com`, Keywords: "Enterprise" | Calculated Score: 95, Assigned Tier: `Hot` | Automated Unit |
| **TC-SCORE-02**| Medium Intent Lead | None | Budget: $25,000, Domain: `@gmail.com`, Keywords: "Pricing" | Calculated Score: 55, Assigned Tier: `Warm` | Automated Unit |
| **TC-SCORE-03**| Low Intent Consumer Lead | None | Budget: $2,000, Domain: `@yahoo.com`, Keywords: "Question" | Calculated Score: 25, Assigned Tier: `Cold` | Automated Unit |

---

## 5. Module 4: Lead Pipeline & Status Transition Test Cases

| Test ID | Scenario | Preconditions | Input Data | Expected Result | Type |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-PIPE-01** | Valid Status Update to Contacted | Lead exists with status `New` | `PATCH /api/v1/leads/:id/status` `{ status: "Contacted" }` | HTTP 200 OK, status updated, audit log entry created | Automated Integration |
| **TC-PIPE-02** | Invalid Status Transition | Lead status is `Closed Won` | Attempt to change status to `New` | HTTP 400 Bad Request, state transition rule violated | Automated Integration |

---

## 6. Module 5: Security & Vulnerability Test Cases

| Test ID | Scenario | Preconditions | Input Data | Expected Result | Type |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-SEC-01** | SQL Injection Attempt | None | `email: "' OR '1'='1"` | Input escaped, query executes safely returning zero matches | Automated Security |
| **TC-SEC-02** | Rate Limiting Trigger | None | Dispatch 25 requests in 1 minute from single IP | HTTP 429 Too Many Requests, blocked until window resets | Automated Security |

---

## Cross-References
* API Specification: [15-API-Specification.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/15-API-Specification.md)
* Business Rules: [19-Business-Rules.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/19-Business-Rules.md)
* Testing Strategy: [29-Testing-Strategy.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/29-Testing-Strategy.md)
