# Backend Setup - Quick Start

## Step 1: Install Dependencies

```bash
cd backend
npm install
```

## Step 2: Create .env File

Create a file named `.env` in the `backend` folder with the following content:

```
PORT=3000
JWT_SECRET=your-secret-key-change-in-production-use-a-random-string-here
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Shaiksameer/3909
```

**To create the file on Windows:**
1. Open the `backend` folder
2. Create a new file named `.env` (make sure it starts with a dot)
3. Copy and paste the content above
4. Save it

## Step 3: Start the Backend Server

```bash
npm run dev
```

You should see:
```
Server running on port 3000
```

## Your Admin Credentials

- **Email**: `admin@example.com`
- **Password**: `Shaiksameer/3909`

## Important Notes

- The backend MUST be running for the admin dashboard to work
- The frontend will show errors if backend is not running, but the site will still work with fallback data
- For production, change `JWT_SECRET` to a strong random string (at least 32 characters)

