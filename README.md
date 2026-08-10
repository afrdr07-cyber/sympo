# 🚀 AI-Powered Symposium Registration System

[![Production Build](https://img.shields.io/badge/Build-Passing-emerald?style=for-the-badge&logo=github-actions)](https://github.com/afrdr07-cyber/sym)
[![Framework](https://img.shields.io/badge/Frontend-React_19_%2B_Vite-cyan?style=for-the-badge&logo=react)](https://react.dev)
[![Backend](https://img.shields.io/badge/Backend-FastAPI_%2B_Python-blue?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com)
[![Database](https://img.shields.io/badge/Database-Google_Sheets_%2B_Drive-emerald?style=for-the-badge&logo=googlesheets)](https://workspace.google.com)

Production-ready, highly modular, responsive, and secure **Symposium Registration & Event Management Platform** engineered for **P.S.V College of Engineering & Technology, Department of Artificial Intelligence & Data Science (National Level Technical Symposium 2026)**.

---

## 🌟 Key Architecture & Highlights

- **Dynamic Multi-Event Registration**:
  - General participant details are collected once.
  - Dedicated dynamic form cards rendered for **every** selected event (Reverse Coding, Paper Presentation, Technical Quiz, Memory Challenge, Photography, Free Fire).
  - Independent per-event validation rules.
- **Temporary Google Pay QR + Future Cashfree Plug-and-Play**:
  - Displays Google Pay QR Code (`/assets/gpay_qr.jpg`) on checkout.
  - Collects 12-digit UPI Transaction ID & payment confirmation screenshot.
  - `PaymentService` abstraction layer ready to swap to Cashfree REST SDK with **zero changes** to forms, schemas, Google Sheets, or PDF receipt generators.
- **Permanent Google Drive Storage**:
  - Stores payment screenshots inside dedicated Google Drive folder `"Symposium Payment Screenshots"`.
  - Appends clickable Google Drive View URLs (`https://drive.google.com/file/d/FILE_ID/view`) into Google Sheets.
- **11-Tab Google Sheets Database**:
  - `Dashboard`, `Participants`, `Payments`, `Reverse Coding`, `Paper Presentation`, `Technical Quiz`, `Memory Challenge`, `Photography`, `Free Fire`, `Logs`, `Settings`.
- **Instant Printable A4 PDF Receipts**:
  - Dynamically generated using ReportLab with custom college header, registration status badge, itemized events, and official seal.

---

## 📁 Repository Directory Structure

```text
sym/
├── .github/
│   └── workflows/
│       └── ci.yml                     # GitHub Actions CI/CD pipeline
├── backend/
│   ├── app/
│   │   ├── config.py                  # Pydantic environment configuration loader
│   │   ├── main.py                    # FastAPI application entrypoint & middleware
│   │   ├── routers/                   # API Routers (events, registration, payment, receipt)
│   │   ├── schemas/                   # Pydantic data schemas
│   │   ├── services/                  # Business services (registration, payment, sheets, pdf)
│   │   └── uploads/                   # Uploaded abstracts storage
│   ├── requirements.txt               # Python package dependencies
│   └── README.md                      # Backend service documentation
├── frontend/
│   ├── public/
│   │   └── assets/                    # Static assets & Google Pay QR Code image
│   ├── src/
│   │   ├── components/                # Reusable UI components & multi-event forms
│   │   ├── pages/                     # Application pages (Home, Events, Register, etc.)
│   │   ├── services/                  # Axios API clients
│   │   └── types/                     # TypeScript definitions
│   ├── package.json                   # Node package dependencies
│   └── vite.config.ts                 # Vite bundler configuration & proxy
├── google_apps_script/
│   ├── Code.gs                        # Google Apps Script Web App (11-Tab DB + Drive Storage)
│   └── appsscript.json                # Apps Script manifest configuration
├── docs/                              # API, Architecture, and Deployment Guides
├── certificates/                      # Certificate generation templates
├── scripts/                           # Deployment & maintenance helper scripts
├── README.md                          # Repository documentation
├── LICENSE                            # MIT License
└── .gitignore                         # Git exclusion patterns
```

---

## 🛠️ Quick Start Guide

### 1. Backend Setup (FastAPI)
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

### 2. Frontend Setup (React 19 + Vite)
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 📜 License
Distributed under the **MIT License**. See `LICENSE` for details.
