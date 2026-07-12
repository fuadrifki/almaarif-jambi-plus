# Cleanup Prompt

Read `AGENTS.md` (root + apps/admin) and `.ai/DECISIONS.md`.

Read the latest audit report in `.ai/REPORTS/LATEST.md` (or the most recent timestamped report).

## Task

Fix HIGH-confidence issues from the audit report.

Do NOT fix medium or low confidence issues unless explicitly requested.

## Allowed Operations

- remove unused imports
- remove unused variables
- remove unused exports (only if confirmed unused across the entire codebase)
- remove dead code (code paths that are never called, conditionals that are always false)
- remove unreachable code
- remove empty files
- remove duplicated imports
- organize imports (sort per AGENTS.md order: React → external → internal alias → relative)
- remove empty CSS files
- remove CSS files whose classes are not referenced by any component
- remove unused CSS custom properties from token files
- remove unused files (confirm with grep first that nothing imports them)

## Never

- change architecture
- install or remove packages from `package.json` (unless explicitly requested)
- rename public APIs or exported symbols
- delete files without first confirming they are truly unused (grep for imports)
- change runtime behavior
- modify component logic, props, or types
- change CSS values (only remove unused rules or files)

## Preservation

- preserve all named exports
- preserve all barrel exports
- preserve all public component APIs
- preserve all CSS class names

## Process

1. Read the audit report
2. For each HIGH-confidence finding, verify with grep before acting
3. Make the change
4. Run `pnpm typecheck` and `pnpm lint` to verify nothing broke
5. Summarize every modification

## Workflow

- Prefer `pnpm` for all commands
- Run `pnpm typecheck` after changes
- Run `pnpm lint` after changes
