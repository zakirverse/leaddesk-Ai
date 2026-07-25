# Master Documentation Index — LeadDesk AI CRM

Welcome to the official Enterprise Documentation Suite for **LeadDesk AI CRM**. This master index provides a structured, cross-referenced sitemap linking all 37 technical specification documents categorized by domain.

---

## 📌 Executive & Product Context
* [01-Executive-Summary.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/01-Executive-Summary.md) — High-level vision, key differentiators, and strategic ROI.
* [02-Problem-Statement.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/02-Problem-Statement.md) — Operational pain points, latency bottlenecks, and financial impact.
* [03-Business-Requirements.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/03-Business-Requirements.md) — Business goals, stakeholder analysis matrix, and compliance.
* [04-Product-Requirements-Document.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/04-Product-Requirements-Document.md) — Personas, user stories (Gherkin), scope boundaries, roadmap.
* [05-Functional-Requirements.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/05-Functional-Requirements.md) — Detailed module specifications across 6 functional areas.
* [06-NonFunctional-Requirements.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/06-NonFunctional-Requirements.md) — Performance SLAs, availability targets, scalability benchmarks.

---

## 🏛️ System Architecture & Diagrams
* [07-System-Architecture.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/07-System-Architecture.md) — High & low-level architecture, end-to-end request lifecycle.
* [08-Technology-Stack.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/08-Technology-Stack.md) — Rationale, version matrix, trade-off analysis for React 19, Express, Supabase.
* [09-Database-Design.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/09-Database-Design.md) — Supabase PostgreSQL DDL, tables, constraints, triggers, indexes.
* [10-ER-Diagram.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/10-ER-Diagram.md) — Complete Mermaid ER diagram & relational dictionary.
* [11-Class-Diagram.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/11-Class-Diagram.md) — Complete UML Class diagram mapping client, API, services, and repos.
* [12-Sequence-Diagrams.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/12-Sequence-Diagrams.md) — 7 sequence diagrams (Login, Ingestion, Search, Status, Logout, Guards, Lifecycle).
* [13-Component-Diagram.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/13-Component-Diagram.md) — Modular component decomposition & interface specifications.
* [14-Deployment-Architecture.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/14-Deployment-Architecture.md) — Infrastructure topology across Vercel, Render, and Supabase.

---

## 🔌 API & Security Specification
* [15-API-Specification.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/15-API-Specification.md) — RESTful endpoint documentation with request/response JSONs.
* [16-Authentication-Authorization.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/16-Authentication-Authorization.md) — JWT architecture, Bcrypt salt policy, and RBAC matrix.
* [17-Security-Design.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/17-Security-Design.md) — OWASP Top 10 mitigation mapping, Helmet headers, CORS, rate limits.
* [18-Validation-Rules.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/18-Validation-Rules.md) — Field validation matrix, Zod client schemas, Express Validator specs.
* [19-Business-Rules.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/19-Business-Rules.md) — State machine rules, AI scoring matrices, deduplication algorithms.

---

## 🎨 Software Engineering & UI Design
* [20-Frontend-Architecture.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/20-Frontend-Architecture.md) — React 19 structure, routing, Axios client, code splitting.
* [21-Backend-Architecture.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/21-Backend-Architecture.md) — Layered Express application pattern, service/repo logic, error handling.
* [22-Design-System.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/22-Design-System.md) — Palette tokens, typography, spacing, component tokens, accessibility.
* [23-UI-UX-Guidelines.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/23-UI-UX-Guidelines.md) — Dashboard wireframes, micro-interactions, responsive breakpoints.
* [24-Folder-Structure.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/24-Folder-Structure.md) — Complete repository file tree taxonomy for `/frontend` and `/backend`.
* [25-State-Management.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/25-State-Management.md) — State taxonomy (Context API, React Hook Form, Custom Hooks, Optimistic UI).
* [26-Error-Handling.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/26-Error-Handling.md) — Custom AppError hierarchy, Express error middleware, React Error Boundaries.
* [27-Logging-Monitoring.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/27-Logging-Monitoring.md) — Telemetry, Winston JSON logger, Morgan HTTP logging, audit emissions.
* [28-Performance-Optimization.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/28-Performance-Optimization.md) — Asset purging, DB query indexes, compression, caching strategies.

---

## 🧪 QA, Operations & Developer Guides
* [29-Testing-Strategy.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/29-Testing-Strategy.md) — Testing pyramid (Vitest, Supertest, Playwright), coverage targets.
* [30-Test-Cases.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/30-Test-Cases.md) — 25 structured test cases across Auth, Ingestion, Scoring, Pipeline, Security.
* [31-Implementation-Plan.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/31-Implementation-Plan.md) — Multi-phase implementation roadmap with Gantt chart timeline.
* [32-Git-Workflow.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/32-Git-Workflow.md) — GitFlow variant, Conventional Commits, PR review checklist, semver rules.
* [33-Deployment-Guide.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/33-Deployment-Guide.md) — Step-by-step rollout for Supabase, Render, Vercel with env matrix.
* [34-Developer-Handbook.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/34-Developer-Handbook.md) — Onboarding guide, environment setup, coding standards, troubleshooting.
* [35-README.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/35-README.md) — Master repository README with setup scripts, badges, feature highlights.
* [36-Demo-Strategy.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/36-Demo-Strategy.md) — 5-minute hackathon demo script, minute-by-minute timeline, contingency plan.
* [37-Judge-QA.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/37-Judge-QA.md) — 50 technical Q&As covering architecture, security, database, performance.
