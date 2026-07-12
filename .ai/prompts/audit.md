# Audit Prompt

Read `AGENTS.md` (root + apps/admin), `.ai/ARCHITECTURE.md`, and `.ai/DECISIONS.md` before doing anything.

## Task

Perform a full repository audit.

DO NOT MODIFY ANY FILES.

## Scope

### Architecture

- dependency direction — does `lib/` or `components/` import upward from `features/`?
- package boundaries — any cross-feature imports?
- feature isolation — does each feature own its types, components, server actions, and pages?
- folder organization — do ADS components follow `components/ui/{name}/{name}.tsx + .types.ts + index.ts`?

### Components

- does every component use `cn()` from `@/lib` for class merging?
- does every component use named arrow function exports (`export const X = () => ...`)?
- does every component use `type` (not `interface`) for its props?
- does every component have the correct `'use client'` directive (present only when needed, absent for server components)?
- does every interactive component (Radix-based) have `'use client'`?
- are props consistent with existing patterns (extend HTMLAttributes, Radix attrs, or custom standalone)?
- does every component support disabled state, focus state, error state (when applicable)?
- do all components reference `var(--token)` instead of hardcoded colors?
- does every component have a corresponding CSS file in `styles/components/`?
- does every CSS file use `ads-` BEM naming?
- is every component exported from `components/ui/index.ts`?
- is every component present in the design system docs (`features/ads/pages/`)?
- does every component have a route in `app/(design)/design/{name}/page.tsx`?
- does every component have a corresponding navigation entry in `features/ads/components/ads-shell/`?
- do the `features/ads/pages/` and route pages match the architecture rule of thin re-exports?

### Consistency

- naming conventions (kebab-case files, camelCase variables, PascalCase components)
- import ordering (React → external → internal alias → relative)
- CSS class naming (`.ads-{component}`, `.ads-{component}__{element}`, `.ads-{component}--{modifier}`)
- props naming (camelCase, `on{Event}` for callbacks)
- barrel exports (every `index.ts` re-exports correctly)
- layout classes (no duplicate CSS like `.ads-layout` / `.app-layout`)

### Dead Code

- unused files (like `lib/http/client.ts`)
- unused exports (like `features/dashboard/index.ts`, `sidebar/index.ts`)
- unused dependencies in `package.json` files
- unused assets (`public/brand/logo.png`)
- empty placeholder files (badge-page.tsx)
- references to nonexistent directories (`@/hooks` in `components.json`)

### Accessibility

- keyboard navigation for interactive components (Radix primitives handle this)
- aria attributes present where needed
- semantic HTML (use `<button>` not `<div onClick>`, `<nav>` for navigation, `<header>` for headers)
- `aria-label` / `sr-only` for icon-only buttons

### TypeScript

- are all types correct (no `any`, no implicit any)?
- does `tsc --noEmit` pass?
- any unnecessary type assertions (`as`)?
- are exported types properly re-exported from barrels?

### CSS

- are all CSS custom properties from `styles/tokens/` actually used in component CSS?
- any unused tokens remaining?
- are Tailwind v4 features used correctly (no v3 legacy patterns)?
- do component CSS files import only what they need?
- is the theme.css import order correct (tokens before components)?

### Testing

- does a test file exist for each component?
- is a test runner configured?
- does the existing test (`select.test.tsx`) compile?

## Output Format

For every finding:

```yaml
finding:
  priority: critical | high | medium | low
  confidence: high | medium | low
  file: path/to/file.tsx
  line: 42
  explanation: What is wrong
  fix: How to fix it
```

End with a summary table counting findings by priority and confidence.

Do not change any files.
