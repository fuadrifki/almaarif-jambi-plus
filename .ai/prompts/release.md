# Release Prompt

Read `AGENTS.md` (root + apps/admin), `.ai/ARCHITECTURE.md`, and `.ai/DECISIONS.md`.

## Task

Perform a release readiness review.

DO NOT MODIFY SOURCE CODE.

## Prerequisites

Run these first:

```bash
pnpm typecheck
pnpm lint
```

Report any failures.

## Verification

### Code Quality

- `pnpm typecheck` passes with no errors
- `pnpm lint` passes with no errors
- No `// @ts-expect-error` or `// @ts-ignore` in source files (check with grep)
- No `console.log` in production source files (check with grep)
- No `TODO`, `FIXME`, `HACK` comments in production code

### Dead Code

- No unused exports (check barrels match actual consumers)
- No unused files (grep for imports of known suspect files)
- No unreachable code paths
- No empty component files or stubs (except known intentional like badge-page.tsx)

### Dependency Graph

- No boundary violations beyond known exceptions (app-shell → auth, lib/auth → auth)
- No circular dependencies
- No feature-to-feature imports

### Testing

- Test runner configured? (check package.json scripts)
- Test files exist for modified components?
- Existing tests pass? (if test command exists)

### Documentation

- Every ADS component has:
  - Component implementation
  - CSS file
  - Types file
  - Barrel export
  - Docs page in `features/ads/pages/`
  - Route in `app/(design)/design/`
  - Navigation entry
- Design system index page lists all components

### Accessibility

- All interactive elements keyboard-navigable
- All form elements have associated labels
- All icons have `aria-label` or are inside a text-labeled element
- All Radix primitives configure their `aria-*` attributes

### Build

- `pnpm build` succeeds (Next.js production build)
- No build warnings (check output)
- `next.config.ts` is complete for deployment environment

## Output

```yaml
summary:
  typecheck: pass | fail
  lint: pass | fail
  build: pass | fail
findings:
  - priority: critical | high | medium | low
    category: typecheck | lint | dead_code | dependency | testing | docs | a11y | build
    file: path
    line: 42
    explanation: What is wrong
blockers: []
recommendations: []
```

A release is blocked if any Critical or High findings exist.
