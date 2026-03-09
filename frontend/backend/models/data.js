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
      'As a Full Stack Developer and Team Lead, I architected and developed a comprehensive ride-sharing platform with real-time tracking and secure payment integration. The application features a responsive React.js frontend and a robust Spring Boot backend with JWT authentication. Key achievements include implementing real-time location tracking, optimizing database queries for better performance, and leading a team of 3 developers to deliver the project on schedule. The platform serves 1000+ users with 99.9% uptime on AWS infrastructure.',
    tech: ['React.js', 'Spring Boot', 'JWT Authentication', 'RESTful APIs', 'MySQL', 'AWS (EC2, S3, RDS)', 'Docker', 'WebSocket', 'Leaflet Maps', 'Redux'],
    githubUrl: 'https://github.com/ShaikMohammedSameer3903/APNA-RIDE.git',
    demoUrl: 'https://www.linkedin.com/posts/shaik-mohammed-sameer-6802bb2a0_react-springboot-fullstack-activity-7394019165361197057-IjOT?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEio4QABzGt4nn_N-Qx74mnuO0sJ2stg2wo',
    imageUrl: '/assets/image/apnaride.jpg',
    period: 'March 2024 - Present',
    role: 'Full Stack Developer & Team Lead',
    responsibilities: [
      'Led a team of 3 developers in implementing core features',
      'Designed and implemented the real-time tracking system using WebSocket',
      'Optimized database queries resulting in 40% faster response times',
      'Implemented secure payment integration with Stripe',
      'Set up CI/CD pipeline using GitHub Actions and Docker'
    ]
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
      'A comprehensive, scalable microservices-based food delivery platform built with modern best practices. Designed the system to support multi-role users (Customer, Restaurant, Delivery, Admin) with real-time order workflows, secure payments, and AI-driven features such as personalized recommendations, route optimization, and chatbot-based support.',
    tech: [
      'React.js',
      'Redux Toolkit',
      'Tailwind CSS',
      'Spring Boot (Java 17)',
      'Spring Cloud Gateway (API Gateway)',
      'JWT Authentication',
      'REST APIs',
      'PostgreSQL',
      'Redis',
      'Stripe Payments',
      'Docker & Docker Compose',
      'Python FastAPI (AI Service)',
      'OpenAI API (Chatbot)',
      'ML Recommendations & Route Optimization'
    ],
    githubUrl: 'https://github.com/ShaikMohammedSameer3903/BITFLOW-A-Food-Delivery-Platform.git',
    demoUrl: 'https://www.linkedin.com/posts/shaik-mohammed-sameer-6802bb2a0_react-springboot-fullstack-activity-7394019165361197057-IjOT?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEio4QABzGt4nn_N-Qx74mnuO0sJ2stg2wo',
    liveUrl: '',
    imageUrl: '/assets/image/bitflow.jpg',
    period: 'June 2024 - August 2024',
    role: 'Full Stack Developer',
    responsibilities: [
      'Implemented microservices modules (User, Restaurant, Delivery, Payment) with an API Gateway',
      'Built multi-role React interfaces with Redux Toolkit and responsive UI',
      'Integrated JWT-based authentication and role-based access control',
      'Integrated Stripe payment flow and order lifecycle management',
      'Connected an AI service (FastAPI) for recommendations, route optimization, and chatbot support',
      'Containerized services using Docker Compose for local and deployment-ready setup'
    ]
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

