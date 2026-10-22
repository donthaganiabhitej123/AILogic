# AILogic

AILogic is a dashboard application with a Next.js frontend, an Express/TypeScript
backend, and a PostgreSQL database.

## Prerequisites

- Node.js 20.9 or later and npm
- PostgreSQL

## Initialize the database

Create a PostgreSQL database named `ailogic` (or choose another name and use it
in `DATABASE_URL` below). Connect to that database and create the tables used by
the API:

```sql
CREATE TABLE public.users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

CREATE TABLE public.products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL DEFAULT 0,
  stock INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.analytics (
  id SERIAL PRIMARY KEY,
  metric_name TEXT NOT NULL,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

The API does not currently include database migrations or a registration
endpoint. To try the login flow locally, insert a development user:

```sql
INSERT INTO public.users (email, password)
VALUES ('demo@example.com', 'change-this-development-password');
```

Use that email and password on the login page. The current login service
compares the stored password directly, so use this only for local development;
do not use real or production credentials.

## Configure the backend

From the repository root, create your local backend environment file:

```powershell
Copy-Item backend\.env.example backend\.env
```

Edit `backend/.env` and set `DATABASE_URL` to the connection URL for your
PostgreSQL database. Set `JWT_SECRET` to a long, random value. For example:

```dotenv
PORT=5001
FRONTEND_URL=http://localhost:3001
DATABASE_URL=postgresql://postgres:your-password@localhost:5432/ailogic
JWT_SECRET=replace-with-a-long-random-secret
```

The database connection URL format is
`postgresql://<user>:<password>@<host>:<port>/<database>`. If your password
contains URL-reserved characters, URL-encode them in the connection URL.
Never commit `backend/.env` or share its credentials.

Install dependencies and start the backend in one terminal:

```powershell
cd backend
npm ci
npm run dev
```

The API listens on `http://localhost:5001`. Opening that address should return
`Backend is running`. The backend also checks the PostgreSQL connection at
startup.

## Configure the frontend

In a second terminal, from the repository root:

```powershell
cd frontend
npm ci
npm run dev
```

Open [http://localhost:3001](http://localhost:3001). The frontend API client
expects the backend at `http://localhost:5001/api`.

## Project layout

- `backend/` — Express API, authentication, and PostgreSQL queries
- `frontend/` — Next.js application

Start each app in its own terminal and keep both running while using the
application.
