require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const submissionSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 150 },
  phone: { type: String, required: true, trim: true, maxlength: 20 },
  subject: { type: String, required: true, trim: true, maxlength: 120 },
  message: { type: String, required: true, trim: true, maxlength: 2000 },
  createdAt: { type: Date, default: Date.now }
});
const Submission = mongoose.model('Submission', submissionSchema);

app.post('/api/submissions', async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;
    if (![fullName, email, phone, subject, message].every(v => typeof v === 'string' && v.trim())) {
      return res.status(400).json({ message: 'Please complete all fields.' });
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) return res.status(400).json({ message: 'Enter a valid email address.' });
    const saved = await Submission.create({ fullName, email, phone, subject, message });
    res.status(201).json({ message: 'Your form was submitted successfully.', id: saved._id });
  } catch (error) {
    console.error('Submission error:', error);
    res.status(500).json({ message: 'Could not save your submission. Please try again.' });
  }
});

app.get('/api/health', (req, res) => res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' }));

const PORT = process.env.PORT || 3000;
async function start() {
  if (!process.env.MONGODB_URI) {
    console.error('Missing MONGODB_URI. Copy .env.example to .env and add your MongoDB connection string.');
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Website running at http://localhost:${PORT}`));
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}
start();
