# LeadDesk AI CRM — Enterprise Lead Management System

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/your-org/leaddesk-ai-crm)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React 19](https://img.shields.io/badge/Frontend-React_19-blue)](https://react.dev/)
[![Express](https://img.shields.io/badge/Backend-Express.js-green)](https://expressjs.com/)
[![Supabase](https://img.shields.io/badge/Database-Supabase_PostgreSQL-emerald)](https://supabase.com/)

**LeadDesk AI CRM** is a high-performance, enterprise-grade lead management platform designed to automate lead capture, qualification, intent scoring, and routing for scaling sales organizations.

---

## 🌟 Key Features

* 🚀 **Instant Lead Ingestion**: Sub-100ms API endpoint for receiving web form submissions.
* 🤖 **Automated AI Intent Scoring**: Algorithmic classification prioritizing leads into `Hot`, `Warm`, and `Cold` tiers.
* ⚡ **High-Speed React 19 UI**: Built with Vite and Tailwind CSS for instant filtering and single-click status transitions.
* 🔒 **Enterprise RBAC & Security**: JWT stateless authentication, Bcrypt password hashing, Helmet headers, and rate limiting.
* 📊 **Executive Analytics**: Real-time pipeline velocity metrics, conversion rates, and rep activity tracking.
* 📜 **Immutable Audit Logging**: Every status transition and lead mutation is tracked in PostgreSQL audit logs.

---

## 🛠️ Technology Stack

* **Frontend**: React 19, Vite, Tailwind CSS, React Router v7, Axios, React Hook Form, Zod.
* **Backend**: Node.js, Express.js, JWT, Bcrypt, Express Validator.
* **Database**: Supabase PostgreSQL (Managed Relational DB).
* **Hosting**: Vercel (Frontend SPA), Render (Backend API), Supabase Cloud (Database).

---

## 🚀 Quick Start & Local Setup

### Prerequisites
* Node.js `>= 20.0.0`
* npm `>= 10.0.0`

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-org/leaddesk-ai-crm.git
   cd leaddesk-ai-crm
   ```

2. **Start Backend Server**:
   ```bash
   cd backend
   cp .env.example .env
   npm install
   npm run dev
   ```

3. **Start Frontend Client**:
   ```bash
   cd ../frontend
   cp .env.example .env
   npm install
   npm run dev
   ```

4. Open browser at `http://localhost:5173`.

---

## 📚 Complete Enterprise Documentation

The full 38-file documentation suite is located in the [`/docs`](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/INDEX.md) directory:

* 📄 [Executive Summary](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/01-Executive-Summary.md)
* 📐 [System Architecture](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/07-System-Architecture.md)
* 🗄️ [Database Design & DDL](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/09-Database-Design.md)
* 🔌 [API Specification](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/15-API-Specification.md)
* 🔒 [Security Design](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/17-Security-Design.md)
* 📖 [Master Documentation Index](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/INDEX.md)

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
