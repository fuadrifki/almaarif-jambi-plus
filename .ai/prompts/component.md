# Component Prompt

Read `AGENTS.md` (root + apps/admin), `.ai/ARCHITECTURE.md`, and `.ai/DECISIONS.md` before doing anything.

## Task

Review ADS components for consistency. Produce a report.

DO NOT MODIFY CODE (unless explicitly asked to fix).

## Review Checklist

### File Structure

```
components/ui/{name}/
├── {name}.tsx             # Implementation — named arrow function export
├── {name}.types.ts        # Props type — `type`, not `interface`
└── index.ts               # Barrel — `export * from './{name}'; export type * from './{name}.types';
```

Does the component follow this exactly?

### Styling

```
styles/components/{name}.css
```

Does a CSS file exist? Is it imported in `styles/theme.css`?

### Implementation Patterns

- Does it use `cn()` from `@/lib` for class merging?
- Is it a named arrow function (`export const Component = () => ...`)?
- Are props defined as `type` (not `interface`)?
- Is `'use client'` present only when needed?
- If Radix-based, is `'use client'` present?
- If it needs no hooks/browser APIs, is it a Server Component?
- Are modifier classes applied via template literal: `ads-{name}--${prop}`?
- Does className spread come last? `cn('ads-name', className)`

### Props Patterns

| Pattern                   | Example                                                 |
| ------------------------- | ------------------------------------------------------- |
| Extends native HTML attrs | `ButtonHTMLAttributes<HTMLButtonElement> & { custom? }` |
| Extends Radix attrs       | `ComponentPropsWithoutRef<typeof Primitive.Root>`       |
| Standalone                | `{ label, error, children }`                            |

Which pattern does this component follow? Is it consistent with similar components?

### States (per AGENTS.md Design Rules)

- liquid glass UI — does it wrap Card or use `ads-` CSS classes?
- blur — backdrop-filter applied?
- rounded corners — `rounded-*` or `border-radius`?
- borders — present and using `--border` token?
- shadows — using `--shadow-*` tokens?
- motion — transitions using `--motion-normal` / `--motion-ease`?
- hover state — defined?
- focus state — defined? (`:focus-visible` ring?)
- active state — defined?
- disabled state — defined? (`:disabled`, `[data-disabled]`)?
- error state — defined where applicable?
- dark mode — all colors reference `var(--token)`?

### Accessibility

- semantic HTML element? (`<button>`, `<span>`, `<nav>`, etc.)
- keyboard navigable?
- ARIA attributes present?
- focus visible indicator?
- `role` attribute where needed?

### CSS

- Class naming: `.ads-{component}`, `.ads-{component}__{element}`, `.ads-{component}--{modifier}`
- No hardcoded colors — all reference `var(--token)`
- Dark mode via `.dark` parent selector (not `prefers-color-scheme`)
- Component CSS file only contains what Tailwind cannot do (pseudo-elements, complex selectors, keyframes)

### Test Coverage

- Does a `{name}.test.tsx` exist?
- Does it test: rendering, variants, interactions, accessibility?
- If no test file exists, note it.

### Documentation Coverage

- Does a page exist in `features/ads/pages/{name}-page.tsx`?
- Does it have live previews with `SectionPreview`?
- Does a route exist at `app/(design)/design/{name}/page.tsx`?
- Is the thin re-export pattern used?
- Is the component in the design system navigation?

## Output

For each of the 12 ADS components (Card, Button, Input, Textarea, Select, Checkbox, Radio, Switch, Field, Card, Header, Badge), produce:

```yaml
component: Button
file_structure: ✅ | ❌ (details)
css_file: ✅ | ❌
use_client: correct | unnecessary | missing
props_pattern: html_attrs | radix | standalone | mixed
cn_used: ✅ | ❌
type_not_interface: ✅ | ❌
named_arrow: ✅ | ❌
states:
  hover: ✅ | ❌
  focus: ✅ | ❌
  active: ✅ | ❌
  disabled: ✅ | ❌
  error: ✅ | ❌ | n/a
  dark: ✅ | ❌
semantic_element: ✅ | ❌
test_exists: ✅ | ❌
docs_page: ✅ | ❌
route: ✅ | ❌
navigation: ✅ | ❌
issues: []
```

End with a summary table and ordered list of inconsistencies to fix.
