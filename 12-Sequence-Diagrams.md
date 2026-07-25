# 12 - Sequence Diagrams

## Table of Contents
1. [Sequence Diagrams Overview](#1-sequence-diagrams-overview)
2. [Diagram 1: User Login & Authentication](#2-diagram-1-user-login--authentication)
3. [Diagram 2: Public Lead Submission & Automated Scoring](#3-diagram-2-public-lead-submission--automated-scoring)
4. [Diagram 3: Lead Search & Multi-Filter Execution](#4-diagram-3-lead-search--multi-filter-execution)
5. [Diagram 4: Lead Status Transition & Audit Emission](#5-diagram-4-lead-status-transition--audit-emission)
6. [Diagram 5: User Logout & Session Invalidation](#6-diagram-5-user-logout--session-invalidation)
7. [Diagram 6: Middleware Auth Guard & RBAC Authorization](#7-diagram-6-middleware-auth-guard--rbac-authorization)
8. [Diagram 7: End-to-End API Request Lifecycle](#8-diagram-7-end-to-end-api-request-lifecycle)

---

## 1. Sequence Diagrams Overview

This document presents seven comprehensive Mermaid sequence diagrams capturing end-to-end interaction flows between Client UI, Middleware Guards, Controllers, Business Services, Database Repositories, and Audit Subsystems in **LeadDesk AI CRM**.

---

## 2. Diagram 1: User Login & Authentication

```mermaid
sequenceDiagram
    autonumber
    actor User as Sales Representative
    participant UI as React 19 Login View
    participant API as Auth Controller
    participant Val as Express Validator
    participant DB as Supabase PostgreSQL

    User->>UI: Input Email & Password, click "Sign In"
    UI->>API: POST /api/v1/auth/login (email, password)
    API->>Val: Sanitize & Validate Credentials Format
    Val-->>API: Validation Passed
    API->>DB: SELECT * FROM users WHERE email = $1 AND deleted_at IS NULL
    DB-->>API: User Record Found (with Bcrypt Password Hash)
    API->>API: Bcrypt.compare(inputPassword, hash)
    alt Invalid Password
        API-->>UI: 401 Unauthorized ("Invalid email or password")
        UI-->>User: Render Error Alert
    else Valid Password
        API->>API: Generate JWT Token (payload: userId, role, exp: 24h)
        API->>DB: UPDATE users SET last_login_at = NOW() WHERE id = userId
        API-->>UI: 200 OK (token, userObj)
        UI->>UI: Save Token in Session Storage & Auth Context
        UI-->>User: Redirect to /dashboard
    end
```

---

## 3. Diagram 2: Public Lead Submission & Automated Scoring

```mermaid
sequenceDiagram
    autonumber
    actor Prospect as Web Site Prospect
    participant Form as React Ingestion Form
    participant Ingest as Lead Controller
    participant Score as AI Scoring Engine
    participant Repo as Lead Repository
    participant DB as Supabase PostgreSQL

    Prospect->>Form: Fill form fields & click "Submit Request"
    Form->>Form: Validate Zod Schema (Name, Email, Budget, Message)
    Form->>Ingest: POST /api/v1/leads (Payload)
    Ingest->>Score: calculateScore(budget, email, message)
    Score->>Score: Evaluate rules (Budget >= 50k = +40, Corporate Domain = +30, Intent = +20)
    Score-->>Ingest: Score: 90, Tier: 'Hot'
    Ingest->>Repo: createLeadRecord(LeadData + Score)
    Repo->>DB: INSERT INTO leads (...) RETURNING *
    DB-->>Repo: Lead Record Saved
    Ingest->>Repo: createAuditEntry(Action: 'LEAD_CREATED')
    Repo->>DB: INSERT INTO audit_logs (...)
    Ingest-->>Form: 201 Created (leadId, score_tier)
    Form-->>Prospect: Display Success Confirmation Message
```

---

## 4. Diagram 3: Lead Search & Multi-Filter Execution

```mermaid
sequenceDiagram
    autonumber
    actor Rep as Sales Representative
    participant Dash as React Dashboard
    participant API as Lead Controller
    participant DB as Supabase PostgreSQL

    Rep->>Dash: Enter search "Acme" & select Status "New"
    Dash->>Dash: Debounce input (300ms)
    Dash->>API: GET /api/v1/leads?search=Acme&status=New (Bearer JWT)
    API->>DB: SELECT * FROM leads WHERE (full_name ILIKE '%Acme%' OR company ILIKE '%Acme%') AND status = 'New' AND deleted_at IS NULL ORDER BY score_value DESC
    DB-->>API: Array of 12 Matching Leads
    API-->>Dash: 200 OK ({ success: true, data: [Leads], meta: { count: 12 } })
    Dash-->>Rep: Re-render dynamic lead table with 12 items
```

---

## 5. Diagram 4: Lead Status Transition & Audit Emission

```mermaid
sequenceDiagram
    autonumber
    actor Rep as Sales Representative
    participant UI as Lead Detail Modal
    participant API as Lead Controller
    participant Service as Lead Service
    participant DB as Supabase PostgreSQL

    Rep->>UI: Select status dropdown -> "Contacted", click Update
    UI->>API: PATCH /api/v1/leads/:id/status (Payload: { status: 'Contacted' })
    API->>Service: updateStatus(leadId, 'Contacted', actorId)
    Service->>DB: SELECT status FROM leads WHERE id = leadId
    DB-->>Service: Current Status = 'New'
    Service->>Service: Validate State Machine Rule ('New' -> 'Contacted' IS VALID)
    Service->>DB: UPDATE leads SET status = 'Contacted', updated_at = NOW() WHERE id = leadId
    DB-->>Service: Update Confirmed
    Service->>DB: INSERT INTO audit_logs (actor_id, lead_id, action: 'STATUS_UPDATED', prev: {status: 'New'}, new: {status: 'Contacted'})
    Service-->>API: Updated Lead Object
    API-->>UI: 200 OK ({ success: true, data: Lead })
    UI-->>Rep: Toast Notification "Status updated to Contacted"
```

---

## 6. Diagram 5: User Logout & Session Invalidation

```mermaid
sequenceDiagram
    autonumber
    actor User as Sales Representative
    participant UI as React Navigation Bar
    participant Auth as React Auth Context

    User->>UI: Click "Logout" Button
    UI->>Auth: dispatch(LOGOUT)
    Auth->>Auth: Clear JWT token from Session Storage
    Auth->>Auth: Reset User State to Null
    Auth-->>UI: Auth State Cleared
    UI-->>User: Redirect to /login with flash message "Logged out successfully"
```

---

## 7. Diagram 6: Middleware Auth Guard & RBAC Authorization

```mermaid
sequenceDiagram
    autonumber
    participant Req as Incoming Request
    participant MW as JWT Middleware
    participant RBAC as Role Guard Middleware
    participant Next as Controller Action

    Req->>MW: HTTP Request with Header Authorization: Bearer <Token>
    alt Missing Authorization Header
        MW-->>Req: 401 Unauthorized ("Token missing")
    else Present Header
        MW->>MW: jwt.verify(token, JWT_SECRET)
        alt Token Expired / Invalid
            MW-->>Req: 401 Unauthorized ("Token invalid or expired")
        else Token Valid
            MW->>RBAC: Attach req.user = decodedToken & pass
            RBAC->>RBAC: Check if req.user.role IN allowedRoles
            alt Role Not Allowed
                RBAC-->>Req: 403 Forbidden ("Insufficient permissions")
            else Role Authorized
                RBAC->>Next: next() -> Proceed to Controller
            end
        end
    end
```

---

## 8. Diagram 7: End-to-End API Request Lifecycle

```mermaid
sequenceDiagram
    autonumber
    actor Client as SPA / API Client
    participant Helmet as Helmet & CORS
    participant Rate as Rate Limiter
    participant Val as Express Validator
    participant Ctrl as Express Controller
    participant DB as PostgreSQL Database

    Client->>Helmet: HTTP Request
    Helmet->>Helmet: Check CORS origin & Apply Security Headers
    Helmet->>Rate: Pass Request
    Rate->>Rate: Check IP bucket quota
    Rate->>Val: Pass Request
    Val->>Val: Execute field validation rules
    Val->>Ctrl: Pass Request
    Ctrl->>DB: Execute Query
    DB-->>Ctrl: DB Result
    Ctrl-->>Client: HTTP Response (JSON + Security Headers)
```

---

## Cross-References
* System Architecture: [07-System-Architecture.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/07-System-Architecture.md)
* Class Diagram: [11-Class-Diagram.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/11-Class-Diagram.md)
* API Specification: [15-API-Specification.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/15-API-Specification.md)
* Security Design: [17-Security-Design.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/17-Security-Design.md)
