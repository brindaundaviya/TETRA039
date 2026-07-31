# TETRA039

## AI-Powered Early Crop Disease Detection and Advisory System

Official repository for Team **TETRA039 (BlackPink Coders)** participating in **Tetrathon 2026**.

## Project Structure

```
TETRA039/
├── frontend/          # React + Vite + TypeScript + Tailwind
├── backend/           # Node.js + Express + TypeScript
└── README.md
```

## Quick Start

### Prerequisites

- Node.js 18+
- npm

### Backend

```bash
cd backend
npm install
cp .env.example .env   # if .env doesn't exist
npm run dev            # http://localhost:5000
```

Health check: `GET http://localhost:5000/api/health`

### Frontend

```bash
cd frontend
npm install
cp .env.example .env   # if .env doesn't exist
npm run dev            # http://localhost:5173
```

## Developer Workstreams

| Developer | Module | Location |
|-----------|--------|----------|
| Dev 1 | AI / Detection | `frontend/src/pages/Detection/`, `backend/src/services/` |
| Dev 2 | Dashboard / History | `frontend/src/pages/Dashboard/`, `frontend/src/pages/History/` |
| Dev 3 | Backend API | `backend/src/routes/`, `backend/src/controllers/` |

## Tech Stack

**Frontend:** React, Vite, TypeScript, Tailwind CSS, React Router, Axios, Framer Motion, Recharts, React Hook Form, Zod

**Backend:** Node.js, Express, TypeScript

**Persistence:** Browser localStorage (no database yet)

## Scripts

| Location | Command | Description |
|----------|---------|-------------|
| frontend | `npm run dev` | Start dev server |
| frontend | `npm run build` | Production build |
| frontend | `npm run typecheck` | TypeScript check |
| backend | `npm run dev` | Start dev server with hot reload |
| backend | `npm run build` | Compile TypeScript |
| backend | `npm run typecheck` | TypeScript check |

## Routes

| Route | Page |
|-------|------|
| `/` | Landing |
| `/dashboard` | Dashboard |
| `/detection` | Detection |
| `/history` | History |
| `/about` | About |
