# 34 - Developer Handbook

## Table of Contents
1. [Welcome & Engineering Philosophy](#1-welcome--engineering-philosophy)
2. [Local Environment Setup](#2-local-environment-setup)
3. [Coding Standards & Linter Enforcements](#3-coding-standards--linter-enforcements)
4. [File & Component Naming Rules](#4-file--component-naming-rules)
5. [Git & PR Review Checklist](#5-git--pr-review-checklist)
6. [Troubleshooting Common Setup Issues](#6-troubleshooting-common-setup-issues)

---

## 1. Welcome & Engineering Philosophy

Welcome to the **LeadDesk AI CRM** engineering team! This handbook serves as your primary guide for codebase conventions, developer tools, onboarding steps, and engineering standards.

### Core Engineering Principles:
* **Quality First**: Write clean, testable, and self-documenting code.
* **Security Mindset**: Never trust client inputs; sanitize everything server-side.
* **Performance Focus**: Minimize re-renders in React and optimize database SQL queries.

---

## 2. Local Environment Setup

### Prerequisites:
* Node.js v20.0.0 or higher
* npm v10.0.0 or higher
* Git

### One-Command Setup:
```bash
# Clone repository
git clone https://github.com/your-org/leaddesk-ai-crm.git
cd leaddesk-ai-crm

# Setup Backend Environment
cd backend
cp .env.example .env
npm install
npm run dev

# Setup Frontend Environment (In a new terminal)
cd ../frontend
cp .env.example .env
npm install
npm run dev
```

---

## 3. Coding Standards & Linter Enforcements

* **ESLint Configuration**: Code must pass `npm run lint` with zero errors.
* **Formatting**: Prettier is configured to auto-format files on save (Single quotes, 2-space indentation, trailing commas).

---

## 4. File & Component Naming Rules

* **React Components**: `PascalCase.jsx` (e.g. `LeadTable.jsx`, `StatusBadge.jsx`)
* **Express Handlers & Services**: `camelCase.js` (e.g. `leadController.js`, `scoringEngine.js`)
* **Styles**: Utility classes via Tailwind CSS; custom CSS tokens declared in `index.css`.

---

## 5. Git & PR Review Checklist

Before requesting code review on your PR:
- [ ] Code compiles without errors (`npm run build`).
- [ ] Linter passes clean (`npm run lint`).
- [ ] All unit and integration tests pass (`npm run test`).
- [ ] Conventional commit messages used (`feat:`, `fix:`).
- [ ] No hardcoded secret keys or credentials in commit diffs.

---

## 6. Troubleshooting Common Setup Issues

* **Issue: CORS error on frontend API request**: Verify `CORS_ORIGIN` in `backend/.env` matches local frontend URL (`http://localhost:5173`).
* **Issue: Supabase connection timeout**: Ensure database network firewall allows local IP access or check `SUPABASE_URL` string.

---

## Cross-References
* Folder Structure: [24-Folder-Structure.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/24-Folder-Structure.md)
* Testing Strategy: [29-Testing-Strategy.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/29-Testing-Strategy.md)
* Git Workflow: [32-Git-Workflow.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/32-Git-Workflow.md)
