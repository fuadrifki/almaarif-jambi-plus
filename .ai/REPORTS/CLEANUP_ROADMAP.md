---
title: Cleanup Roadmap
date: 2026-07-12
source: .ai/REPORTS/2026-07-12-monorepo-health-report.md
---

# Cleanup Roadmap

All issues from the health report split into independent, actionable tasks.

Dependencies are noted — tasks with no dependencies can be parallelised.

---

## Critical

### T1 — Create badge.css

| Field               | Value                                                                                                                                                                                                                                                                                                 |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Issue**           | CR-1 — Badge has no CSS file                                                                                                                                                                                                                                                                          |
| **Priority**        | Critical                                                                                                                                                                                                                                                                                              |
| **Complexity**      | Small                                                                                                                                                                                                                                                                                                 |
| **Estimated files** | 2 (create `styles/components/badge.css`, update `styles/theme.css`)                                                                                                                                                                                                                                   |
| **Estimated LOC**   | ~50 (CSS) + 1 (import line)                                                                                                                                                                                                                                                                           |
| **Risk**            | Low — new file, no existing behavior affected                                                                                                                                                                                                                                                         |
| **Dependencies**    | None                                                                                                                                                                                                                                                                                                  |
| **Description**     | Create `styles/components/badge.css` with `.ads-badge`, `.ads-badge--default`, `.ads-badge--success`, `.ads-badge--warning`, `.ads-badge--danger`, `.ads-badge--info`. Follow existing CSS conventions: BEM naming, `var(--token)` colors, `:root`/`.dark` classes. Add import to `styles/theme.css`. |

---

### T2 — Add badge to UI barrel

| Field               | Value                                                      |
| ------------------- | ---------------------------------------------------------- |
| **Issue**           | CR-2 — Badge not exported from `components/ui/index.ts`    |
| **Priority**        | Critical                                                   |
| **Complexity**      | Trivial                                                    |
| **Estimated files** | 1 (`components/ui/index.ts`)                               |
| **Estimated LOC**   | +1 line                                                    |
| **Risk**            | Low — one-line addition                                    |
| **Dependencies**    | T1 (badge should have working CSS before public export)    |
| **Description**     | Add `export * from './badge'` to `components/ui/index.ts`. |

---

### T3 — Complete badge docs page

| Field               | Value                                                                                                                                                                                                                                                      |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Issue**           | CR-3 — Badge docs page is empty stub                                                                                                                                                                                                                       |
| **Priority**        | Critical                                                                                                                                                                                                                                                   |
| **Complexity**      | Small                                                                                                                                                                                                                                                      |
| **Estimated files** | 2 (`features/ads/pages/badge-page.tsx`, update navigation in ads-shell)                                                                                                                                                                                    |
| **Estimated LOC**   | ~80 (docs page) + ~5 (navigation)                                                                                                                                                                                                                          |
| **Risk**            | Low — new page content, no side effects                                                                                                                                                                                                                    |
| **Dependencies**    | T1, T2 (badge must be styled and importable)                                                                                                                                                                                                               |
| **Description**     | Replace empty stub in `features/ads/pages/badge-page.tsx` with full docs: variants, sections for each variant, sizes if applicable. Add navigation entry to design system sidebar. Follow existing patterns from `button-page.tsx` or `checkbox-page.tsx`. |

---

## High

### T4 — Remove unused admin dependencies

| Field               | Value                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Issue**           | HI-1/HI-2 — 6 unused deps in admin, 7 in root                                                                                                                                                                                                                                                                                                                                           |
| **Priority**        | High                                                                                                                                                                                                                                                                                                                                                                                    |
| **Complexity**      | Small                                                                                                                                                                                                                                                                                                                                                                                   |
| **Estimated files** | 2 (`apps/admin/package.json`, root `package.json`)                                                                                                                                                                                                                                                                                                                                      |
| **Estimated LOC**   | ~−13 lines                                                                                                                                                                                                                                                                                                                                                                              |
| **Risk**            | Medium — verify no implicit imports. `geist` may be auto-detected by Next.js. `shadcn` is the CLI tool — check if `components.json` or scripts reference it.                                                                                                                                                                                                                            |
| **Dependencies**    | None                                                                                                                                                                                                                                                                                                                                                                                    |
| **Description**     | Remove unused packages from both `package.json` files. Admin: `geist`, `class-variance-authority`, `motion`, `tw-animate-css`, `shadcn`, `@base-ui/react`. Root: `@hookform/resolvers`, `@tanstack/react-query`, `@tanstack/react-query-devtools`, `date-fns`, `react-hook-form`, `sonner`, `zod`. Run `pnpm install` after each change. Verify with `pnpm typecheck` and `pnpm build`. |

---

### T5 — Delete dead `lib/http/client.ts`

| Field               | Value                                                                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Issue**           | HI-3 — `lib/http/client.ts` is never imported                                                                                       |
| **Priority**        | High                                                                                                                                |
| **Complexity**      | Trivial                                                                                                                             |
| **Estimated files** | 2 (delete `lib/http/client.ts`, delete `lib/http/` if empty)                                                                        |
| **Estimated LOC**   | −~15                                                                                                                                |
| **Risk**            | Low — dead code, confirmed never imported                                                                                           |
| **Dependencies**    | None                                                                                                                                |
| **Description**     | Delete the file. Remove the directory if nothing remains. Verify `rg "from '@/lib/http'"` and `rg "from '../http'"` return nothing. |

---

### T6 — Configure test runner and fix select.test.tsx

| Field               | Value                                                                                                                                                                                                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Issue**           | HI-4 — No test runner, select.test.tsx has 9 TS errors                                                                                                                                                                   |
| **Priority**        | High                                                                                                                                                                                                                     |
| **Complexity**      | Medium                                                                                                                                                                                                                   |
| **Estimated files** | 3 (`apps/admin/package.json`, install deps, fix `select.test.tsx`)                                                                                                                                                       |
| **Estimated LOC**   | ~5 (script + deps) + ~10 (fix imports in test)                                                                                                                                                                           |
| **Risk**            | Medium — need to choose framework. Vitest recommended for ESM/Next.js 16/React 19 compatibility. Some test imports may need updating for the chosen framework.                                                           |
| **Dependencies**    | None                                                                                                                                                                                                                     |
| **Description**     | Install `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`. Add `test` script to `apps/admin/package.json`. Add vitest config. Fix `select.test.tsx` imports and types. Verify `pnpm test` passes. |

---

### T7 — Extract User type to shared lib location

| Field               | Value                                                                                                                                                                                                                                                                  |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Issue**           | HI-5 (part 1/3) — `lib/auth/session.ts` and `components/app/app-shell.types.ts` both import `User` from `features/auth/types`, violating dependency direction                                                                                                          |
| **Priority**        | High                                                                                                                                                                                                                                                                   |
| **Complexity**      | Small                                                                                                                                                                                                                                                                  |
| **Estimated files** | 4 (create `lib/auth/types.ts`, update `features/auth/types.ts`, update `lib/auth/index.ts`, update `lib/auth/session.ts`)                                                                                                                                              |
| **Estimated LOC**   | ~5 (new file) + ~1 (re-export) + ~1 (update imports in 2 files)                                                                                                                                                                                                        |
| **Risk**            | Low — type-only extraction, no runtime impact                                                                                                                                                                                                                          |
| **Dependencies**    | None                                                                                                                                                                                                                                                                   |
| **Description**     | Move `User` type from `features/auth/types.ts` to `lib/auth/types.ts`. Update `features/auth/types.ts` to re-export `User` from `lib/auth/types`. Update `lib/auth/session.ts` to import `User` from `./types` (relative). Update `lib/auth/index.ts` to export types. |

---

### T8 — Update app-shell.types.ts import

| Field               | Value                                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Issue**           | HI-5 (part 2/3) — `app-shell.types.ts` imports `User` from `features/auth/types`                              |
| **Priority**        | High                                                                                                          |
| **Complexity**      | Trivial                                                                                                       |
| **Estimated files** | 1 (`components/app/app-shell/app-shell.types.ts`)                                                             |
| **Estimated LOC**   | ~1 (change import path)                                                                                       |
| **Risk**            | Low — type-only import path change                                                                            |
| **Dependencies**    | T7 (must exist first)                                                                                         |
| **Description**     | Change `import type { User } from '@/features/auth/types'` to `import type { User } from '@/lib/auth/types'`. |

---

### T9 — Update session.ts import

| Field               | Value                                                                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Issue**           | HI-5 (part 3/3) — `lib/auth/session.ts` imports `User` from `features/auth/types`                                                     |
| **Priority**        | High                                                                                                                                  |
| **Complexity**      | Trivial                                                                                                                               |
| **Estimated files** | 1 (`lib/auth/session.ts`)                                                                                                             |
| **Estimated LOC**   | ~1 (change import path)                                                                                                               |
| **Risk**            | Low — type-only import path change                                                                                                    |
| **Dependencies**    | T7 (must exist first)                                                                                                                 |
| **Description**     | Change `import type { User } from '@/features/auth/types'` to `import type { User } from '@/lib/auth/types'` (or relative `./types`). |

---

### T10 — Create header docs page

| Field               | Value                                                                                                                                                                                               |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Issue**           | HI-6 (part 1/2) — Header component has no docs, route, or navigation                                                                                                                                |
| **Priority**        | High                                                                                                                                                                                                |
| **Complexity**      | Small                                                                                                                                                                                               |
| **Estimated files** | 3 (create `features/ads/pages/header-page.tsx`, create `app/(design)/design/header/page.tsx`, update navigation)                                                                                    |
| **Estimated LOC**   | ~60 (docs page) + ~2 (route) + ~5 (navigation)                                                                                                                                                      |
| **Risk**            | Low — new files, no existing behavior affected                                                                                                                                                      |
| **Dependencies**    | None                                                                                                                                                                                                |
| **Description**     | Create docs page using existing patterns (SectionPreview, variant demos). Show Header with different configurations (title, logo, actions). Create thin re-export route page. Add navigation entry. |

---

### T11 — Create field docs page

| Field               | Value                                                                                                                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Issue**           | HI-6 (part 2/2) — Field component has no docs, route, or navigation                                                                                                                   |
| **Priority**        | High                                                                                                                                                                                  |
| **Complexity**      | Small                                                                                                                                                                                 |
| **Estimated files** | 3 (create `features/ads/pages/field-page.tsx`, create `app/(design)/design/field/page.tsx`, update navigation)                                                                        |
| **Estimated LOC**   | ~60 (docs page) + ~2 (route) + ~5 (navigation)                                                                                                                                        |
| **Risk**            | Low — new files, no existing behavior affected                                                                                                                                        |
| **Dependencies**    | None (can parallelise with T10)                                                                                                                                                       |
| **Description**     | Create docs page showing Field with Input, Select, Checkbox, Radio inside. Show error state, description, required indicator. Create thin re-export route page. Add navigation entry. |

---

## Medium

### T12 — Fix sidebar barrel import in app-shell.tsx

| Field               | Value                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| **Issue**           | ME-1 (part 1/2) — `app-shell.tsx` imports directly from `'../sidebar/sidebar'` instead of barrel |
| **Priority**        | Medium                                                                                           |
| **Complexity**      | Trivial                                                                                          |
| **Estimated files** | 1 (`components/app/app-shell/app-shell.tsx`)                                                     |
| **Estimated LOC**   | ~1 (change import path)                                                                          |
| **Risk**            | Low — import path change only                                                                    |
| **Dependencies**    | None                                                                                             |
| **Description**     | Change `import { Sidebar } from '../sidebar/sidebar'` to `import { Sidebar } from '../sidebar'`. |

---

### T13 — Fix dashboard barrel import

| Field               | Value                                                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Issue**           | ME-1 (part 2/2) — Dashboard page imports directly from feature pages barrel bypass                                                         |
| **Priority**        | Medium                                                                                                                                     |
| **Complexity**      | Trivial                                                                                                                                    |
| **Estimated files** | 1 (`app/(dashboard)/page.tsx`)                                                                                                             |
| **Estimated LOC**   | ~1 (change import path)                                                                                                                    |
| **Risk**            | Low — import path change only                                                                                                              |
| **Dependencies**    | None                                                                                                                                       |
| **Description**     | Change `import { DashboardPage as default } from '@/features/dashboard/pages/dashboard-page'` to import via `@/features/dashboard` barrel. |

---

### T14 — Standardize UI component imports in login-form.tsx

| Field               | Value                                                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Issue**           | ME-2 — Mixes barrel and direct UI imports                                                                                                  |
| **Priority**        | Medium                                                                                                                                     |
| **Complexity**      | Trivial                                                                                                                                    |
| **Estimated files** | 1 (`features/auth/components/login-form.tsx`)                                                                                              |
| **Estimated LOC**   | ~2 (change import lines)                                                                                                                   |
| **Risk**            | Low — import path change only                                                                                                              |
| **Dependencies**    | None                                                                                                                                       |
| **Description**     | Change `import { Button } from '@/components/ui/button'` to `import { Button } from '@/components/ui'`. Keep `Surface` import from barrel. |

---

### T15 — Fix import ordering in 4 files

| Field               | Value                                                                                                                                                                                                                                           |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Issue**           | ME-3 — Import ordering violates AGENTS.md convention                                                                                                                                                                                            |
| **Priority**        | Medium                                                                                                                                                                                                                                          |
| **Complexity**      | Small                                                                                                                                                                                                                                           |
| **Estimated files** | 4 (`login-form.tsx`, `app-shell.tsx`, `ads-shell.tsx`, `theme-toggle.tsx`)                                                                                                                                                                      |
| **Estimated LOC**   | ~20 (reorder import blocks)                                                                                                                                                                                                                     |
| **Risk**            | Low — cosmetic reordering                                                                                                                                                                                                                       |
| **Dependencies**    | None                                                                                                                                                                                                                                            |
| **Description**     | Fix import order in each file to follow: React → External packages → Internal aliases (`@/`) → Relative imports. Remove blank lines between groups of the same type. Ensure `import type` is grouped with regular imports from the same source. |

---

### T16 — Fix components.json hooks alias

| Field               | Value                                                                                |
| ------------------- | ------------------------------------------------------------------------------------ |
| **Issue**           | ME-4 — `components.json` points `"hooks"` to nonexistent `@/hooks`                   |
| **Priority**        | Medium                                                                               |
| **Complexity**      | Trivial                                                                              |
| **Estimated files** | 1 (`components.json`)                                                                |
| **Estimated LOC**   | ~1 (remove or update)                                                                |
| **Risk**            | Low — shadcn config only, no runtime impact                                          |
| **Dependencies**    | None                                                                                 |
| **Description**     | Either remove the `hooks` alias or point it to `@/lib` (existing utility directory). |

---

### T17 — Remove unused public asset

| Field               | Value                                                                                                                        |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Issue**           | ME-5 — `public/brand/logo.png` is never referenced                                                                           |
| **Priority**        | Medium                                                                                                                       |
| **Complexity**      | Trivial                                                                                                                      |
| **Estimated files** | 2 (delete `public/brand/logo.png`, delete `public/brand/` if empty)                                                          |
| **Estimated LOC**   | −0 (asset deletion)                                                                                                          |
| **Risk**            | Low — confirmed unused                                                                                                       |
| **Dependencies**    | None                                                                                                                         |
| **Description**     | Delete the PNG file. Remove the directory if nothing remains. Verify no file references `/brand/logo.png` or `public/brand`. |

---

## Low

### T18 — Remove unnecessary `'use client'` from textarea.tsx

| Field               | Value                                                                                                                                                          |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Issue**           | LO-2 — Textarea has `'use client'` but uses no hooks, no browser APIs, no event handlers                                                                       |
| **Priority**        | Low                                                                                                                                                            |
| **Complexity**      | Trivial                                                                                                                                                        |
| **Estimated files** | 1 (`components/ui/textarea/textarea.tsx`)                                                                                                                      |
| **Estimated LOC**   | −1 line                                                                                                                                                        |
| **Risk**            | Low — removing directive promotes it to Server Component, which is the desired behavior                                                                        |
| **Dependencies**    | None                                                                                                                                                           |
| **Description**     | Remove the `'use client'` directive from the top of the file. Verify the component works as a Server Component (no hooks, no event handlers — currently true). |

---

### T19 — Convert Logo to arrow function

| Field               | Value                                                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Issue**           | LO-3 — `@almaarif/brand` Logo uses `export function Logo()` instead of arrow function                                      |
| **Priority**        | Low                                                                                                                        |
| **Complexity**      | Trivial                                                                                                                    |
| **Estimated files** | 1 (`packages/brand/components/logo.tsx`)                                                                                   |
| **Estimated LOC**   | ~2 (convert declaration)                                                                                                   |
| **Risk**            | Low — cosmetic refactor of a single-component package                                                                      |
| **Dependencies**    | None                                                                                                                       |
| **Description**     | Convert `export function Logo(...)` to `export const Logo = (...) => { ... }`. Ensure named export behaviour is identical. |

---

### T20 — Remove or redirect dead navigation links

| Field               | Value                                                                                                                                           |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Issue**           | LO-4 — Sidebar links to `/users` and `/settings` which have no routes                                                                           |
| **Priority**        | Low                                                                                                                                             |
| **Complexity**      | Trivial                                                                                                                                         |
| **Estimated files** | 1 (`components/app/sidebar/sidebar.tsx`)                                                                                                        |
| **Estimated LOC**   | ~2 (remove 2 items from navigation array)                                                                                                       |
| **Risk**            | Low — removing links to 404 pages improves UX. Can be restored when routes exist.                                                               |
| **Dependencies**    | None                                                                                                                                            |
| **Description**     | Remove `{ label: 'Users', href: '/users' }` and `{ label: 'Settings', href: '/settings' }` from the navigation array. Or keep them with a note. |

---

### T21 — Resolve CLAUDE.md pointer file

| Field               | Value                                                                                                                                                               |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Issue**           | LO-5 — `CLAUDE.md` contains only `@AGENTS.md`                                                                                                                       |
| **Priority**        | Low                                                                                                                                                                 |
| **Complexity**      | Trivial                                                                                                                                                             |
| **Estimated files** | 1 (`CLAUDE.md`)                                                                                                                                                     |
| **Estimated LOC**   | ~3                                                                                                                                                                  |
| **Risk**            | Low                                                                                                                                                                 |
| **Dependencies**    | None                                                                                                                                                                |
| **Description**     | Update `CLAUDE.md` to reference the correct path: `.ai/ARCHITECTURE.md`, `.ai/DECISIONS.md`, and `AGENTS.md`. Or remove if the `@` directive pattern is not needed. |

---

### T22 — Resolve orphaned `docs/` directory

| Field               | Value                                                                                                                   |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Issue**           | LO-6 — `docs/ads-development-rules.md` is unreferenced                                                                  |
| **Priority**        | Low                                                                                                                     |
| **Complexity**      | Trivial                                                                                                                 |
| **Estimated files** | 2 (delete `docs/ads-development-rules.md`, delete `docs/` if empty)                                                     |
| **Estimated LOC**   | −0 (file deletion)                                                                                                      |
| **Risk**            | Low — confirmed unreferenced                                                                                            |
| **Dependencies**    | None                                                                                                                    |
| **Description**     | Delete `docs/ads-development-rules.md`. Remove `docs/` if nothing remains. Verify with `rg` that nothing references it. |

---

### T23 — Resolve empty scripts/ directory

| Field               | Value                                                                     |
| ------------------- | ------------------------------------------------------------------------- |
| **Issue**           | LO-7 — `scripts/` directory exists with no files                          |
| **Priority**        | Low                                                                       |
| **Complexity**      | Trivial                                                                   |
| **Estimated files** | 1 (delete `scripts/` directory)                                           |
| **Estimated LOC**   | −0                                                                        |
| **Risk**            | Low — empty directory                                                     |
| **Dependencies**    | None                                                                      |
| **Description**     | Remove the empty `scripts/` directory. Create it when scripts are needed. |

---

### T24 — Deduplicate layout.css classes

| Field               | Value                                                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Issue**           | DEC-69 — `.ads-layout` and `.app-layout` are identical                                                                     |
| **Priority**        | Low                                                                                                                        |
| **Complexity**      | Small                                                                                                                      |
| **Estimated files** | 2 (`styles/components/layout.css`, update `app-shell.tsx` or `ads-shell.tsx` to use the other class)                       |
| **Estimated LOC**   | ~4 (1 removal from CSS, 1 update in shell component)                                                                       |
| **Risk**            | Low — CSS class alias removal                                                                                              |
| **Dependencies**    | None                                                                                                                       |
| **Description**     | Choose one canonical class name (e.g., `.ads-layout`). Remove the other. Update the component that uses the removed class. |

---

## Dependency Graph

```
T1 (badge.css)
  └── T2 (badge barrel)
        └── T3 (badge docs)

T7 (extract User type to lib/auth/types)
  ├── T8 (update app-shell.types.ts)
  └── T9 (update session.ts)

T4 (remove unused deps)         │
T5 (delete dead http client)    │
T6 (configure test runner)      ├── All independent, can parallelise
T10 (header docs page)          │
T11 (field docs page)           │
T12–T17 (medium issues)         │
T18–T24 (low issues)            │
                                │
T10 and T11 can be parallelised
T12–T17 are all independent of each other
T18–T24 are all independent of each other
T8/T9 depend on T7 but are independent of each other
```

## Summary

| Priority  | Tasks  | Estimated files | Estimated LOC | Risk profile            |
| --------- | ------ | --------------- | ------------- | ----------------------- |
| Critical  | 3      | 5               | ~137          | Low                     |
| High      | 8      | 18              | ~155          | Low–Medium (T6: medium) |
| Medium    | 6      | 9               | ~28           | Low                     |
| Low       | 7      | 9               | ~12           | Low                     |
| **Total** | **24** | **41**          | **~332**      | Mostly low risk         |
