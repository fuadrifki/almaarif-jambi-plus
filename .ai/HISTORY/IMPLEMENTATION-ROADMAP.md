---
title: Implementation Roadmap
date: 2026-07-12
parent-report: 2026-07-12-monorepo-health-report.md
superseded-by: CLEANUP_ROADMAP.md
---

> **⚠️ Superseded** — This roadmap is kept for reference only.  
> Use [`CLEANUP_ROADMAP.md`](./CLEANUP_ROADMAP.md) instead, which decomposes the same issues into 24 more granular tasks with precise dependency tracking.

# Implementation Roadmap

Tasks are sorted by priority (Critical → High → Medium → Low). Within each tier, tasks are ordered to respect dependencies — complete earlier tasks first.

---

## Task 1: Create badge.css — Badge styling

| Field                | Value                                                                                                          |
| -------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Priority**         | Critical                                                                                                       |
| **Issue**            | CR-1 — Badge component references `ads-badge` and `ads-badge--${variant}` classes but no CSS file defines them |
| **Affected files**   | Create: `styles/components/badge.css`, Update: `styles/theme.css` (add `@import './components/badge.css'`)     |
| **Complexity**       | Small                                                                                                          |
| **Risk**             | Low — new file, no existing behavior affected                                                                  |
| **Dependencies**     | None                                                                                                           |
| **Expected outcome** | Badge variants render with visible styling matching ADS conventions                                            |

---

## Task 2: Add badge to UI barrel

| Field                | Value                                                                 |
| -------------------- | --------------------------------------------------------------------- |
| **Priority**         | Critical                                                              |
| **Issue**            | CR-2 — `components/ui/index.ts` exports 11 components but not `badge` |
| **Affected files**   | `components/ui/index.ts` (add `export * from './badge'`)              |
| **Complexity**       | Trivial                                                               |
| **Risk**             | Low — one line addition                                               |
| **Dependencies**     | Task 1 (badge must have working CSS first)                            |
| **Expected outcome** | `Badge` becomes importable from `@/components/ui`                     |

---

## Task 3: Complete badge docs page

| Field                | Value                                                                                                                  |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Priority**         | Critical                                                                                                               |
| **Issue**            | CR-3 — `badge-page.tsx` renders `<></>`; route exists but shows nothing                                                |
| **Affected files**   | `features/ads/pages/badge-page.tsx`, `features/ads/components/ads-shell/ads-shell.navigation.ts` (add badge nav entry) |
| **Complexity**       | Small                                                                                                                  |
| **Risk**             | Low — new page content, no side effects                                                                                |
| **Dependencies**     | Tasks 1, 2 (badge must be styled and importable)                                                                       |
| **Expected outcome** | `/design/badge` displays badge variants with usage examples                                                            |

---

## Task 4: Add header and field to design system navigation

| Field                | Value                                                                                                                                                          |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Priority**         | High                                                                                                                                                           |
| **Issue**            | HI-6 — `header` and `field` have no docs, route, or navigation entry                                                                                           |
| **Affected files**   | Create: `features/ads/pages/header-page.tsx`, `features/ads/pages/field-page.tsx`, `app/(design)/design/header/page.tsx`, `app/(design)/design/field/page.tsx` |
| **Complexity**       | Medium                                                                                                                                                         |
| **Risk**             | Low — new files only                                                                                                                                           |
| **Dependencies**     | None                                                                                                                                                           |
| **Expected outcome** | Header and Field appear in the design system sidebar with working demo pages                                                                                   |

---

## Task 5: Remove dead `lib/http/client.ts`

| Field                | Value                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------- |
| **Priority**         | High                                                                                        |
| **Issue**            | HI-3 — `lib/http/client.ts` exports an `http` fetch wrapper that is never imported anywhere |
| **Affected files**   | Delete: `lib/http/client.ts`, `lib/http/` (if empty after)                                  |
| **Complexity**       | Trivial                                                                                     |
| **Risk**             | Low — dead code removal                                                                     |
| **Dependencies**     | None                                                                                        |
| **Expected outcome** | Dead code eliminated; no change in runtime behavior                                         |

---

## Task 6: Remove unused admin dependencies

| Field                | Value                                                                                                                                                             |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Priority**         | High                                                                                                                                                              |
| **Issue**            | HI-2 — 6 packages installed but never imported: `geist`, `class-variance-authority`, `motion`, `tw-animate-css`, `shadcn`, `@base-ui/react`                       |
| **Affected files**   | `apps/admin/package.json`                                                                                                                                         |
| **Complexity**       | Trivial                                                                                                                                                           |
| **Risk**             | Medium — need to verify none are pulled in implicitly by Next.js or PostCSS. `geist` is the main concern since Next.js may auto-detect it. Verify before removal. |
| **Dependencies**     | None                                                                                                                                                              |
| **Expected outcome** | Smaller `node_modules`, faster installs, clearer dependency graph                                                                                                 |

---

## Task 7: Remove unused root dependencies

| Field                | Value                                                                                                                                                                                            |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Priority**         | High                                                                                                                                                                                             |
| **Issue**            | HI-1 — 7 packages in root `package.json` not imported by admin: `@hookform/resolvers`, `@tanstack/react-query`, `@tanstack/react-query-devtools`, `date-fns`, `react-hook-form`, `sonner`, `zod` |
| **Affected files**   | Root `package.json`                                                                                                                                                                              |
| **Complexity**       | Trivial                                                                                                                                                                                          |
| **Risk**             | Low — none of these are used. If future apps need them, they declare their own deps.                                                                                                             |
| **Dependencies**     | None                                                                                                                                                                                             |
| **Expected outcome** | Cleaner root `package.json`; no impact on admin                                                                                                                                                  |

---

## Task 8: Configure test runner and fix test file

| Field                | Value                                                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Priority**         | High                                                                                                                            |
| **Issue**            | HI-4 — `select.test.tsx` exists but no test runner configured; 9 TypeScript errors from missing types                           |
| **Affected files**   | `apps/admin/package.json` (add test script + devDeps), install `@testing-library/react`, `@types/jest` (or vitest alternatives) |
| **Complexity**       | Medium                                                                                                                          |
| **Risk**             | Medium — choosing the right test framework. Recommend vitest for compatibility with Next.js 16 / React 19 / ESM.                |
| **Dependencies**     | None                                                                                                                            |
| **Expected outcome** | `pnpm test` passes for existing tests; test infrastructure ready for future tests                                               |

---

## Task 9: Fix barrel usage — sidebar and dashboard

| Field                | Value                                                                                                                                                                       |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Priority**         | Medium                                                                                                                                                                      |
| **Issue**            | ME-1 — Two barrels exist but are bypassed by direct imports                                                                                                                 |
| **Affected files**   | `components/app/app-shell/app-shell.tsx` (change `'../sidebar/sidebar'` → `'../sidebar'`), `app/(dashboard)/page.tsx` (change to import from `@/features/dashboard` barrel) |
| **Complexity**       | Small                                                                                                                                                                       |
| **Risk**             | Low — pure import path change                                                                                                                                               |
| **Dependencies**     | None                                                                                                                                                                        |
| **Expected outcome** | Barrel files serve their intended purpose as public API entry points                                                                                                        |

---

## Task 10: Fix import ordering

| Field                | Value                                                                                                                                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Priority**         | Medium                                                                                                                                                                                          |
| **Issue**            | ME-3 — 4 files violate the import ordering convention (React → External → Aliases → Relative)                                                                                                   |
| **Affected files**   | `features/auth/components/login-form.tsx`, `components/app/app-shell/app-shell.tsx`, `features/ads/components/ads-shell/ads-shell.tsx`, `features/ads/components/theme-toggle/theme-toggle.tsx` |
| **Complexity**       | Small                                                                                                                                                                                           |
| **Risk**             | Low — cosmetic reordering only                                                                                                                                                                  |
| **Dependencies**     | None                                                                                                                                                                                            |
| **Expected outcome** | All imports follow the agreed ordering convention                                                                                                                                               |

---

## Task 11: Standardize UI component import paths in login-form

| Field                | Value                                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Priority**         | Medium                                                                                                                   |
| **Issue**            | ME-2 — `login-form.tsx` mixes barrel (`@/components/ui`) and direct (`@/components/ui/button`) imports for UI components |
| **Affected files**   | `features/auth/components/login-form.tsx`                                                                                |
| **Complexity**       | Small                                                                                                                    |
| **Risk**             | Low — choose one pattern, apply consistently. Recommend barrel imports for brevity and consistency with AGENTS.md.       |
| **Dependencies**     | None (but can be grouped with Task 10 as both touch the same file)                                                       |
| **Expected outcome** | Single consistent import pattern for UI components                                                                       |

---

## Task 12: Fix components.json hooks alias

| Field                | Value                                                                    |
| -------------------- | ------------------------------------------------------------------------ |
| **Priority**         | Medium                                                                   |
| **Issue**            | ME-4 — `components.json` points `hooks` to `@/hooks` which doesn't exist |
| **Affected files**   | `components.json` (update or remove `hooks` alias)                       |
| **Complexity**       | Trivial                                                                  |
| **Risk**             | Low — shadcn config only, no runtime impact                              |
| **Dependencies**     | None                                                                     |
| **Expected outcome** | `components.json` no longer references a nonexistent directory           |

---

## Task 13: Remove unused public asset

| Field                | Value                                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------------- |
| **Priority**         | Medium                                                                                         |
| **Issue**            | ME-5 — `public/brand/logo.png` is never referenced (Logo comes from `@almaarif/brand` package) |
| **Affected files**   | Delete: `public/brand/logo.png`, `public/brand/` (if empty after)                              |
| **Complexity**       | Trivial                                                                                        |
| **Risk**             | Low                                                                                            |
| **Dependencies**     | None                                                                                           |
| **Expected outcome** | Unused asset removed from the build output                                                     |

---

## Task 14: Restructure to remove lib→features dependency

| Field                | Value                                                                                                                 |
| -------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Priority**         | Low                                                                                                                   |
| **Issue**            | LO-1 — `lib/auth/session.ts` imports `User` from `@/features/auth/types`, creating a fragile bidirectional dependency |
| **Affected files**   | `lib/auth/session.ts` (replace import), `features/auth/types.ts` (consider extracting User type to shared types)      |
| **Complexity**       | Medium                                                                                                                |
| **Risk**             | Low — type-only dependency, no runtime impact                                                                         |
| **Dependencies**     | None                                                                                                                  |
| **Expected outcome** | `lib/` becomes a pure leaf dependency with no upward imports to `features/`                                           |

---

## Task 15: Clean up orphaned files

| Field                | Value                                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------------- |
| **Priority**         | Low                                                                                            |
| **Issue**            | LO-3, LO-4, LO-5 — `CLAUDE.md` is a pointer file, `docs/` is unreferenced, `scripts/` is empty |
| **Affected files**   | `CLAUDE.md`, `docs/ads-development-rules.md`, `scripts/`                                       |
| **Complexity**       | Trivial                                                                                        |
| **Risk**             | Low                                                                                            |
| **Dependencies**     | None                                                                                           |
| **Expected outcome** | Repository cleaner; no functional impact                                                       |

---

## Dependency Graph

```
Task 1 (badge.css)
  └── Task 2 (badge barrel)
        └── Task 3 (badge docs)

Task 4 (header+field docs)    [independent]

Task 5 (remove dead http)     [independent]
Task 6 (remove unused deps)   [independent]
Task 7 (remove root deps)     [independent]
Task 8 (test runner)          [independent]
Task 9 (barrel usage)         [independent]
Task 10 (import ordering)     [independent]
Task 11 (import consistency)  [independent — same file as Task 10]
Task 12 (components.json)     [independent]
Task 13 (remove public asset) [independent]
Task 14 (lib→features dep)    [independent]
Task 15 (orphan cleanup)      [independent]
```

Tasks 1–3 form a dependency chain and should be done sequentially. All other tasks are independent and can be parallelised.
