---
title: AGENTS.md Recommendations
date: 2026-07-12
sources:
  - AGENTS.md (root)
  - apps/admin/AGENTS.md
  - .ai/ARCHITECTURE.md
  - .ai/DECISIONS.md
  - .ai/REPORTS/2026-07-12-monorepo-health-report.md
  - Repository source analysis
---

# AGENTS.md Recommendations

---

## 1. Outdated Rules

### 1.1 Component Structure — Missing `.types.ts` and `ui/` directory

**Source:** root `AGENTS.md` > Component Structure

**Current text:**

```
components/
    button/
        button.tsx
        button.test.tsx
        index.ts
```

**Why it's outdated:** The actual convention (12/12 components follow it) is:

```
components/ui/{name}/
    {name}.tsx
    {name}.types.ts
    index.ts
```

Two discrepancies:

- Missing `ui/` intermediate directory (all ADS components live under `components/ui/`)
- Shows `button.test.tsx` as standard but no test files exist (0/12 components have a working test)
- Missing `{name}.types.ts` which exists for every component

---

### 1.2 Testing Section — No Infrastructure Exists

**Source:** root `AGENTS.md` > Testing

**Current text:**

> Whenever creating or modifying components: Create or update tests. Tests should cover: rendering, variants, interactions, accessibility when applicable.

**Why it's outdated:** No test runner is configured. No test script exists in `package.json`. `@testing-library/react` is not installed. The only test file (`select.test.tsx`) has 9 TypeScript errors and cannot run. This rule mandates behavior that is currently impossible to follow.

---

### 1.3 apps/admin — "Current ADS Status"

**Source:** `apps/admin/AGENTS.md` > Current ADS Status

**Current text:** Lists Surface, Button, Field, Input, Select, Textarea, Checkbox, Radio, Switch as completed, Badge as not finished.

**Why it's outdated:** This status list is hardcoded and must be manually updated. It has no connection to the actual component state. It's already stale — Badge's incompleteness is tracked in health reports but the AGENTS.md status doesn't reference the specific gaps (no CSS, no barrel export, empty docs page).

---

### 1.4 apps/admin — "Current Development Direction" / "Current Feature"

**Source:** `apps/admin/AGENTS.md` > Current Development Direction, Current Feature

**Current text:** Pause ADS, focus on Authentication + Dashboard Access Flow. Specifies login fields, User shape, protected route behavior.

**Why it's outdated:** These sections describe a single sprint's scope embedded in a permanent project rules file. Once the auth feature is done, these sections become historical artifacts. Project-level rules files should not contain sprint-level scope.

---

## 2. Missing Rules

### 2.1 `type` over `interface`

**Evidence:** 100% of type declarations across all components, features, and libraries use `type`. Zero `interface` declarations exist.

**Recommendation:** Add to root `AGENTS.md` > Coding Style: "Use `type` for all type declarations. Never use `interface`."

---

### 2.2 `cn()` Utility for Class Merging

**Evidence:** All 12 ADS components import `{ cn }` from `@/lib` and use `cn('ads-class', className)` for class merging. `clsx` + `tailwind-merge` are installed specifically for this.

**Recommendation:** Add to root `AGENTS.md` > Coding Style: "Use `cn()` from `@/lib` for all class merging. Never concatenate className strings manually."

---

### 2.3 `ads-` BEM CSS Naming Convention

**Evidence:** All CSS classes follow BEM with `ads-` prefix:

- `.ads-button` (component root)
- `.ads-button__content` (element)
- `.ads-button--primary` (modifier)

**Recommendation:** Add to root `AGENTS.md` > Styling or apps/admin > ADS Project Rules: Document the `ads-` BEM convention with examples.

---

### 2.4 Thin Re-export Route Pages

**Evidence:** Every route page in `app/` is a one-liner re-export:

```ts
export { ButtonPage as default } from '@/features/ads/pages/button-page';
```

Page logic lives in `features/`, not `app/`.

**Recommendation:** Add to root `AGENTS.md` > Next.js or apps/admin > Architecture Rules: "Route pages in `app/` should be thin re-exports from `features/`. Business logic and page implementation live in `features/{feature}/pages/`."

---

### 2.5 Feature-based Architecture

**Evidence:** Domain logic is organized into `features/auth/`, `features/dashboard/`, `features/ads/`. Each feature owns its types, logic, server actions, components, and pages.

**Recommendation:** Add to root `AGENTS.md` > Project Overview: Document the feature-based architecture and the convention:

```
features/{name}/
├── index.ts
├── types.ts
├── {logic}.ts
├── server.ts
├── components/
└── pages/
```

---

### 2.6 Indonesian Language for UI

**Evidence:** `lang="id"` on `<html>`, Select placeholder `'Pilih data'`, documentation pages use Indonesian descriptions.

**Recommendation:** Add to root `AGENTS.md` or apps/admin: "Use Indonesian (Bahasa Indonesia) for all UI text, documentation descriptions, and user-facing messages."

---

### 2.7 CSS Variable Token System

**Evidence:** 20 CSS custom properties defined in `styles/tokens/colors.css`, `motion.css`, `background.css`, `typography.css`. Token-first architecture. No hardcoded colors in component CSS.

**Recommendation:** Add to root `AGENTS.md` > Styling: Document the token files, naming convention (`--kebab-case`), and the `:root` / `.dark` pattern.

---

### 2.8 Barrel Import Pattern for UI Components

**Evidence:** Components are imported from `@/components/ui` (the barrel), not individual module paths. Exception: `login-form.tsx` which mixes both patterns (flagged as issue ME-2).

**Recommendation:** Add to root `AGENTS.md` > Imports: "Import ADS components from `@/components/ui` barrel. Do not import from individual component directories."

---

### 2.9 `'use client'` Discipline

**Evidence:** Server Components are the default. `'use client'` is added only for: Radix primitives (Checkbox, Radio, Select, Switch), components with `useState` (Input, CodePreview, ThemeToggle), components with `useRouter` (UserMenu). Textarea has unnecessary `'use client'` (flagged as LO-2).

**Recommendation:** Add to root `AGENTS.md` > React: Clarify that `'use client'` should only be added when a component uses hooks, event handlers, browser APIs, or Radix primitives. Server Components are the default.

---

### 2.10 Surface as Base Primitive

**Evidence:** Card and Header wrap `Surface`. Sidebar wraps `Surface`. The Liquid Glass visual is defined once in `surface.css` and inherited via composition.

**Recommendation:** Add to apps/admin `AGENTS.md` > Architecture Rules: "Surface is the base Liquid Glass primitive. Components that need the glass visual should wrap Surface rather than duplicating the CSS."

---

### 2.11 Route Group Organization

**Evidence:** Three route groups: `(auth)/` (login only), `(dashboard)/` (protected, AppShell wrapper), `(design)/` (no auth guard, DesignShell wrapper).

**Recommendation:** Add to apps/admin `AGENTS.md` > Architecture Rules: Document the three route groups and their access rules (auth guard, no auth guard).

---

### 2.12 `.types.ts` File for Props

**Evidence:** Every ADS component has props in a co-located `{name}.types.ts` file, not inline in the component file.

**Recommendation:** Update root `AGENTS.md` > Component Structure to include `{name}.types.ts` as a required file.

---

## 3. Duplicated Rules

### 3.1 Package Manager — Root Only

**Duplicated between:** root `AGENTS.md` only.

**Analysis:** Only root AGENTS.md says "Use pnpm only." apps/admin AGENTS.md does not mention it. This is fine — one source is sufficient.

**Recommendation:** No change needed. Keep in root only.

---

### 3.2 Component Structure — Different Versions

**Present in:** root `AGENTS.md` (Component Structure section) and apps/admin `AGENTS.md` (Architecture Rules section)

**Root version:**

```
components/
    button/
        button.tsx
        button.test.tsx
        index.ts
```

**apps/admin version:**

```
components/ui/component/
    component.tsx
    component.types.ts
    index.ts
```

**Analysis:** The two versions contradict each other. The apps/admin version is correct (matches actual code). The root version is missing `ui/`, `.types.ts`, and incorrectly includes `test.tsx`.

**Recommendation:** Update root AGENTS.md Component Structure to match apps/admin version (the authoritative one). Remove the outdated example.

---

### 3.3 Styling Guidance — Split Across Files

**Present in:** root `AGENTS.md` (Styling section) and apps/admin `AGENTS.md` (Design Rules + Architecture Rules)

**Root says:** "Primary styling: Tailwind CSS v4. Use CSS files only when: reusable component styles, design tokens, animations, complex selectors."

**apps/admin says:** Structure includes `styles/components/component.css`. Design Rules list states (liquid glass, blur, rounded corners, etc.). Architecture Rules show the component/CSS/route mapping.

**Analysis:** These are complementary, not duplicated. Root covers the "what tool", apps/admin covers the "how to apply it."

**Recommendation:** Keep both. They serve different purposes.

---

## 4. Rules That Should Be Removed

### 4.1 apps/admin — "Current ADS Status"

**Why:** This is a static status list that must be manually maintained. It already lags behind actual state (it lists Badge as "not finished" but doesn't say why — no CSS, no barrel, empty docs). The health report (`2026-07-12-monorepo-health-report.md`) provides much richer status tracking with specific findings.

**Recommendation:** Remove this section. Replace with a pointer: "See `.ai/REPORTS/LATEST.md` for current component status."

---

### 4.2 apps/admin — "Current Development Direction" + "Current Feature"

**Why:** These describe temporary sprint scope (pause ADS, build auth flow). Once auth is done, they're historical noise. Project rules files should document permanent conventions, not current tasks.

**Recommendation:** Remove both sections. Move task-level tracking to `.ai/REPORTS/` or a separate planning document.

---

### 4.3 root AGENTS.md — Testing Section

**Why:** Mandates test creation but no test infrastructure exists. This creates an impossible requirement that will be ignored or cause guilt. The testing strategy documented in `.ai/ARCHITECTURE.md` (§16) is more honest: it describes the current state (no runner, no script, 1 broken test file).

**Recommendation:** Soften to: "When test infrastructure is available, create tests covering: rendering, variants, interactions, accessibility." Or remove and reference `.ai/ARCHITECTURE.md`.

---

## 5. New Rules Inferred from Repository

### 5.1 Component File Structure

**Convention:** Every ADS component follows:

```
components/ui/{name}/
├── {name}.tsx         — named arrow function export
├── {name}.types.ts    — props defined with `type`
└── index.ts           — barrel: `export * from './{name}'` + `export type * from './{name}.types'`
```

**Supported by:** 12/12 components follow this exactly.

---

### 5.2 CSS Architecture

**Convention:**

```
styles/
├── tokens/            — CSS custom properties
│   ├── background.css
│   ├── colors.css
│   ├── motion.css
│   └── typography.css
├── components/        — BEM CSS per component
│   ├── button.css
│   ├── surface.css
│   └── ...
├── layout.css         — Grid layout classes
└── theme.css          — Imports tokens → components → body styling
```

**Supported by:** `styles/theme.css` imports 4 token files + 9 component CSS files + body styling. Tokens import before components.

---

### 5.3 Props Architecture

**Convention:**

| Category            | Pattern                                              | Examples                               |
| ------------------- | ---------------------------------------------------- | -------------------------------------- |
| Native HTML wrapper | Extends `HTMLAttributes<HTMLElement>` + custom props | Surface, Button, Card, Input, Textarea |
| Radix wrapper       | `ComponentPropsWithoutRef<typeof Root>` or similar   | Checkbox, Radio, Select, Switch        |
| Compound wrapper    | Standalone `type` with custom props                  | Field, Header                          |

**Supported by:** All 12 components follow one of these three patterns.

---

### 5.4 Server Action Boundary

**Convention:** `features/{name}/server.ts` files use `'use server'` to create RPC boundaries. Actual logic lives in `features/{name}/{logic}.ts` (no directive) or `lib/`.

**Supported by:** `features/auth/server.ts` — `createSession` / `destroySession` are server actions; actual cookie logic is in `lib/auth/session.ts`.

---

### 5.5 Liquid Glass Visual Implementation

**Convention:** The Liquid Glass effect is implemented via:

- `backdrop-filter: blur(var(--blur-lg)) saturate(190%) brightness(1.08)` on `.ads-surface`
- `::before` pseudo-element with `mask-composite: exclude` for gradient borders
- `::after` pseudo-element with gradient for top highlight/sheen
- Multi-gradient ambient background via `--background-page`

**Supported by:** `styles/components/surface.css`, `styles/tokens/background.css`, `styles/tokens/colors.css`

---

### 5.6 Authentication Architecture

**Convention:**

1. Login → `features/auth/auth.ts` (mock) validates credentials
2. Session → `features/auth/server.ts` (Server Action) writes httpOnly cookie via `lib/auth/session.ts`
3. Guard → `app/(dashboard)/layout.tsx` (server component) calls `getSession()` and redirects
4. Logout → `features/auth/components/user-menu.tsx` calls `destroySession()` then `router.refresh()`

**Supported by:** Full auth flow implemented and working.

---

### 5.7 Navigation: Hardcoded in Component

**Convention:** Sidebar navigation items are defined as a static array inside `sidebar.tsx`. No separate navigation config file.

**Supported by:** `components/app/sidebar/sidebar.tsx` defines `const navigation = [...]` inline.

---

### 5.8 Label/Error/Description Compound

**Convention:** The `Field` component renders label (with optional required asterisk), children, and either error or description (mutually exclusive, error wins).

**Supported by:** `components/ui/field/field.tsx` implements this pattern.

---

### 5.9 Data Flow Rules

**Convention:**

- No state management library
- No API routes (Server Actions instead)
- No database (mock auth)
- Cookie-based sessions (httpOnly, no encryption)
- Theme via next-themes (attribute="class", defaultTheme="light", enableSystem=false)

**Supported by:** Full codebase analysis. These are intentional architectural choices.

---

## Summary of Recommendations

### AGENTS.md (root)

| Action     | Section             | Details                                                                    |
| ---------- | ------------------- | -------------------------------------------------------------------------- |
| **Update** | Component Structure | Add `{name}.types.ts`, remove `test.tsx` from example, add `ui/` directory |
| **Update** | Coding Style        | Add `type` over `interface`, `cn()` utility, named arrow functions         |
| **Update** | Imports             | Add barrel import rule for `@/components/ui`                               |
| **Update** | React               | Clarify `'use client'` discipline (Server Components by default)           |
| **Update** | Styling             | Add `ads-` BEM convention, CSS variable token system                       |
| **Update** | Component Structure | Include `.types.ts` as a required file                                     |
| **Soften** | Testing             | Remove mandate until test infrastructure exists; make aspirational         |
| **Add**    | —                   | Feature-based architecture                                                 |
| **Add**    | —                   | Indonesian language for UI                                                 |
| **Add**    | —                   | Thin re-export page pattern                                                |
| **Add**    | —                   | Data flow rules (no state lib, cookie sessions, Server Actions)            |
| **Add**    | —                   | Liquid Glass visual identity                                               |

### apps/admin AGENTS.md

| Action     | Section                       | Details                                                        |
| ---------- | ----------------------------- | -------------------------------------------------------------- |
| **Remove** | Current ADS Status            | Replace with pointer to `.ai/REPORTS/LATEST.md`                |
| **Remove** | Current Development Direction | Sprint scope, not permanent rules                              |
| **Remove** | Current Feature               | Sprint scope, not permanent rules                              |
| **Add**    | Architecture Rules            | Document route group organization and auth rules               |
| **Add**    | Architecture Rules            | Surface as base primitive                                      |
| **Add**    | Architecture Rules            | Props architecture patterns (3 categories)                     |
| **Add**    | Design Rules                  | Expand Liquid Glass implementation details                     |
| **Add**    | —                             | CSS variable token system (reference `styles/tokens/`)         |
| **Add**    | —                             | `.types.ts` file convention for all components                 |
| **Keep**   | ADS Component Rules           | Component completeness checklist is useful                     |
| **Keep**   | Implementation Rules          | "Inspect existing structure, reuse ADS components" is valuable |
| **Keep**   | ADS Project Rules             | Name, inspiration, visual identity                             |
| **Keep**   | Design Rules                  | State requirements (hover, focus, active, disabled, error)     |
| **Keep**   | Architecture Rules            | Folder structure blueprint                                     |
