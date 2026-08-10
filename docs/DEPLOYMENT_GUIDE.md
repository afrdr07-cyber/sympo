# 🛠️ Deployment Guide

## Prerequisites
- Node.js 18+ & npm
- Python 3.10+
- Google Apps Script Web App Deployment URL

## 1. Google Apps Script Deployment
1. Open your target Google Sheet.
2. Extensions -> Apps Script.
3. Replace `Code.gs` with `google_apps_script/Code.gs`.
4. Run `setupSpreadsheet()` to initialize all 11 tabs & Drive folder.
5. Deploy as Web App (`Execute as: Me`, `Who has access: Anyone`).

## 2. Backend Deployment (FastAPI)
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## 3. Frontend Deployment (Vite)
```bash
cd frontend
npm install
npm run build
```
Deploy the generated `dist/` directory to Vercel, Netlify, or Nginx.
