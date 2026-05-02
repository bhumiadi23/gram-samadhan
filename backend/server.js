require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Grievance = require('./models/Grievance');
const Notice = require('./models/Notice');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gram-samadhan';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Generate a random tracking ID (e.g., GRV-4829-MK)
const generateTrackingId = () => {
  const nums = Math.floor(1000 + Math.random() * 9000);
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const chars = letters.charAt(Math.floor(Math.random() * 26)) + letters.charAt(Math.floor(Math.random() * 26));
  return `GRV-${nums}-${chars}`;
};

// ==========================================
// ROUTES
// ==========================================

// --- GRIEVANCES ---

// Submit a new grievance
app.post('/api/grievances', async (req, res) => {
  try {
    const { name, phone, category, ward, description } = req.body;
    
    const newGrievance = new Grievance({
      trackingId: generateTrackingId(),
      name,
      phone,
      category,
      ward,
      description,
      status: 'Pending'
    });

    await newGrievance.save();
    res.status(201).json({ success: true, trackingId: newGrievance.trackingId, message: 'Grievance submitted successfully' });
  } catch (error) {
    console.error('Error submitting grievance:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Track a grievance by Tracking ID
app.get('/api/grievances/track/:trackingId', async (req, res) => {
  try {
    const trackingId = req.params.trackingId.toUpperCase();
    const grievance = await Grievance.findOne({ trackingId });
    
    if (!grievance) {
      return res.status(404).json({ success: false, message: 'Grievance not found' });
    }
    
    res.json({ success: true, data: grievance });
  } catch (error) {
    console.error('Error tracking grievance:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// --- NOTICES ---

// Get all notices
app.get('/api/notices', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json({ success: true, data: notices });
  } catch (error) {
    console.error('Error fetching notices:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Seed notices (Development utility)
app.post('/api/seed-notices', async (req, res) => {
  try {
    const count = await Notice.countDocuments();
    if (count > 0) return res.json({ message: 'Database already seeded' });

    const initialNotices = [
      {
        title: 'Pradhan Mantri Awas Yojana Registration',
        date: 'Oct 12, 2024',
        category: 'Scheme',
        content: 'The registration camp for PMAY will be held at the Panchayat Bhawan next week from Monday to Wednesday. All eligible citizens must bring their Aadhaar card, Ration card, and recent passport size photographs.',
        hasAttachment: true,
      },
      {
        title: 'Water Supply Interruption in Ward 3 & 4',
        date: 'Oct 10, 2024',
        category: 'Alert',
        content: 'Due to major pipeline repair work near the main water tank, water supply in Ward 3 and 4 will be interrupted tomorrow from 10 AM to 4 PM. Please store adequate water.',
        hasAttachment: false,
      },
      {
        title: 'Gram Sabha Meeting - November',
        date: 'Oct 05, 2024',
        category: 'Meeting',
        content: 'The upcoming Gram Sabha meeting is scheduled for November 1st at 11:00 AM at the Panchayat courtyard. Key agendas include budget allocation for the new road construction and sanitation review.',
        hasAttachment: true,
      },
      {
        title: 'Kisan Credit Card (KCC) Renewal',
        date: 'Oct 01, 2024',
        category: 'Agriculture',
        content: 'Farmers who need to renew their Kisan Credit Cards can meet the bank representatives at the Panchayat office on Friday. Please bring your land records and previous KCC passbook.',
        hasAttachment: false,
      }
    ];

    await Notice.insertMany(initialNotices);
    res.json({ success: true, message: 'Notices seeded successfully' });
  } catch (error) {
    console.error('Error seeding notices:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
