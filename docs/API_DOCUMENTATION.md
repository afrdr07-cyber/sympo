# 📡 API Documentation

## Core Endpoints

### 1. Events Catalog
- **GET** `/api/v1/events`
- **Response**: Array of Technical & Non-Technical symposium events.

### 2. Registration Submission
- **POST** `/api/v1/registration/submit`
- **Body**: `RegistrationSubmissionRequest` (Participant, Selected Events, Payment Details)
- **Response**: `RegistrationResponse` (Registration ID, PDF Receipt download link)

### 3. Payment Screenshot Upload (Google Drive)
- **POST** `/api/v1/registration/upload-screenshot`
- **Body**: `multipart/form-data` file (PNG, JPG, JPEG, max 5MB)
- **Response**: `{ success: true, fileId: "...", driveUrl: "https://drive.google.com/file/d/FILE_ID/view" }`

### 4. PDF Receipt Download
- **POST** `/api/v1/receipt/generate`
- **GET** `/api/v1/receipt/{registrationId}`
- **Response**: Binary PDF attachment (`Content-Type: application/pdf`).
