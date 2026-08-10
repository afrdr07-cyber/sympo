# Google Apps Script Setup Guide

Follow these steps to deploy the Google Apps Script Web App to connect your Google Sheet as the Database for the Symposium Website.

## 1. Create a Google Sheet
1. Open [Google Sheets](https://sheets.google.com) and create a new spreadsheet.
2. Name the spreadsheet: `PSV_AIDS_Symposium_2026_Database`.

## 2. Open Apps Script Editor
1. In your Google Sheet, click **Extensions** -> **Apps Script**.
2. Clear any existing code in `Code.gs`.
3. Copy all code from `google_apps_script/Code.gs` in this repository and paste it into the editor.

## 3. Run Setup Function
1. In the Apps Script toolbar dropdown, select `setupSpreadsheet`.
2. Click **Run**.
3. Authorize permissions when prompted by Google.
4. Verify that 10 tabs have been automatically created in your Google Sheet:
   - `Participants`
   - `Payments`
   - `Reverse Coding`
   - `Paper Presentation`
   - `Technical Quiz`
   - `Memory Challenge`
   - `Photography`
   - `Free Fire`
   - `Certificates`
   - `Logs`

## 4. Deploy as Web App
1. Click **Deploy** (top right) -> **New deployment**.
2. Select type: **Web app**.
3. Description: `Symposium API v1`.
4. Execute as: **Me** (`your-email@gmail.com`).
5. Who has access: **Anyone** (CRITICAL: Must be 'Anyone' so the FastAPI backend can send registrations).
6. Click **Deploy**.
7. Copy the resulting **Web App URL** (starts with `https://script.google.com/macros/s/.../exec`).

## 5. Configure Backend `.env`
In your `backend/.env` file, set:
```env
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```
