# Portfolio Frontend

Modern, responsive portfolio website built with React.js and Tailwind CSS.

## Features

- ✨ Clean, modern, and professional design
- 📱 Fully responsive (mobile, tablet, laptop, desktop)
- 🔐 Admin login with dashboard
- 🎨 Beautiful animations and transitions
- ⚡ Fast and lightweight
- 🎯 SEO-friendly

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (optional, for API configuration):
```env
VITE_API_BASE_URL=http://localhost:3000
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Build

To build for production:
```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProjectCard.jsx
│   │   └── SkillBadge.jsx
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   ├── Contact.jsx
│   │   └── Login.jsx
│   ├── admin/           # Admin dashboard components
│   │   ├── Dashboard.jsx
│   │   ├── EditProfile.jsx
│   │   ├── EditSkills.jsx
│   │   ├── EditProjects.jsx
│   │   └── EditResume.jsx
│   ├── utils/           # Utility functions
│   │   └── api.js
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
└── tailwind.config.js   # Tailwind configuration
```

## Admin Dashboard

Access the admin dashboard by clicking the login icon in the navbar (top-right corner). The default credentials are:
- Email: `admin@example.com`
- Password: `admin123`

**Important**: Change these credentials in the backend `.env` file!

## Customization

- Colors and theme: Edit `tailwind.config.js`
- Global styles: Edit `src/index.css`
- Components: Modify files in `src/components/`
- Pages: Modify files in `src/pages/`

## Technologies Used

- React 18
- React Router 6
- Tailwind CSS 3
- AOS (Animate On Scroll)
- Font Awesome Icons
- Particles.js

