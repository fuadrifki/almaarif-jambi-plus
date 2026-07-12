# Review Prompt

Read `AGENTS.md` (root + apps/admin), `.ai/ARCHITECTURE.md`, and `.ai/DECISIONS.md`.

## Task

Review every modified file in the current change set (working tree / last commit).

Suggest improvements.

DO NOT MODIFY FILES.

## Review Criteria

### Correctness

- Are there any bugs?
- Any regressions compared to unchanged adjacent code?
- Edge cases handled? (empty state, error state, loading state, disabled state)
- TypeScript types accurate? No `any`, no unnecessary assertions?

### Architecture

- Dependency direction respected? (`app/ → features/ → components/ → lib/`)
- Feature boundaries respected? (no cross-feature imports)
- Does the change introduce new boundary violations?
- Does it follow the ADS component folder structure if it touches UI?
- If it adds a new route, does it use the thin re-export pattern?

### Conventions

- Named exports, not defaults (unless Next.js requires it)
- Arrow function components (`export const X = () => ...`)
- `type` over `interface`
- `cn()` for class merging
- Import ordering: React → external → internal alias → relative
- BEM CSS naming with `ads-` prefix
- CSS variables for colors (no hardcoded values)
- Indonesian language for UI text

### Maintainability

- Readable? (clear names, not overly nested, no magic numbers/strings)
- Duplicated code that should be extracted?
- Over-engineering? (abstraction that isn't justified)
- Overly complex logic that could be simplified?
- Unnecessary `use client` directives?

### Performance

- Unnecessary re-renders?
- Large client component that could be server component?
- Unnecessary state or effect?
- Memoization needed? (only if profiled)

### Accessibility

- Keyboard navigation preserved?
- ARIA attributes correct?
- Focus management correct?
- Semantic HTML elements used?

### Quality

- Unused imports, variables, parameters?
- Dead code paths?
- Comments that explain what instead of why?
- Error messages clear?

## Output

For each file:

```yaml
file: path/to/file.tsx
severity: critical | high | medium | low | suggestion
line: 42
finding: Description of the issue
```

End with a summary: number of findings by severity, and which are blockers vs. nice-to-have.
