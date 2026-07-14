# Architecture Documentation

**Repository:** almaarif-jambi-plus
**Generated:** 2026-07-12
**Branch:** main
**Commit:** c1f0c83b3d56a7604d3a0f497d66cbaf269db626

---

## 1. Repository Overview

almaarif-jambi-plus is a pnpm + Turborepo monorepo for the Almaarif Jambi Plus system — a pondok pesantren (Islamic boarding school) information system. It contains a single application (admin dashboard) built with Next.js 16, React 19, TypeScript 5, and Tailwind CSS v4.

The project features a custom internal design system called ADS (Almaarif Design System) with a "Liquid Glass" visual identity — composable UI primitives built on Radix UI and native HTML elements with glassmorphism styling.

### Stack

| Layer             | Technology                                                |
| ----------------- | --------------------------------------------------------- |
| **Monorepo**      | pnpm workspaces + Turborepo v2                            |
| **Framework**     | Next.js 16 (App Router)                                   |
| **UI**            | React 19                                                  |
| **Language**      | TypeScript 5 (strict)                                     |
| **Styling**       | Tailwind CSS v4 + PostCSS                                 |
| **UI Primitives** | Radix UI (checkbox, radio, select, switch)                |
| **Icons**         | lucide-react                                              |
| **Theme**         | next-themes                                               |
| **Font**          | Montserrat (next/font/google)                             |
| **Linting**       | ESLint 9 (flat config, next/core-web-vitals + typescript) |
| **Formatting**    | Prettier (semi, singleQuote, 100 width, trailing commas)  |
| **Pre-commit**    | Husky + lint-staged                                       |

---

## 2. Monorepo Structure

```mermaid
graph TD
    ROOT["root (pnpm workspace)"] --> TURBO[Turborepo pipeline]
    ROOT --> ADMIN["apps/admin - Next.js 16"]
    ROOT --> BRAND["packages/brand - @almaarif/brand"]

    ADMIN --> BRAND

    TURBO --> ADMIN_TASKS["dev, build, lint, typecheck"]
    TURBO --> BRAND_TASKS["build, lint, typecheck"]

    style ADMIN fill:#4a90d9,color:#fff
    style BRAND fill:#7b61ff,color:#fff
```

### Workspace Configuration

```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### Turborepo Pipeline

```json
{
  "tasks": {
    "dev": { "cache": false, "persistent": true },
    "build": { "dependsOn": ["^build"], "outputs": [".next/**", "dist/**"] },
    "lint": { "dependsOn": ["^lint"] },
    "typecheck": { "dependsOn": ["^typecheck"] }
  }
}
```

The `^` prefix means turbo runs workspace-internal dependency tasks first. When building `admin`, `@almaarif/brand` is built first.

---

## 3. Apps

### `apps/admin` — Next.js 16 Admin Dashboard

The only application. Contains the admin dashboard, authentication flow, and the ADS design system playground.

**Key configuration:**

| File                 | Role                                                                    |
| -------------------- | ----------------------------------------------------------------------- |
| `next.config.ts`     | Empty config (default Next.js 16 behavior)                              |
| `postcss.config.mjs` | `@tailwindcss/postcss` plugin                                           |
| `tsconfig.json`      | `@/*` path alias → project root, strict mode, bundler module resolution |
| `eslint.config.mjs`  | Flat config with next/core-web-vitals + typescript                      |

**Route groups:**

```
app/
├── layout.tsx               # Root layout: font, AppProvider, ThemeToggle
├── globals.css              # Tailwind + theme imports
├── (auth)/
│   ├── layout.tsx           # Auth layout guard
│   └── login/page.tsx       # LoginPage → LoginForm component
├── (dashboard)/
│   ├── layout.tsx           # Session guard, AppShell wrapper
│   ├── error.tsx            # Error boundary with friendly UI
│   ├── page.tsx             # DashboardPage → stat cards
│   ├── students/
│   │   ├── page.tsx         # StudentListPage
│   │   ├── new/page.tsx     # StudentCreatePage
│   │   └── [id]/page.tsx    # StudentEditPage
│   ├── attendance/
│   │   ├── page.tsx         # AttendancePage (input + history tabs)
│   │   ├── [id]/page.tsx    # AttendanceDetailPage
│   │   └── history/
│   │       ├── page.tsx     # Redirects to /attendance
│   │       └── [id]/page.tsx # AttendanceDetailPage (alias)
│   └── more/
│       └── page.tsx         # MorePage (navigation + logout)
└── (design)/
    └── design/
        ├── layout.tsx       # DesignShell wrapper
        ├── page.tsx         # DesignSystemPage (overview)
        ├── alert-dialog/page.tsx
        ├── badge/page.tsx
        ├── button/page.tsx
        ├── card/page.tsx
        ├── checkbox/page.tsx
        ├── colors/page.tsx
        ├── dropdown-menu/page.tsx
        ├── empty-state/page.tsx
        ├── field/page.tsx
        ├── infinite-scroll/page.tsx
        ├── input/page.tsx
        ├── pagination/page.tsx
        ├── radio/page.tsx
        ├── segmented-control/page.tsx
        ├── select/page.tsx
        ├── skeleton/page.tsx
        ├── surface/page.tsx
        ├── switch/page.tsx
        ├── table/page.tsx
        ├── textarea/page.tsx
        ├── toast/page.tsx
        └── typography/page.tsx
```

**Authentication flow:**

```mermaid
sequenceDiagram
    participant User
    participant LoginForm
    participant auth as features/auth
    participant server as features/auth/server
    participant session as lib/auth/session
    participant Layout as dashboard/layout

    User->>LoginForm: submit email + password
    LoginForm->>auth: login(email, password)
    auth-->>LoginForm: User (mock)
    LoginForm->>server: createSession(user)
    server->>session: setSession(user)
    session->>cookies: Set-Cookie (httpOnly)
    LoginForm->>router: push('/')

    Note over Layout: On dashboard access
    Layout->>session: getSession()
    session-->>Layout: User | null
    alt no session
        Layout->>router: redirect('/login')
    else session exists
        Layout->>AppShell: user={session}
    end
```

**Pages by route group:**

| Group         | Pages | Purpose                                                       |
| ------------- | ----- | ------------------------------------------------------------- |
| `(auth)`      | 1     | Login (with layout guard)                                     |
| `(dashboard)` | 9     | Dashboard, Students (3), Attendance (3), More, Error boundary |
| `(design)`    | 23    | Design system documentation (22 components + index)           |

---

## 4. Packages

### `packages/brand` — `@almaarif/brand`

A single-component shared package providing the Almaarif logo.

```mermaid
graph LR
    BRAND["@almaarif/brand"] --> LOGO_TSX["components/logo.tsx"]
    BRAND --> INDEX_TS["index.ts (barrel)"]
    BRAND --> LOGO_PNG["assets/logo.png"]
```

- **Logo component:** Renders an `<img>` with configurable `src`, `width`, `height`, `alt`, `className`
- **Default src:** `/brand/logo.png` (served from `apps/admin/public/brand/` at runtime)
- **Peer dependency:** `react ^19`
- **ESM only** (`"type": "module"`)

The component still uses `export function Logo()` (function declaration) rather than the project's arrow-function convention.

---

## 5. Features

Features are domain-specific modules under `features/`. Each feature is self-contained with its own components, logic, types, and barrel export.

### Feature map

```mermaid
graph TD
    subgraph features
        AUTH["auth/"]
        DASHBOARD["dashboard/"]
        ADS["ads/"]
        STUDENTS["students/"]
        ATTENDANCE["attendance/"]
        MORE["more/"]
    end

    AUTH --> AUTH_TYPES["types.ts - User type"]
    AUTH --> AUTH_TYPES2["auth.ts - login() mock"]
    AUTH --> AUTH_SERVER["server.ts - createSession / destroySession"]
    AUTH --> AUTH_FORM["components/login-form.tsx"]
    AUTH --> AUTH_MENU["components/user-menu.tsx"]

    DASHBOARD --> DASHBOARD_PAGE["pages/dashboard-page.tsx"]

    ADS --> ADS_PAGES["pages/ (21 page components)"]
    ADS --> ADS_SHELL["components/ads-shell/"]
    ADS --> ADS_CODE["components/code-preview/"]
    ADS --> ADS_COLOR["components/color-preview/"]
    ADS --> ADS_SECTION["components/section-preview/"]
    ADS --> ADS_TOKEN["components/token-preview/"]
    ADS --> ADS_THEME["components/theme-toggle/"]

    STUDENTS --> STUDENTS_TYPES["types.ts"]
    STUDENTS --> STUDENTS_SCHEMAS["schemas.ts"]
    STUDENTS --> STUDENTS_SERVER["server.ts"]
    STUDENTS --> STUDENTS_COMPONENTS["components/ (3)"]
    STUDENTS --> STUDENTS_PAGES["pages/ (4)"]

    ATTENDANCE --> ATTENDANCE_TYPES["types.ts"]
    ATTENDANCE --> ATTENDANCE_SCHEMAS["schemas.ts"]
    ATTENDANCE --> ATTENDANCE_SERVER["server.ts"]
    ATTENDANCE --> ATTENDANCE_COMPONENTS["components/ (3)"]
    ATTENDANCE --> ATTENDANCE_PAGES["pages/ (3)"]

    MORE --> MORE_COMPONENTS["components/ (1)"]
    MORE --> MORE_PAGES["pages/ (1)"]
```

### `features/auth`

| File                        | Role                                  | Export                            |
| --------------------------- | ------------------------------------- | --------------------------------- |
| `types.ts`                  | `User` type definition                | `User`                            |
| `auth.ts`                   | Login logic (mock)                    | `login`                           |
| `server.ts`                 | Server actions for session management | `createSession`, `destroySession` |
| `components/login-form.tsx` | Login page form                       | `LoginForm`                       |
| `components/user-menu.tsx`  | User menu (Radix DropdownMenu)        | `UserMenu`                        |
| `index.ts`                  | Barrel                                | `login`, `User`                   |

The `User` type is defined in `lib/types/user.ts` (shared location). `features/auth/types.ts` re-exports it. `lib/auth/session.ts` and `components/app/app-shell.types.ts` import from `lib/types/user` — no boundary violations.

### `features/dashboard`

| File                       | Role                                    | Export          |
| -------------------------- | --------------------------------------- | --------------- |
| `pages/dashboard-page.tsx` | Dashboard home with stat cards          | `DashboardPage` |
| `index.ts`                 | Barrel (unused — page imports directly) | `DashboardPage` |

### `features/students`

Student management with real Server Actions backed by Drizzle ORM.

| File                                 | Role                                | Export                           |
| ------------------------------------ | ----------------------------------- | -------------------------------- |
| `types.ts`                           | Student type definition             | `Student`                        |
| `schemas.ts`                         | Zod validation schemas              | `studentSchema`                  |
| `server.ts`                          | Server actions (CRUD via DB)        | `createStudent`, `updateStudent` |
| `components/student-form.tsx`        | Create/edit form                    | `StudentForm`                    |
| `components/student-card.tsx`        | Student display card                | `StudentCard`                    |
| `components/student-empty-state.tsx` | Empty state                         | `StudentEmptyState`              |
| `pages/student-list-page.tsx`        | Server component (fetches all)      | `StudentListPage`                |
| `pages/student-create-page.tsx`      | Create page                         | `StudentCreatePage`              |
| `pages/student-edit-page.tsx`        | Edit page (fetches by ID)           | `StudentEditPage`                |
| `pages/*-client.tsx`                 | Client components for interactivity | Various                          |
| `index.ts`                           | Barrel                              | Re-exports                       |

### `features/attendance`

Attendance system with real Server Actions backed by Drizzle ORM.

| File                                     | Role                                      | Export                                                      |
| ---------------------------------------- | ----------------------------------------- | ----------------------------------------------------------- |
| `types.ts`                               | AttendanceSession, AttendanceRecord types | `AttendanceSession`, `AttendanceRecord`, `AttendanceStatus` |
| `schemas.ts`                             | Zod validation schemas                    | `attendanceSchema`                                          |
| `server.ts`                              | Server actions (via DB repositories)      | `submitAttendance`                                          |
| `components/attendance-student-row.tsx`  | Student row for input                     | `AttendanceStudentRow`                                      |
| `components/attendance-session-card.tsx` | Session card for history                  | `AttendanceSessionCard`                                     |
| `components/attendance-record-row.tsx`   | Record row for detail                     | `AttendanceRecordRow`                                       |
| `pages/attendance-page.tsx`              | Server component (fetches sessions)       | `AttendancePage`                                            |
| `pages/attendance-detail-page.tsx`       | Detail page (fetches by ID)               | `AttendanceDetailPage`                                      |
| `pages/*-client.tsx`                     | Client components for interactivity       | Various                                                     |
| `index.ts`                               | Barrel                                    | Re-exports                                                  |

### `features/ads`

Design system documentation. Contains 22 page components and 6 utility components for the playground.

| Component        | Role                                    | Interactive? |
| ---------------- | --------------------------------------- | ------------ |
| `DesignShell`    | Layout shell with sidebar navigation    | No           |
| `ThemeToggle`    | Icon-only button (Sun/Moon) in header   | Yes          |
| `SectionPreview` | Section wrapper with title + code block | No           |
| `CodePreview`    | Expandable code block with copy         | Yes          |
| `ColorPreview`   | Color swatch grid display               | No           |
| `TokenPreview`   | Token name/value list                   | No           |

---

## 6. Shared Libraries

### `lib/` — Utility Layer

```
lib/
├── index.ts          # Barrel: re-exports ./utils only
├── utils.ts          # cn() — Tailwind class merger (clsx + tailwind-merge)
├── auth/
│   ├── index.ts      # Barrel: re-exports ./session
│   └── session.ts    # Cookie-based session (getSession, setSession, clearSession)
├── types/
│   ├── index.ts      # Barrel: re-exports ./user
│   └── user.ts       # User, UserRole types (shared across features/lib/components)
├── db/
│   ├── client.ts     # Neon PostgreSQL connection via @neondatabase/serverless
│   ├── schema/
│   │   ├── index.ts  # Barrel: re-exports all schemas
│   │   ├── students.ts
│   │   ├── attendance-sessions.ts
│   │   └── attendance-records.ts
│   └── seed.ts       # Seed script: 8 sample students
├── data/
│   ├── index.ts      # Barrel: re-exports repositories
│   ├── types.ts      # Shared data types
│   ├── student-repository.ts
│   ├── attendance-session-repository.ts
│   └── attendance-record-repository.ts
└── http/
    └── client.ts     # Dead code — generic fetch wrapper, never imported (TODO: remove)
```

| Function           | Purpose                        | Used by             |
| ------------------ | ------------------------------ | ------------------- |
| `cn(...inputs)`    | Merge Tailwind CSS classes     | All UI components   |
| `getSession()`     | Read user session from cookies | Dashboard layout    |
| `setSession(user)` | Write user session to cookies  | Auth server actions |
| `clearSession()`   | Delete session cookie          | Auth server actions |

### `config/` — Application Config

```
config/
├── index.ts          # Barrel
├── app.ts            # appConfig — name, description, company, url, version
├── navigation.ts     # Role-based navigation items (9 items, 4 disabled)
└── lookups.ts        # Static lookups: CLASSES, SUBJECTS, TEACHERS, ATTENDANCE_STATUSES
```

Used by root layout for metadata, navigation for sidebar, and lookups for static data.

### `providers/` — React Context Providers

```
providers/
├── index.ts              # Barrel
├── app-provider.tsx      # AppProvider → wraps ThemeProvider
└── theme-provider.tsx     # ThemeProvider → wraps next-themes ThemeProvider
```

Provider hierarchy:

```
RootLayout
└── AppProvider
    └── ThemeProvider (next-themes, attribute="class", defaultTheme="light")
        └── page content
    ThemeToggle is now inside AppShell header (not floating)
```

---

## 7. Layer Architecture

```mermaid
graph TD
    subgraph "app/ — Next.js Routes"
        LAYOUTS["Layouts<br/>(root, dashboard, design)"]
        PAGES["Pages<br/>(login, dashboard, students, attendance, 22 design pages)"]
    end

    subgraph "features/ — Domain Modules"
        AUTH["auth<br/>login, session management"]
        DASHBOARD["dashboard<br/>dashboard page"]
        ADS["ads<br/>design system playground"]
        STUDENTS["students<br/>student CRUD (DB)"]
        ATTENDANCE["attendance<br/>attendance system (DB)"]
        MORE["more<br/>additional features"]
    end

    subgraph "components/ — Reusable UI"
        UI["ui/*<br/>ADS Design System<br/>23 components"]
        APP["app/*<br/>AppShell, Sidebar, MobileNav"]
    end

    subgraph "lib/ — Shared Utilities"
        UTILS["utils.ts - cn()"]
        AUTH_LIB["auth/session.ts"]
        TYPES["types/user.ts"]
        DB["db/<br/>Drizzle schemas, Neon client"]
        DATA["data/<br/>Repositories"]
        HTTP["http/client.ts<br/>(dead code)"]
    end

    subgraph "config/ + providers/ — App Setup"
        CONFIG["app config"]
        PROVIDERS["theme providers"]
    end

    LAYOUTS --> UTILS
    LAYOUTS --> CONFIG
    LAYOUTS --> PROVIDERS
    LAYOUTS --> AUTH_LIB
    LAYOUTS --> AUTH
    LAYOUTS --> UI
    LAYOUTS --> APP

    PAGES --> AUTH
    PAGES --> DASHBOARD
    PAGES --> ADS

    AUTH --> UTILS
    AUTH --> AUTH_LIB
    AUTH --> UI

    APP --> UI
    APP --> AUTH  {{✅ uses lib/types/user for types}}

    UI --> UTILS

    AUTH_LIB --> AUTH {{✅ imports User from lib/types/user (not features/)}}

    DASHBOARD --> UI

    ADS --> UI

    STUDENTS --> UI
    STUDENTS --> DB_LAYER

    ATTENDANCE --> UI
    ATTENDANCE --> DB_LAYER

    DB_LAYER --> DB_CLIENT["lib/db/client.ts"]
    DB_LAYER --> DB_SCHEMA["lib/db/schema/"]
    DB_LAYER --> DATA_REPO["lib/data/"]

    style DB_LAYER fill:#90EE90,stroke:#333
    style DB_CLIENT fill:#90EE90,stroke:#333
    style DB_SCHEMA fill:#90EE90,stroke:#333
    style DATA_REPO fill:#90EE90,stroke:#333
```

### Dependency direction

The intended layering is:

```
app/ → features/ → components/ → lib/
```

Boundary violations have been resolved:

- `User` type lives in `lib/types/user.ts` (shared location)
- `components/app/` imports User type from `lib/types/user` (not `features/auth/`)
- `lib/auth/session.ts` imports User type from `lib/types/user` (not `features/auth/`)
- `features/auth/types.ts` re-exports from `lib/types/user` (for backward compatibility)

Feature-to-feature imports remain clean — auth, dashboard, ads, students, attendance are isolated.

---

## 8. Dependency Rules

### Conventions (from AGENTS.md)

- Features should be self-contained
- `lib/` should be a leaf dependency (no upward imports)
- `components/` should depend only on `lib/` and other `components/`
- No feature-to-feature imports (currently clean — auth, dashboard, ads, students, attendance are isolated)

### Current violations

| Violation                            | Source                                 | Target                               | Status      |
| ------------------------------------ | -------------------------------------- | ------------------------------------ | ----------- |
| `components/app/` → `features/auth/` | `app-shell.tsx` imports UserMenu       | `features/auth/components/user-menu` | ✅ Resolved |
| `components/app/` → `features/auth/` | `app-shell.types.ts` imports User type | `features/auth/types`                | ✅ Resolved |
| `lib/auth/` → `features/auth/`       | `session.ts` imports User type         | `features/auth/types`                | ✅ Resolved |

All boundary violations resolved. `User` type now lives in `lib/types/user.ts`.

---

## 9. Import Rules

### Import order (from AGENTS.md)

```
1. React
2. External packages
3. Internal aliases (@/)
4. Relative imports
```

### Path alias

- `@/*` → `apps/admin/*` (defined in tsconfig.json)

### Consistency status

| Pattern              | Files following                 | Files violating                                                        |
| -------------------- | ------------------------------- | ---------------------------------------------------------------------- |
| Import ordering      | Most UI components, pages       | `login-form.tsx`, `app-shell.tsx`, `ads-shell.tsx`, `theme-toggle.tsx` |
| Barrel vs direct     | Most use correct barrel         | `app-shell.tsx` uses direct `'../sidebar/sidebar'`                     |
| UI component imports | Mostly barrel `@/components/ui` | `login-form.tsx` mixes barrel + direct                                 |

All relative imports stay within 1 directory level — no `../../` patterns exist.

---

## 10. Folder Structure

### ADS Component Convention

```
components/ui/component-name/
├── component-name.tsx        # Implementation
├── component-name.types.ts    # TypeScript types
└── index.ts                  # Barrel (export * + export type *)
```

All 23 ADS components follow this convention exactly.

### Feature Convention

```
features/feature-name/
├── index.ts                  # Barrel
├── types.ts                  # Feature-specific types
├── some-logic.ts             # Business logic
├── server.ts                 # Server actions
├── components/
│   ├── some-component.tsx
│   └── ...
└── pages/
    └── some-page.tsx
```

### App Route Convention

```
app/(route-group)/
├── layout.tsx                # Route group layout (default export)
├── page.tsx                  # Route page (default export)
└── segment/
    └── page.tsx
```

Route page files often re-export from `features/`:

```tsx
// app/(dashboard)/page.tsx
export { DashboardPage as default } from '@/features/dashboard/pages/dashboard-page';
```

---

## 11. Design System Architecture

### ADS Component Inventory

| Component        | Category   | Primitive           | Client? | Test? | CSS file?                | CSS classes defined?                                                                                                                                                                                                  |
| ---------------- | ---------- | ------------------- | ------- | ----- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Surface          | Layout     | `<div>`             | No      | No    | ✅ surface.css           | `ads-surface`, `::before`, `::after`                                                                                                                                                                                  |
| Card             | Layout     | Surface             | No      | No    | ❌ Tailwind              | Uses Tailwind utility classes directly                                                                                                                                                                                |
| Header           | Layout     | Surface             | No      | No    | ❌ Tailwind              | Uses Tailwind utility classes directly                                                                                                                                                                                |
| Field            | Layout     | `<div>/<label>`     | No      | No    | ❌ Tailwind              | Uses Tailwind utility classes directly                                                                                                                                                                                |
| PageLayout       | Layout     | `<div>`             | No      | No    | ❌ Tailwind              | Uses Tailwind utility classes directly                                                                                                                                                                                |
| Table            | Data       | Surface + `<table>` | No      | No    | ✅ table.css             | `ads-table`, `ads-table__scroll`, `ads-table__table`, `ads-table__header`, `ads-table__body`, `ads-table__footer`, `ads-table__row`, `ads-table__head`, `ads-table__cell`, `ads-table--compact`, `ads-table--striped` |
| Button           | Input      | `<button>`          | No      | No    | ✅ button.css            | `ads-button`, `ads-button--{variant}`, `ads-button--{size}`, `ads-button__content`                                                                                                                                    |
| Input            | Input      | `<input>`           | Yes     | No    | ✅ input.css             | `ads-input`, `ads-input-wrapper`, `ads-input--{size}`, `ads-input--{status}`, `ads-input__loader`, `ads-input__action`                                                                                                |
| Textarea         | Input      | `<textarea>`        | Yes     | No    | ✅ textarea.css          | `ads-textarea`, `ads-textarea--{size}`, `ads-textarea--{status}`, `ads-textarea--resize-{resize}`                                                                                                                     |
| Select           | Input      | Radix Select        | Yes     | No    | ✅ select.css            | `ads-select__trigger`, `ads-select__trigger--{size}`, `ads-select__trigger--{status}`, `ads-select__content`, `ads-select__item`                                                                                      |
| Checkbox         | Input      | Radix Checkbox      | Yes     | No    | ✅ checkbox.css          | `ads-checkbox`, `ads-checkbox__indicator`                                                                                                                                                                             |
| Radio            | Input      | Radix RadioGroup    | Yes     | No    | ✅ radio.css             | `ads-radio-group`, `ads-radio-item`, `ads-radio-item__label`, `ads-radio`, `ads-radio__indicator`, `ads-radio__dot`                                                                                                   |
| Switch           | Input      | Radix Switch        | Yes     | No    | ✅ switch.css            | `ads-switch`, `ads-switch__thumb`                                                                                                                                                                                     |
| Badge            | Display    | `<span>`            | No      | No    | ✅ badge.css             | `ads-badge`, `ads-badge--{variant}`                                                                                                                                                                                   |
| DropdownMenu     | Overlay    | Radix DropdownMenu  | Yes     | No    | ✅ dropdown-menu.css     | `ads-dropdown-menu`, `ads-dropdown-menu__item`, `ads-dropdown-menu__separator`, `ads-dropdown-menu__label`, `ads-dropdown-menu__arrow`                                                                                |
| AlertDialog      | Overlay    | Radix Dialog        | Yes     | No    | ✅ alert-dialog.css      | `ads-alert-dialog`, `ads-alert-dialog__content`, `ads-alert-dialog__title`, `ads-alert-dialog__description`, `ads-alert-dialog__actions`                                                                              |
| Toast            | Feedback   | Sonner              | Yes     | No    | ✅ toast.css             | `ads-toast`, `ads-toast__title`, `ads-toast__description`                                                                                                                                                             |
| Skeleton         | Feedback   | `<div>`             | No      | No    | ❌ Tailwind              | Uses Tailwind utility classes directly                                                                                                                                                                                |
| EmptyState       | Feedback   | `<div>`             | No      | No    | ❌ Tailwind              | Uses Tailwind utility classes directly                                                                                                                                                                                |
| Pagination       | Navigation | Button (ADS)        | No      | No    | ✅ pagination.css        | `ads-pagination`, `ads-pagination__item`, `ads-pagination__ellipsis`                                                                                                                                                  |
| SegmentedControl | Navigation | `<div>`             | Yes     | No    | ✅ segmented-control.css | `ads-segmented-control`, `ads-segmented-control__item`, `ads-segmented-control__indicator`                                                                                                                            |
| InfiniteScroll   | Navigation | `<div>`             | Yes     | No    | ❌ Tailwind              | Uses Tailwind utility classes directly                                                                                                                                                                                |
| ThemeToggle      | Utility    | Button (ADS)        | Yes     | No    | ✅ theme-toggle.css      | `ads-theme-toggle`                                                                                                                                                                                                    |

### Component patterns

```mermaid
graph TD
    subgraph "Wrapping strategies"
        NATIVE["Native HTML<br/>Surface, Button, Input, Textarea, Field, Badge, EmptyState, Skeleton, PageLayout, SegmentedControl, InfiniteScroll"]
        SURFACE_WRAP["Wraps Surface component<br/>Card, Header, Table"]
        RADIX["Wraps Radix UI primitive<br/>Checkbox, Radio, Select, Switch, DropdownMenu, AlertDialog"]
        SONNER_WRAP["Wraps Sonner library<br/>Toast"]
        ADS_WRAP["Wraps ADS Button<br/>Pagination, ThemeToggle"]
    end

    NATIVE --> CN["cn() class merging"]
    SURFACE_WRAP --> CN
    RADIX --> CN
    SONNER_WRAP --> CN
    ADS_WRAP --> CN

    CN --> LU["lucide-react icons<br/>(optional)"]
```

All components use:

- `cn()` from `@/lib` for class merging
- `ads-` prefixed BEM-like CSS classes
- Named exports
- Arrow function components (`export const X = () => ...`)
- TypeScript types co-located in `.types.ts` files
- `type` over `interface` (all converted)
- Intersection types for extending native HTML/Radix props

### Props architecture

Each component follows one of these patterns:

| Pattern                   | Examples                                                                  |
| ------------------------- | ------------------------------------------------------------------------- |
| Extends native HTML attrs | `ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { ... }`         |
| Extends Radix attrs       | `CheckboxProps = Omit<ComponentPropsWithoutRef<'button'>, ...> & { ... }` |
| Standalone custom         | `FieldProps = { label?, description?, error?, ... }`                      |

### CSS architecture

```mermaid
graph TD
    GLOBALS["app/globals.css"] --> TW["@import 'tailwindcss'"]
    GLOBALS --> THEME["@import '../styles/theme.css'"]

    THEME --> TOKENS["tokens/*.css"]
    THEME --> COMPONENTS["components/*.css"]
    THEME --> BODY["html, body { ... }"]

    TOKENS --> BG["background.css"]
    TOKENS --> COLORS["colors.css"]
    TOKENS --> MOTION["motion.css"]
    TOKENS --> TYPO["typography.css"]

    COMPONENTS --> SURFACE_CSS["surface.css"]
    COMPONENTS --> BUTTON_CSS["button.css"]
    COMPONENTS --> INPUT_CSS["input.css"]
    COMPONENTS --> TEXTAREA_CSS["textarea.css"]
    COMPONENTS --> SELECT_CSS["select.css"]
    COMPONENTS --> CHECKBOX_CSS["checkbox.css"]
    COMPONENTS --> RADIO_CSS["radio.css"]
    COMPONENTS --> SWITCH_CSS["switch.css"]
    COMPONENTS --> DROPDOWN_CSS["dropdown-menu.css"]
    COMPONENTS --> NAV_CSS["nav.css"]
    COMPONENTS --> LAYOUT_CSS["layout.css"]
    COMPONENTS --> TOAST_CSS["toast.css"]
    COMPONENTS --> ALERT_DIALOG_CSS["alert-dialog.css"]
    COMPONENTS --> TABLE_CSS["table.css"]
    COMPONENTS --> BADGE_CSS["badge.css"]
    COMPONENTS --> PAGINATION_CSS["pagination.css"]
    COMPONENTS --> SEGMENTED_CSS["segmented-control.css"]
```

**Tokens (20 remaining CSS custom properties):**

| Token                                                                          | Category   | Used by                                                          |
| ------------------------------------------------------------------------------ | ---------- | ---------------------------------------------------------------- |
| `--background`                                                                 | Background | body, theme.css                                                  |
| `--background-page`                                                            | Background | body                                                             |
| `--surface`                                                                    | Surface    | surface.css                                                      |
| `--text-primary`                                                               | Text       | All components                                                   |
| `--text-secondary`                                                             | Text       | All components                                                   |
| `--border`                                                                     | Border     | All components                                                   |
| `--brand`, `--brand-soft`                                                      | Brand      | switch.css                                                       |
| `--success`, `--warning`, `--danger`                                           | Status     | colors-page.tsx, input.css, textarea.css, select.css, button.css |
| `--button-primary`, `--button-primary-shadow`                                  | Button     | button.css                                                       |
| `--button-secondary`, `--button-secondary-border`, `--button-secondary-shadow` | Button     | button.css                                                       |
| `--button-ghost-hover`                                                         | Button     | button.css                                                       |
| `--button-danger`                                                              | Button     | button.css                                                       |
| `--motion-normal`, `--motion-ease`                                             | Motion     | surface.css                                                      |

Remaining tokens from Tailwind v4 defaults (not defined in source but referenced): `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--blur-lg`, `--radius-3xl`.

---

## 12. Data Flow

### Request lifecycle

```mermaid
sequenceDiagram
    participant Browser
    participant NextJS as Next.js Server
    participant Layout
    participant Session as lib/auth
    participant Feature

    Browser->>NextJS: GET / (dashboard)
    NextJS->>Layout: (dashboard)/layout.tsx
    Layout->>Session: getSession()
    Session->>NextJS: cookies()
    NextJS-->>Session: cookie store
    Session-->>Layout: User | null

    alt No session
        Layout->>Browser: redirect /login
        Browser->>NextJS: GET /login
        NextJS->>Feature: LoginPage → LoginForm
        Feature-->>Browser: Login form HTML
        Browser->>NextJS: POST login (email, password)
        Note: LoginForm calls login() then createSession()
        NextJS->>Browser: redirect / (dashboard)
    else Session exists
        Layout->>NextJS: <AppShell user={session}>
        NextJS->>Feature: DashboardPage
        Feature-->>Browser: Dashboard HTML
    end
```

### Data flow rules

- **Database**: Drizzle ORM + Neon PostgreSQL serverless (3 schemas, 3 repositories)
- **No state management library** — React state only (useState, useSyncExternalStore)
- **No API routes** — uses Next.js Server Actions (`'use server'`)
- **Auth** — Currently mock-only (hardcoded users in `features/auth/auth.ts`)
- **Student CRUD** — Real database via `studentRepository` (findAll, findById, create, update)
- **Attendance** — Real database via `attendanceSessionRepository` + `attendanceRecordRepository`
- **Session** — Cookie-based, httpOnly, server-side only (getSession is async server function)
- **Theme** — next-themes, persisted to localStorage via `class` attribute

---

## 13. State Management

The project intentionally has no state management library.

### State categories

| Category        | Mechanism             | Examples                                                                                           |
| --------------- | --------------------- | -------------------------------------------------------------------------------------------------- |
| Component-local | `useState`            | Input password toggle, CodePreview expand/copy, CheckboxPage/RadioPage/SwitchPage controlled state |
| Theme           | next-themes (context) | ThemeToggle                                                                                        |
| Session         | Cookie (server-side)  | Dashboard layout, auth server actions                                                              |
| Async           | None yet              | login() mock, no React Query usage yet                                                             |

### `'use client'` directive usage

| Category      | Count | Components                                                                          |
| ------------- | ----- | ----------------------------------------------------------------------------------- |
| Correct usage | 5     | Input (uses useState), Checkbox/Radio/Select/Switch (Radix requires client context) |
| Unnecessary   | 1     | Textarea — no hooks, no browser APIs, no event handlers requiring client            |

---

## 14. Naming Conventions

### Files

| Type       | Convention   | Example                               |
| ---------- | ------------ | ------------------------------------- |
| Components | kebab-case   | `login-form.tsx`, `code-preview.tsx`  |
| Types      | `*.types.ts` | `button.types.ts`, `surface.types.ts` |
| Tests      | `*.test.tsx` | `select.test.tsx`                     |
| Styles     | `*.css`      | `button.css`, `layout.css`            |
| Utilities  | camelCase    | `utils.ts`, `session.ts`              |
| Config     | camelCase    | `app.ts`, `config/index.ts`           |

### Exports

| Type       | Convention                           | Examples                            |
| ---------- | ------------------------------------ | ----------------------------------- |
| Components | Named export                         | `export const Button = ...`         |
| Pages      | Default export (Next.js requirement) | `export default function LoginPage` |
| Utilities  | Named export                         | `export const cn = ...`             |
| Types      | Named type export                    | `export type ButtonProps = ...`     |

### CSS classes

| Convention     | Pattern                       | Example               |
| -------------- | ----------------------------- | --------------------- |
| Component root | `ads-{component}`             | `ads-button`          |
| Element (BEM)  | `ads-{component}__{element}`  | `ads-button__content` |
| Modifier (BEM) | `ads-{component}--{modifier}` | `ads-button--primary` |

### Variables

| Category         | Convention       | Example                                      |
| ---------------- | ---------------- | -------------------------------------------- |
| JavaScript       | camelCase        | `isLoading`, `appConfig`, `designNavigation` |
| CSS custom props | kebab-case       | `--text-primary`, `--button-primary`         |
| Constants        | UPPER_SNAKE_CASE | `SESSION_KEY`                                |
| Props            | camelCase        | `leftIcon`, `onCheckedChange`                |

---

## 15. Coding Conventions

Inferred from the repository codebase and AGENTS.md:

### Component structure (all components follow this)

```tsx
import { cn } from '@/lib';

import type { ComponentProps } from './component.types';

export const Component = ({ className, ...props }: ComponentProps) => (
  <div className={cn('ads-component', className)} {...props} />
);
```

### Props type pattern

```tsx
// Extends native HTML (Surface, Button, Card, Input, Textarea)
export type ComponentProps = NativeHTMLAttributes<HTMLElement> & {
  customProp?: string;
};

// Extends Radix (Checkbox, Radio, Select, Switch)
export type ComponentProps = ComponentPropsWithoutRef<typeof Primitive.Root>;

// Standalone (Select, Field, Header)
export type ComponentProps = {
  customProp: string;
};
```

### Arrow functions over function declarations

```tsx
// Preferred
export const Component = () => { ... };

// Not used in source (except @almaarif/brand Logo)
export function Component() { ... }
```

### Named exports over default exports

- Components: always named
- Pages: default (Next.js requirement)
- Barrel files: `export *` / `export type *`

### No `interface` — prefer `type`

All type declarations in the project are `type` not `interface` (refactored in a prior session).

### Tailwind-first styling

Components prefer Tailwind utility classes. Dedicated CSS files are only used for:

- Pseudo-elements (`::before`, `::after`)
- Complex selectors (`:focus-visible`, `:disabled`, Radix `[data-state]`)
- Animation keyframes
- Design tokens

---

## 16. Testing Strategy

### Current state

- **0 test files** exist
- **No test runner** configured — `@testing-library/react` and test runner types not installed
- **No `test` script** in `package.json`

### AGENTS.md test requirements

Tests should cover:

- Rendering
- Variants
- Interactions
- Accessibility when applicable

### Status by component

| Component        | Test exists? | Expected tests                                                                    |
| ---------------- | ------------ | --------------------------------------------------------------------------------- |
| Surface          | No           | Render test                                                                       |
| Button           | No           | Render, variants (primary/secondary/ghost/danger), sizes, loading/disabled states |
| Card             | No           | Render with heading/description/footer                                            |
| Header           | No           | Render with title/logo/actions                                                    |
| Input            | No           | Render, password toggle, loading/error/disabled states                            |
| Textarea         | No           | Render, sizes, resize variants, error state                                       |
| Select           | No           | Render, open/close, option selection                                              |
| Checkbox         | No           | Render, checked/unchecked, disabled                                               |
| Radio            | No           | Render, group selection, disabled                                                 |
| Switch           | No           | Render, toggled/untoggled, disabled                                               |
| Field            | No           | Render with label/error/description                                               |
| Badge            | No           | Render with variants                                                              |
| Table            | No           | Render with data, variants                                                        |
| DropdownMenu     | No           | Render, open/close, item selection                                                |
| AlertDialog      | No           | Render, confirm/cancel actions                                                    |
| Toast            | No           | Render, show/hide                                                                 |
| Skeleton         | No           | Render, loading state                                                             |
| EmptyState       | No           | Render with icon/title/description                                                |
| Pagination       | No           | Render, page navigation                                                           |
| SegmentedControl | No           | Render, tab switching                                                             |
| InfiniteScroll   | No           | Render, scroll detection                                                          |

---

## 17. Future Scalability

### What scales well

- **Monorepo structure** with Turborepo — adding new apps (`apps/mobile-api`, `apps/public`) is trivial
- **Feature-based architecture** — new features like `students`, `attendance` fit cleanly into `features/`
- **Design system** is composable and reusable across future apps
- **Radix UI primitives** provide accessible foundation that can be extended
- **TypeScript strict mode** catches issues early
- **Path aliases** make refactoring safer

### What needs attention for scale

| Issue                     | Impact                                         |
| ------------------------- | ---------------------------------------------- |
| No `src/` directory       | Can cause confusion as codebase grows          |
| No testing infrastructure | Cannot safely refactor                         |
| Mock authentication       | No real auth for production                    |
| Dead code (http client)   | Maintains confusion about what's usable        |
| Unused dependencies       | Wasted install time and disk space             |
| No delete endpoint        | Students can be created/edited but not deleted |

---

## 18. Known Technical Debt

### High

| #   | Issue                                   | File(s)                                             | Status      |
| --- | --------------------------------------- | --------------------------------------------------- | ----------- |
| 4   | 6 unused admin dependencies installed   | `apps/admin/package.json`                           | Pending     |
| 5   | 7 unused root dependencies installed    | Root `package.json`                                 | Pending     |
| 6   | `lib/http/client.ts` is completely dead | `lib/http/client.ts`                                | Pending     |
| 7   | No test runner configured               | No test files exist                                 | Pending     |
| 8   | Package boundary violations             | `app-shell.tsx`, `app-shell.types.ts`, `session.ts` | ✅ Resolved |
| 9   | Header missing docs page                | `features/ads/pages/`                               | Pending     |

### Medium

| #   | Issue                                             | File(s)                                                                |
| --- | ------------------------------------------------- | ---------------------------------------------------------------------- |
| 10  | Unused barrel exports                             | `features/dashboard/index.ts`, `sidebar/index.ts`                      |
| 11  | Import ordering inconsistencies                   | `login-form.tsx`, `app-shell.tsx`, `ads-shell.tsx`, `theme-toggle.tsx` |
| 12  | Mixed direct/barrel UI imports                    | `login-form.tsx`                                                       |
| 13  | `components.json` points to nonexistent hooks dir | `components.json`                                                      |
| 14  | Unused `public/brand/logo.png`                    | `public/brand/logo.png`                                                |

### Low

| #   | Issue                                        | File(s)                              |
| --- | -------------------------------------------- | ------------------------------------ |
| 15  | Textarea has unnecessary `'use client'`      | `textarea.tsx`                       |
| 16  | Logo component uses function declaration     | `packages/brand/components/logo.tsx` |
| 17  | Navigation has disabled items with no routes | `config/navigation.ts`               |

### Already resolved

- Empty CSS files and unused theme tokens — cleaned in prior sessions
- Badge CSS file — created `styles/components/badge.css`
- Badge barrel export — added to `components/ui/index.ts`
- Badge docs page — completed `features/ads/pages/badge-page.tsx`
- Field docs page — completed `features/ads/pages/field-page.tsx`
- Boundary violations — User type extracted to `lib/types/user.ts`, all imports updated
- Error boundary — created `app/(dashboard)/error.tsx` with friendly UI
- Header route — exists at `app/(design)/design/header/page.tsx`

---

## 19. Mermaid Diagrams

### Complete architecture overview

```mermaid
graph TD
    subgraph "Monorepo Root"
        ROOT_PKG["package.json"]
        TURBO["turbo.json"]
        WORKSPACE["pnpm-workspace.yaml"]
    end

    subgraph "apps/admin"
        APP["app/ — Routes & Layouts"]
        CONFIG["config/ — appConfig"]
        PROVIDERS["providers/ — AppProvider, ThemeProvider"]
        COMP_UI["components/ui/ — 23 ADS components"]
        COMP_APP["components/app/ — AppShell, Sidebar, MobileNav"]
        FEAT_AUTH["features/auth/ — Login, session"]
        FEAT_DASH["features/dashboard/ — Dashboard page"]
        FEAT_ADS["features/ads/ — Design playground"]
        FEAT_STUDENTS["features/students/ — Student CRUD (DB)"]
        FEAT_ATTENDANCE["features/attendance/ — Attendance system (DB)"]
        FEAT_MORE["features/more/ — Additional features"]
        LIB["lib/ — cn(), session, types, db, data"]
        STYLES["styles/ — Tokens + Component CSS"]
        PUBLIC["public/ — logo.png"]
    end

    subgraph "packages/brand"
        BRAND_PKG["package.json"]
        LOGO["Logo component"]
    end

    ROOT_PKG --> APP
    ROOT_PKG --> BRAND_PKG

    APP --> CONFIG
    APP --> PROVIDERS
    APP --> COMP_APP
    APP --> LIB

    COMP_APP --> COMP_UI
    COMP_APP --> LIB

    FEAT_AUTH --> LIB
    FEAT_AUTH --> COMP_UI

    FEAT_DASH --> COMP_UI
    FEAT_ADS --> COMP_UI
    FEAT_STUDENTS --> COMP_UI
    FEAT_ATTENDANCE --> COMP_UI

    LIB --> BRAND_PKG
    APP --> BRAND_PKG
    FEAT_AUTH --> BRAND_PKG
    FEAT_ADS --> BRAND_PKG

    STYLES --> APP
    PUBLIC --> BRAND_PKG
```

### Route resolution flow

```mermaid
graph LR
    subgraph "Request"
        URL["/ (dashboard)"]
        URL2["/login"]
        URL3["/design/button"]
    end

    subgraph "Route Match"
        R1["(dashboard)/page.tsx"]
        R2["(auth)/login/page.tsx"]
        R3["(design)/design/layout.tsx → (design)/design/button/page.tsx"]
    end

    subgraph "Layout"
        L1["(dashboard)/layout.tsx<br/>getSession() → redirect or AppShell"]
        L3["(design)/layout.tsx<br/>DesignShell"]
    end

    subgraph "Feature Page"
        F1["DashboardPage"]
        F2["LoginForm"]
        F3["ButtonPage → SectionPreview → Button"]
    end

    URL --> R1 --> L1 --> F1
    URL2 --> R2 --> F2
    URL3 --> R3 --> L3 --> F3
```

### Dependency graph (clean view)

```mermaid
graph LR
    APP["app/"] --> LIB["lib/"]
    APP --> CONFIG["config/"]
    APP --> PROVIDERS["providers/"]
    APP --> FEATURES["features/"]
    APP --> COMPONENTS["components/"]

    FEATURES --> COMPONENTS
    FEATURES --> LIB

    COMPONENTS --> LIB

    style LIB fill:#90EE90
    style CONFIG fill:#90EE90
    style PROVIDERS fill:#90EE90
    style FEATURES fill:#87CEEB
    style COMPONENTS fill:#FFB347
    style APP fill:#FF6B6B
```
