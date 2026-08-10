# 🏛️ System Architecture

## Overview
The AI-Powered Symposium Registration Platform is built with clean architecture, separation of concerns, and future-proof design patterns.

```
Participant Browser
       │
       ▼
React 19 + Vite Frontend (Glassmorphism UI)
       │
       ▼
FastAPI Python Backend (Pydantic Validation & ReportLab PDF Engine)
       │
       ├──────────────────────────┐
       ▼                          ▼
Google Apps Script API     Google Drive Storage
       │                          │
       ▼                          ▼
Google Sheets (11 Tabs)   "Symposium Payment Screenshots" Folder
```

## Database Schema (Google Sheets - 11 Required Tabs)
1. `Dashboard`: High-level metrics & real-time analytics.
2. `Participants`: Master list of registered participants.
3. `Payments`: Transaction records with clickable Google Drive View URLs.
4. `Reverse Coding`: Coding language preferences.
5. `Paper Presentation`: Team details, paper titles, and abstract links.
6. `Technical Quiz`: Quiz participant records.
7. `Memory Challenge`: Cognitive recall event registrations.
8. `Photography`: Equipment declarations.
9. `Free Fire`: Squad captain names, player UIDs, and IGNs.
10. `Logs`: Audit logs.
11. `Settings`: System parameters.

## Future Cashfree Gateway Plug-and-Play
The `PaymentService` abstraction layer enforces signature compatibility. Upgrading to Cashfree REST SDK requires changing only `PAYMENT_MODE="CASHFREE"` in `.env` without modifying forms, APIs, Google Sheets, or PDF receipt generators.
