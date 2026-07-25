# 13 - Component Diagram

## Table of Contents
1. [Component Architecture Overview](#1-component-architecture-overview)
2. [Complete Mermaid Component Diagram](#2-complete-mermaid-component-diagram)
3. [Component Breakdown & Dependencies](#3-component-breakdown--dependencies)
4. [Interface Specifications](#4-interface-specifications)

---

## 1. Component Architecture Overview

This document presents the component structural decomposition for **LeadDesk AI CRM**. It highlights the modular boundary definitions, internal dependency graphs, and interface contracts connecting the presentation tier, API application tier, middleware pipeline, business logic services, and external database providers.

---

## 2. Complete Mermaid Component Diagram

```mermaid
graph TB
    subgraph Frontend Subsystem (React 19 SPA)
        [Public Form Component] --> [Zod Client Validator]
        [Dashboard View Component] --> [State Management Hooks]
        [Lead Filter Controls] --> [State Management Hooks]
        [State Management Hooks] --> [Axios API Service]
        [Zod Client Validator] --> [Axios API Service]
    end

    subgraph API Gateway & Middleware Layer (Express.js)
        [Axios API Service] -->|REST over HTTPS| [Express Router]
        [Express Router] --> [Helmet / CORS Security Middleware]
        [Helmet / CORS Security Middleware] --> [Rate Limiter Middleware]
        [Rate Limiter Middleware] --> [Express Validator Middleware]
        [Express Validator Middleware] --> [JWT Auth Guard Middleware]
    end

    subgraph Business Logic Subsystem (Node.js Runtime)
        [JWT Auth Guard Middleware] --> [Lead Controller]
        [JWT Auth Guard Middleware] --> [Auth Controller]
        [Lead Controller] --> [Lead Domain Service]
        [Lead Domain Service] --> [AI Intent Scoring Engine]
        [Lead Domain Service] --> [Audit Logging Service]
    end

    subgraph Data Access & Persistence Tier (Supabase)
        [Lead Domain Service] --> [Supabase Repository Layer]
        [Audit Logging Service] --> [Supabase Repository Layer]
        [Auth Controller] --> [Supabase Repository Layer]
        [Supabase Repository Layer] -->|Supavisor Connection Pooler| [(Supabase PostgreSQL)]
    end
```

---

## 3. Component Breakdown & Dependencies

### 1. Presentation Tier Components:
* **Public Form Component**: Renders accessible lead ingestion inputs, binding client validation via `Zod`.
* **Dashboard View Component**: Interactive lead queue data table with optimistic status transitions and sorting.
* **Axios API Service**: Centralized API abstraction configured with base URL, timeout thresholds, and request/response interceptors.

### 2. API & Middleware Components:
* **Express Router**: Maps endpoint URIs (`/api/v1/...`) to corresponding middleware stacks and controller functions.
* **Security & Auth Middleware Stack**: Enforces CORS whitelist policies, request rate quotas, input sanitization, and JWT signature verification.

### 3. Business Service Components:
* **Lead Domain Service**: Implements lead pipeline state machines, status transition rules, and query pagination algorithms.
* **AI Intent Scoring Engine**: Encapsulates scoring rules, budget evaluation, and score tier assignments.
* **Audit Logging Service**: Emits structured JSON events to record system activities.

---

## 4. Interface Specifications

```typescript
// Interface: Lead Repository Contract
interface ILeadRepository {
  createLead(data: CreateLeadDTO): Promise<LeadRecord>;
  findLeads(query: LeadQueryFilter): Promise<{ leads: LeadRecord[]; total: number }>;
  findById(id: string): Promise<LeadRecord | null>;
  updateStatus(id: string, status: LeadStatus): Promise<LeadRecord>;
}

// Interface: AI Scoring Engine Contract
interface IScoringEngine {
  evaluateLead(budget: number, email: string, message: string): { score: number; tier: 'Hot' | 'Warm' | 'Cold' };
}
```

---

## Cross-References
* System Architecture: [07-System-Architecture.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/07-System-Architecture.md)
* Class Diagram: [11-Class-Diagram.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/11-Class-Diagram.md)
* Deployment Architecture: [14-Deployment-Architecture.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/14-Deployment-Architecture.md)
* Backend Architecture: [21-Backend-Architecture.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/21-Backend-Architecture.md)
