/**
 * P.S.V COLLEGE OF ENGINEERING & TECHNOLOGY
 * DEPARTMENT OF ARTIFICIAL INTELLIGENCE & DATA SCIENCE
 * NATIONAL LEVEL TECHNICAL SYMPOSIUM - GOOGLE APPS SCRIPT DATABASE BACKEND
 * 
 * Target Sheets / Tabs (11 Tabs):
 * 1. Dashboard
 * 2. Participants
 * 3. Payments (Stores Clickable Google Drive View URLs)
 * 4. Reverse Coding
 * 5. Paper Presentation
 * 6. Technical Quiz
 * 7. Memory Challenge
 * 8. Photography
 * 9. Free Fire
 * 10. Logs
 * 11. Settings
 * 
 * Google Drive Folder: "Symposium Payment Screenshots"
 */

const SHEET_NAMES = {
  DASHBOARD: "Dashboard",
  PARTICIPANTS: "Participants",
  PAYMENTS: "Payments",
  REVERSE_CODING: "Reverse Coding",
  PAPER_PRESENTATION: "Paper Presentation",
  TECHNICAL_QUIZ: "Technical Quiz",
  MEMORY_CHALLENGE: "Memory Challenge",
  PHOTOGRAPHY: "Photography",
  FREE_FIRE: "Free Fire",
  LOGS: "Logs",
  SETTINGS: "Settings"
};

const DRIVE_FOLDER_NAME = "Symposium Payment Screenshots";

function getOrCreateSheet(ss, sheetName, defaultHeaders) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }
  if (sheet.getLastRow() === 0 && defaultHeaders && defaultHeaders.length > 0) {
    sheet.appendRow(defaultHeaders);
    const headerRange = sheet.getRange(1, 1, 1, defaultHeaders.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#1E293B");
    headerRange.setFontColor("#FFFFFF");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function setupSpreadsheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  const headersMap = {
    [SHEET_NAMES.DASHBOARD]: [
      "Metric Name", "Value", "Last Updated"
    ],
    [SHEET_NAMES.PARTICIPANTS]: [
      "Registration ID", "Full Name", "Email", "Mobile", "College Name", "Department", "Year",
      "Selected Events", "Total Amount", "Payment Status", "Payment ID", "Registration Date", "Status"
    ],
    [SHEET_NAMES.PAYMENTS]: [
      "Registration ID", "Participant Name", "Mobile Number", "Email", "College", "Selected Event(s)",
      "Amount", "Payment Method", "UPI Transaction ID", "Screenshot Google Drive URL", "Payment Status", "Date & Time"
    ],
    [SHEET_NAMES.REVERSE_CODING]: [
      "Registration ID", "Full Name", "Email", "Mobile", "College Name", "Department", "Year", "Preferred Language", "Timestamp"
    ],
    [SHEET_NAMES.PAPER_PRESENTATION]: [
      "Registration ID", "Full Name", "Email", "Mobile", "College Name", "Department", "Year", "Team Name", "Team Leader Name", "Presentation Title", "Abstract URL", "Team Size", "Timestamp"
    ],
    [SHEET_NAMES.TECHNICAL_QUIZ]: [
      "Registration ID", "Full Name", "Email", "Mobile", "College Name", "Department", "Year", "Timestamp"
    ],
    [SHEET_NAMES.MEMORY_CHALLENGE]: [
      "Registration ID", "Full Name", "Email", "Mobile", "College Name", "Department", "Year", "Timestamp"
    ],
    [SHEET_NAMES.PHOTOGRAPHY]: [
      "Registration ID", "Full Name", "Email", "Mobile", "College Name", "Department", "Year", "Camera Type", "Campus Declaration", "Timestamp"
    ],
    [SHEET_NAMES.FREE_FIRE]: [
      "Registration ID", "Full Name", "Email", "Mobile", "College Name", "Department", "Year", "Team Name", "Captain Name", "Free Fire UID", "In Game Name (IGN)", "Team Position", "Timestamp"
    ],
    [SHEET_NAMES.LOGS]: [
      "Log ID", "Action", "Registration ID", "Details", "IP Address", "Timestamp"
    ],
    [SHEET_NAMES.SETTINGS]: [
      "Setting Key", "Setting Value", "Description"
    ]
  };

  Object.keys(headersMap).forEach(sheetName => {
    getOrCreateSheet(ss, sheetName, headersMap[sheetName]);
  });

  getOrCreateDriveFolder();
  logEvent("SYSTEM_SETUP", "SYSTEM", "Google Sheets & Drive setup verified", "127.0.0.1");
}

function getOrCreateDriveFolder() {
  const folders = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
  if (folders.hasNext()) {
    return folders.next();
  } else {
    const folder = DriveApp.createFolder(DRIVE_FOLDER_NAME);
    folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return folder;
  }
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return responseJSON({ success: false, error: "No post data received" }, 400);
    }

    const data = JSON.parse(e.postData.contents);
    const action = data.action || "REGISTER";

    setupSpreadsheet();

    if (action === "REGISTER") {
      return handleRegistration(data.payload);
    } else if (action === "UPLOAD_DRIVE_SCREENSHOT") {
      return handleDriveUpload(data.payload);
    } else {
      return responseJSON({ success: false, error: "Invalid action requested" }, 400);
    }
  } catch (err) {
    logEvent("ERROR", "SYSTEM", err.toString(), "");
    return responseJSON({ success: false, error: err.toString() }, 500);
  }
}

function handleDriveUpload(payload) {
  try {
    if (!payload || !payload.base64Data || !payload.filename) {
      return responseJSON({ success: false, error: "Missing image file payload" }, 400);
    }

    const folder = getOrCreateDriveFolder();
    const contentType = payload.mimeType || "image/jpeg";
    const bytes = Utilities.base64Decode(payload.base64Data);
    const blob = Utilities.newBlob(bytes, contentType, payload.filename);

    const file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    const fileId = file.getId();
    const driveViewUrl = "https://drive.google.com/file/d/" + fileId + "/view";

    logEvent("DRIVE_UPLOAD_SUCCESS", fileId, driveViewUrl, "");

    return responseJSON({
      success: true,
      fileId: fileId,
      driveUrl: driveViewUrl,
      filename: payload.filename,
      message: "Payment screenshot stored permanently in Google Drive"
    }, 200);

  } catch (err) {
    logEvent("DRIVE_UPLOAD_ERROR", "SYSTEM", err.toString(), "");
    return responseJSON({ success: false, error: "Google Drive screenshot upload failed: " + err.toString() }, 500);
  }
}

function doGet(e) {
  try {
    setupSpreadsheet();
    const action = (e && e.parameter && e.parameter.action) ? e.parameter.action : "GET_ALL";

    if (action === "GET_ALL") {
      return handleGetAllRegistrations();
    } else if (action === "GET_BY_ID") {
      const regId = e.parameter.regId;
      return handleGetById(regId);
    } else {
      return handleGetAllRegistrations();
    }
  } catch (err) {
    return responseJSON({ success: false, error: err.toString() }, 500);
  }
}

function handleRegistration(payload) {
  if (!payload) {
    return responseJSON({ success: false, error: "Empty registration payload" }, 400);
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const timestamp = new Date().toISOString();
  
  const regId = payload.registrationId || ("PSVAIDS2026-" + Math.floor(10000 + Math.random() * 90000));
  const participant = payload.participant || {};
  const events = payload.events || [];
  const payment = payload.payment || {};

  const fullName = participant.fullName || "N/A";
  const email = participant.email || "N/A";
  const mobileNumber = participant.mobileNumber || "N/A";
  const collegeName = participant.collegeName || "N/A";
  const department = participant.department || "N/A";
  const year = participant.year || "N/A";

  const paymentStatus = payment.status || "SUCCESS";
  const paymentId = payment.paymentId || payment.upiTransactionId || "N/A";
  const upiTxnId = payment.upiTransactionId || "N/A";
  const screenshotDriveUrl = payment.screenshotUrl || "N/A";
  const paymentMethod = payment.paymentMethod || "GOOGLE_PAY_QR";
  const totalAmount = payload.totalAmount || 150.0;

  const selectedEventsStr = events.length > 0 ? events.map(ev => ev.eventName).join(", ") : "N/A";

  // 1. Master Participants Sheet
  const masterHeaders = [
    "Registration ID", "Full Name", "Email", "Mobile", "College Name", "Department", "Year",
    "Selected Events", "Total Amount", "Payment Status", "Payment ID", "Registration Date", "Status"
  ];
  const masterSheet = getOrCreateSheet(ss, SHEET_NAMES.PARTICIPANTS, masterHeaders);
  masterSheet.appendRow([
    regId,
    fullName,
    email,
    mobileNumber,
    collegeName,
    department,
    year,
    selectedEventsStr,
    totalAmount,
    paymentStatus,
    paymentId,
    timestamp,
    "CONFIRMED"
  ]);

  // 2. Payments Sheet (Stores Clickable Google Drive View Link & UPI Transaction ID)
  const paymentHeaders = [
    "Registration ID", "Participant Name", "Mobile Number", "Email", "College", "Selected Event(s)",
    "Amount", "Payment Method", "UPI Transaction ID", "Screenshot Google Drive URL", "Payment Status", "Date & Time"
  ];
  const paymentsSheet = getOrCreateSheet(ss, SHEET_NAMES.PAYMENTS, paymentHeaders);
  paymentsSheet.appendRow([
    regId,
    fullName,
    mobileNumber,
    email,
    collegeName,
    selectedEventsStr,
    totalAmount,
    paymentMethod,
    upiTxnId,
    screenshotDriveUrl,
    paymentStatus,
    timestamp
  ]);

  // 3. Dedicated Event Sheets
  events.forEach(ev => {
    const rawEvName = (ev.eventName || "").trim();
    const cleanName = rawEvName.toLowerCase();

    if (cleanName.includes("reverse coding")) {
      const sheet = getOrCreateSheet(ss, SHEET_NAMES.REVERSE_CODING, [
        "Registration ID", "Full Name", "Email", "Mobile", "College Name", "Department", "Year", "Preferred Language", "Timestamp"
      ]);
      sheet.appendRow([
        regId, fullName, email, mobileNumber, collegeName, department, year,
        ev.preferredLanguage || "Python", timestamp
      ]);
    } else if (cleanName.includes("paper presentation") || cleanName.includes("paper pres")) {
      const sheet = getOrCreateSheet(ss, SHEET_NAMES.PAPER_PRESENTATION, [
        "Registration ID", "Full Name", "Email", "Mobile", "College Name", "Department", "Year", "Team Name", "Team Leader Name", "Presentation Title", "Abstract URL", "Team Size", "Timestamp"
      ]);
      sheet.appendRow([
        regId, fullName, email, mobileNumber, collegeName, department, year,
        ev.teamName || "N/A", ev.teamLeaderName || fullName,
        ev.presentationTitle || "N/A", ev.abstractUrl || "N/A", ev.teamSize || 1, timestamp
      ]);
    } else if (cleanName.includes("quiz")) {
      const sheet = getOrCreateSheet(ss, SHEET_NAMES.TECHNICAL_QUIZ, [
        "Registration ID", "Full Name", "Email", "Mobile", "College Name", "Department", "Year", "Timestamp"
      ]);
      sheet.appendRow([
        regId, fullName, email, mobileNumber, collegeName, department, year, timestamp
      ]);
    } else if (cleanName.includes("memory")) {
      const sheet = getOrCreateSheet(ss, SHEET_NAMES.MEMORY_CHALLENGE, [
        "Registration ID", "Full Name", "Email", "Mobile", "College Name", "Department", "Year", "Timestamp"
      ]);
      sheet.appendRow([
        regId, fullName, email, mobileNumber, collegeName, department, year, timestamp
      ]);
    } else if (cleanName.includes("photo")) {
      const sheet = getOrCreateSheet(ss, SHEET_NAMES.PHOTOGRAPHY, [
        "Registration ID", "Full Name", "Email", "Mobile", "College Name", "Department", "Year", "Camera Type", "Campus Declaration", "Timestamp"
      ]);
      sheet.appendRow([
        regId, fullName, email, mobileNumber, collegeName, department, year,
        ev.cameraType || "DSLR/Mobile", ev.campusDeclaration ? "YES" : "NO", timestamp
      ]);
    } else if (cleanName.includes("free fire")) {
      const sheet = getOrCreateSheet(ss, SHEET_NAMES.FREE_FIRE, [
        "Registration ID", "Full Name", "Email", "Mobile", "College Name", "Department", "Year", "Team Name", "Captain Name", "Free Fire UID", "In Game Name (IGN)", "Team Position", "Timestamp"
      ]);
      sheet.appendRow([
        regId, fullName, email, mobileNumber, collegeName, department, year,
        ev.teamName || "N/A", ev.captainName || fullName,
        ev.freeFireUid || "N/A", ev.inGameName || "N/A", ev.teamPosition || "Player", timestamp
      ]);
    }
  });

  logEvent("REGISTRATION_CREATED", regId, `Registered for ${selectedEventsStr}`, "");

  return responseJSON({
    success: true,
    registrationId: regId,
    message: "Registration successfully recorded in Google Sheets"
  }, 200);
}

function handleGetAllRegistrations() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const masterSheet = ss.getSheetByName(SHEET_NAMES.PARTICIPANTS);
  const data = masterSheet.getDataRange().getValues();
  
  if (data.length <= 1) {
    return responseJSON({ success: true, registrations: [] }, 200);
  }

  const registrations = [];
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    registrations.push({
      registrationId: row[0],
      fullName: row[1],
      email: row[2],
      mobileNumber: row[3],
      collegeName: row[4],
      department: row[5],
      year: row[6],
      selectedEvents: row[7],
      totalAmount: row[8],
      paymentStatus: row[9],
      paymentId: row[10],
      registrationDate: row[11],
      status: row[12]
    });
  }

  return responseJSON({ success: true, registrations: registrations }, 200);
}

function handleGetById(regId) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const masterSheet = ss.getSheetByName(SHEET_NAMES.PARTICIPANTS);
  const data = masterSheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === regId) {
      const row = data[i];
      return responseJSON({
        success: true,
        registration: {
          registrationId: row[0],
          fullName: row[1],
          email: row[2],
          mobileNumber: row[3],
          collegeName: row[4],
          department: row[5],
          year: row[6],
          selectedEvents: row[7],
          totalAmount: row[8],
          paymentStatus: row[9],
          paymentId: row[10],
          registrationDate: row[11],
          status: row[12]
        }
      }, 200);
    }
  }

  return responseJSON({ success: false, error: "Registration ID not found" }, 404);
}

function logEvent(action, regId, details, ip) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let logsSheet = ss.getSheetByName(SHEET_NAMES.LOGS);
    if (!logsSheet) {
      logsSheet = ss.insertSheet(SHEET_NAMES.LOGS);
      logsSheet.appendRow(["Log ID", "Action", "Registration ID", "Details", "IP Address", "Timestamp"]);
    }
    const logId = "LOG-" + Math.floor(100000 + Math.random() * 900000);
    logsSheet.appendRow([logId, action, regId, details, ip || "N/A", new Date().toISOString()]);
  } catch (e) {
    // Ignore log error
  }
}

function responseJSON(obj, statusCode) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
