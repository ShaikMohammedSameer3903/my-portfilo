# Shaik Mohammed Sameer - Portfolio Website

A modern, responsive portfolio website built with React.js, Tailwind CSS, and Node.js/Express backend.

## Features

- ✨ Clean, modern, and professional design
- 📱 Fully responsive (mobile, tablet, laptop, desktop)
- 🔐 Admin dashboard with secure authentication
- 🎨 Beautiful animations and smooth transitions
- ⚡ Fast and lightweight
- 🎯 SEO-friendly
- 🔧 Easy content management through admin dashboard

## Project Structure

```
portfolio/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── admin/         # Admin dashboard
│   │   └── utils/         # Utility functions
│   └── public/            # Static assets
│
├── backend/           # Node.js/Express backend API
│   ├── routes/        # API routes
│   ├── models/        # Data models
│   └── security/      # Authentication
│
└── README.md
```

## Quick Start

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (optional):
```env
VITE_API_BASE_URL=http://localhost:3000
```

4. Start development server:
```bash
npm run dev
```

Frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=3000
JWT_SECRET=your-secret-key-change-in-production
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=your-secure-password
```

4. Start the server:
```bash
npm run dev
```

Backend will be available at `http://localhost:3000`

## Admin Dashboard

Access the admin dashboard by:
1. Clicking the login icon in the top-right corner of the navbar
2. Enter your admin credentials
3. Manage your profile, skills, projects, and resume

**Important**: Change the default admin credentials in `backend/.env`!

## Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables if needed
4. Deploy!

### Backend (Render/Railway)

1. Push your code to GitHub
2. Create a new service on Render/Railway
3. Connect your repository
4. Set environment variables
5. Deploy!

## Technologies

### Frontend
- React 18
- React Router 6
- Tailwind CSS 3
- AOS (Animate On Scroll)
- Font Awesome Icons
- Particles.js

### Backend
- Node.js
- Express.js
- JSON Web Tokens (JWT)
- Bcryptjs (for password hashing)

## Customization

### Colors
Edit `frontend/tailwind.config.js` to change the color scheme.

### Content
1. Log in to the admin dashboard
2. Update your profile, skills, projects, and resume
3. Changes are saved immediately!

### Resume
1. Replace `frontend/public/assets/resumea.pdf` with your resume
2. Update the resume version in the admin dashboard
3. Redeploy the frontend

## License

This project is private and proprietary.

## Contact

For questions or support, please contact through the portfolio website.

