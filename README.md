# GB Tourist Transport Marketplace

Starter foundation for a marketplace connecting tourists in Gilgit-Baltistan with local transport providers.

## Project layout

- `frontend/`: React, Vite, and Tailwind CSS app
- `backend/`: FastAPI REST API
- Supabase/PostgreSQL configuration is documented but not connected yet

## Prerequisites

- Node.js 20 or newer with npm
- Python 3.10 or newer

## Run the frontend

```powershell
cd frontend
npm install
Copy-Item .env.example .env
npm run dev
```

Vite prints the local frontend URL, usually `http://localhost:5173`.

## Run the backend

In a second PowerShell terminal from the project root:

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
Copy-Item .env.example .env
uvicorn app.main:app --reload
```

The API is available at `http://localhost:8000`; its health check is `http://localhost:8000/health` and interactive API docs are at `http://localhost:8000/docs`.

## Configuration

Copy each `.env.example` to `.env` for local configuration. The frontend uses `VITE_API_BASE_URL`. Backend Supabase values are placeholders for a later database integration; the current API does not connect to a database. Never put a Supabase service-role key in frontend variables or commit real secrets.

## Current scope

This foundation has a neutral frontend placeholder and an API health endpoint only. Authentication, roles, vehicles, availability, bookings, admin workflows, and database schema are not implemented.