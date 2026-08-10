# 🚀 Complete Deployment Guide for Vercel

This project is engineered as a unified full-stack web application. Both the **React 19 + Vite Frontend** and **FastAPI Python Backend** deploy together to **Vercel** with zero extra server configuration required.

---

## 🏗️ How Full-Stack Vercel Architecture Works

1. **Frontend**: Vite builds the static SPA into `frontend/dist/`.
2. **Backend**: Vercel mounts [`api/index.py`](file:///c:/Users/Mohammed%20Muqeeth/Downloads/sympo-main/sympo-main/api/index.py) as a Python Serverless Function using root [`requirements.txt`](file:///c:/Users/Mohammed%20Muqeeth/Downloads/sympo-main/sympo-main/requirements.txt).
3. **Routing (`vercel.json`)**:
   - `/api/*` -> [`api/index.py`](file:///c:/Users/Mohammed%20Muqeeth/Downloads/sympo-main/sympo-main/api/index.py) (FastAPI REST API)
   - `/*` -> `frontend/dist/index.html` (React Single Page Application)

---

## 1. Prerequisites & Google Apps Script Setup

1. Open your target Google Sheet.
2. Extensions -> Apps Script.
3. Replace contents with [`google_apps_script/Code.gs`](file:///c:/Users/Mohammed%20Muqeeth/Downloads/sympo-main/sympo-main/google_apps_script/Code.gs).
4. Run `setupSpreadsheet()` to initialize all 11 tabs & the Google Drive upload folder.
5. Click **Deploy** -> **New Deployment**:
   - Select **Web app**.
   - **Execute as**: `Me`
   - **Who has access**: `Anyone`
6. Copy the generated Web App URL (`https://script.google.com/macros/s/.../exec`).

---

## 2. Deploying to Vercel via GitHub (Recommended)

### Step 1: Push Code to GitHub
Open your terminal in the project root and run:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git branch -M main
git push -u origin main
```

### Step 2: Import into Vercel
1. Go to [https://vercel.com/new](https://vercel.com/new).
2. Connect your GitHub account and import your repository.
3. Vercel automatically detects [`vercel.json`](file:///c:/Users/Mohammed%20Muqeeth/Downloads/sympo-main/sympo-main/vercel.json) with settings:
   - **Build Command**: `npm run build --prefix frontend`
   - **Install Command**: `npm install --prefix frontend`
   - **Output Directory**: `frontend/dist`
4. Add **Environment Variables** in Vercel:
   - `GOOGLE_APPS_SCRIPT_URL`: Your deployed Apps Script Web App URL.
   - `SECRET_KEY`: `psv_aids_symposium_super_secret_key`
   - `ADMIN_USERNAME`: `admin`
   - `ADMIN_PASSWORD`: `psvaids2026password`
   - `PAYMENT_MODE`: `PLACEHOLDER`
5. Click **Deploy**.

---

## 3. Deploying to Vercel via Vercel CLI (Terminal Method)

If you want to deploy directly from your command line:

```bash
# 1. Log in to Vercel
npx vercel login

# 2. Deploy to Production
npx vercel --prod
```

Follow the prompts:
- Set root directory to `./` (press Enter).
- Accept default project settings (it automatically reads [`vercel.json`](file:///c:/Users/Mohammed%20Muqeeth/Downloads/sympo-main/sympo-main/vercel.json)).

---

## 🔍 Verification After Deployment

Once deployed, visit your Vercel deployment URL (e.g. `https://your-project.vercel.app`):
- `/` -> Renders the React Home Page.
- `/api/v1/events` -> Returns JSON list of symposium events from FastAPI backend.
- `/docs` or `/api/docs` -> Renders FastAPI Swagger Interactive Documentation.

