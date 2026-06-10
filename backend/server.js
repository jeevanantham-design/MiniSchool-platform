const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

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

app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({
      status: 'ok',
      database: 'connected',
      message: 'Monisha Matriculation School API is running smoothly'
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

app.post('/api/applications', async (req, res) => {
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
    pincode,
    photoFileName,
    birthCertFileName,
    marksheetFileName
  } = req.body;

  if (!studentName || !classApplying) {
    return res.status(400).json({
      message: 'Student name and class applying for are required.'
    });
  }

  try {
    const applicationId = await generateApplicationId();

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
        photoFileName || null,
        birthCertFileName || null,
        marksheetFileName || null
      ]
    );

    const [rows] = await pool.query(
      'SELECT * FROM applications WHERE application_id = ?',
      [applicationId]
    );

    return res.status(201).json(formatApplication(rows[0]));
  } catch (error) {
    console.error('Application save failed:', error);
    return res.status(500).json({
      message: 'Unable to save application. Please try again later.'
    });
  }
});

app.get('/api/applications/:applicationId', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM applications WHERE application_id = ?',
      [req.params.applicationId]
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
