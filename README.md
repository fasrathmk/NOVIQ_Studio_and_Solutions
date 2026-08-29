# NOVIQ Studio & Solutions

NOVIQ Studio & Solutions is a multidisciplinary digital agency website with a public marketing site and a protected administrator dashboard. The studio designs brands, builds digital products, automates business processes, and visualizes spaces.

## Features

- Public website: home, services, work, case studies, about, contact, privacy, and terms
- Six seeded services across Design, Technology, and Visualization
- Published project case studies with category filters and previous/next navigation
- Project inquiry form with frontend and backend validation
- Admin dashboard with live statistics from PostgreSQL
- Full CRUD for projects, services, testimonials, team members, inquiries, and website settings
- JWT administrator authentication with BCrypt password hashing
- OpenAPI/Swagger documentation

## Technology stack

**Frontend:** React, JavaScript, Vite, Tailwind CSS, React Router, Axios, React Hook Form, Zod, TanStack Query, Lucide React, Framer Motion

**Backend:** Java 21, Spring Boot, Maven, Spring Web, Spring Data JPA, Spring Security, Jakarta Bean Validation, PostgreSQL, JWT, BCrypt, Flyway, OpenAPI/Swagger, JUnit 5, Mockito

## Architecture

The frontend is a React SPA. Public pages read `/api/v1/public/*`. The admin area uses `/api/v1/admin/*` with a Bearer JWT. The backend keeps business rules in services, maps JPA entities to DTOs, and never returns entities, password hashes, or stack traces to clients.

## Folder structure

```text
noviq-platform/
├── frontend/          React + Vite application
├── backend/           Spring Boot API
├── README.md
└── .gitignore
```

## Prerequisites

- Java 21
- Node.js 20 or later
- PostgreSQL 16 or later, running locally
- Maven Wrapper is included (`backend/mvnw` / `backend/mvnw.cmd`)

## PostgreSQL database creation

```sql
CREATE DATABASE noviq_db;
```

Windows `psql` example:

```powershell
psql -U postgres -c "CREATE DATABASE noviq_db;"
```

## Environment-variable setup

### Backend

```powershell
cd noviq-platform/backend
copy .env.example .env
```

Edit `backend/.env`:

```env
DB_URL=jdbc:postgresql://localhost:5432/noviq_db
DB_USERNAME=postgres
DB_PASSWORD=your_local_password
JWT_SECRET=replace_with_a_long_random_secret_at_least_64_characters_long
JWT_EXPIRATION_MS=3600000
ADMIN_EMAIL=admin@noviq.local
ADMIN_PASSWORD=replace_with_a_secure_password
FRONTEND_ORIGIN=http://localhost:5173
```

The first administrator is created on startup only when no admin user exists. The password is hashed with BCrypt before it is stored and is never logged.

Authentication uses a JWT access token. Send it as `Authorization: Bearer <token>`. Logout adds the token to an in-memory denylist until it expires. There is no public registration.

### Frontend

```powershell
cd noviq-platform/frontend
copy .env.example .env
```

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_SITE_URL=http://localhost:5173
VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key
```

`VITE_API_BASE_URL` is for local development (and a future production backend). The public Vercel site must not point at `localhost`. `VITE_WEB3FORMS_ACCESS_KEY` is required for the public enquiry form. Do not commit real `.env` files or the real Web3Forms access key.

## Backend startup

On Windows PowerShell, start the backend from `noviq-platform/backend` so `optional:file:.env` resolves:

```powershell
$env:JAVA_HOME="C:\Program Files\Eclipse Adoptium\jdk-21.0.11.10-hotspot"
$env:Path="$env:JAVA_HOME\bin;$env:Path"
# Optional: export the same keys as backend/.env if the file is not picked up
.\mvnw.cmd spring-boot:run
```

On macOS/Linux:

```bash
./mvnw spring-boot:run
```

API: `http://localhost:8080`  
Swagger UI: `http://localhost:8080/swagger-ui.html`  
OpenAPI JSON: `http://localhost:8080/v3/api-docs`

## Frontend startup

From `noviq-platform/frontend`:

```powershell
npm install
npm run dev
```

Website: `http://localhost:5173`  
Admin login: `http://localhost:5173/admin/login`

## Admin login setup

1. Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `backend/.env`.
2. Start the backend once so the administrator is created.
3. Open `/admin/login` and sign in with those credentials.
4. After the first successful creation, later startups skip admin seeding.

## Test commands

Backend:

```powershell
cd noviq-platform/backend
.\mvnw.cmd test
.\mvnw.cmd -DskipTests package
```

Frontend:

```powershell
cd noviq-platform/frontend
npm run lint
npm test
npm run build
```

## Troubleshooting

- **Backend cannot connect to PostgreSQL:** confirm the service is running, `noviq_db` exists, and `DB_USERNAME` / `DB_PASSWORD` match your local role.
- **JWT_SECRET error:** the secret must be at least 32 characters. Prefer 64+.
- **Admin login fails after changing `.env`:** the initializer does not overwrite an existing admin. Update the password in the database or remove the existing `admin_users` row and restart.
- **CORS errors:** `FRONTEND_ORIGIN` must match the Vite origin, including protocol and port.
- **Schema validation errors:** Flyway owns the schema. `spring.jpa.hibernate.ddl-auto` is `validate`. Do not use `create` or `create-drop`.
- **`.env` not applied:** start Maven from the `backend` directory. If `DB_PASSWORD` contains characters such as `&`, export the variables in your shell before `.\mvnw.cmd spring-boot:run`.
- **Port already in use:** stop the process on `8080` or `5173`.

## Public deployment (Vercel frontend only)

Current public architecture:

```
Visitor → Vercel → React → Web3Forms → NOVIQ email
```

The Spring Boot backend stays local. Neon PostgreSQL stays connected only to that local backend (and a future production backend). Do not put database credentials in frontend environment variables.

Vercel project settings:

- Root directory: `frontend`
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`
- Environment variable: `VITE_WEB3FORMS_ACCESS_KEY` (available at build time)

Do not set `VITE_API_BASE_URL` on Vercel until a production backend exists. Do not deploy the backend to Railway, Render, or Docker for this temporary setup.

Admin CRUD remains in the codebase and requires the local Spring Boot API at `http://localhost:8080`.
