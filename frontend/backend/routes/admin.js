import express from 'express';
import { authenticate, authMiddleware } from '../security/auth.js';
import {
  getProfile,
  updateProfile,
  getSkills,
  addSkill,
  updateSkill,
  deleteSkill,
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  updateResumeVersion,
} from '../models/data.js';

const router = express.Router();

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        ok: false, 
        error: 'Email and password are required' 
      });
    }

    try {
      const { token, user } = await authenticate(email, password);
      
      // Set secure, HTTP-only cookie with the token
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure in production
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });
      
      // Also send the token in the response for clients that need it
      res.json({ 
        ok: true, 
        token, 
        user,
        message: 'Login successful' 
      });
    } catch (authError) {
      console.error('Login failed for email:', email, 'Error:', authError.message);
      // Don't reveal whether the email exists or the password was wrong
      res.status(401).json({ 
        ok: false, 
        error: 'Invalid email or password' 
      });
    }
  } catch (e) {
    console.error('Login error:', e);
    res.status(500).json({ 
      ok: false, 
      error: 'An error occurred during login. Please try again.' 
    });
  }
});

// Verify token
router.get('/me', authMiddleware, (req, res) => {
  res.json({ ok: true, user: req.user });
});

// Profile routes
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ ok: true, profile: getProfile() });
});

router.put('/profile', authMiddleware, (req, res) => {
  try {
    const profile = updateProfile(req.body);
    res.json({ ok: true, profile });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
});

// Skills routes
router.get('/skills', authMiddleware, (req, res) => {
  res.json({ ok: true, skills: getSkills() });
});

router.post('/skills', authMiddleware, (req, res) => {
  try {
    const skill = addSkill(req.body);
    res.json({ ok: true, skill });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
});

router.put('/skills/:id', authMiddleware, (req, res) => {
  try {
    const skill = updateSkill(req.params.id, req.body);
    res.json({ ok: true, skill });
  } catch (e) {
    res.status(404).json({ ok: false, error: e.message });
  }
});

router.delete('/skills/:id', authMiddleware, (req, res) => {
  try {
    deleteSkill(req.params.id);
    res.json({ ok: true });
  } catch (e) {
    res.status(404).json({ ok: false, error: e.message });
  }
});

// Projects routes
router.get('/projects', authMiddleware, (req, res) => {
  res.json({ ok: true, projects: getProjects() });
});

router.post('/projects', authMiddleware, (req, res) => {
  try {
    const project = addProject(req.body);
    res.json({ ok: true, project });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
});

router.put('/projects/:id', authMiddleware, (req, res) => {
  try {
    const project = updateProject(req.params.id, req.body);
    res.json({ ok: true, project });
  } catch (e) {
    res.status(404).json({ ok: false, error: e.message });
  }
});

router.delete('/projects/:id', authMiddleware, (req, res) => {
  try {
    deleteProject(req.params.id);
    res.json({ ok: true });
  } catch (e) {
    res.status(404).json({ ok: false, error: e.message });
  }
});

// Resume routes
router.put('/resume', authMiddleware, (req, res) => {
  try {
    const version = updateResumeVersion(req.body.version || new Date().toISOString());
    res.json({ ok: true, version });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
});

export default router;

