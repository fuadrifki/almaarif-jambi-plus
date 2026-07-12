---
title: Monorepo Health Report
date: 2026-07-12
repository: almaarif-jambi-plus
branch: main
commit: c1f0c83b3d56a7604d3a0f497d66cbaf269db626
---

## Monorepo Health Report — almaarif-jambi-plus

---

### Critical

| #    | Issue                                 | Details                                                                                                                                                    |
| ---- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CR-1 | **Badge component has no CSS file**   | `badge.tsx` references `ads-badge` and `ads-badge--${variant}` classes, but `styles/components/badge.css` doesn't exist. These classes compile to nothing. |
| CR-2 | **Badge not exported from UI barrel** | `components/ui/index.ts` exports 11 components but not `badge`. Badge is a dead module from the public API perspective.                                    |
| CR-3 | **Badge docs page is an empty stub**  | `features/ads/pages/badge-page.tsx` renders `<></>`. Route exists (`app/(design)/design/badge/page.tsx`) but shows nothing.                                |

### High

| #    | Issue                                              | Details                                                                                                                                                                                                                                                                                                                                |
| ---- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| HI-1 | **Root dependencies installed but unused**         | 7 packages in root `package.json` (`@hookform/resolvers`, `@tanstack/react-query`, `@tanstack/react-query-devtools`, `date-fns`, `react-hook-form`, `sonner`, `zod`) are not imported anywhere. These are reserved for future apps but inflate installs.                                                                               |
| HI-2 | **Admin dependencies installed but unused**        | 6 packages never imported: `geist`, `class-variance-authority`, `motion`, `tw-animate-css`, `shadcn`, `@base-ui/react`. These add ~30MB to `node_modules` with zero benefit.                                                                                                                                                           |
| HI-3 | **`lib/http/client.ts` is completely dead**        | The `http` fetch wrapper is never imported or re-exported anywhere.                                                                                                                                                                                                                                                                    |
| HI-4 | **No test runner configured**                      | `select.test.tsx` exists but `@testing-library/react` and test runner types are not installed. No `test` script in `package.json`. File generates 9 TypeScript errors.                                                                                                                                                                 |
| HI-5 | **Package boundary violations**                    | `components/app/app-shell/app-shell.tsx` imports from `@/features/auth/components/user-menu`. `components/app/app-shell/app-shell.types.ts` imports from `@/features/auth/types`. `lib/auth/session.ts` imports from `@/features/auth/types`. These create an upward dependency: `lib/` and `components/` should be leaf dependencies. |
| HI-6 | **Header component missing route/docs/navigation** | `header.tsx` is a complete component but has no docs page, no route, no navigation link. Same for `field` component.                                                                                                                                                                                                                   |

### Medium

| #    | Issue                                                       | Details                                                                                                                                                                                                                                                                  |
| ---- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ME-1 | **Unused barrel exports**                                   | `features/dashboard/index.ts` barrel is bypassed by `app/(dashboard)/page.tsx` (imports directly from `@/features/dashboard/pages/dashboard-page`). `components/app/sidebar/index.ts` barrel is bypassed by `app-shell.tsx` (direct relative import).                    |
| ME-2 | **Inconsistent import paths to UI barrel**                  | `login-form.tsx` imports `Button` via `@/components/ui/button` (direct) but `Surface` via `@/components/ui` (barrel). Mix of both patterns in same file.                                                                                                                 |
| ME-3 | **Import ordering inconsistencies**                         | `login-form.tsx`: external `@almaarif/brand` placed after internal `@/features/auth` imports. `app-shell.tsx`: `@almaarif/brand` sandwiched between aliases. `ads-shell.tsx`: relative imports before alias imports. `theme-toggle.tsx`: alias before external packages. |
| ME-4 | **`components.json` points to nonexistent hooks directory** | `"hooks": "@/hooks"` — the `hooks/` directory was deleted.                                                                                                                                                                                                               |
| ME-5 | **`public/brand/logo.png` is never referenced**             | The brand logo used by the app comes from the `@almaarif/brand` workspace package, not from `public/`.                                                                                                                                                                   |

### Low

| #    | Issue                                                    | Details                                                                                                                                                                     |
| ---- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| LO-1 | **Architecture dependency risk**                         | `lib/auth/session.ts` ↔ `features/auth/types` creates a bidirectional dependency between `lib/` and `features/`. Not a cycle yet because `types.ts` is a leaf, but fragile. |
| LO-2 | **No `src/` directory**                                  | All source code lives at `apps/admin/` root, which is unorthodox for a Next.js project (though valid).                                                                      |
| LO-3 | **`CLAUDE.md` is a pointer file**                        | Contains only `@AGENTS.md` with no unique content.                                                                                                                          |
| LO-4 | **`docs/ads-development-rules.md` is a stand-alone doc** | Not imported or referenced by any source file.                                                                                                                              |
| LO-5 | **`scripts/` directory is empty**                        | Exists with no files.                                                                                                                                                       |

### Already Fixed (from prior sessions)

The following issues identified by subagents were already resolved in earlier sessions:

- `field.css` (was orphaned/empty) — **deleted**
- `glass.css` (unused tokens) — **deleted**
- `shadow.css` (unused tokens) — **deleted**
- Surface `:hover` (no-op rule) — **removed**
- Unused tokens in `colors.css` (14 tokens) — **removed**
- Unused tokens in `motion.css` (2 tokens) — **removed**
- `theme.css` imports — **updated**

### What's Healthy

- **Zero** lint errors
- **Zero** circular dependencies
- **Zero** `any` types
- **Zero** `console.log` or commented-out code
- **Zero** duplicate utilities or types
- **Zero** long relative imports (`../../`)
- **All** component file naming conventions are consistent
- **All** CSS follows `ads-` BEM convention
- **ESLint** and **TypeScript** configurations are solid
- **Turborepo** pipeline correctly validates workspace dependency order
- **Feature boundaries** between `auth`, `dashboard`, and `ads` are clean (no cross-feature imports)
