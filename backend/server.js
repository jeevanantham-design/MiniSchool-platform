const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { google } = require('googleapis');
require('dotenv').config();

const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = ['.pdf', '.jpg', '.jpeg', '.png'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, JPG, JPEG, PNG files are allowed'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Firebase Configuration
let db = null;
let useFirebase = false;

try {
  const admin = require('firebase-admin');
  const serviceAccountPath = path.join(__dirname, 'firebase-service-account.json');
  
  console.log('🔍 Initializing Firebase...');
  
  if (fs.existsSync(serviceAccountPath)) {
    try {
      const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
      console.log('✅ Service account file loaded');
      console.log('Project ID:', serviceAccount.project_id);
      
      // Initialize Firebase
      const cert = admin.cert(serviceAccount);
      const app = admin.initializeApp({
        credential: cert,
      });
      console.log('✅ Firebase Admin App initialized');
      
      // Get Firestore instance
      const { getFirestore } = require('firebase-admin/firestore');
      db = getFirestore(app);
      useFirebase = true;
      
      console.log('✅✅✅ FIREBASE SUCCESSFULLY INITIALIZED ✅✅✅');
      console.log('Data will be saved to Firebase Firestore!');
    } catch (error) {
      console.error('❌ Firebase initialization failed:', error.message);
      console.error('Stack:', error.stack);
    }
  } else {
    console.log('❌ Service account file not found at:', serviceAccountPath);
  }
} catch (error) {
  console.error('❌ Firebase module error:', error.message);
}

const app = express();
const PORT = process.env.PORT || 5000;

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'student_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use('/uploads', express.static(UPLOADS_DIR));

const formatApplication = (row) => ({
  id: row.application_id,
  name: row.student_name,
  grade: row.class_applying,
  date: new Date(row.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }),
  status: row.status,
  studentName: row.student_name,
  dob: row.dob,
  gender: row.gender,
  classApplying: row.class_applying,
  fatherName: row.father_name,
  motherName: row.mother_name,
  phone: row.phone,
  email: row.email,
  address: row.address,
  city: row.city,
  state: row.state,
  pincode: row.pincode,
  photoFileName: row.photo_file_name,
  birthCertFileName: row.birth_cert_file_name,
  marksheetFileName: row.marksheet_file_name
});

async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS applications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      application_id VARCHAR(20) NOT NULL UNIQUE,
      student_name VARCHAR(120) NOT NULL,
      dob DATE NULL,
      gender VARCHAR(20) NULL,
      class_applying VARCHAR(30) NOT NULL,
      father_name VARCHAR(120) NULL,
      mother_name VARCHAR(120) NULL,
      phone VARCHAR(30) NULL,
      email VARCHAR(120) NULL,
      address TEXT NULL,
      city VARCHAR(80) NULL,
      state VARCHAR(80) NULL,
      pincode VARCHAR(20) NULL,
      photo_file_name VARCHAR(255) NULL,
      birth_cert_file_name VARCHAR(255) NULL,
      marksheet_file_name VARCHAR(255) NULL,
      status VARCHAR(30) NOT NULL DEFAULT 'Approved',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      full_name VARCHAR(120) NOT NULL,
      email VARCHAR(120) NOT NULL,
      phone VARCHAR(30) NULL,
      subject VARCHAR(100) NOT NULL DEFAULT 'General Inquiry',
      message TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

async function generateApplicationId() {
  for (let attempts = 0; attempts < 10; attempts += 1) {
    const applicationId = `MMS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const [rows] = await pool.query(
      'SELECT application_id FROM applications WHERE application_id = ?',
      [applicationId]
    );

    if (rows.length === 0) {
      return applicationId;
    }
  }

  return `MMS-2026-${Date.now().toString().slice(-6)}`;
}

const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID || '1d2yvJyA_2zrBSklUBnr9obqtfYvCz7W2FIq5VmJFb-Y';
const GOOGLE_SHEET_RANGE = process.env.GOOGLE_SHEET_RANGE || 'Sheet1';

function getGoogleSheetCredentials() {
  const credentialsPath = process.env.GOOGLE_SERVICE_ACCOUNT_PATH || path.join(__dirname, 'google-credentials.json');

  if (!fs.existsSync(credentialsPath)) {
    console.warn('⚠️ Google Sheets credentials file not found at:', credentialsPath);
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
  } catch (error) {
    console.error('❌ Failed to parse Google Sheets credentials JSON:', error.message);
    return null;
  }
}

async function appendToGoogleSheet(rowValues, sheetName = GOOGLE_SHEET_RANGE) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID || GOOGLE_SHEET_ID;
  if (!spreadsheetId) {
    console.warn('⚠️ GOOGLE_SHEET_ID is not set. Skipping Google Sheets write.');
    return;
  }

  const credentials = getGoogleSheetCredentials();
  if (!credentials) {
    console.warn('⚠️ Google Sheets credentials missing. Skipping spreadsheet save.');
    return;
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowValues]
      }
    });

    console.log('✅ Data appended to Google Sheets');
  } catch (error) {
    console.error('❌ Failed to append to Google Sheets:', error.message);
  }
}

function buildApplicationSheetRow(data) {
  return [
    data.application_id || '',
    data.student_name || '',
    data.dob || '',
    data.gender || '',
    data.class_applying || '',
    data.father_name || '',
    data.mother_name || '',
    data.phone || '',
    data.email || '',
    data.address || '',
    data.city || '',
    data.state || '',
    data.pincode || '',
    data.photo_file_name || '',
    data.birth_cert_file_name || '',
    data.marksheet_file_name || '',
    data.status || '',
    data.created_at || '',
    data.timestamp || ''
  ];
}

function buildContactSheetRow(data) {
  return [
    data.fullName || '',
    data.email || '',
    data.phone || '',
    data.subject || '',
    data.message || '',
    data.createdAt || '',
    data.timestamp || ''
  ];
}

app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({
      status: 'ok',
      database: 'connected',
      message: 'Ayyan Matriculation School API is running smoothly'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      database: 'disconnected',
      message: 'API is running, but the database connection failed'
    });
  }
});

app.get('/api/announcements', (req, res) => {
  const announcements = [
    {
      id: 1,
      image: '/news1.png',
      date: 'EVENTS - MARCH 12, 2024',
      title: 'Virtual Open Day for Parents 2026',
      desc: 'Join our live session with the Principal to understand our pedagogical approach.'
    },
    {
      id: 2,
      image: '/news2.png',
      date: 'ADMISSIONS - FEB 28, 2024',
      title: 'Scholarship Applications are Now Open',
      desc: 'Merit-based scholarships available for outstanding students in Grade 9 and 11.'
    },
    {
      id: 3,
      image: '/news3.png',
      date: 'CAMPUS LIFE - JAN 15, 2024',
      title: 'New Olympic-sized Swimming Pool Inaugurated',
      desc: 'Our new aquatic center is now open for students and extracurricular training.'
    }
  ];
  res.json(announcements);
});

app.post('/api/applications', upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'birthCert', maxCount: 1 },
  { name: 'marksheet', maxCount: 1 }
]), async (req, res) => {
  const {
    studentName,
    dob,
    gender,
    classApplying,
    fatherName,
    motherName,
    phone,
    email,
    address,
    city,
    state,
    pincode
  } = req.body;

  const photoFileName = req.files?.photo?.[0]?.filename || null;
  const birthCertFileName = req.files?.birthCert?.[0]?.filename || null;
  const marksheetFileName = req.files?.marksheet?.[0]?.filename || null;

  if (!studentName || !classApplying) {
    return res.status(400).json({
      message: 'Student name and class applying for are required.'
    });
  }

  try {
    const applicationId = await generateApplicationId();

    const applicationData = {
      application_id: applicationId,
      student_name: studentName,
      dob: dob || null,
      gender: gender || null,
      class_applying: classApplying,
      father_name: fatherName || null,
      mother_name: motherName || null,
      phone: phone || null,
      email: email || null,
      address: address || null,
      city: city || null,
      state: state || null,
      pincode: pincode || null,
      photo_file_name: photoFileName,
      birth_cert_file_name: birthCertFileName,
      marksheet_file_name: marksheetFileName,
      status: 'Approved',
      created_at: new Date().toISOString(),
      timestamp: Date.now()
    };

    // Save to Firebase if available
    if (useFirebase && db) {
      await db.collection('applications').doc(applicationId).set(applicationData);
      console.log('✅ Application saved to Firebase');
    } else {
      // Save to MySQL
      await pool.query(
        `INSERT INTO applications (
          application_id,
          student_name,
          dob,
          gender,
          class_applying,
          father_name,
          mother_name,
          phone,
          email,
          address,
          city,
          state,
          pincode,
          photo_file_name,
          birth_cert_file_name,
          marksheet_file_name
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          applicationId,
          studentName,
          dob || null,
          gender || null,
          classApplying,
          fatherName || null,
          motherName || null,
          phone || null,
          email || null,
          address || null,
          city || null,
          state || null,
          pincode || null,
          photoFileName,
          birthCertFileName,
          marksheetFileName
        ]
      );
      console.log('✅ Application saved to MySQL');
    }

    await appendToGoogleSheet(buildApplicationSheetRow(applicationData), GOOGLE_SHEET_RANGE);

    return res.status(201).json(formatApplication({
      application_id: applicationId,
      student_name: studentName,
      class_applying: classApplying,
      created_at: new Date(),
      status: 'Approved',
      dob,
      gender,
      father_name: fatherName,
      mother_name: motherName,
      phone,
      email,
      address,
      city,
      state,
      pincode,
      photo_file_name: photoFileName,
      birth_cert_file_name: birthCertFileName,
      marksheet_file_name: marksheetFileName
    }));
  } catch (error) {
    console.error('Application save failed:', error);
    return res.status(500).json({
      message: 'Unable to save application. Please try again later.'
    });
  }
});

app.get('/api/applications/:applicationId', async (req, res) => {
  try {
    const applicationId = req.params.applicationId;

    if (useFirebase && db) {
      const doc = await db.collection('applications').doc(applicationId).get();
      if (!doc.exists) {
        return res.status(404).json({
          message: "We couldn't find an application matching this ID. Please check and try again."
        });
      }
      const data = doc.data();
      return res.json({
        id: data.application_id,
        name: data.student_name,
        grade: data.class_applying,
        date: new Date(data.created_at).toLocaleDateString('en-US', {
          month: 'short', day: 'numeric', year: 'numeric'
        }),
        status: data.status,
        studentName: data.student_name,
        dob: data.dob,
        gender: data.gender,
        classApplying: data.class_applying,
        fatherName: data.father_name,
        motherName: data.mother_name,
        phone: data.phone,
        email: data.email,
        address: data.address,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        photoFileName: data.photo_file_name,
        birthCertFileName: data.birth_cert_file_name,
        marksheetFileName: data.marksheet_file_name
      });
    }

    const [rows] = await pool.query(
      'SELECT * FROM applications WHERE application_id = ?',
      [applicationId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "We couldn't find an application matching this ID. Please check and try again."
      });
    }

    return res.json(formatApplication(rows[0]));
  } catch (error) {
    console.error('Application lookup failed:', error);
    return res.status(500).json({
      message: 'Unable to check application status. Please try again later.'
    });
  }
});

// Contact Form Endpoint - Saves to Firebase
app.post('/api/contact', async (req, res) => {
  const { fullName, email, phone, subject, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({
      message: 'Full name, email, and message are required.'
    });
  }

  try {
    const contactData = {
      fullName,
      email,
      phone: phone || '',
      subject: subject || 'General Inquiry',
      message,
      createdAt: new Date().toISOString(),
      timestamp: Date.now()
    };

    // Save to Firebase if available
    if (useFirebase && db) {
      await db.collection('contact_messages').add(contactData);
      console.log('✅ Contact message saved to Firebase');
    } else {
      // Fallback to MySQL
      await pool.query(
        `INSERT INTO contact_messages (full_name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)`,
        [fullName, email, phone || null, subject || 'General Inquiry', message]
      );
      console.log('✅ Contact message saved to MySQL');
    }

    await appendToGoogleSheet(buildContactSheetRow(contactData), GOOGLE_SHEET_RANGE);

    return res.status(201).json({
      message: 'Thank you for contacting us! We will get back to you soon.',
      success: true
    });
  } catch (error) {
    console.error('Contact message save failed:', error);
    return res.status(500).json({
      message: 'Unable to send message. Please try again later.',
      success: false
    });
  }
});

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database initialization failed:', error);
    process.exit(1);
  });
