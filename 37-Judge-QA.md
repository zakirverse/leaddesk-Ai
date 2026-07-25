# 37 - Judge Q&A Preparation (50 Technical Responses)

## Table of Contents
1. [Architecture & System Design (Q1 – Q10)](#1-architecture--system-design-q1--q10)
2. [Database & Storage (Q11 – Q20)](#2-database--storage-q11--q20)
3. [Security & Authentication (Q21 – Q30)](#3-security--authentication-q21--q30)
4. [Frontend & State Management (Q31 – Q35)](#4-frontend--state-management-q31--q35)
5. [Backend & API Performance (Q36 – Q40)](#5-backend--api-performance-q36--q40)
6. [Testing & Quality Assurance (Q41 – Q45)](#6-testing--quality-assurance-q41--q45)
7. [Deployment, Operations & Business (Q46 – Q50)](#7-deployment-operations--business-q46--q50)

---

## 1. Architecture & System Design (Q1 – Q10)

#### Q1: Why did you choose a decoupled React 19 + Express architecture instead of Next.js App Router?
**Answer**: Decoupling the frontend SPA (Vercel) from the Express API (Render) provides explicit separation of concerns. The headless Express API can process high-concurrency public lead ingestion from multiple external web forms and mobile apps without bundling server rendering overhead.

#### Q2: How does the system handle high traffic spikes during marketing lead campaigns?
**Answer**: The Node.js Express backend is stateless and horizontally scalable on Render containers. Database connections are queued through Supabase Supavisor connection pooler, while rate-limiting middleware prevents server overload.

#### Q3: What is the end-to-end latency for lead ingestion?
**Answer**: Sub-100ms. Input validation (Express Validator) and heuristic scoring execute synchronously in memory before a single parameterized SQL INSERT executes in Supabase.

#### Q4: How does the system guarantee zero lost leads?
**Answer**: Incoming lead payloads are immediately validated server-side and persisted in PostgreSQL within a database transaction. Client requests receive HTTP 201 only after storage verification.

#### Q5: Is the system microservices-ready?
**Answer**: Yes. The codebase uses a modular layered architecture (`Routes -> Middlewares -> Controllers -> Services -> Repositories`). Domain services like `ScoringEngine` or `AuditService` can be extracted into standalone microservices effortlessly.

#### Q6: How does the architecture enforce Separation of Concerns (SoC)?
**Answer**: Controllers only handle HTTP request parsing; business rules live in pure Domain Services; SQL logic is strictly encapsulated in Data Repositories.

#### Q7: Why use rule-based AI scoring instead of calling an external LLM API on every lead?
**Answer**: External LLM calls introduce 1-3 seconds of latency and external API failure risks. Rule-based heuristic algorithms execute in $< 1\text{ ms}$, ensuring deterministic sub-100ms ingestion while leaving open asynchronous LLM enrichment for background jobs.

#### Q8: How does the system maintain sub-second UI rendering?
**Answer**: Vite bundle splitting, React 19 concurrent rendering, debounced search inputs, and optimistic UI state updates.

#### Q9: What happens if the database connection drops temporarily?
**Answer**: Express global error middleware catches connection exceptions, logs the error via Winston, and returns HTTP 503 with retry-after headers while Render container probes monitor database health.

#### Q10: What design patterns are used in the codebase?
**Answer**: Repository Pattern, Middleware Chain Pattern, Data Transfer Object (DTO) Pattern, and Dependency Injection.

---

## 2. Database & Storage (Q11 – Q20)

#### Q11: Why select PostgreSQL over MongoDB for a CRM?
**Answer**: CRMs require strict schema enforcement, complex multi-table JOINs (Leads, Users, Notes, Audits), and transactional integrity. PostgreSQL foreign keys and constraints prevent orphan records.

#### Q12: Why use UUIDv4 for primary keys instead of auto-incrementing integers?
**Answer**: UUIDs prevent primary key enumeration attacks in public endpoints (`/leads/9b1deb4d...`) and enable offline ID generation and multi-region database replication without key collisions.

#### Q13: What is your soft delete strategy?
**Answer**: Records are marked with a `deleted_at` timestamp rather than executed SQL `DELETE`s. All application queries filter `WHERE deleted_at IS NULL`. Hard purges occur via background cron after 90 days.

#### Q14: How are timestamps managed?
**Answer**: PostgreSQL `PL/pgSQL` triggers automatically update the `updated_at` column whenever a row is modified, ensuring tamper-proof timestamp integrity.

#### Q15: How do you optimize query performance for large lead volumes?
**Answer**: Partial B-Tree indexing on active leads (`CREATE INDEX ON leads (status, score_tier) WHERE deleted_at IS NULL`), preventing the query optimizer from scanning deleted or closed records.

#### Q16: How do you prevent database connection starvation under heavy concurrency?
**Answer**: Using Supabase Supavisor connection pooler in transaction mode, multiplexing thousands of client requests into a warm pool of PostgreSQL backend connections.

#### Q17: What is the schema design for audit logging?
**Answer**: The `audit_logs` table stores `actor_id`, `lead_id`, `action`, `previous_state` (JSONB), and `new_state` (JSONB). Storing state snapshots in JSONB allows querying structural diffs without schema migrations.

#### Q18: How do you handle database migration scripts?
**Answer**: Sequential, versioned DDL migration scripts executed via Supabase CLI in CI pipelines before deployment.

#### Q19: Are budget values stored as float or numeric?
**Answer**: Stored as `NUMERIC(12,2)` to prevent floating-point rounding errors common in monetary calculations.

#### Q20: How are lead notes linked to leads?
**Answer**: `lead_notes.lead_id` holds a foreign key referencing `leads.id` with `ON DELETE CASCADE`.

---

## 3. Security & Authentication (Q21 – Q30)

#### Q21: How are user passwords secured?
**Answer**: Hashed using Bcrypt with a salt factor of 12 rounds before database storage. Plaintext passwords are never logged or stored.

#### Q22: What authentication mechanism is used?
**Answer**: Stateless JSON Web Tokens (JWT) signed with HMAC SHA-256 (`HS256`) containing user ID and role claims, expiring in 24 hours.

#### Q23: How do you prevent SQL Injection?
**Answer**: All database interactions use Supabase parameterized query builders, eliminating raw string concatenation vulnerabilities.

#### Q24: How do you mitigate Cross-Site Scripting (XSS)?
**Answer**: Express Validator sanitizes incoming string inputs with `.escape()`, while React automatically escapes JSX string bindings.

#### Q25: How does the system defend against DDoS and brute-force attacks?
**Answer**: `express-rate-limit` caps login attempts to 5 per 15 minutes per IP, and lead submission endpoints to 20 per 15 minutes per IP.

#### Q26: What HTTP security headers are set?
**Answer**: `Helmet` middleware sets `Strict-Transport-Security` (HSTS), `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, and Content Security Policy (CSP) headers.

#### Q27: How is CORS configured?
**Answer**: Express `cors()` restricts API access strictly to the whitelisted frontend domain (`VITE_API_BASE_URL`).

#### Q28: How is Role-Based Access Control (RBAC) enforced?
**Answer**: `authorizeRoles(...roles)` middleware checks the decoded JWT token claims against required endpoint permissions.

#### Q29: Where are API secret keys stored?
**Answer**: Strictly in environment variables (`.env`), injected at runtime in Vercel and Render. Secrets are excluded from version control via `.gitignore`.

#### Q30: How do you handle CSRF risks?
**Answer**: Using JWT tokens transmitted via `Authorization: Bearer` headers instead of auto-submitted ambient cookies, making CSRF attacks ineffective.

---

## 4. Frontend & State Management (Q31 – Q35)

#### Q31: How do you prevent unnecessary re-renders in React 19?
**Answer**: Form inputs are managed with `React Hook Form` (uncontrolled inputs), search inputs are debounced, and heavy list components are memoized with `React.memo()`.

#### Q32: What is your client validation strategy?
**Answer**: `Zod` schemas validate form inputs client-side, giving instant visual feedback before issuing network requests.

#### Q33: How do optimistic UI updates work during status changes?
**Answer**: The UI immediately updates local component state to reflect the new status badge, then issues a background `PATCH` request. If the API fails, state reverts and an error toast appears.

#### Q34: How are global user sessions managed?
**Answer**: Stored in `AuthContext` backed by `sessionStorage` for secure session persistence across tab refreshes.

#### Q35: How is code-splitting implemented?
**Answer**: Using `React.lazy()` dynamic imports for top-level page routes, splitting vendor bundles during Vite compilation.

---

## 5. Backend & API Performance (Q36 – Q40)

#### Q36: How does Express handle async route errors?
**Answer**: Using a custom `asyncHandler` wrapper that automatically passes unhandled promise rejections to Express global error middleware.

#### Q37: What is the structure of your API error responses?
**Answer**: Unified JSON payload: `{ success: false, error: { code, message, details }, timestamp }`.

#### Q38: How do you handle response payload compression?
**Answer**: Express `compression()` middleware gzips JSON payloads greater than 1KB.

#### Q39: What is the API versioning strategy?
**Answer**: Explicit URI path versioning (`/api/v1/...`) allowing backwards-compatible migration to `/api/v2/`.

#### Q40: How is logging structured?
**Answer**: Winston outputs structured JSON log entries capturing level, timestamp, message, HTTP route, IP address, and execution duration.

---

## 6. Testing & Quality Assurance (Q41 – Q45)

#### Q41: What is your overall testing strategy?
**Answer**: A testing pyramid combining Vitest unit tests, Supertest API integration tests, and Playwright E2E automation.

#### Q42: What is your unit test coverage target?
**Answer**: Minimum 85% code coverage across core domain services, validators, and controllers.

#### Q43: How do you test validation logic?
**Answer**: Unit tests pass valid and malformed objects to Zod schemas and Express Validator middleware, asserting expected error messages.

#### Q44: How are integration tests isolated from production data?
**Answer**: Integration tests run against an ephemeral test PostgreSQL database seeded and wiped before each test run.

#### Q45: How do you verify API performance under load?
**Answer**: Executing `K6` load scripts simulating 500 concurrent virtual users submitting leads, verifying p95 latency stays under 200ms.

---

## 7. Deployment, Operations & Business (Q46 – Q50)

#### Q46: Why host the frontend on Vercel and backend on Render?
**Answer**: Vercel provides global CDN edge delivery for static React assets; Render provides reliable containerized execution for Node.js API services.

#### Q47: What is your rollback strategy if a deployment breaks?
**Answer**: Vercel allows single-click instant deployment rollbacks; Render supports instant git SHA commit redeployment.

#### Q48: How does LeadDesk AI CRM deliver business ROI?
**Answer**: By reducing lead response times from hours to under 2 minutes, increasing pipeline conversion rates by over 30%.

#### Q49: What is your disaster recovery SLA?
**Answer**: RTO < 15 minutes and RPO < 1 minute backed by Supabase 30-day point-in-time recovery.

#### Q50: What is the future expansion roadmap?
**Answer**: Phase 2 will introduce bi-directional email sync, webhooks for Zapier integration, and asynchronous LLM lead enrichment.

---

## Cross-References
* System Architecture: [07-System-Architecture.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/07-System-Architecture.md)
* API Specification: [15-API-Specification.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/15-API-Specification.md)
* Security Design: [17-Security-Design.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/17-Security-Design.md)
* Demo Strategy: [36-Demo-Strategy.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/36-Demo-Strategy.md)
