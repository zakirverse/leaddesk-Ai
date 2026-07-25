# 11 - Class Diagram

## Table of Contents
1. [Class Architecture Overview](#1-class-architecture-overview)
2. [Complete Mermaid UML Class Diagram](#2-complete-mermaid-uml-class-diagram)
3. [Class Specification & Responsibilities](#3-class-specification--responsibilities)
4. [Design Patterns Implemented](#4-design-patterns-implemented)

---

## 1. Class Architecture Overview

This document presents the Unified Modeling Language (UML) Class Diagram for **LeadDesk AI CRM**. It illustrates the object-oriented structure across client components, API controllers, domain services, database repositories, middleware guards, and data transfer objects (DTOs).

---

## 2. Complete Mermaid UML Class Diagram

```mermaid
classDiagram
    %% Frontend React Components & Services
    class LeadDashboardView {
        +LeadState state
        +fetchLeads(filters: LeadFilterDTO)
        +handleStatusChange(leadId: string, newStatus: string)
        +render()
    }

    class LeadIngestionFormView {
        +FormState formState
        +onSubmit(data: CreateLeadDTO)
        +render()
    }

    class ApiClientService {
        -AxiosInstance client
        +post(url: string, payload: Object)
        +patch(url: string, payload: Object)
        +get(url: string, params: Object)
    }

    %% Backend Controllers & Middleware
    class AuthController {
        +login(req: Request, res: Response)
        +getMe(req: Request, res: Response)
    }

    class LeadController {
        +createLead(req: Request, res: Response)
        +getLeads(req: Request, res: Response)
        +getLeadById(req: Request, res: Response)
        +updateLeadStatus(req: Request, res: Response)
    }

    class AuthMiddleware {
        +verifyToken(req: Request, res: Response, next: NextFunction)
        +authorizeRoles(roles: Array~string~)
    }

    class ValidationMiddleware {
        +validateSchema(schema: ZodSchema)
    }

    %% Backend Business Domain Services
    class LeadService {
        -LeadRepository leadRepo
        -ScoringEngine scoringEngine
        -AuditLogService auditService
        +ingestLead(dto: CreateLeadDTO): Lead
        +listLeads(filter: LeadFilterDTO): LeadListResponse
        +changeStatus(id: string, status: string, actorId: string): Lead
    }

    class ScoringEngine {
        +calculateScore(dto: CreateLeadDTO): ScoreResult
        -evaluateBudget(budget: number): number
        -evaluateIntent(message: string): number
    }

    class AuditLogService {
        -AuditRepository auditRepo
        +logAction(actorId: string, leadId: string, action: string, prev: Object, next: Object)
    }

    %% Data Repositories
    class LeadRepository {
        -SupabaseClient supabase
        +insert(lead: Lead): Promise~Lead~
        +findAll(query: FilterQuery): Promise~Array~Lead~~
        +findById(id: string): Promise~Lead~
        +updateStatus(id: string, status: string): Promise~Lead~
    }

    class AuditRepository {
        -SupabaseClient supabase
        +insertAudit(entry: AuditEntry): Promise~void~
    }

    %% Relationships
    LeadDashboardView --> ApiClientService : Uses
    LeadIngestionFormView --> ApiClientService : Uses
    AuthController --> AuthMiddleware : Protected by
    LeadController --> ValidationMiddleware : Validated by
    LeadController --> LeadService : Delegates
    LeadService --> ScoringEngine : Invokes
    LeadService --> AuditLogService : Emits Events
    LeadService --> LeadRepository : Persists
    AuditLogService --> AuditRepository : Persists
```

---

## 3. Class Specification & Responsibilities

### Presentation Layer Classes (Client-side):
* **`LeadDashboardView`**: React 19 functional component orchestrating lead listing, searching, pagination, and optimistic UI updates.
* **`ApiClientService`**: Axios HTTP wrapper maintaining JWT authorization headers and global response interceptors.

### Application Layer Classes (Server-side):
* **`LeadController`**: Express route controller parsing incoming HTTP requests, executing middleware validation, and returning JSON responses.
* **`LeadService`**: Core domain logic orchestrating transaction workflow, AI scoring execution, audit emission, and persistence.
* **`ScoringEngine`**: Pure domain service computing quantitative intent scores (0–100) and assigned tiers (`Hot`, `Warm`, `Cold`).
* **`LeadRepository`**: Data access abstraction isolating Supabase PostgreSQL queries from higher-level business logic.

---

## 4. Design Patterns Implemented

1. **Repository Pattern**: `LeadRepository` decouples raw database SQL syntax from domain business rules in `LeadService`.
2. **Middleware Chain Pattern**: Express middleware pipeline (`Helmet -> Cors -> RateLimit -> Validation -> Auth -> Controller`).
3. **DTO (Data Transfer Object) Pattern**: Strict separation between API JSON payloads (`CreateLeadDTO`) and internal DB entities.
4. **Single Responsibility Principle (SRP)**: Scoring logic is strictly isolated within `ScoringEngine`.

---

## Cross-References
* System Architecture: [07-System-Architecture.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/07-System-Architecture.md)
* ER Diagram: [10-ER-Diagram.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/10-ER-Diagram.md)
* Component Diagram: [13-Component-Diagram.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/13-Component-Diagram.md)
* Backend Architecture: [21-Backend-Architecture.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/21-Backend-Architecture.md)
