# Portfolio Backend API

Simple Express.js backend for the portfolio website.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Update `.env` with your credentials:
```
PORT=3000
JWT_SECRET=your-secret-key-change-in-production
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=your-secure-password
```

## Running

Development:
```bash
npm run dev
```

Production:
```bash
npm start
```

## API Endpoints

### Public Endpoints
- `GET /api/public/profile` - Get profile data
- `GET /api/public/skills` - Get skills list
- `GET /api/public/projects` - Get projects list
- `GET /api/public/resume` - Get resume info

### Admin Endpoints (require authentication)
- `POST /api/admin/login` - Login
- `GET /api/admin/me` - Verify token
- `GET /api/admin/profile` - Get profile (admin)
- `PUT /api/admin/profile` - Update profile
- `GET /api/admin/skills` - Get skills (admin)
- `POST /api/admin/skills` - Add skill
- `PUT /api/admin/skills/:id` - Update skill
- `DELETE /api/admin/skills/:id` - Delete skill
- `GET /api/admin/projects` - Get projects (admin)
- `POST /api/admin/projects` - Add project
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project
- `PUT /api/admin/resume` - Update resume version

## Note

This is a simple in-memory storage implementation. For production, consider using a database like MongoDB, PostgreSQL, or SQLite.

