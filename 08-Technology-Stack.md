# 08 - Technology Stack

## Table of Contents
1. [Technology Stack Summary](#1-technology-stack-summary)
2. [Frontend Technology Rationale](#2-frontend-technology-rationale)
3. [Backend Technology Rationale](#3-backend-technology-rationale)
4. [Database & Storage Rationale](#4-database--storage-rationale)
5. [Hosting & Infrastructure Rationale](#5-hosting--infrastructure-rationale)
6. [Technology Version Matrix](#6-technology-version-matrix)
7. [Trade-Off Analysis & Alternatives Considered](#7-trade-off-analysis--alternatives-considered)

---

## 1. Technology Stack Summary

**LeadDesk AI CRM** is constructed using a curated, modern JavaScript/TypeScript ecosystem selected specifically for performance, developer velocity, type safety, and seamless enterprise integration.

```mermaid
graph TD
    subgraph Frontend Tier
        R19[React 19]
        Vite[Vite Build Engine]
        TW[Tailwind CSS]
        RR7[React Router v7]
        Axios[Axios HTTP Client]
        RHF[React Hook Form]
        Zod[Zod Schema Validator]
    end

    subgraph Backend Tier
        Node[Node.js Runtime]
        Express[Express.js Web Framework]
        JWT[jsonwebtoken Auth]
        Bcrypt[Bcrypt Hashing]
        ExpVal[Express Validator]
    end

    subgraph Database & Cloud Tier
        Supa[(Supabase PostgreSQL)]
        Vercel[Vercel Frontend Hosting]
        Render[Render Backend Hosting]
        Git[GitHub VCS]
    end

    Frontend Tier --> Backend Tier
    Backend Tier --> Database & Cloud Tier
```

---

## 2. Frontend Technology Rationale

### React 19
* **Why Selected**: Provides the latest concurrency primitives, automatic rendering optimizations, actions, and server component capabilities for building fast, responsive user interfaces.
* **Key Advantage**: Zero-lag filtering of large lead tables with smooth state transitions.

### Vite
* **Why Selected**: Ultra-fast Module Replacement (HMR) and optimized Rollup production bundler.
* **Key Advantage**: Sub-second dev server startup and optimized bundle sizes.

### Tailwind CSS
* **Why Selected**: Utility-first CSS engine enabling rapid, consistent design system implementation without runtime CSS overhead.
* **Key Advantage**: Full visual customization, dark mode support, and tiny production CSS footprint.

### React Hook Form + Zod
* **Why Selected**: Uncontrolled form components minimizing re-renders coupled with composable, type-safe schema validation.
* **Key Advantage**: Instant client-side validation feedback with minimum JavaScript overhead.

---

## 3. Backend Technology Rationale

### Node.js & Express.js
* **Why Selected**: Asynchronous, event-driven I/O model ideally suited for non-blocking HTTP lead ingestion and high-concurrency RESTful APIs.
* **Key Advantage**: Massive ecosystem, lightweight framework, and fast JSON serialization.

### JWT (jsonwebtoken) & Bcrypt
* **Why Selected**: Industry-standard stateless authentication mechanism pairing signed, tamper-proof bearer tokens with 12-round salted Bcrypt password hashes.
* **Key Advantage**: Zero session-database lookups required for route authorization.

### Express Validator
* **Why Selected**: Declarative server-side middleware for sanitizing and validating request parameters before business logic execution.
* **Key Advantage**: Prevents XSS, SQL injection vectors, and malformed payload processing.

---

## 4. Database & Storage Rationale

### Supabase PostgreSQL
* **Why Selected**: Fully managed enterprise PostgreSQL offering rich SQL capabilities, native UUID generation, row-level security (RLS), and high-performance connection pooling via Supavisor.
* **Key Advantage**: 100% standard SQL compliance with zero cloud vendor lock-in.

---

## 5. Hosting & Infrastructure Rationale

* **Vercel**: Edge network static asset delivery optimized specifically for React SPAs.
* **Render**: Cloud application hosting with automatic HTTPS, zero-downtime deploys, and container isolation.
* **GitHub**: Source control, code review workflows, and automated continuous integration pipelines.

---

## 6. Technology Version Matrix

| Layer | Component / Package | Specified Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend** | React | `^19.0.0` | User Interface Library |
| **Frontend** | Vite | `^6.0.0` | Frontend Build Engine |
| **Frontend** | Tailwind CSS | `^3.4.0` / `^4.0.0` | Utility CSS Framework |
| **Frontend** | React Router | `^7.0.0` | Client-side Routing |
| **Frontend** | Axios | `^1.7.0` | Promise HTTP Client |
| **Frontend** | Zod | `^3.23.0` | Schema Validation |
| **Backend** | Node.js | `>=20.0.0` | Server Runtime Engine |
| **Backend** | Express.js | `^4.21.0` | HTTP Web Framework |
| **Backend** | Bcrypt | `^5.1.1` | Salt Password Hashing |
| **Backend** | Jsonwebtoken | `^9.0.2` | JWT Token Management |
| **Database** | Supabase Postgres | PostgreSQL 15+ | Relational Data Store |

---

## 7. Trade-Off Analysis & Alternatives Considered

| Dimension | Chosen Solution | Alternative Evaluated | Trade-Off Rationale |
| :--- | :--- | :--- | :--- |
| **Framework** | Express.js | Next.js App Router | Express provides cleaner API separation for headless multi-client ingestion. |
| **Database** | PostgreSQL | MongoDB | Relational integrity and strict foreign keys are critical for lead audit logs. |
| **Styling** | Tailwind CSS | Styled Components | Tailwind eliminates runtime CSS-in-JS performance bottlenecks. |

---

## Cross-References
* System Architecture: [07-System-Architecture.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/07-System-Architecture.md)
* Database Design: [09-Database-Design.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/09-Database-Design.md)
* Security Design: [17-Security-Design.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/17-Security-Design.md)
* Deployment Architecture: [14-Deployment-Architecture.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/14-Deployment-Architecture.md)
