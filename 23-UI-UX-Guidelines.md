# 23 - UI/UX Guidelines

## Table of Contents
1. [UI/UX Philosophy & Core Principles](#1-uiux-philosophy--core-principles)
2. [Layout Wireframes & Visual Architecture](#2-layout-wireframes--visual-architecture)
3. [Micro-Interactions & State Feedback](#3-micro-interactions--state-feedback)
4. [Accessibility & Inclusive Design](#4-accessibility--inclusive-design)
5. [Responsive Breakpoints & Viewport Adaptability](#5-responsive-breakpoints--viewport-adaptability)

---

## 1. UI/UX Philosophy & Core Principles

**LeadDesk AI CRM** is designed around a single core user experience philosophy: **Zero Friction Sales Execution**. Sales representatives must be able to view, evaluate, and transition leads in seconds without navigating multi-level submenus or waiting for full-page reloads.

### Design Principles:
1. **Information Density**: Display critical context (Score, Tier, Budget, Company, Status) in a single horizontal row.
2. **Predictable Interaction Patterns**: Single-click status dropdowns and dynamic inline filtering.
3. **Instant Visual Feedback**: Micro-animations, skeleton loaders, and contextual toast alerts confirm every user action.

---

## 2. Layout Wireframes & Visual Architecture

### Executive Dashboard Wireframe:
```
+-----------------------------------------------------------------------------------+
|  LeadDesk AI CRM  [ Search Leads... ]  (Hot: 12 | New: 45)  [Sarah Rep (Rep) v]   |
+-----------------------------------------------------------------------------------+
| Status: [ All v ] | Tier: [ Hot v ] | Min Budget: [ $25,000 v ]   [ + Export ]   |
+-----------------------------------------------------------------------------------+
| PROSPECT NAME     | COMPANY    | BUDGET    | SCORE  | TIER | STATUS       | ACTION |
+------------------+------------+-----------+--------+------+--------------+--------+
| Alexander Wright  | Acme Corp  | $75,000   |  90    | HOT  | [ New      v]| [Edit] |
| Brenda Vance      | Hooli      | $30,000   |  55    | WARM | [ Contacted v]| [Edit] |
| Charles Xavier    | Xavier Inst| $120,000  |  95    | HOT  | [ Qualified v]| [Edit] |
+-----------------------------------------------------------------------------------+
| Showing 1 - 10 of 125 Leads                                    [ < Prev ] [ Next > ]|
+-----------------------------------------------------------------------------------+
```

---

## 3. Micro-Interactions & State Feedback

```mermaid
flowchart LR
    Action[User Clicks Status Change] --> Optimistic[1. Optimistic Local State Update]
    Optimistic --> Spinner[2. Inline Button Loading Spinner]
    Spinner --> APIReq[3. Dispatch Background HTTP PATCH]
    APIReq -- Success --> ToastSuccess[4. Render Green Toast "Status Updated"]
    APIReq -- Error --> ToastError[5. Revert State & Render Red Error Toast]
```

### Loading State Guidelines:
* **Skeleton Screen Loaders**: Used when fetching table rows on initial dashboard mount.
* **Inline Spinners**: Rendered directly inside action buttons during form submission or status updates.

---

## 4. Accessibility & Inclusive Design

* **Keyboard Navigation**: Pressing `Tab` cycles focus logically through form fields, search bars, table rows, and action triggers.
* **Screen Reader Labels**: Interactive elements utilize explicit `aria-label` attributes (e.g., `<button aria-label="Update status for Alexander Wright">`).

---

## 5. Responsive Breakpoints & Viewport Adaptability

| Viewport Category | Screen Width Range | Layout Adaptation Strategy |
| :--- | :--- | :--- |
| **Mobile** | `< 640px` | Data table transforms into stacked card list; sidebar collapses to drawer. |
| **Tablet** | `640px – 1024px` | Table displays key columns (Name, Score, Status); search bar full width. |
| **Desktop** | `1024px – 1440px` | Full 7-column data table view; persistent top header statistics bar. |
| **Ultra-Wide** | `> 1440px` | Centered maximum width container (`max-w-7xl`) with padded margins. |

---

## Cross-References
* Frontend Architecture: [20-Frontend-Architecture.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/20-Frontend-Architecture.md)
* Design System: [22-Design-System.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/22-Design-System.md)
* State Management: [25-State-Management.md](file:///C:/Users/PC/.gemini/antigravity/scratch/leaddesk-ai-crm/docs/25-State-Management.md)
