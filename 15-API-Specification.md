# 15 - API Specification

## Table of Contents
1. [API Architecture & Standards](#1-api-architecture--standards)
2. [Global Headers & HTTP Status Codes](#2-global-headers--http-status-codes)
3. [Unified Error Response Format](#3-unified-error-response-format)
4. [Endpoint 1: User Login (`POST /api/v1/auth/login`)](#4-endpoint-1-user-login-post-apiv1authlogin)
5. [Endpoint 2: Current User Profile (`GET /api/v1/auth/me`)](#5-endpoint-2-current-user-profile-get-apiv1authme)
6. [Endpoint 3: Ingest Inbound Lead (`POST /api/v1/leads`)](#6-endpoint-3-ingest-inbound-lead-post-apiv1leads)
7. [Endpoint 4: List & Filter Leads (`GET /api/v1/leads`)](#7-endpoint-4-list--filter-leads-get-apiv1leads)
8. [Endpoint 5: Get Lead Details (`GET /api/v1/leads/:id`)](#8-endpoint-5-get-lead-details-get-apiv1leadsid)
9. [Endpoint 6: Update Lead Status (`PATCH /api/v1/leads/:id/status`)](#9-endpoint-6-update-lead-status-patch-apiv1leadsidstatus)
10. [Endpoint 7: Add Lead Note (`POST /api/v1/leads/:id/notes`)](#10-endpoint-7-add-lead-note-post-apiv1leadsidnotes)
11. [Endpoint 8: Dashboard Analytics (`GET /api/v1/analytics/dashboard`)](#11-endpoint-8-dashboard-analytics-get-apiv1analyticsdashboard)

---

## 1. API Architecture & Standards

**LeadDesk AI CRM** exposes a RESTful HTTP API utilizing JSON payloads over TLS 1.3. All endpoints are versioned under `/api/v1/`.

---

## 2. Global Headers & HTTP Status Codes

### Global Headers:
* `Content-Type: application/json`
* `Authorization: Bearer <JWT_TOKEN>` (Protected Endpoints)

### Standard HTTP Response Codes:
* `200 OK`: Request succeeded.
* `201 Created`: Resource successfully created.
* `400 Bad Request`: Validation failure or malformed JSON.
* `401 Unauthorized`: Missing or invalid JWT token.
* `403 Forbidden`: Authenticated user lacks RBAC permissions.
* `404 Not Found`: Resource identifier does not exist.
* `429 Too Many Requests`: Rate limit quota exceeded.
* `500 Internal Server Error`: Unhandled server exception.

---

## 3. Unified Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "Field validation failed",
    "details": [
      {
        "field": "email",
        "message": "Must provide a valid corporate email address"
      }
    ]
  },
  "timestamp": "2026-07-25T12:00:00.000Z"
}
```

---

## 4. Endpoint 1: User Login (`POST /api/v1/auth/login`)

* **Auth Required**: No (Public)
* **Description**: Authenticates user and returns JWT bearer token.

### Request Body:
```json
{
  "email": "sarah.rep@leaddesk.io",
  "password": "Password123!"
}
```

### Response (200 OK):
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "e4b6c31a-6415-4c07-9b88-12c8230b42f3",
      "email": "sarah.rep@leaddesk.io",
      "full_name": "Sarah Rep",
      "role": "sales_rep"
    }
  }
}
```

---

## 5. Endpoint 2: Current User Profile (`GET /api/v1/auth/me`)

* **Auth Required**: Yes (`Bearer <Token>`)
* **Description**: Returns currently authenticated user details.

### Response (200 OK):
```json
{
  "success": true,
  "data": {
    "id": "e4b6c31a-6415-4c07-9b88-12c8230b42f3",
    "email": "sarah.rep@leaddesk.io",
    "full_name": "Sarah Rep",
    "role": "sales_rep",
    "last_login_at": "2026-07-25T11:30:00.000Z"
  }
}
```

---

## 6. Endpoint 3: Ingest Inbound Lead (`POST /api/v1/leads`)

* **Auth Required**: No (Public Ingestion Endpoint)
* **Description**: Accepts inbound lead payload, runs AI scoring, and creates lead record.

### Request Body:
```json
{
  "full_name": "Alexander Wright",
  "email": "alex.wright@acmecorp.com",
  "phone": "+1-555-0198",
  "company": "Acme Corporation",
  "budget": 75000,
  "message": "We need an enterprise CRM solution for 50 sales representatives."
}
```

### Response (201 Created):
```json
{
  "success": true,
  "data": {
    "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    "full_name": "Alexander Wright",
    "email": "alex.wright@acmecorp.com",
    "status": "New",
    "score_value": 90,
    "score_tier": "Hot",
    "created_at": "2026-07-25T12:05:00.000Z"
  }
}
```

---

## 7. Endpoint 4: List & Filter Leads (`GET /api/v1/leads`)

* **Auth Required**: Yes (`sales_rep`, `sales_manager`, `super_admin`)
* **Query Parameters**: `search` (string), `status` (string), `score_tier` (string), `page` (int), `limit` (int).

### Request Example:
`GET /api/v1/leads?status=New&score_tier=Hot&page=1&limit=10`

### Response (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      "full_name": "Alexander Wright",
      "email": "alex.wright@acmecorp.com",
      "company": "Acme Corporation",
      "budget": 75000,
      "status": "New",
      "score_value": 90,
      "score_tier": "Hot",
      "assigned_to": null,
      "created_at": "2026-07-25T12:05:00.000Z"
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "total_pages": 1
  }
}
```

---

## 8. Endpoint 5: Get Lead Details (`GET /api/v1/leads/:id`)

* **Auth Required**: Yes
* **Description**: Fetches single lead record by UUID including notes and audit log history.

---

## 9. Endpoint 6: Update Lead Status (`PATCH /api/v1/leads/:id/status`)

* **Auth Required**: Yes (`sales_rep`, `sales_manager`, `super_admin`)

### Request Body:
```json
{
  "status": "Contacted"
}
```

### Response (200 OK):
```json
{
  "success": true,
  "data": {
    "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    "status": "Contacted",
    "updated_at": "2026-07-25T12:15:00.000Z"
  }
}
```

---

## 10. Endpoint 7: Add Lead Note (`POST /api/v1/leads/:id/notes`)

* **Auth Required**: Yes

### Request Body:
```json
{
  "note_text": "Spoke with Alex via phone. Demo scheduled for Thursday at 2 PM."
}
```

---

## 11. Endpoint 8: Dashboard Analytics (`GET /api/v1/analytics/dashboard`)

* **Auth Required**: Yes (`sales_manager`, `super_admin`)

### Response (200 OK):
```json
{
  "success": true,
  "data": {
    "total_leads": 1250,
    "active_leads": 340,
    "hot_leads_count": 85,
    "conversion_rate_percentage": 24.5,
    "avg_response_time_minutes": 1.8
  }
}
```

---

## Cross-References
* Sequence Diagrams: [12-Sequence-Diagrams.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/12-Sequence-Diagrams.md)
* Auth & RBAC: [16-Authentication-Authorization.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/16-Authentication-Authorization.md)
* Security Design: [17-Security-Design.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/17-Security-Design.md)
* Validation Rules: [18-Validation-Rules.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/18-Validation-Rules.md)
