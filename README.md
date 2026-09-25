# LeadDesk AI — Enterprise AI Lead Management System

> Enterprise AI lead management application with automated intent scoring and tracking dashboard.

[![JavaScript](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📌 Overview

**LeadDesk AI** is designed to streamline sales workflows by evaluating incoming business leads using automated intent scoring. By prioritizing high-converting leads in real-time, sales teams can focus on prospects with the highest probability of closing.

## 💡 Problem Statement

Traditional lead management tools rely on manual triage or static rule engines that fail to capture nuanced customer intent. This results in delayed response times, poor lead conversion, and inefficient resource allocation.

## ✨ Key Features

- 🧠 **Automated Intent Scoring**: Analyzes lead engagement signals to dynamically assign conversion probability scores.
- 📊 **Lead Management Dashboard**: Centralized UI to filter, sort, and manage prospective clients by intent tier.
- ⚡ **Real-Time Data Pipeline**: Ingests new leads and recalculates priority metrics instantly.
- 🔌 **RESTful API Integration**: Easily integrates into web forms, CRM platforms, and external analytics systems.

## 🛠️ Tech Stack

- **Language**: JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **API Protocol**: RESTful JSON API
- **Environment & Tools**: Git, GitHub, VS Code

## 📁 Repository Structure

```text
├── src/
│   ├── controllers/      # Request handlers & scoring logic
│   ├── models/           # Lead data schemas
│   ├── routes/           # API endpoints (/api/leads, /api/score)
│   └── public/           # Frontend dashboard assets
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Local Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/zakirverse/leaddesk-Ai.git
   cd leaddesk-Ai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   NODE_ENV=development
   ```

4. **Start the application**:
   ```bash
   npm start
   # or for live-reload development
   npm run dev
   ```

## 🛣️ Future Roadmap

- [ ] Integrate LLM-based sentiment analysis for inbound lead emails.
- [ ] Add CSV export for intent-scored lead reports.
- [ ] Implement OAuth2 role-based authentication.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
