// Simple in-memory data storage (replace with database in production)
let profile = {
  name: 'Shaik Mohammed Sameer',
  headline: 'B.Tech CSE | KL University',
  about: 'I am Shaik Mohammed Sameer, a B.Tech CSE student at KL University, skilled in web development and programming. I enjoy building scalable solutions using modern technologies like React.js, Spring Boot, and Firebase. I possess strong logical and analytical skills, with experience leading a team of 3 in the Farmer-Friendly Platform project, demonstrating teamwork and communication.',
  linkedin: 'https://linkedin.com/in/shaik-mohammed-sameer-6802bb2a0/',
  github: 'https://github.com/ShaikMohammedSameer3903',
  contactEmail: 'shaiksameer3909sam@gmail.com',
  contactPhone: '+91 9030259526',
  contactLocation: 'Vijayawada, Andhra Pradesh, India',
};

let skills = [
  // Programming Languages
  { id: 1, name: 'C', category: 'Programming' },
  { id: 2, name: 'Java', category: 'Programming' },
  
  // Web Development
  { id: 3, name: 'HTML', category: 'Web' },
  { id: 4, name: 'CSS', category: 'Web' },
  { id: 5, name: 'JavaScript', category: 'Web' },
  { id: 6, name: 'React.js', category: 'Web' },
  { id: 7, name: 'Vite', category: 'Web' },
  { id: 8, name: 'Spring Boot', category: 'Web' },
  { id: 9, name: 'Node.js', category: 'Web' },
  
  // Cloud & DevOps
  { id: 10, name: 'AWS', category: 'DevOps' },
  { id: 11, name: 'Docker', category: 'DevOps' },
  { id: 12, name: 'Jenkins', category: 'DevOps' },
  { id: 13, name: 'Git', category: 'DevOps' },
  
  // Database
  { id: 14, name: 'SQL', category: 'Database' },
  { id: 15, name: 'MySQL', category: 'Database' },
  
  // Operating Systems
  { id: 16, name: 'Linux', category: 'OS' },
  { id: 17, name: 'Windows', category: 'OS' },
  
  // Tools
  { id: 18, name: 'Power BI', category: 'Tools' },
  { id: 19, name: 'LaTeX', category: 'Tools' },
];

let projects = [
  {
    id: 1,
    title: 'APNA-RIDE - Professional Ride Sharing Platform',
    description:
      'A comprehensive ride-sharing platform connecting drivers and passengers with real-time tracking. Features include user authentication, ride booking, real-time location tracking, fare calculation, and payment integration. The admin dashboard provides analytics, user management, and ride monitoring capabilities. Built with modern web technologies for a seamless user experience.',
    tech: ['React.js', 'Spring Boot', 'JWT Authentication', 'RESTful APIs', 'MySQL', 'AWS', 'Docker', 'Leaflet Maps'],
    githubUrl: 'https://github.com/ShaikMohammedSameer3903/APNA-RIDE.git',
    liveUrl: '',
    imageUrl: '/assets/image/apnaride.jpg',
    period: 'March 2024 - Present',
  },
  {
    id: 2,
    title: 'Online Shopping Application',
    description:
      'Built a full e-commerce platform using React.js and Spring Boot. Implemented authentication, product catalog, cart, payments, and Admin Dashboard. Setup CI/CD pipelines using Jenkins, Docker, and AWS EC2. Designed a responsive UI with reusable components.',
    tech: ['React.js', 'Spring Boot', 'Jenkins', 'Docker', 'AWS EC2'],
    githubUrl: '',
    liveUrl: '',
    imageUrl: '/assets/image/shopping.jpg',
    period: 'February 2025 - March 2025',
  },
  {
    id: 3,
    title: 'BITFLOW - A Food Delivery Platform',
    description:
      'Food delivery platform project. See the GitHub repository for implementation details, features, and setup steps.',
    tech: ['Web Application'],
    githubUrl: 'https://github.com/ShaikMohammedSameer3903/BITFLOW-A-Food-Delivery-Platform.git',
    liveUrl: '',
    imageUrl: '',
    period: '',
  },
  {
    id: 4,
    title: 'Crop Master - Agriculture Management System',
    description:
      'Agriculture management system to streamline farm operations. Includes user authentication, farmland & crop management, resource tracking (machinery/chemicals/water), weather insights, disease reporting, task scheduling, and analytics. Designed to be mobile responsive for on-the-go farm management.',
    tech: ['React.js', 'Spring Boot', 'Spring Security', 'Spring Data JPA', 'MySQL', 'REST APIs'],
    githubUrl: 'https://github.com/ShaikMohammedSameer3903/FARMER-CROPMASTER1.git',
    liveUrl: '',
    imageUrl: '',
    period: '',
  },
];

let resumeVersion = '';

let nextSkillId = 20;
let nextProjectId = 5;

export const getProfile = () => ({ ...profile });
export const updateProfile = (updates) => {
  profile = { ...profile, ...updates };
  return { ...profile };
};

export const getSkills = () => [...skills];
export const addSkill = (skill) => {
  const newSkill = { id: nextSkillId++, ...skill };
  skills.push(newSkill);
  return newSkill;
};
export const updateSkill = (id, updates) => {
  const index = skills.findIndex((s) => s.id === parseInt(id));
  if (index === -1) throw new Error('Skill not found');
  skills[index] = { ...skills[index], ...updates };
  return skills[index];
};
export const deleteSkill = (id) => {
  const index = skills.findIndex((s) => s.id === parseInt(id));
  if (index === -1) throw new Error('Skill not found');
  skills.splice(index, 1);
  return true;
};

export const getProjects = () => [...projects];
export const addProject = (project) => {
  const newProject = { id: nextProjectId++, ...project };
  projects.push(newProject);
  return newProject;
};
export const updateProject = (id, updates) => {
  const index = projects.findIndex((p) => p.id === parseInt(id));
  if (index === -1) throw new Error('Project not found');
  projects[index] = { ...projects[index], ...updates };
  return projects[index];
};
export const deleteProject = (id) => {
  const index = projects.findIndex((p) => p.id === parseInt(id));
  if (index === -1) throw new Error('Project not found');
  projects.splice(index, 1);
  return true;
};

export const getResumeVersion = () => resumeVersion;
export const updateResumeVersion = (version) => {
  resumeVersion = version;
  return resumeVersion;
};

