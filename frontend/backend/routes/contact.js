import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const router = express.Router();

// Enable CORS for all routes
router.use(cors({
  origin: '*',
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Get the current directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MESSAGES_FILE = path.join(__dirname, '../../data/messages.json');

// Ensure messages directory exists
const ensureMessagesFileExists = () => {
  const dir = path.dirname(MESSAGES_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(MESSAGES_FILE)) {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify([], null, 2));
  }
};

// Initialize messages file
ensureMessagesFileExists();

// Contact form submission
router.post('/', (req, res) => {
  try {
    const { name, email, subject, message, website } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: 'Please fill in name, email, and message.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' });
    }

    // Create message object
    const newMessage = {
      id: Date.now(),
      name,
      email,
      subject: subject || '(No subject)',
      message,
      website: website || '',
      timestamp: new Date().toISOString(),
      read: false
    };

    // Read existing messages
    const messages = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf8'));
    
    // Add new message
    messages.push(newMessage);
    
    // Save back to file
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
    
    console.log('New contact form submission:', newMessage);

    res.json({ 
      ok: true, 
      message: 'Message received successfully!',
      data: newMessage
    });
  } catch (e) {
    console.error('Error processing contact form:', e);
    res.status(500).json({ 
      ok: false, 
      error: 'Failed to process your message. Please try again later.' 
    });
  }
});

// Admin route to get all messages (protected)
router.get('/messages', (req, res) => {
  try {
    if (!req.headers.authorization || req.headers.authorization !== `Bearer ${process.env.ADMIN_TOKEN}`) {
      return res.status(401).json({ ok: false, error: 'Unauthorized' });
    }
    
    const messages = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf8'));
    res.json({ ok: true, data: messages });
  } catch (e) {
    console.error('Error fetching messages:', e);
    res.status(500).json({ ok: false, error: 'Failed to fetch messages' });
  }
});

export default router;

