import express from 'express';
import { getProfile, getSkills, getProjects, getResumeVersion } from '../models/data.js';

const router = express.Router();

router.get('/profile', (req, res) => {
  try {
    const profile = getProfile();
    res.json({ ok: true, profile });
  } catch (error) {
    console.error('Error getting profile:', error);
    res.status(500).json({ ok: false, error: 'Failed to get profile' });
  }
});

router.get('/skills', (req, res) => {
  try {
    const skills = getSkills();
    res.json({ ok: true, skills });
  } catch (error) {
    console.error('Error getting skills:', error);
    res.status(500).json({ ok: false, error: 'Failed to get skills' });
  }
});

router.get('/projects', (req, res) => {
  try {
    const projects = getProjects();
    res.json({ ok: true, projects });
  } catch (error) {
    console.error('Error getting projects:', error);
    res.status(500).json({ ok: false, error: 'Failed to get projects' });
  }
});

router.get('/resume', (req, res) => {
  try {
    res.json({
      ok: true,
      url: '/assets/resumea1.pdf',
      version: getResumeVersion(),
    });
  } catch (error) {
    console.error('Error getting resume:', error);
    res.status(500).json({ ok: false, error: 'Failed to get resume info' });
  }
});

export default router;

