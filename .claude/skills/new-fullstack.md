# New Full-Stack Project

**Trigger**: `/new-fullstack [project-name]`

**Description**: Creates a new full-stack web application with frontend and backend

---

When this skill is invoked:

1. Ask the user which full-stack setup they want:
   - Next.js (App Router + API Routes + TypeScript)
   - T3 Stack (Next.js + tRPC + Prisma + Tailwind)
   - MERN (MongoDB + Express + React + Node)
   - Monorepo (React frontend + Express backend + shared types)

2. Extract the project name from args, or ask if not provided

3. Create the project based on choice:

   **Next.js Full-Stack**:
   - `npx create-next-app@latest {project-name} --typescript --tailwind --app`
   - Add API route examples
   - Set up database connection (ask which: Prisma, MongoDB, PostgreSQL)

   **T3 Stack**:
   - `npm create t3-app@latest {project-name}`
   - Follow T3 setup prompts

   **MERN**:
   - Create root directory with client/ and server/ subdirectories
   - Client: React + Vite + TypeScript
   - Server: Express + TypeScript + MongoDB
   - Set up proxy configuration

   **Monorepo**:
   - Create monorepo structure:
     ```
     {project-name}/
       apps/
         frontend/    (React + Vite)
         backend/     (Express)
       packages/
         shared/      (shared TypeScript types)
       package.json   (workspace config)
     ```
   - Set up npm workspaces or pnpm workspace

4. Set up database and ORM:
   - Create database schema/models
   - Set up migration scripts
   - Add seed data scripts

5. Create authentication setup:
   - JWT or session-based auth
   - Login/register endpoints
   - Protected routes/middleware

6. Add common configuration:
   - Environment variables (.env.example)
   - CORS configuration
   - Error handling
   - Logging setup

7. Initialize git repository with appropriate .gitignore

8. Create README with:
   - Project structure
   - Setup instructions
   - Development commands
   - Environment variables needed

**Example usage**:
- `/new-fullstack my-saas-app`
- `/new-fullstack` (will prompt for name)
