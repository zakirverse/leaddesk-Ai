# 28 - Performance Optimization

## Table of Contents
1. [Performance Optimization Overview](#1-performance-optimization-overview)
2. [Frontend Bundle & Asset Minimization](#2-frontend-bundle--asset-minimization)
3. [React Rendering Optimization](#3-react-rendering-optimization)
4. [Backend Node.js API Optimizations](#4-backend-nodejs-api-optimizations)
5. [Database Query & Index Optimization](#5-database-query--index-optimization)
6. [Network & Cache Strategy](#6-network--cache-strategy)

---

## 1. Performance Optimization Overview

**LeadDesk AI CRM** enforces strict performance budgets across client assets, network transport, server execution, and database queries to ensure sub-200ms API responses and sub-1.5s initial page loads.

```mermaid
graph TD
    subgraph Frontend Optimizations
        ViteChunk[Vite Code Splitting]
        ReactMemo[React.memo & useCallback]
        PurgeCSS[Tailwind CSS Purging]
    end

    subgraph Backend & DB Optimizations
        Compression[Express Response Compression]
        KeepAlive[HTTP Keep-Alive Connections]
        BTreeIndex[PostgreSQL Partial B-Tree Indexes]
        ConnectionPool[Supavisor Connection Pooler]
    end

    Frontend Optimizations --> Speed[Sub-1.5s LCP & Sub-50ms UI Interactions]
    Backend & DB Optimizations --> Speed
```

---

## 2. Frontend Bundle & Asset Minimization

* **Tree-Shaking with Vite**: Unused code is automatically purged during compilation.
* **Vendor Chunk Separation**: Vite configuration isolates vendor libraries (`react`, `axios`, `lucide-react`) into separate long-term cached assets.
* **Gzip / Brotli Compression**: Production static assets compressed via Vercel edge CDN.

---

## 3. React Rendering Optimization

* **Memoized Components**: Heavy table row rendering wrapped in `React.memo()`.
* **Debounced Inputs**: Search bar keystrokes debounced by 300ms using custom `useDebounce` hook to avoid spamming the backend API.
* **Uncontrolled Forms**: `React Hook Form` handles form inputs without triggering component re-renders per keypress.

---

## 4. Backend Node.js API Optimizations

* **Compression Middleware**: Express uses `compression()` middleware to gzip JSON response payloads exceeding 1KB.
* **Stateless JWT Authorization**: Avoids database lookups on every request by validating JWT signatures in memory.

---

## 5. Database Query & Index Optimization

```sql
-- Partial B-Tree Index for Active Lead Filtering
CREATE INDEX idx_leads_active_filter ON leads (status, score_tier) WHERE deleted_at IS NULL;

-- Search Optimization Index
CREATE INDEX idx_leads_search_name ON leads USING gin(to_tsvector('english', full_name || ' ' || company));
```

---

## 6. Network & Cache Strategy

* **Cache-Control Headers**: Static assets served from Vercel edge with `Cache-Control: public, max-age=31536000, immutable`.
* **Connection Pooling**: Supabase Supavisor maintains a warm pool of database client connections, eliminating TCP handshake overhead.

---

## Cross-References
* Tech Stack: [08-Technology-Stack.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/08-Technology-Stack.md)
* Database Design: [09-Database-Design.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/09-Database-Design.md)
* Frontend Architecture: [20-Frontend-Architecture.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/20-Frontend-Architecture.md)
* Backend Architecture: [21-Backend-Architecture.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/21-Backend-Architecture.md)
