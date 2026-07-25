# 10 - ER Diagram

## Table of Contents
1. [Entity-Relationship Overview](#1-entity-relationship-overview)
2. [Complete Mermaid ER Diagram](#2-complete-mermaid-er-diagram)
3. [Entity Dictionary & Data Attributes](#3-entity-dictionary--data-attributes)
4. [Relationship Cardinality & Integrity Rules](#4-relationship-cardinality--integrity-rules)

---

## 1. Entity-Relationship Overview

This document presents the complete conceptual and logical Entity-Relationship (ER) schema for **LeadDesk AI CRM**. It details all database entities, primary keys, foreign key constraints, column data types, nullability rules, and cardinalities.

---

## 2. Complete Mermaid ER Diagram

```mermaid
erDiagram
    USERS ||--o{ LEADS : "assigned_to (1:N)"
    USERS ||--o{ LEAD_NOTES : "authored_by (1:N)"
    USERS ||--o{ AUDIT_LOGS : "acted_by (1:N)"
    LEADS ||--o{ LEAD_NOTES : "has_notes (1:N)"
    LEADS ||--o{ AUDIT_LOGS : "logs_history (1:N)"

    USERS {
        uuid id PK "gen_random_uuid()"
        string email UK "NOT NULL, Unique"
        string password_hash "NOT NULL, Bcrypt"
        string full_name "NOT NULL"
        enum role "super_admin | sales_manager | sales_rep"
        boolean is_active "DEFAULT TRUE"
        timestamptz last_login_at "Nullable"
        timestamptz created_at "NOT NULL"
        timestamptz updated_at "NOT NULL"
        timestamptz deleted_at "Soft Delete Indicator"
    }

    LEADS {
        uuid id PK "gen_random_uuid()"
        string full_name "NOT NULL"
        string email "NOT NULL, Indexed"
        string phone "Nullable"
        string company "Nullable"
        numeric budget "NOT NULL, Default 0.00"
        text message "NOT NULL"
        enum status "New | Contacted | Qualified | Proposal Sent | Closed Won | Closed Lost"
        integer score_value "NOT NULL, 0-100"
        enum score_tier "Hot | Warm | Cold"
        uuid assigned_to FK "References USERS(id)"
        timestamptz created_at "NOT NULL"
        timestamptz updated_at "NOT NULL"
        timestamptz deleted_at "Soft Delete Indicator"
    }

    LEAD_NOTES {
        uuid id PK "gen_random_uuid()"
        uuid lead_id FK "References LEADS(id) ON DELETE CASCADE"
        uuid author_id FK "References USERS(id) ON DELETE RESTRICT"
        text note_text "NOT NULL"
        timestamptz created_at "NOT NULL"
        timestamptz updated_at "NOT NULL"
    }

    AUDIT_LOGS {
        uuid id PK "gen_random_uuid()"
        uuid actor_id FK "References USERS(id) ON DELETE SET NULL"
        uuid lead_id FK "References LEADS(id) ON DELETE SET NULL"
        string action "NOT NULL, e.g. LEAD_CREATED, STATUS_UPDATED"
        jsonb previous_state "JSON snapshot before change"
        jsonb new_state "JSON snapshot after change"
        string ip_address "IPv4 / IPv6 Client IP"
        timestamptz created_at "NOT NULL"
    }
```

---

## 3. Entity Dictionary & Data Attributes

### 1. `USERS` Entity
Represents internal organization users (Admins, Managers, Sales Representatives) authenticated to access the system.

### 2. `LEADS` Entity
Core business entity storing inbound lead prospects, budget information, calculated intent scores, and status lifecycle state.

### 3. `LEAD_NOTES` Entity
Contains time-stamped contextual comments written by sales representatives for a specific lead.

### 4. `AUDIT_LOGS` Entity
System audit repository capturing immutable change records for compliance and reporting.

---

## 4. Relationship Cardinality & Integrity Rules

| Parent Entity | Child Entity | Foreign Key Field | Cardinality | Delete Cascade Rule |
| :--- | :--- | :--- | :--- | :--- |
| `USERS` | `LEADS` | `leads.assigned_to` | 1 to 0..N | `ON DELETE SET NULL` |
| `USERS` | `LEAD_NOTES` | `lead_notes.author_id` | 1 to 0..N | `ON DELETE RESTRICT` |
| `USERS` | `AUDIT_LOGS` | `audit_logs.actor_id` | 1 to 0..N | `ON DELETE SET NULL` |
| `LEADS` | `LEAD_NOTES` | `lead_notes.lead_id` | 1 to 0..N | `ON DELETE CASCADE` |
| `LEADS` | `AUDIT_LOGS` | `audit_logs.lead_id` | 1 to 0..N | `ON DELETE SET NULL` |

---

## Cross-References
* System Architecture: [07-System-Architecture.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/07-System-Architecture.md)
* Database Design: [09-Database-Design.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/09-Database-Design.md)
* Class Diagram: [11-Class-Diagram.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/11-Class-Diagram.md)
* API Specification: [15-API-Specification.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/15-API-Specification.md)
