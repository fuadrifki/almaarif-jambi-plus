# Feature Prompt

Read `AGENTS.md` (root + apps/admin), `.ai/ARCHITECTURE.md`, and `.ai/DECISIONS.md` before doing anything.

## Task

Implement a new business feature following the existing architecture and conventions.

## Repository Architecture

```
features/{feature-name}/
├── index.ts                   # Barrel — re-export public API
├── types.ts                   # Feature-specific types
├── {logic-file}.ts            # Business logic
├── server.ts                  # Server Actions ('use server')
├── components/
│   ├── {some-component}.tsx   # Feature-specific components
│   └── ...
└── pages/
    └── {feature}-page.tsx     # Page component (named export)
```

## Process

### Step 1 — Inspect Existing

Before writing any code:

- Check if required UI already exists in `components/ui/` (ADS)
- If UI is missing, create the ADS component first
- Check existing features (`features/auth/`, `features/dashboard/`) for patterns to follow

### Step 2 — Define Types

- Create `types.ts` with `type` (not `interface`)
- If the feature extends the `User` type, import from `@/features/auth/types`

### Step 3 — Implement Logic

- Create business logic file(s) as pure functions
- Keep functions focused and small
- Use named exports

### Step 4 — Implement Server Actions (if needed)

- Create `server.ts` with `'use server'` directive
- Keep server actions thin — delegate to `lib/` utilities
- If cookie session operations needed, use `@/lib/auth` functions

### Step 5 — Implement Components

- Place in `features/{feature}/components/`
- Feature-specific UI lives here; reusable UI lives in `components/ui/`
- Server Components by default; `'use client'` only when needed
- Use `cn()` from `@/lib` for class merging
- Use ADS components from `@/components/ui` (barrel import)
- Use `lucide-react` for icons
- Use Indonesian for all UI text

### Step 6 — Create Page Component

- Create in `features/{feature}/pages/{feature}-page.tsx`
- Named export (e.g., `export const StudentsPage = () => ...`)

### Step 7 — Create Route

- In `app/`, create the appropriate route group directory if needed
- Use thin re-export pattern:

```ts
// app/(dashboard)/students/page.tsx
export { StudentsPage as default } from '@/features/students/pages/students-page';
```

### Step 8 — Update Navigation

- If the feature needs a sidebar link, add to `components/app/sidebar/sidebar.tsx`

## Conventions to Follow

| Rule              | Details                                                                          |
| ----------------- | -------------------------------------------------------------------------------- |
| Package manager   | `pnpm` only                                                                      |
| Component style   | `export const ComponentName = () => ...`                                         |
| Type declarations | `type` not `interface`                                                           |
| Class merging     | `cn('ads-class', className)` from `@/lib`                                        |
| Imports           | React → external → internal alias → relative                                     |
| Styling           | Tailwind first; CSS files only for pseudo-elements, complex selectors, keyframes |
| CSS classes       | `ads-{component}--{modifier}` BEM naming                                         |
| Icons             | `lucide-react`                                                                   |
| Colors            | Reference `var(--token-name)`, never hardcode                                    |
| Dark mode         | Handled automatically via `.dark` class → CSS variables                          |
| Language          | Indonesian for all UI text                                                       |
| Layout            | Use existing `AppShell` for dashboard pages, `DesignShell` for design pages      |
| Auth guard        | Protected pages go under `(dashboard)/` layout (auto-guarded)                    |
| UI text           | Indonesian (Bahasa Indonesia)                                                    |

## What to Avoid

- Installing new packages without approval
- Creating new route groups without approval
- Modifying existing component APIs
- Duplicating existing patterns (check first)
- Breaking changes to existing exports

## Verification

After implementation:

1. `pnpm typecheck` passes
2. `pnpm lint` passes
3. Run `pnpm build` to verify production build
