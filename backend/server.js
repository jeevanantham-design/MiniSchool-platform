const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic route to test the backend
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Lumina Academy API is running smoothly' });
});

// Placeholder route for announcements
app.get('/api/announcements', (req, res) => {
  const announcements = [
    {
      id: 1,
      image: "/news1.png",
      date: "EVENTS • MARCH 12, 2024",
      title: "Virtual Open Day for Parents 2026",
      desc: "Join our live session with the Principal to understand our pedagogical approach."
    },
    {
      id: 2,
      image: "/news2.png",
      date: "ADMISSIONS • FEB 28, 2024",
      title: "Scholarship Applications are Now Open",
      desc: "Merit-based scholarships available for outstanding students in Grade 9 and 11."
    },
    {
      id: 3,
      image: "/news3.png",
      date: "CAMPUS LIFE • JAN 15, 2024",
      title: "New Olympic-sized Swimming Pool Inaugurated",
      desc: "Our new aquatic center is now open for students and extracurricular training."
    }
  ];
  res.json(announcements);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
