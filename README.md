# Al Maarif Jambi Plus

Platform Digital Pondok Pesantren Al Maarif Jambi.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS v4
- Drizzle ORM
- PostgreSQL (Neon)
- Turborepo
- pnpm

## Prerequisites

- Node.js 18+
- pnpm 9+
- A [Neon](https://console.neon.tech) account (free tier)

## Local Development Setup

### 1. Clone and install

```bash
git clone <repo-url>
cd almaarif-jambi-plus
pnpm install
```

### 2. Configure environment

```bash
# Copy environment templates
cp apps/admin/.env.example apps/admin/.env
cp apps/admin/.env.example apps/admin/.env.local
```

Edit `apps/admin/.env.local` and set your `DATABASE_URL`:

```
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
```

Get your connection string from the [Neon Console](https://console.neon.tech).

### 3. Initialize database

```bash
cd apps/admin

# Push schema to database
pnpm db:push

# Seed sample data (10 students)
pnpm db:seed
```

### 4. Start development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Script             | Description                     |
| ------------------ | ------------------------------- |
| `pnpm dev`         | Start Next.js dev server        |
| `pnpm build`       | Production build                |
| `pnpm lint`        | Run ESLint                      |
| `pnpm typecheck`   | TypeScript type check           |
| `pnpm db:push`     | Push schema changes to database |
| `pnpm db:generate` | Generate migration files        |
| `pnpm db:migrate`  | Run pending migrations          |
| `pnpm db:seed`     | Seed database with sample data  |

## Environment Variables

| Variable               | Required | Description                         |
| ---------------------- | -------- | ----------------------------------- |
| `NEXT_PUBLIC_APP_NAME` | Yes      | Application name                    |
| `NEXT_PUBLIC_APP_ENV`  | Yes      | Environment (`local`, `production`) |
| `NEXT_PUBLIC_API_URL`  | Yes      | API base URL                        |
| `DATABASE_URL`         | Yes      | PostgreSQL connection string (Neon) |

See `apps/admin/.env.example` for the canonical template.

## Project Structure

```
almaarif-jambi-plus/
├── apps/
│   └── admin/           # Next.js admin dashboard
│       ├── app/         # Routes and layouts
│       ├── components/  # Reusable UI (ADS)
│       ├── config/      # App configuration
│       ├── features/    # Domain modules
│       ├── lib/         # Utilities, DB, auth
│       └── styles/      # Tokens and component CSS
├── packages/
│   └── brand/           # @almaarif/brand package
└── turbo.json           # Turborepo config
```
