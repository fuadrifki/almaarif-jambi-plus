# Architecture Prompt

Read `AGENTS.md` (root + apps/admin), `.ai/ARCHITECTURE.md`, and `.ai/DECISIONS.md`.

## Task

Review the project architecture and produce a migration plan.

DO NOT IMPLEMENT CHANGES.

## Review Focus

### Dependency Direction

The intended layering is:

```
app/ → features/ → components/ → lib/
```

- Does `lib/` import from `features/`? (Violation: `lib/auth/session.ts` imports `User` from `features/auth/types`)
- Does `components/` import from `features/`? (Violation: `app-shell.tsx`, `app-shell.types.ts`)
- Do features import from other features? (Should not — currently clean)
- Does `lib/` import from `components/`? (Should not)

### Package Boundaries

- Does each feature own its types, logic, server actions, and pages?
- Are there any shared types that should be extracted to `lib/`?
- Does `packages/brand/` have clear, minimal API Card?

### Feature Boundaries

- `features/auth/` — owns User type, login, session management
- `features/dashboard/` — owns dashboard page
- `features/ads/` — owns design system playground
- Are these properly isolated?

### Folder Organization

- ADS conventions followed? (`components/ui/{name}/{name}.tsx + .types.ts + index.ts`)
- Feature conventions followed? (`features/{name}/ + components/ + pages/`)
- Route conventions followed? (thin re-exports from `features/`)
- CSS conventions followed? (tokens in `styles/tokens/`, component CSS in `styles/components/`, imported via `theme.css`)

### Shared Code

- Is `cn()` the only shared utility in `lib/`?
- Should `session.ts` live in `lib/` or be owned by `features/auth/`?
- Are there type definitions duplicated across the codebase?

### Dead Code Areas

- `lib/http/client.ts` — unused. Should it be removed or repurposed?
- `features/dashboard/index.ts` — barrel exists but page imports directly
- `sidebar/index.ts` — barrel exists but app-shell imports directly
- `components/ui/index.ts` — badge is missing from barrel
- `public/brand/logo.png` — unused now (logo uses SVG inline)

### Root Dependencies vs App Dependencies

- `react-hook-form`, `zod`, `@tanstack/react-query`, `sonner`, `date-fns` are installed at root but unused
- `@base-ui/react`, `class-variance-authority`, `geist`, `motion`, `shadcn` are installed in admin but unused
- What should stay vs. be removed?

## Output

Produce a migration plan in this format:

```yaml
migration_plan:
  phase_1:
    - description: 'Fix boundary violations'
      changes:
        - 'Move User type from features/auth/types to lib/auth/types'
        - 'Have features/auth/types re-export from lib/auth/types'
        - 'Update app-shell.types.ts to import from lib/auth/types'
```

Each phase should be ordered so earlier phases unblock later phases.

For each change:

- `description`: what to do
- `files_affected`: list of files
- `risk`: low | medium | high
- `test_impact`: description of what to verify

End with a summary of total changes by risk level.
