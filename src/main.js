// frontend/src/main.js
import 'aos/dist/aos.css';
import AOS from 'aos';

// Inject HTML template
import appHtml from './app.html?raw';

document.getElementById('app').innerHTML = appHtml;

// Bootstrap and FontAwesome via CDN are in index.html
// Initialize AOS
AOS.init({ duration: 1000, once: false, easing: 'ease-in-out' });

// Particles.js via CDN
const particlesScript = document.createElement('script');
particlesScript.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
particlesScript.onload = () => {
  if (window.particlesJS) {
    window.particlesJS('particles-js', {
      particles: {
        number: { value: window.innerWidth < 768 ? 40 : 80, density: { enable: true, value_area: 800 } },
        color: { value: ['#2ecc71', '#3498db', '#f1c40f'] },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#2ecc71', opacity: 0.2, width: 1 },
        move: { enable: true, speed: 2, direction: 'none', random: true, straight: false, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { repulse: { distance: 100 }, push: { particles_nb: 4 } }
      },
      retina_detect: true
    });
  }
};
document.head.appendChild(particlesScript);

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setLink(id, href) {
  const el = document.getElementById(id);
  if (el && href) el.setAttribute('href', href);
}

function showModal(id) {
  const el = document.getElementById(id);
  if (!el || !window.bootstrap?.Modal) return null;
  const modal = window.bootstrap.Modal.getOrCreateInstance(el);
  modal.show();
  return modal;
}

function hideModal(id) {
  const el = document.getElementById(id);
  if (!el || !window.bootstrap?.Modal) return;
  const modal = window.bootstrap.Modal.getOrCreateInstance(el);
  modal.hide();
}

// Enhanced animations and interactions
document.addEventListener('DOMContentLoaded', function() {
  applyStaggerAnimations();

  // Add mouse move parallax effect to hero section
  const heroSection = document.querySelector('.hero-section');
  const heroContent = document.querySelector('.hero-content');

  if (heroSection && heroContent) {
    heroSection.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      const translateX = (mouseX - 0.5) * 20;
      const translateY = (mouseY - 0.5) * 20;

      heroContent.style.transform = `translate(${translateX}px, ${translateY}px)`;
    });
  }

  // Add typing effect to dynamic text with enhanced animation
  const dynamicTextElement = document.getElementById('dynamic-text');
  if (dynamicTextElement) {
    dynamicTextElement.style.borderRight = '3px solid var(--accent-color)';
    dynamicTextElement.style.animation = 'blink-caret 1s step-end infinite';
  }

  // Add CSS for additional animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes blink-caret {
      from, to { border-color: transparent; }
      50% { border-color: var(--accent-color); }
    }

    @keyframes fade-in-up {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .fade-in-up {
      animation: fade-in-up 0.6s ease-out forwards;
    }

    .glass-card {
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .glass-card:hover {
      transform: translateY(-15px) scale(1.02);
      box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    }

    .social-icon {
      transition: all 0.3s ease;
    }

    .social-icon:hover {
      filter: drop-shadow(0 0 10px var(--secondary-color));
    }
  `;
  document.head.appendChild(style);
});

function applyStaggerAnimations() {
  const skillBadges = document.querySelectorAll('.skill-badge');
  skillBadges.forEach((badge, index) => {
    badge.style.animationDelay = `${index * 0.1}s`;
    badge.classList.add('fade-in-up');
  });
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
    card.classList.add('fade-in-up');
  });
}

loadPublicContent();

// Navbar scroll effect
const navbar = document.getElementById('mainNavbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth scrolling and mobile navbar auto-close
const navLinks = document.querySelectorAll('.nav-link');
const navbarCollapse = document.getElementById('navbarNav');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
    }
    if (navbarCollapse && navbarCollapse.classList.contains('show') && window.bootstrap) {
      window.bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
    }
  });
});

// Active nav item
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-hover');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.pageYOffset >= (sectionTop - 100)) {
      current = section.getAttribute('id');
    }
  });
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${current}`) {
      item.classList.add('active');
    }
  });
});

// Highlight skills (event delegation so it works with dynamically rendered skills)
document.addEventListener('mouseover', (e) => {
  const badge = e.target?.closest?.('.skill-badge');
  if (!badge) return;
  badge.classList.add('highlighted');
});
document.addEventListener('mouseout', (e) => {
  const badge = e.target?.closest?.('.skill-badge');
  if (!badge) return;
  badge.classList.remove('highlighted');
});

// Project Live links via env (optional)
const biteflowLive = import.meta.env.VITE_BITEFLOW_URL || '';
const shoppingLive = import.meta.env.VITE_SHOPPING_URL || '';
const biteflowDemoLink = document.getElementById('biteflow-demo-link');
const shoppingDemoLink = document.getElementById('shopping-demo-link');
if (biteflowDemoLink) {
  if (biteflowLive) biteflowDemoLink.href = biteflowLive; else biteflowDemoLink.style.display = 'none';
}
if (shoppingDemoLink) {
  if (shoppingLive) shoppingDemoLink.href = shoppingLive; else shoppingDemoLink.style.display = 'none';
}

// Contact form submission to backend
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
let API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
function apiUrl(path) {
  if (!path.startsWith('/')) return apiUrl(`/${path}`);
  return API_BASE ? `${API_BASE}${path}` : path;
}

async function fetchJson(path, options = {}) {
  const res = await fetch(apiUrl(path), {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data?.ok === false) {
    const msg = data?.error || `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data;
}

const storageKey = 'sameer_admin_token';
function getToken() {
  return localStorage.getItem(storageKey) || '';
}
function setToken(token) {
  if (token) localStorage.setItem(storageKey, token);
  else localStorage.removeItem(storageKey);
}

async function isAuthenticated() {
  const token = getToken();
  if (!token) return false;
  try {
    await fetchJson('/api/admin/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return true;
  } catch (_e) {
    setToken('');
    return false;
  }
}

const fallbackProfile = {
  name: 'Shaik Mohammed Sameer',
  headline: 'B.Tech CSE | KL University',
  about: document.getElementById('footerAbout')?.textContent || '',
  linkedin: document.getElementById('profileLinkedin')?.getAttribute('href') || '',
  github: document.getElementById('profileGithub')?.getAttribute('href') || '',
  contactEmail: document.getElementById('contactEmail')?.textContent || '',
  contactPhone: document.getElementById('contactPhone')?.textContent || '',
  contactLocation: document.getElementById('contactLocation')?.textContent || '',
};

const fallbackSkills = [
  { name: 'C', category: 'Programming' },
  { name: 'Java', category: 'Programming' },
  { name: 'React.js', category: 'Web' },
  { name: 'Node.js', category: 'Web' },
  { name: 'Spring Boot', category: 'Web' },
  { name: 'HTML', category: 'Web' },
  { name: 'CSS', category: 'Web' },
  { name: 'SQL', category: 'Other' },
  { name: 'MySQL', category: 'Other' },
  { name: 'Firebase', category: 'Other' },
  { name: 'Linux', category: 'Other' },
  { name: 'Power BI', category: 'Other' },
  { name: 'LaTeX', category: 'Other' },
];

const fallbackProjects = [
  {
    title: 'ApnaRide - Ride Sharing Platform',
    description:
      'A comprehensive ride-sharing platform connecting drivers with passengers, featuring real-time tracking, fare estimation, and secure payments.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Express', 'Google Maps API'],
    githubUrl: '',
    liveUrl: '',
    imageUrl: '/assets/image/placeholder.svg',
  },
  {
    title: 'Food Delivery Platform',
    description:
      'An end-to-end food delivery solution with restaurant listings, menu management, cart functionality, and order tracking.',
    tech: ['React Native', 'Node.js', 'MongoDB', 'Firebase', 'Redux'],
    githubUrl: '',
    liveUrl: '',
    imageUrl: '/assets/image/placeholder.svg',
  },
  {
    title: 'Farmer-Friendly Platform',
    description: 'A web platform for direct agricultural sales with real-time features.',
    tech: ['React.js', 'Spring Boot', 'MySQL'],
    githubUrl: 'https://github.com/ShaikMohammedSameer3903/farm-web',
    liveUrl: '',
    imageUrl: '/assets/image/farmer-platform.jpg',
  },
];

function iconForSkill(name) {
  const map = {
    C: 'fab fa-cuttlefish',
    Java: 'fab fa-java',
    'React.js': 'fab fa-react',
    'Node.js': 'fab fa-node-js',
    'Spring Boot': 'fas fa-server',
    HTML: 'fab fa-html5',
    CSS: 'fab fa-css3-alt',
    SQL: 'fas fa-database',
    MySQL: 'fas fa-database',
    Firebase: 'fas fa-database',
    Linux: 'fab fa-linux',
    'Power BI': 'fas fa-chart-bar',
    LaTeX: 'fas fa-file-alt',
  };
  return map[name] || 'fas fa-check';
}

function renderProfile(profile) {
  const p = profile || fallbackProfile;
  setText('profileName', p.name || fallbackProfile.name);
  setText('profileHeadline', p.headline || fallbackProfile.headline);
  setText('footerAbout', p.about || fallbackProfile.about);
  if (p.linkedin) {
    setLink('profileLinkedin', p.linkedin);
    setLink('footerLinkedin', p.linkedin);
  }
  if (p.github) {
    setLink('profileGithub', p.github);
    setLink('footerGithub', p.github);
  }
  if (p.contactEmail) {
    const emailEl = document.getElementById('contactEmail');
    if (emailEl) {
      emailEl.textContent = p.contactEmail;
      emailEl.setAttribute('href', `mailto:${p.contactEmail}`);
    }
  }
  if (p.contactPhone) {
    const phoneEl = document.getElementById('contactPhone');
    if (phoneEl) {
      phoneEl.textContent = p.contactPhone;
      const tel = String(p.contactPhone).replace(/\s+/g, '');
      phoneEl.setAttribute('href', `tel:${tel}`);
    }
  }
  if (p.contactLocation) setText('contactLocation', p.contactLocation);
}

function createSkillBadge(skill) {
  const span = document.createElement('span');
  span.className = 'skill-badge';
  span.setAttribute('data-skill', skill.name);
  span.innerHTML = `<i class="${escapeHtml(iconForSkill(skill.name))}"></i> ${escapeHtml(skill.name)}`;
  return span;
}

function renderSkills(skills) {
  const list = Array.isArray(skills) && skills.length ? skills : fallbackSkills;
  const programming = document.getElementById('skillsProgramming');
  const web = document.getElementById('skillsWeb');
  const other = document.getElementById('skillsOther');
  if (programming) programming.innerHTML = '';
  if (web) web.innerHTML = '';
  if (other) other.innerHTML = '';
  for (const s of list) {
    const category = String(s.category || '').toLowerCase();
    const badge = createSkillBadge({ name: s.name, category: s.category });
    if (category === 'programming') programming?.appendChild(badge);
    else if (category === 'web') web?.appendChild(badge);
    else other?.appendChild(badge);
  }
}

function renderProjects(projects) {
  const list = Array.isArray(projects) && projects.length ? projects : fallbackProjects;
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  list.forEach((p, idx) => {
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6 col-lg-4';
    col.setAttribute('data-aos', 'zoom-in');
    if (idx) col.setAttribute('data-aos-delay', String(Math.min(idx * 100, 300)));

    const imgUrl = p.imageUrl || '/assets/image/placeholder.svg';
    const tech = Array.isArray(p.tech) ? p.tech : [];

    const githubBtn = p.githubUrl
      ? `<a href="${escapeHtml(p.githubUrl)}" target="_blank" class="view-code-btn"><i class="fab fa-github"></i> GitHub</a>`
      : '';
    const liveBtn = p.liveUrl
      ? `<a href="${escapeHtml(p.liveUrl)}" target="_blank" class="view-code-btn"><i class="fas fa-external-link-alt"></i> Live Demo</a>`
      : '';

    col.innerHTML = `
      <div class="glass-card project-card h-100">
        <img loading="lazy" src="${escapeHtml(imgUrl)}" onerror="this.onerror=null;this.src='/assets/image/placeholder.svg';" alt="${escapeHtml(p.title || 'Project')}" class="img-fluid rounded-top mb-3">
        <h5>${escapeHtml(p.title || '')}</h5>
        <p>${escapeHtml(p.description || '')}</p>
        <p><strong>Tech:</strong></p>
        <div class="tech-container">
          ${tech.map(t => `<span class="tech-badge">${escapeHtml(t)}</span>`).join('')}
        </div>
        ${githubBtn || liveBtn ? `<div class="d-flex gap-2 mt-3">${githubBtn}${liveBtn}</div>` : ''}
      </div>
    `;
    grid.appendChild(col);
  });
}

function applyResumeLink(resume) {
  const link = document.getElementById('resumeDownloadLink');
  if (!link) return;
  const url = resume?.url || '/assets/resumea1.pdf';
  const version = resume?.version || '';
  const nextHref = version ? `${url}?v=${encodeURIComponent(version)}` : url;
  link.setAttribute('href', nextHref);
}

async function loadPublicContent() {
  try {
    const [profileRes, skillsRes, projectsRes, resumeRes] = await Promise.allSettled([
      fetchJson('/api/public/profile'),
      fetchJson('/api/public/skills'),
      fetchJson('/api/public/projects'),
      fetchJson('/api/public/resume'),
    ]);

    const profile = profileRes.status === 'fulfilled' ? profileRes.value.profile : fallbackProfile;
    const skills = skillsRes.status === 'fulfilled' ? skillsRes.value.skills : fallbackSkills;
    const projects = projectsRes.status === 'fulfilled' ? projectsRes.value.projects : fallbackProjects;
    const resume = resumeRes.status === 'fulfilled' ? resumeRes.value : { url: '/assets/resumea1.pdf', version: '' };

    renderProfile(profile);
    renderSkills(skills);
    renderProjects(projects);
    applyResumeLink(resume);

    applyStaggerAnimations();
    AOS.refresh();
  } catch (_e) {
    renderProfile(fallbackProfile);
    renderSkills(fallbackSkills);
    renderProjects(fallbackProjects);
    applyResumeLink({ url: '/assets/resumea1.pdf', version: '' });
    applyStaggerAnimations();
  }
}

function setAdminMessage(type, msg) {
  const err = document.getElementById('adminDashboardError');
  const ok = document.getElementById('adminDashboardSuccess');
  if (err) err.textContent = '';
  if (ok) ok.textContent = '';
  if (type === 'error' && err) err.textContent = msg;
  if (type === 'success' && ok) ok.textContent = msg;
}

async function adminFetch(path, options = {}) {
  const token = getToken();
  return fetchJson(path, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });
}

function fillProfileForm(profile) {
  const p = profile || {};
  const setVal = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.value = value || '';
  };
  setVal('adminProfileName', p.name);
  setVal('adminProfileHeadline', p.headline);
  setVal('adminProfileAbout', p.about);
  setVal('adminProfileLinkedin', p.linkedin);
  setVal('adminProfileGithub', p.github);
  setVal('adminContactEmail', p.contactEmail);
  setVal('adminContactPhone', p.contactPhone);
  setVal('adminContactLocation', p.contactLocation);
}

function renderAdminSkillsTable(skills) {
  const body = document.getElementById('adminSkillsTableBody');
  if (!body) return;
  body.innerHTML = '';
  (skills || []).forEach((s) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${escapeHtml(s.name || '')}</td>
      <td>${escapeHtml(s.category || '')}</td>
      <td>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-warning btn-sm" data-action="edit-skill" data-id="${escapeHtml(String(s.id))}">Edit</button>
          <button class="btn btn-outline-danger btn-sm" data-action="delete-skill" data-id="${escapeHtml(String(s.id))}">Delete</button>
        </div>
      </td>
    `;
    body.appendChild(tr);
  });
}

function renderAdminProjectsTable(projects) {
  const body = document.getElementById('adminProjectsTableBody');
  if (!body) return;
  body.innerHTML = '';
  (projects || []).forEach((p) => {
    const tr = document.createElement('tr');
    const tech = Array.isArray(p.tech) ? p.tech.join(', ') : '';
    tr.innerHTML = `
      <td>${escapeHtml(p.title || '')}</td>
      <td>${escapeHtml(tech)}</td>
      <td>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-warning btn-sm" data-action="edit-project" data-id="${escapeHtml(String(p.id))}">Edit</button>
          <button class="btn btn-outline-danger btn-sm" data-action="delete-project" data-id="${escapeHtml(String(p.id))}">Delete</button>
        </div>
      </td>
    `;
    body.appendChild(tr);
  });
}

let adminCache = { profile: null, skills: [], projects: [], resume: { version: '' } };
async function loadAdminData() {
  try {
    setAdminMessage('success', '');
    setAdminMessage('error', '');
    const [profileRes, skillsRes, projectsRes, resumeRes] = await Promise.all([
      adminFetch('/api/admin/profile'),
      adminFetch('/api/admin/skills'),
      adminFetch('/api/admin/projects'),
      fetchJson('/api/public/resume'),
    ]);
    adminCache.profile = profileRes.profile;
    adminCache.skills = skillsRes.skills;
    adminCache.projects = projectsRes.projects;
    adminCache.resume = { version: resumeRes.version || '' };

    fillProfileForm(adminCache.profile);
    renderAdminSkillsTable(adminCache.skills);
    renderAdminProjectsTable(adminCache.projects);
    const resumeVerEl = document.getElementById('adminResumeVersion');
    if (resumeVerEl) resumeVerEl.value = adminCache.resume.version || '';
  } catch (e) {
    setAdminMessage('error', e.message);
  }
}

const adminEntryBtn = document.getElementById('adminEntryBtn');
if (adminEntryBtn) {
  adminEntryBtn.addEventListener('click', async (e) => {
    const ok = await isAuthenticated();
    if (!ok) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    showModal('adminDashboardModal');
    await loadAdminData();
  });
}

const adminLoginForm = document.getElementById('adminLoginForm');
const adminLoginError = document.getElementById('adminLoginError');
if (adminLoginForm) {
  adminLoginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (adminLoginError) adminLoginError.textContent = '';
    try {
      const email = document.getElementById('adminEmail')?.value?.trim() || '';
      const password = document.getElementById('adminPassword')?.value || '';
      const data = await fetchJson('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setToken(data.token);
      hideModal('adminLoginModal');
      showModal('adminDashboardModal');
      await loadAdminData();
    } catch (err) {
      if (adminLoginError) adminLoginError.textContent = err.message;
    }
  });
}

const adminLogoutBtn = document.getElementById('adminLogoutBtn');
if (adminLogoutBtn) {
  adminLogoutBtn.addEventListener('click', () => {
    setToken('');
    hideModal('adminDashboardModal');
  });
}

const adminProfileForm = document.getElementById('adminProfileForm');
if (adminProfileForm) {
  adminProfileForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: document.getElementById('adminProfileName')?.value?.trim() || '',
        headline: document.getElementById('adminProfileHeadline')?.value?.trim() || '',
        about: document.getElementById('adminProfileAbout')?.value?.trim() || '',
        linkedin: document.getElementById('adminProfileLinkedin')?.value?.trim() || '',
        github: document.getElementById('adminProfileGithub')?.value?.trim() || '',
        contactEmail: document.getElementById('adminContactEmail')?.value?.trim() || '',
        contactPhone: document.getElementById('adminContactPhone')?.value?.trim() || '',
        contactLocation: document.getElementById('adminContactLocation')?.value?.trim() || '',
      };
      const data = await adminFetch('/api/admin/profile', { method: 'PUT', body: JSON.stringify(payload) });
      adminCache.profile = data.profile;
      renderProfile(adminCache.profile);
      setAdminMessage('success', 'Profile updated');
    } catch (e2) {
      setAdminMessage('error', e2.message);
    }
  });
}

const adminSkillAddForm = document.getElementById('adminSkillAddForm');
if (adminSkillAddForm) {
  adminSkillAddForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const name = document.getElementById('adminSkillName')?.value?.trim() || '';
      const category = document.getElementById('adminSkillCategory')?.value || '';
      await adminFetch('/api/admin/skills', { method: 'POST', body: JSON.stringify({ name, category }) });
      const nameEl = document.getElementById('adminSkillName');
      if (nameEl) nameEl.value = '';
      const skillsRes = await adminFetch('/api/admin/skills');
      adminCache.skills = skillsRes.skills;
      renderAdminSkillsTable(adminCache.skills);
      renderSkills(adminCache.skills);
      applyStaggerAnimations();
      setAdminMessage('success', 'Skill added');
    } catch (e2) {
      setAdminMessage('error', e2.message);
    }
  });
}

const adminSkillsTableBody = document.getElementById('adminSkillsTableBody');
if (adminSkillsTableBody) {
  adminSkillsTableBody.addEventListener('click', async (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const action = btn.getAttribute('data-action');
    const id = btn.getAttribute('data-id');
    if (!action || !id) return;
    try {
      if (action === 'delete-skill') {
        if (!confirm('Delete this skill?')) return;
        await adminFetch(`/api/admin/skills/${id}`, { method: 'DELETE' });
      }
      if (action === 'edit-skill') {
        const existing = (adminCache.skills || []).find(s => String(s.id) === String(id));
        const nextName = prompt('Skill name:', existing?.name || '');
        if (nextName === null) return;
        const nextCategory = prompt('Category (Programming/Web/Other):', existing?.category || 'Web');
        if (nextCategory === null) return;
        await adminFetch(`/api/admin/skills/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ name: nextName, category: nextCategory }),
        });
      }
      const skillsRes = await adminFetch('/api/admin/skills');
      adminCache.skills = skillsRes.skills;
      renderAdminSkillsTable(adminCache.skills);
      renderSkills(adminCache.skills);
      applyStaggerAnimations();
      setAdminMessage('success', 'Skills updated');
    } catch (e2) {
      setAdminMessage('error', e2.message);
    }
  });
}

const adminProjectAddForm = document.getElementById('adminProjectAddForm');
if (adminProjectAddForm) {
  adminProjectAddForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const title = document.getElementById('adminProjectTitle')?.value?.trim() || '';
      const description = document.getElementById('adminProjectDescription')?.value?.trim() || '';
      const techStr = document.getElementById('adminProjectTech')?.value || '';
      const tech = techStr.split(',').map(s => s.trim()).filter(Boolean);
      const githubUrl = document.getElementById('adminProjectGithub')?.value?.trim() || '';
      const liveUrl = document.getElementById('adminProjectLive')?.value?.trim() || '';
      const imageUrl = document.getElementById('adminProjectImage')?.value?.trim() || '';
      await adminFetch('/api/admin/projects', {
        method: 'POST',
        body: JSON.stringify({ title, description, tech, githubUrl, liveUrl, imageUrl }),
      });
      adminProjectAddForm.reset();
      const projectsRes = await adminFetch('/api/admin/projects');
      adminCache.projects = projectsRes.projects;
      renderAdminProjectsTable(adminCache.projects);
      renderProjects(adminCache.projects);
      applyStaggerAnimations();
      AOS.refresh();
      setAdminMessage('success', 'Project added');
    } catch (e2) {
      setAdminMessage('error', e2.message);
    }
  });
}

const adminProjectsTableBody = document.getElementById('adminProjectsTableBody');
if (adminProjectsTableBody) {
  adminProjectsTableBody.addEventListener('click', async (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const action = btn.getAttribute('data-action');
    const id = btn.getAttribute('data-id');
    if (!action || !id) return;
    try {
      if (action === 'delete-project') {
        if (!confirm('Delete this project?')) return;
        await adminFetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
      }
      if (action === 'edit-project') {
        const existing = (adminCache.projects || []).find(p => String(p.id) === String(id));
        const nextTitle = prompt('Title:', existing?.title || '');
        if (nextTitle === null) return;
        const nextDesc = prompt('Description:', existing?.description || '');
        if (nextDesc === null) return;
        const nextTech = prompt('Tech (comma separated):', (existing?.tech || []).join(', '));
        if (nextTech === null) return;
        const nextGithub = prompt('GitHub URL:', existing?.githubUrl || '');
        if (nextGithub === null) return;
        const nextLive = prompt('Live URL:', existing?.liveUrl || '');
        if (nextLive === null) return;
        const nextImage = prompt('Image URL:', existing?.imageUrl || '');
        if (nextImage === null) return;
        await adminFetch(`/api/admin/projects/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
            title: nextTitle,
            description: nextDesc,
            tech: String(nextTech).split(',').map(s => s.trim()).filter(Boolean),
            githubUrl: nextGithub,
            liveUrl: nextLive,
            imageUrl: nextImage,
          }),
        });
      }
      const projectsRes = await adminFetch('/api/admin/projects');
      adminCache.projects = projectsRes.projects;
      renderAdminProjectsTable(adminCache.projects);
      renderProjects(adminCache.projects);
      applyStaggerAnimations();
      AOS.refresh();
      setAdminMessage('success', 'Projects updated');
    } catch (e2) {
      setAdminMessage('error', e2.message);
    }
  });
}

const adminResumeForm = document.getElementById('adminResumeForm');
if (adminResumeForm) {
  adminResumeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      let version = document.getElementById('adminResumeVersion')?.value?.trim() || '';
      if (!version) version = new Date().toISOString();
      await adminFetch('/api/admin/resume', { method: 'PUT', body: JSON.stringify({ version }) });
      const resumeRes = await fetchJson('/api/public/resume');
      applyResumeLink(resumeRes);
      setAdminMessage('success', 'Resume version updated (download will refresh)');
    } catch (e2) {
      setAdminMessage('error', e2.message);
    }
  });
}
if (contactForm) {
  // If API_BASE is not configured, fall back to same-origin '/api/contact'
  const contactEndpoint = API_BASE ? `${API_BASE}/api/contact` : `/api/contact`;
  contactForm.action = contactEndpoint;
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitButton = contactForm.querySelector('button');
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    try {
      const name = contactForm.elements['name'].value.trim();
      const email = contactForm.elements['email'].value.trim();
      const subject = contactForm.elements['subject'].value.trim();
      const message = contactForm.elements['message'].value.trim();
      const website = contactForm.elements['website'] ? contactForm.elements['website'].value : '';

      // If API_BASE is not set, attempt same-origin endpoint (useful for local proxy or unified hosting)
      if (!API_BASE) {
        formStatus.innerHTML = '<div class="alert alert-warning">Using same-origin API endpoint. For Vercel + Render deploys, set VITE_API_BASE_URL in your Vercel project settings.</div>';
      }
      if (!name || !email || !message) throw new Error('Please fill in name, email, and message.');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) throw new Error('Please enter a valid email address.');

      const response = await fetch(contactForm.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message, website })
      });

      const data = await response.json().catch(() => ({}));
      if (response.ok && data.ok !== false) {
        formStatus.innerHTML = '<div class="alert alert-success">Message sent successfully!</div>';
        contactForm.reset();
      } else {
        const errMsg = (data && data.error) ? data.error : 'Failed to send message';
        throw new Error(errMsg);
      }
    } catch (error) {
      formStatus.innerHTML = '<div class="alert alert-danger">Error: ' + error.message + '</div>';
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message';
    }
  });
}
