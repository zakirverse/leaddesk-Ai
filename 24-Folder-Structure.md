# 24 - Folder Structure

## Table of Contents
1. [Monorepo Directory Taxonomy](#1-monorepo-directory-taxonomy)
2. [Frontend Project Structure (`/frontend`)](#2-frontend-project-structure-frontend)
3. [Backend Project Structure (`/backend`)](#3-backend-project-structure-backend)
4. [Documentation & Configuration Structure (`/docs`)](#4-documentation--configuration-structure-docs)
5. [File Naming Standards & Conventions](#5-file-naming-standards--conventions)

---

## 1. Monorepo Directory Taxonomy

```
leaddesk-ai-crm/
├── docs/                      # Enterprise Documentation Suite (38 Files)
├── frontend/                  # React 19 + Vite + Tailwind Client Application
├── backend/                   # Node.js + Express + Supabase API Application
├── .github/                   # GitHub Actions Workflows & PR Templates
├── .gitignore                 # Root Repository Git Exclusion Rules
├── README.md                  # Master Repository Overview & Setup Guide
└── package.json               # Monorepo Workspace Package Scripts
```

---

## 2. Frontend Project Structure (`/frontend`)

```
frontend/
├── public/                    # Static Assets (Favicon, Logos)
├── src/
│   ├── assets/                # Visual SVGs & Brand Images
│   ├── components/            # Reusable Presentational UI Components
│   │   ├── common/            # Buttons, Inputs, Modals, Badges, Toasts
│   │   ├── dashboard/         # LeadTable, FilterBar, MetricsCards
│   │   ├── forms/             # PublicLeadForm, LoginForm
│   │   └── layout/            # Navbar, Header, Footer, Sidebar
│   ├── context/               # React Context Providers (AuthContext, ThemeContext)
│   ├── hooks/                 # Custom React Hooks (useLeads, useDebounce, useAuth)
│   ├── pages/                 # Top-level Page Views (LandingPage, DashboardPage, LoginPage)
│   ├── routes/                # ProtectedRoute & Router Configurations
│   ├── services/              # Axios API Client & Endpoint Wrappers
│   ├── utils/                 # Formatters, Validation Schemas (Zod), Constants
│   ├── App.jsx                # Application Root Component
│   ├── index.css              # Tailwind Base Directives & Custom Utility Tokens
│   └── main.jsx               # React 19 Application Mount Entrypoint
├── .env.example               # Frontend Environment Template
├── index.html                 # Single-Page App HTML Template
├── package.json               # Frontend Dependencies
├── tailwind.config.js         # Tailwind Design System Configuration
└── vite.config.js             # Vite Bundler Configuration
```

---

## 3. Backend Project Structure (`/backend`)

```
backend/
├── src/
│   ├── config/                # Environment, Supabase Client & Security Config
│   │   ├── db.js              # Supabase PostgreSQL Client Instance
│   │   └── env.js             # Env Variable Validation Matrix
│   ├── controllers/           # HTTP Request Controllers
│   │   ├── authController.js  # Login & User Profile Handlers
│   │   ├── leadController.js  # Lead Ingestion, Search, Status Handlers
│   │   └── analyticsController.js # Dashboard Analytics Metrics Handlers
│   ├── middlewares/           # Express Middleware Pipeline Modules
│   │   ├── authMiddleware.js  # JWT Verification Guard
│   │   ├── rbacMiddleware.js  # Role-Based Authorization Guard
│   │   ├── errorHandler.js    # Global Async Error Middleware
│   │   ├── rateLimiter.js     # IP Quota Enforcement
│   │   └── validateLead.js    # Express Validator Ingestion Rules
│   ├── routes/                # Express Endpoint Route Definitions
│   │   ├── authRoutes.js
│   │   ├── leadRoutes.js
│   │   └── analyticsRoutes.js
│   ├── services/              # Domain Business Services
│   │   ├── leadService.js     # Lead Ingestion, Status Machine Logic
│   │   ├── scoringEngine.js   # Automated AI Intent Classifier
│   │   └── auditService.js    # Immutable Activity Event Logger
│   ├── repositories/          # Supabase SQL Data Access Objects
│   │   ├── leadRepository.js
│   │   └── userRepository.js
│   ├── utils/                 # Helper Functions, Logger (Winston)
│   └── app.js                 # Express Application Instance Bootstrapper
├── .env.example               # Backend Environment Template
├── package.json               # Backend Dependencies
└── server.js                  # HTTP Server Listening Entrypoint
```

---

## 4. Documentation & Configuration Structure (`/docs`)

Contains all 38 enterprise specification markdown files numbered sequentially from `01-Executive-Summary.md` to `37-Judge-QA.md` alongside `INDEX.md`.

---

## 5. File Naming Standards & Conventions

| Context | Case Style | Example File Name |
| :--- | :--- | :--- |
| **React Components** | PascalCase | `LeadTable.jsx`, `StatusBadge.jsx` |
| **Express Controllers / Services** | camelCase | `leadController.js`, `scoringEngine.js` |
| **Express Routes / Config** | camelCase | `leadRoutes.js`, `db.js` |
| **Documentation Files** | Numbered Kebab-case | `07-System-Architecture.md` |

---

## Cross-References
* Frontend Architecture: [20-Frontend-Architecture.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/20-Frontend-Architecture.md)
* Backend Architecture: [21-Backend-Architecture.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/21-Backend-Architecture.md)
* Developer Handbook: [34-Developer-Handbook.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/34-Developer-Handbook.md)
