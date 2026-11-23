# School Platform

Ayyan Matriculation School platform is a full-stack school website with a React frontend and an Express backend API. The frontend provides public pages for school information, admissions, application tracking, calendar, and contact details. The backend currently exposes basic health and announcements endpoints.

## Tech Stack

- Frontend: React, Vite, React Router, Tailwind CSS, Framer Motion, Lucide React
- Backend: Node.js, Express, CORS, dotenv, PostgreSQL (`pg`)
- Package manager: npm

## Project Structure

```text
school platform/
  backend/
    server.js
    package.json
  frontend/
    public/
    src/
      components/
      pages/
      App.jsx
      main.jsx
    package.json
  architecture.md
```

## Getting Started

Install dependencies separately for the frontend and backend:

```powershell
cd backend
npm install

cd ..\frontend
npm install
```

## Database Setup

The backend uses PostgreSQL. For production, use a Neon PostgreSQL database and provide
the pooled runtime connection as `DATABASE_URL`. Use the direct connection as `DIRECT_URL`
when running migrations.

Create `backend/.env` from the example file:

```powershell
cd backend
copy .env.example .env
```

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
DIRECT_URL=postgresql://user:password@host/database?sslmode=require
FRONTEND_URL=http://localhost:5173
```

Run the idempotent schema migration with `npm run migrate` before starting the backend.

Optional frontend API configuration:

```powershell
cd frontend
copy .env.example .env
```

```env
VITE_API_URL=http://localhost:5000
```

## Run Locally

Start the backend API:

```powershell
cd backend
npm run dev
```

The backend runs on `http://localhost:5000` by default.

Start the frontend:

```powershell
cd frontend
npm run dev
```

The frontend runs on the Vite local URL shown in the terminal, usually `http://localhost:5173`.

## Available Scripts

Backend:

```powershell
npm start
npm run dev
```

Frontend:

```powershell
npm run dev
npm run build
npm run lint
npm run preview
```

## Main Frontend Routes

- `/` - Home
- `/about` - About the school
- `/admissions` - Admissions information
- `/apply` - Online application form
- `/status` - Admission application tracking
- `/contact` - Contact page
- `/calendar` - Academic calendar

## Backend API

- `GET /api/health` - API health check
- `GET /api/announcements` - Announcement data
- `POST /api/applications` - Save an online admission application to PostgreSQL
- `GET /api/applications/:applicationId` - Fetch an application by ID for status tracking

## Build

Create a production build of the frontend:

```powershell
cd frontend
npm run build
```

Preview the production build:

```powershell
npm run preview
```

## Notes

- `node_modules/` and frontend build output are intentionally ignored by Git.
- Keep environment-specific values in `.env` files and do not commit them.
- See `architecture.md` for a more detailed overview of the application design.
