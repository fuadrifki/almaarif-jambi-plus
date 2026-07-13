# Architecture Decisions

---

## 1. pnpm as Sole Package Manager

**Status:** Implemented

**Context:** The monorepo needs a package manager that supports workspaces, is fast, and has strict dependency management.

**Decision:** Use pnpm exclusively. Pin `packageManager` in root `package.json` to `pnpm@9.15.0`.

**Reason:** pnpm's content-addressable store saves disk space, its strict node_modules structure prevents phantom dependencies, and it has first-class workspace support.

**Consequences:** All team members must use pnpm. npm, yarn, and bun commands are disallowed.

---

## 2. Turborepo for Task Orchestration

**Status:** Implemented

**Context:** Multiple packages (apps + shared packages) need coordinated dev, build, lint, and typecheck tasks.

**Decision:** Use Turborepo v2 with the modern `tasks` config format (not legacy `pipeline`). Configure topological dependency ordering (`^build`, `^lint`, `^typecheck`).

**Reason:** Turborepo provides parallel execution, caching, and dependency-aware task ordering out of the box.

**Consequences:** All scripts delegate to `turbo`. Build outputs (`.next/**`, `dist/**`) are cached.

---

## 3. ESLint v9 Flat Config

**Status:** Implemented

**Context:** ESLint moved from `.eslintrc.*` to flat config in v9. The project uses the latest ESLint.

**Decision:** Use `eslint.config.mjs` with `defineConfig` and `globalIgnores` from `eslint/config`. Apply `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`. Keep root ESLint config empty; each app manages its own.

**Reason:** Flat config is the future of ESLint. The Next.js + TypeScript presets cover the project's needs.

**Consequences:** No traditional `.eslintrc` files. Ignores are declared in config, not `.eslintignore`.

---

## 4. Prettier Formatting

**Status:** Implemented

**Context:** Code formatting should be consistent and automated.

**Decision:** Use Prettier with `semi: true`, `singleQuote: true`, `printWidth: 100`, `tabWidth: 2`, `trailingComma: "all"`.

**Reason:** Prettier eliminates formatting debates. These settings match community conventions.

**Consequences:** All code is auto-formatted. Pre-commit hooks run lint-staged including Prettier.

---

## 5. Husky + lint-staged for Pre-commit

**Status:** Implemented

**Context:** Code quality should be enforced before commits enter the repository.

**Decision:** Use Husky v9 for git hooks and lint-staged for staged-file linting. The `prepare` script runs `husky` on install.

**Reason:** Husky v9 is the current standard. lint-staged ensures only changed files are checked, keeping pre-commit fast.

**Consequences:** Every commit triggers lint-staged. Husky config is stored in `.husky/`.

---

## 6. Two-tier Workspace Structure

**Status:** Implemented

**Context:** The monorepo contains both deployable applications and shared library packages. They have different lifecycle and build needs.

**Decision:** Use `apps/*` for applications and `packages/*` for shared libraries, declared in `pnpm-workspace.yaml`.

**Reason:** Clear separation between deployable code and shared utilities. Turborepo's `^build` dep ensures packages build before apps.

**Consequences:** Adding a new app means creating a directory under `apps/`. Adding a shared package means creating under `packages/`.

---

## 7. No Root tsconfig.json

**Status:** Implemented

**Context:** Monorepos can share a root TypeScript config or let each app manage its own.

**Decision:** Do not create a root `tsconfig.json`. Each app/package manages its own TypeScript configuration independently.

**Reason:** Different apps may need different TypeScript settings (e.g., different JSX, lib, or module settings). Independent configs avoid conflicts.

**Consequences:** TypeScript settings are duplicated across packages. Changes must be applied per-package.

---

## 8. @/* Path Alias

**Status:** Implemented

**Context:** Deep relative imports (`../../../components/ui/button`) are hard to read and refactor.

**Decision:** Configure TypeScript `paths` in `apps/admin/tsconfig.json` to map `@/*` → `./*` (the app root).

**Reason:** Clean import paths regardless of file depth. Matches the shadcn/ui convention.

**Consequences:** All imports use `@/components/ui/button` instead of relative paths. The alias maps to the app root, not a `src/` directory.

---

## 9. bundler Module Resolution

**Status:** Implemented

**Context:** Older module resolutions (`node`, `node16`, `nodenext`) have friction with modern bundler features.

**Decision:** Set `moduleResolution` to `"bundler"` in `apps/admin/tsconfig.json`.

**Reason:** Bundler resolution is the modern Next.js convention. It supports package.json `exports`, `.ts` extensionless imports, and other bundler-native features.

**Consequences:** `allowImportingTsExtensions` is not needed. The resolution assumes a bundler (Next.js) handles module resolution at build time.

---

## 10. Strict TypeScript

**Status:** Implemented

**Context:** TypeScript's strict mode catches null/undefined errors and other common bugs at compile time.

**Decision:** Set `"strict": true` in `apps/admin/tsconfig.json`.

**Reason:** Strict mode enables all type-checking options that reduce runtime errors. The project prioritizes type safety.

**Consequences:** All code must handle `null`/`undefined` explicitly. No implicit `any` is allowed.

---

## 11. Next.js App Router with Route Groups

**Status:** Implemented

**Context:** The application has three distinct route categories: authentication (login), protected (dashboard), and documentation (design system). They have different layouts and access rules.

**Decision:** Use Next.js route groups for URL organization:

- `(auth)/` — login (no wrapper)
- `(dashboard)/` — protected (auth guard + AppShell wrapper)
- `(design)/` — design system (DesignShell wrapper, no auth)

**Reason:** Route groups organize routes without affecting URLs. Each group gets its own layout with appropriate guards and shells.

**Consequences:** URLs are flat (e.g., `/login`, `/design/button`). Each route group has its own `layout.tsx`.

---

## 12. Thin Route Pages Re-exporting from Features

**Status:** Implemented

**Context:** Route files in `app/` should not contain business logic. The feature modules own page implementation.

**Decision:** Route files are one-liner re-exports:

```ts
export { PageComponent as default } from '@/features/...';
```

**Reason:** Separates routing from implementation. Features can be tested without Next.js routing. Changes to page content happen in `features/`, not `app/`.

**Consequences:** Every route has a thin `page.tsx` plus a feature page in `features/`. Slight indirection but clean separation.

---

## 13. Server Components by Default

**Status:** Implemented

**Context:** React Server Components reduce client-side JS and enable direct server data access.

**Decision:** Components are Server Components by default. Only add `'use client'` when necessary (hooks, event handlers, browser APIs, Radix primitives).

**Reason:** Server Components reduce bundle size and improve performance. Most ADS layout components (Surface, Card, Button, Badge, Field) don't need client interactivity.

**Consequences:** Client components are explicitly marked. Adding interactivity requires adding `'use client'`. The Textarea component has an unnecessary `'use client'` directive.

---

## 14. Feature-based Architecture

**Status:** Implemented

**Context:** The application has distinct domains (auth, dashboard, design system). They should be independently understandable and testable.

**Decision:** Organize business logic into feature modules under `features/`. Each feature has its own `index.ts`, `types.ts`, `components/`, and `pages/`.

**Reason:** Features are self-contained and can be developed in parallel. No cross-feature dependencies are allowed.

**Consequences:** `features/auth/` owns login, User type, and session management. `features/dashboard/` owns the dashboard page. `features/ads/` owns the design playground. New features (e.g., `features/students/`) follow the same pattern.

---

## 15. Component Folder Structure

**Status:** Implemented

**Context:** ADS components need a consistent file layout for discoverability and maintainability.

**Decision:** Every ADS component follows:

```
components/ui/{name}/
├── {name}.tsx         # Implementation
├── {name}.types.ts    # TypeScript props/types
└── index.ts           # Barrel re-exports
```

**Reason:** Co-locating types with implementation keeps related files together. The barrel pattern enables importing from `@/components/ui` instead of deep paths.

**Consequences:** 12 ADS components follow this convention. Badge is the only component missing from the barrel, confirming it is incomplete.

---

## 16. Named Exports over Default Exports

**Status:** Implemented

**Context:** Default exports can be renamed on import, leading to inconsistent naming across consumers.

**Decision:** Use named exports for all components, utilities, and types. Only use default exports where Next.js requires them (page components in `app/`).

**Reason:** Named exports enforce consistent names. They enable IDE autocomplete and refactoring tools. Next.js requires `export default` for page/layout files.

**Consequences:** All ADS components use `export const ComponentName`. All utilities use `export const fn`. Page files in `app/` use `export { X as default }` or `export default function`.

---

## 17. Arrow Function Components

**Status:** Implemented

**Context:** The project needs a consistent function declaration style.

**Decision:** Use arrow functions for all components: `export const Component = () => { ... }`.

**Reason:** Arrow functions are more concise, don't have `this` binding issues, and are the modern React convention. The `@almaarif/brand` Logo component is the only exception (uses `export function Logo()`).

**Consequences:** All ADS components use arrow functions. The Logo component is a minor inconsistency.

---

## 18. type over interface

**Status:** Implemented

**Context:** TypeScript provides both `type` and `interface` for defining object shapes.

**Decision:** Use `type` exclusively for all type declarations. Never use `interface`.

**Reason:** `type` provides more consistent behavior (union types, intersection types, mapped types). It avoids the declaration merging ambiguity of `interface`.

**Consequences:** All Props types, State types, and utility types use `type`. No `interface` declarations remain in the codebase.

---

## 19. BEM CSS Naming with ads- Prefix

**Status:** Implemented

**Context:** ADS components need a CSS class naming convention that is scoped, predictable, and collision-free.

**Decision:** Use BEM-like naming with `ads-` prefix:

- Root: `.ads-button`
- Element: `.ads-button__content`
- Modifier: `.ads-button--primary`

**Reason:** BEM is predictable and scopes styles to components. The `ads-` prefix prevents collisions with other CSS frameworks or third-party components.

**Consequences:** All component CSS uses this convention. No global/utility CSS classes are used in component CSS.

---

## 20. CSS Variables for All Colors (Light/Dark via .dark Class)

**Status:** Implemented

**Context:** Both light and dark themes must be supported. Hardcoded colors break theming.

**Decision:** Define all color values as CSS custom properties. Define `:root` for light mode and `.dark` for dark mode. Use `next-themes` with `attribute="class"` to toggle `.dark` on `<html>`.

**Reason:** CSS variables allow all components to react to theme changes without JavaScript. The `.dark` class approach works with `next-themes` and avoids `prefers-color-scheme` media query restrictions.

**Consequences:** No hardcoded colors exist in component CSS files. All colors reference `var(--token-name)`. The `ThemeProvider` sets `attribute="class"`, `defaultTheme="light"`, `enableSystem={false}`.

---

## 21. Liquid Glass Visual Identity

**Status:** Implemented

**Context:** ADS has a unique visual style called "Liquid Glass" that should be consistent across all components.

**Decision:** Implement Liquid Glass via:

- `backdrop-filter: blur(var(--blur-lg)) saturate(190%) brightness(1.08)` on surface elements
- Gradient borders via `::before` + `mask-composite: exclude`
- Top highlight via `::after` gradient
- Multi-gradient ambient background on `body`
- Gradient-based button fills
- Rounded corners (border-radius: `--radius-3xl`)

**Reason:** The Liquid Glass identity differentiates ADS from standard UI kits. The implementation uses modern CSS (backdrop-filter, mask-composite) without JavaScript.

**Consequences:** All Surface-based components inherit the glass effect. The visual identity is consistent. `overflow: hidden` + `isolation: isolate` are required on glass elements.

---

## 22. Multi-gradient Ambient Background

**Status:** Implemented

**Context:** The application background should contribute to the Liquid Glass feel while remaining non-distracting.

**Decision:** Use 4-5 layered `radial-gradient` values in `--background-page` CSS variable. Apply as `body` background with `background-attachment: fixed`.

**Reason:** Layered gradients create a subtle ambient glow that the glass surface elements can sit on top of. The fixed attachment keeps the background stable during scrolling.

**Consequences:** Light mode has colorful ambient gradients (blue, purple, green, cyan). Dark mode has more subdued gradients with lower opacity.

---

## 23. CSS Grid for App Layout

**Status:** Implemented

**Context:** The dashboard and design system need a consistent page layout with header, sidebar, and content area.

**Decision:** Use CSS Grid with named template areas:

```
grid-template:
  'header header' 64px
  'sidebar content' 1fr
  / 280px 1fr;
```

**Reason:** CSS Grid provides a single-source-of-truth layout definition. Named areas make the layout intent clear. No JavaScript layout calculations needed.

**Consequences:** Header is 64px fixed, sidebar is 280px fixed, content fills remaining space. Layout is `100vh` with `overflow: hidden`. The design system has a duplicate `ads-layout` class with identical rules.

---

## 24. Surface as Base Liquid Glass Primitive

**Status:** Implemented

**Context:** The Liquid Glass visual (backdrop-filter, gradient border, top highlight) should be reusable.

**Decision:** Create `Surface` as the base glass primitive. `Card` and `Header` wrap `Surface`. No other component duplicates the glass effect CSS.

**Reason:** `Surface` is a single source of truth for the glass visual. Components that need glass styling wrap `Surface` instead of duplicating CSS.

**Consequences:** `Surface` is a thin `<div>` wrapper with `cn('ads-surface', className)`. `Card` and `Header` import and render `Surface` internally. Changing the glass visual means editing one CSS file.

---

## 25. Mock Authentication

**Status:** Implemented

**Context:** The authentication flow needs to work for development and demonstration without a real backend.

**Decision:** Implement a mock `login()` function in `features/auth/auth.ts` that always returns the same hardcoded user. Validate only that email and password are non-empty.

**Reason:** A mock allows the full auth flow (login → session → protected route → logout) to be developed and tested without a backend. The function signature matches what a real API call would look like.

**Consequences:** Any email/password combination works (as long as both are non-empty). The returned user is always `{ id: '1', name: 'Admin User', email: 'admin@almaarif.id', role: 'admin' }`.

---

## 26. Cookie-based Sessions (httpOnly)

**Status:** Implemented

**Context:** Session state must persist across requests but be secure against XSS.

**Decision:** Store the full User JSON object in an httpOnly cookie named `ads_session`. Set `sameSite: 'lax'`, `secure` in production.

**Reason:** httpOnly cookies cannot be read by JavaScript, preventing XSS-based session theft. Cookies are automatically sent with requests. The full User object is stored so no additional database lookup is needed.

**Consequences:** Cookie size equals the serialized User JSON. No encryption is applied to the cookie value. The `next/headers` `cookies()` API (async in Next.js 16) is used for all cookie operations.

---

## 27. Server Actions for Session Management

**Status:** Implemented

**Context:** Writing cookies in Next.js requires Server Actions or API routes.

**Decision:** Use Next.js Server Actions (`'use server'`) in `features/auth/server.ts` to create and destroy sessions. Keep the actual cookie operations in `lib/auth/session.ts`.

**Reason:** Server Actions are the modern Next.js pattern for server-side mutations. They work without creating API route files. Separating the action boundary from cookie logic keeps concerns modular.

**Consequences:** Client components call `createSession(user)` and `destroySession()` directly. The server action boundary handles the RPC.

---

## 28. Auth Guard via Server-side Redirect

**Status:** Implemented

**Context:** Protected routes should redirect unauthenticated users to the login page.

**Decision:** Call `getSession()` in the `(dashboard)/layout.tsx` server component. If session is null, call `redirect('/login')` before rendering.

**Reason:** Server-side redirect is instantaneous — no client-side loading state or flash of protected content. The async server component pattern makes this natural.

**Consequences:** The dashboard layout is an async function. Redirect happens before any page content is streamed.

---

## 29. Design System Route Has No Auth Guard

**Status:** Implemented

**Context:** The design system documentation should be accessible without authentication during development.

**Decision:** The `(design)/design/layout.tsx` does not call `getSession()` or redirect.

**Reason:** The design system is a development/documentation tool, not a protected feature. It should be freely browsable.

**Consequences:** Anyone can access `/design/*` without logging in.

---

## 30. cn() Utility for Class Merging

**Status:** Implemented

**Context:** Components need to accept `className` props and merge them with default classes without conflicts.

**Decision:** Use `clsx` + `tailwind-merge` wrapped in a `cn()` utility at `lib/utils.ts`. Export from `@/lib`.

**Reason:** `clsx` handles conditional class strings cleanly. `tailwind-merge` resolves Tailwind class conflicts intelligently (e.g., `p-4` overrides `p-2`).

**Consequences:** All components use `cn('default-class', className)` for class merging. The utility is the standard import for all styling.

---

## 31. lucide-react for Icons

**Status:** Implemented

**Context:** The UI needs a consistent icon library.

**Decision:** Use `lucide-react` for all icons. Set `iconLibrary: "lucide"` in `components.json`.

**Reason:** Lucide is lightweight, tree-shakeable, has consistent stroke-based design, and is the standard for shadcn/ui projects.

**Consequences:** Icons are imported individually: `import { Check, ChevronDown } from 'lucide-react'`. No icon font or sprite sheet is used.

---

## 32. next-themes for Dark Mode

**Status:** Implemented

**Context:** The application needs a user-toggleable dark mode.

**Decision:** Use `next-themes` with `attribute="class"`, `defaultTheme="light"`, `enableSystem={false}`, `disableTransitionOnChange`.

**Reason:** `next-themes` is the standard dark mode solution for Next.js. It toggles a `.dark` class on `<html>`, matching the CSS variable approach. Disabling system preference gives users explicit control.

**Consequences:** A `<ThemeToggle>` component calls `setTheme('light' | 'dark')`. Theme is persisted to `localStorage`. The `suppressHydrationWarning` attribute is needed on `<html>` to prevent hydration mismatch.

---

## 33. Indonesian Language for UI

**Status:** Implemented

**Context:** The application is for a pondok pesantren in Indonesia.

**Decision:** Use Indonesian (Bahasa Indonesia) for all UI text: navigation labels, documentation descriptions, form placeholders, etc.

**Reason:** The target users are Indonesian speakers. Indonesian is more appropriate than English for an internal school system.

**Consequences:** `lang="id"` on `<html>`. Select placeholder is `'Pilih data'`. Documentation pages use Indonesian descriptions.

---

## 34. Radix UI for Complex Interactive Primitives

**Status:** Implemented

**Context:** Checkbox, Radio, Select, and Switch need keyboard accessibility, screen reader support, and consistent behavior across browsers.

**Decision:** Wrap Radix UI primitives (`@radix-ui/react-checkbox`, `@radix-ui/react-radio-group`, `@radix-ui/react-select`, `@radix-ui/react-switch`) with ADS styling.

**Reason:** Radix provides accessible, headless primitives. ADS wraps them with the Liquid Glass visual identity. This avoids building accessible interactive components from scratch.

**Consequences:** Interactive components are client components (`'use client'`). They use Radix's `[data-state]` and `[data-disabled]` attributes for CSS styling.

---

## 35. Button Variants as String Unions

**Status:** Implemented

**Context:** Buttons have multiple visual variants, sizes, and states.

**Decision:** Define variants as string union types (`'primary' | 'secondary' | 'ghost' | 'danger'`), sizes as `'sm' | 'md' | 'lg'`, and status as `'idle' | 'loading'`. Apply via `ads-button--${variant}` BEM classes.

**Reason:** String unions are simpler than enums. The BEM class pattern maps one-to-one with CSS. No class-variance-authority (CVA) is used despite it being installed.

**Consequences:** Button CSS has `.ads-button--primary`, `.ads-button--secondary`, `.ads-button--ghost`, `.ads-button--danger` and corresponding size classes.

---

## 36. Select Uses Custom options Prop

**Status:** Implemented

**Context:** Radix Select's children-based API (`<Select.Item value="x"><Select.ItemText>...</Select.ItemText></Select.Item>`) is verbose for common use cases.

**Decision:** Expose a simpler `options: SelectOption[]` prop where `SelectOption = { label, value, disabled? }`. Render the Radix children internally.

**Reason:** Common usage is passing an array of options. The custom prop is more concise and TypeScript-friendly than JSX children.

**Consequences:** Consumers pass `options={[{ label: 'Option A', value: 'a' }]}` instead of rendering Radix JSX children.

---

## 37. Badge Is Incomplete

**Status:** Implemented

**Context:** Badge has a component implementation and type definitions but is not functional.

**Decision:** Badge component exists at `components/ui/badge/badge.tsx` with 5 variants (`default`, `success`, `warning`, `danger`, `info`) but:

- No CSS file exists (`styles/components/badge.css`)
- Not in the UI barrel (`components/ui/index.ts`)
- Docs page is an empty stub (`features/ads/pages/badge-page.tsx`)

**Reason:** Badge was started but not finished. The AGENTS.md explicitly notes "Badge is not finished."

**Consequences:** Using `<Badge>` renders an unstyled `<span>`. The component compiles but has no visual appearance.

---

## 38. Hardcoded Navigation in Sidebar

**Status:** Implemented

**Context:** The sidebar needs navigation items linking to application pages.

**Decision:** Define navigation as a static array inside `sidebar.tsx`. Items: Dashboard, Design System, Users, Settings.

**Reason:** Simple navigation with 4 items doesn't justify a config file or CMS. The array is trivially readable.

**Consequences:** Users and Settings links lead to 404 (no routes exist). Adding/removing items requires editing the component file.

---

## 39. Minimal User Model

**Status:** Implemented

**Context:** The authentication system needs to represent an authenticated user.

**Decision:** Define `User` type with 4 fields: `{ id, name, email, role }` where `role` is a plain `string` (not a union).

**Reason:** The current requirement only needs these fields. Making `role` a string avoids premature enumeration.

**Consequences:** No avatar, createdAt, phone, or other fields. Role is untyped — `"admin"`, `"teacher"`, `"student"` are conventions, not enforced types.

---

## 40. Centralized App Configuration

**Status:** Implemented

**Context:** App metadata (name, description, URL) is used in multiple places (layout metadata, page titles, manifests).

**Decision:** Store all app metadata in `config/app.ts` as an `as const` object.

**Reason:** Single source of truth for app metadata. `as const` provides literal types for autocomplete.

**Consequences:** Import `appConfig` from `@/config` instead of duplicating strings.

---

## 41. No State Management Library

**Status:** Implemented

**Context:** The application needs to manage UI state, server state, and session state.

**Decision:** Use React's built-in state mechanisms only: `useState` for component state, `next-themes` for theme, cookies for session. No Redux, Zustand, Jotai, or React Query usage in component code.

**Reason:** The current application scope (dashboard, auth, design system) doesn't justify an external state library. Mock auth means no server state management is needed yet.

**Consequences:** All state is local to components or resides in cookies. Adding features with real API data will likely require introducing React Query and server state patterns.

---

## 42. Gradient-based Button Fills

**Status:** Implemented

**Context:** Buttons are a primary visual element and should reflect the Liquid Glass identity.

**Decision:** Use CSS gradients for button backgrounds:

- Primary: `linear-gradient(135deg, #8a5bff, #4ecbff)`
- Danger: `linear-gradient(90deg, #ec003f80 10%, #fb2c3680 100%)`
- Secondary: semi-transparent gradient with backdrop-filter
- Ghost: transparent with hover background

**Reason:** Gradients are central to the Liquid Glass identity. Each variant communicates a different semantic through its color treatment.

**Consequences:** Button backgrounds cannot be customized via Tailwind. Changing a gradient requires editing `colors.css` for both light and dark variants.

---

## 43. Portal-based Select Dropdown

**Status:** Implemented

**Context:** Select dropdowns can be clipped by parent containers with `overflow: hidden`.

**Decision:** Render the Select content inside a `SelectPrimitive.Portal` with `position="popper"` and `sideOffset={8}`.

**Reason:** Portal rendering escapes overflow containers. Popper positioning ensures the dropdown appears at the correct location regardless of scroll context.

**Consequences:** Select dropdowns render at the document root. Styling must account for the portal context (no inherited parent styles).

---

## 44. Label/Error/Description Compound in Field

**Status:** Implemented

**Context:** Form fields consistently need a label, optional description, and error message.

**Decision:** Create a `Field` component that renders label (with required asterisk), children (the input), and either error or description (mutually exclusive, error wins).

**Reason:** Encapsulates the common form field pattern. Ensures consistent spacing and styling for all form fields.

**Consequences:** Forms use `<Field label="Email" error={...}><Input .../></Field>`. The error state overrides the description.

---

## 45. Body Background with background-attachment: fixed

**Status:** Implemented

**Context:** The multi-gradient ambient background should remain stable during scrolling.

**Decision:** Set `background-attachment: fixed` on `body` via `theme.css`.

**Reason:** Fixed attachment keeps the gradient positions static relative to the viewport. Content scrolls over a stable background.

**Consequences:** The background gradient does not scroll with content, creating a subtle parallax-like effect.

---

## 46. ::before Pseudo-element for Gradient Borders

**Status:** Implemented

**Context:** Glass surfaces need a thin gradient border that follows the element's border-radius.

**Decision:** Use `::before` with `padding: 1px`, same `border-radius`, a gradient `background`, and `mask-composite: exclude` to create a 1px gradient border overlay.

**Reason:** Standard CSS `border: 1px solid <gradient>` does not support gradient borders. The mask technique achieves a true gradient border with matching border-radius without extra markup.

**Consequences:** Every Surface element has a `::before` pseudo-element reserved for the gradient border. The technique relies on `mask-composite: exclude` (modern CSS, widely supported). Safari requires `-webkit-mask-composite: xor` for older versions.

---

## 47. ::after Pseudo-element for Top Highlight

**Status:** Implemented

**Context:** Glass surfaces should have a subtle top-edge highlight that suggests light reflecting off glass.

**Decision:** Use `::after` with `inset: 1px 1px auto`, `height: 30%`, and a semi-transparent white gradient to create a sheen effect on the top portion of glass elements.

**Reason:** The sheen reinforces the glass metaphor. Using `::after` separates this concern from the gradient border (`::before`).

**Consequences:** Every Surface element also reserves `::after`. Combined with `::before`, Surface elements use both pseudo-elements.

---

## 48. Transition on box-shadow Only

**Status:** Implemented

**Context:** Hover/focus interactions should have smooth transitions.

**Decision:** Surface elements transition only `box-shadow` (`transition: box-shadow var(--motion-normal) var(--motion-ease)`). Button components use `transition: all 0.2s ease`.

**Reason:** Transitioning `box-shadow` is performant (GPU-accelerated). Limiting to one property avoids unnecessary repaints on hover.

**Consequences:** Surface shadow animates but background/backdrop-filter change instantly. Buttons animate all properties with a fixed 0.2s duration.

---

## 49. Prettier 100-character Print Width

**Status:** Implemented

**Context:** Line length affects readability and diff clarity.

**Decision:** Set Prettier `printWidth: 100`.

**Reason:** 100 characters provides more code per line than the traditional 80, reducing vertical scrolling, while still being narrow enough for side-by-side diff views.

**Consequences:** JSX can be wider. Some developers may find 80-character wrapping preferable for readability.

---

## 50. Tailwind CSS v4 with @tailwindcss/postcss

**Status:** Implemented

**Context:** The project uses Tailwind CSS v4, which has a different PostCSS setup than v3.

**Decision:** Use the `@tailwindcss/postcss` plugin as the only PostCSS plugin. No `autoprefixer` or `postcss-import` needed.

**Reason:** Tailwind v4 bundles its own PostCSS integration. `@tailwindcss/postcss` replaces the old `tailwindcss` PostCSS plugin. Autoprefixing is built in.

**Consequences:** No `tailwind.config.js` needed. CSS import syntax is `@import 'tailwindcss'`. The `@tailwind` directives (`base`, `components`, `utilities`) are replaced by `@import 'tailwindcss'`.

---

## 51. globals.css as Single CSS Entry Point

**Status:** Implemented

**Context:** The app needs a single CSS entry point where Tailwind and theme are loaded.

**Decision:** `app/globals.css` imports Tailwind first, then the theme system. No other CSS files are imported elsewhere.

**Reason:** Single entry point ensures consistent load order. Tailwind must load before theme CSS so that theme tokens can reference Tailwind's layer correctly.

**Consequences:** All styling flows through `globals.css`. No component CSS files are imported in individual components.

---

## 52. Import Order in theme.css

**Status:** Implemented

**Context:** Tokens must be defined before component CSS that references them.

**Decision:** Import `tokens/*` before `components/*` in `styles/theme.css`. Within tokens, import `background` before `colors` before `motion` before `typography`.

**Reason:** CSS custom properties must be defined before they are used. Component CSS references tokens, so tokens must load first.

**Consequences:** Adding a new token file requires adding its import in the correct position. Adding a new component CSS file requires adding its import in the correct section.

---

## 53. class-variance-authority (CVA) Not Used

**Status:** Implemented (as negative decision)

**Context:** shadcn/ui typically uses CVA for variant management, and CVA is installed as a dependency.

**Decision:** Do not use CVA. Use string union types and BEM class construction instead (`ads-button--${variant}`).

**Reason:** BEM + string interpolation is simpler than CVA for the current variant complexity. CVA adds an abstraction layer that isn't justified for 4 variants and 3 sizes.

**Consequences:** CVA remains as an installed but unused dependency. Future components with more complex variant matrices might benefit from it.

---

## 54. Indonesian Select Placeholder

**Status:** Implemented

**Context:** The Select component needs a default placeholder.

**Decision:** Set `placeholder = 'Pilih data'` as default.

**Reason:** Indonesian is the application's primary language. `'Pilih data'` means "Select data" in Indonesian.

**Consequences:** Every default `<Select>` shows "Pilih data" when no option is selected.

---

## 55. Separate apps/admin ESLint Config

**Status:** Implemented

**Context:** Each app may need different lint rules.

**Decision:** Each app has its own `eslint.config.mjs`. The root config is empty.

**Reason:** Decouples lint configuration per app. The `admin` app uses Next.js + TypeScript presets; a hypothetical `mobile-api` app would use different rules.

**Consequences:** Lint rules are duplicated if both apps need the same presets. The root `eslint.config.mjs` is an empty file.

---

## 56. Private Monorepo

**Status:** Implemented

**Context:** The repository is not published to npm.

**Decision:** Set `"private": true` in root `package.json`.

**Reason:** Prevents accidental publication of the monorepo to the npm registry.

**Consequences:** `pnpm publish` fails on the root package. Individual packages must be published explicitly.

---

## 57. Turbopack for Dev

**Status:** Implemented

**Context:** Next.js supports both webpack and Turbopack for development.

**Decision:** Use `next dev --turbopack` in the `dev` script.

**Reason:** Turbopack is faster than webpack for development. Next.js 16 uses Turbopack as the default recommendation.

**Consequences:** Dev server uses the Rust-based Turbopack bundler. Build still uses the default bundler (webpack or Turbopack depending on Next.js 16 defaults).

---

## 58. 5 Badge Variants Defined

**Status:** Implemented

**Context:** The Badge component needs semantic color variants.

**Decision:** Define 5 badge variants: `'default'`, `'success'`, `'warning'`, `'danger'`, `'info'`.

**Reason:** These cover the standard semantic color categories. `info` is included for informational badges beyond what success/warning/danger cover.

**Consequences:** The variant union exists in `badge.types.ts` but has no corresponding CSS. The `info` variant is unique to Badge (not used in other components).

---

## 59. Widget Components Live in features/*/components/

**Status:** Implemented

**Context:** Some components are specific to a feature but need their own files.

**Decision:** Place feature-specific components in `features/{feature}/components/`. Example: `features/auth/components/login-form.tsx`, `features/auth/components/user-menu.tsx`.

**Reason:** Keeps feature-related code together. Avoids polluting `components/` with non-reusable components.

**Consequences:** Reusable UI components go in `components/ui/`. Feature-specific UI goes in `features/{feature}/components/`. The boundary is clear.

---

## 60. Sidebar Uses Surface for Container

**Status:** Implemented

**Context:** The sidebar needs the Liquid Glass visual identity.

**Decision:** The `Sidebar` component wraps its content in a `<Surface>` component.

**Reason:** Surface is the base Liquid Glass primitive. Using it in Sidebar ensures visual consistency with other glass elements.

**Consequences:** Sidebar inherits Surface's glass effect, gradient border, and top highlight.

---

## 61. No Avatar in UserMenu

**Status:** Implemented

**Context:** The UserMenu shows the current user.

**Decision:** Display user name and email as text only. No avatar image or initials fallback.

**Reason:** The User model doesn't include an avatar field. Adding one without a real auth system is premature.

**Consequences:** The user menu shows two text lines (name + email) with a Logout button. The AGENTS.md mentions a user avatar but it is not implemented.

---

## 62. Logout Uses router.push + router.refresh

**Status:** Implemented

**Context:** After destroying the session, the client needs to reflect the logged-out state.

**Decision:** Call `router.push('/')` and `router.refresh()` after `destroySession()`.

**Reason:** `router.push('/')` navigates to home. `router.refresh()` forces a server re-render, which will trigger the auth guard and redirect to `/login`.

**Consequences:** Logout triggers a page refresh. The user briefly sees the dashboard before being redirected to login.

---

## 63. No Dropdown Menu in UserMenu

**Status:** Implemented

**Context:** The user menu should eventually have dropdown items (Profile, Settings, Logout).

**Decision:** Show user info + Logout button inline. No dropdown.

**Reason:** The dropdown requires additional Radix primitives or custom implementation. The current simple layout meets the minimal requirement.

**Consequences:** Profile and Settings menu items mentioned in AGENTS.md are not implemented.

---

## 64. No Active Route Detection in Sidebar

**Status:** Implemented

**Context:** Navigation links should indicate the current active route.

**Decision:** Use plain `<Link>` components without any active state detection. All links have the same static styling.

**Reason:** The current navigation is simple. Adding `usePathname()` requires converting the Sidebar to a client component, which the project avoids.

**Consequences:** Users have no visual indication of which page they are on. The sidebar looks the same regardless of route.

---

## 65. Semicolons Required

**Status:** Implemented

**Context:** JavaScript/TypeScript semicolons are a stylistic choice.

**Decision:** Require semicolons (`semi: true` in Prettier).

**Reason:** Semicolons prevent ambiguity in certain edge cases and are more explicit.

**Consequences:** All statements end with `;`. The Prettier formatter enforces this automatically.

---

## 66. Single Quotes Preferred

**Status:** Implemented

**Context:** String quotation style is a codebase consistency concern.

**Decision:** Use single quotes (`singleQuote: true` in Prettier). JSX props use double quotes (Prettier default).

**Reason:** Single quotes reduce visual noise for most strings. JSX attributes remain standard double-quoted.

**Consequences:** All JavaScript strings use `''`. All JSX attribute strings use `""`.

---

## 67. Trailing Commas Everywhere

**Status:** Implemented

**Context:** Trailing commas in multiline objects/arrays affect diff readability.

**Decision:** Use trailing commas everywhere (`trailingComma: "all"`).

**Reason:** Trailing commas produce cleaner diffs: adding a new line doesn't require adding a comma to the previous line.

**Consequences:** All multiline objects, arrays, function params, and imports end with trailing commas.

---

## 68. Minimal next.config.ts

**Status:** Implemented

**Context:** Next.js configuration needs to be declared.

**Decision:** Use the minimal default configuration. No custom webpack, rewrites, redirects, or image domains.

**Reason:** The current application doesn't need any custom Next.js configuration.

**Consequences:** Configuration changes (image domains, redirects, etc.) will require revisiting this file.

---

## 69. layout.css Has Duplicate Classes

**Status:** Implemented

**Context:** Both the dashboard and design system use the same grid layout.

**Decision:** Define both `.ads-layout` and `.app-layout` in `layout.css` with identical CSS Grid rules.

**Reason:** The two classes emerged from different development contexts (design system vs. dashboard). They happen to use the same layout.

**Consequences:** Two CSS classes with identical rules. Changing the layout requires updating both. This is a minor duplication concern.

---

## 70. Body Uses Tailwind Utilities for Base Styling

**Status:** Implemented

**Context:** The `<body>` tag needs default typography and layout styling.

**Decision:** Apply `font-sans antialiased min-h-full flex flex-col` as Tailwind utility classes directly on `<body>` in the root layout.

**Reason:** Tailwind utilities are concise and avoid additional CSS file rules. These are baseline styles appropriate for the HTML element.

**Consequences:** Body styling is split between layout.tsx (Tailwind) and theme.css (background, colors). Not all body styling is in one place.

---

## 71. SurfaceProps Extends HTMLAttributes Directly

**Status:** Implemented

**Context:** Surface is a generic styling wrapper and should accept all div attributes.

**Decision:** `SurfaceProps = HTMLAttributes<HTMLDivElement>`. No custom props.

**Reason:** Surface has no semantic customization needs — it's purely visual. Extending HTMLAttributes provides full native attribute support.

**Consequences:** Surface accepts any `<div>` attribute (id, style, onClick, etc.). It does not require any specific props.

---

## 72. ButtonProps Extends ButtonHTMLAttributes

**Status:** Implemented

**Context:** Buttons need native button attributes (type, disabled, form, etc.).

**Decision:** `ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?, size?, status?, leftIcon?, rightIcon? }`.

**Reason:** Extending native attributes provides full HTML button support. The custom props add ADS-specific features.

**Consequences:** Buttons accept any native `<button>` attribute. `type` defaults to `"button"` to prevent accidental form submission.

---

## 73. Checkbox Excludes defaultChecked and onChange

**Status:** Implemented

**Context:** Checkbox uses Radix's controlled component pattern with `checked` and `onCheckedChange`.

**Decision:** Omit `defaultChecked` and `onChange` from the base button attributes. Redefine with Radix-specific `CheckedState` type.

**Reason:** Radix's `onCheckedChange` replaces the native `onChange`. The `checked` prop accepts `CheckedState` (boolean | 'indeterminate') instead of a plain boolean.

**Consequences:** Checkbox consumers use `checked` and `onCheckedChange` instead of `defaultChecked` and `onChange`.

---

## 74. Shared Form Dependencies at Root Level

**Status:** Implemented

**Context:** Form handling (react-hook-form, zod) and data fetching (react-query) are needed across potential future apps.

**Decision:** Install `react-hook-form`, `@hookform/resolvers`, `zod`, `@tanstack/react-query`, `@tanstack/react-query-devtools`, `sonner`, `date-fns` at the monorepo root level.

**Reason:** Hoisting shared dependencies to the root allows all workspace packages to use them without installing per-package. This is the standard pnpm monorepo pattern for shared dependencies.

**Consequences:** These packages are available to all apps/packages. They are not yet used in the current code — they are available for future features.

---

## 75. System Theme Preference Disabled

**Status:** Implemented

**Context:** The theme toggle should give users explicit control.

**Decision:** Set `enableSystem={false}` in the ThemeProvider.

**Reason:** Users choose their theme explicitly via the toggle. No automatic switching based on OS preference.

**Consequences:** Theme is always what the user last set. No "auto" mode. The toggle cycles between light and dark only.

---

## 76. Remaining Boundary Violation: components/app → features/auth

**Status:** Tracked as technical debt (M0)

**Context:** `components/app/app-shell/app-shell.tsx` imports `UserMenu` from `features/auth/components/user-menu`. This violates the intended layering `app/ → features/ → components/ → lib/` because a `components/` module depends upward on a `features/` module.

**Decision:** Do not fix this independently. Track as technical debt.

**Reason:** The `UserMenu` component is tightly coupled to the auth feature's logout logic (`destroySession` server action, `router.push`, `router.refresh`). Moving it out of `features/auth/` requires also extracting the logout server action or duplicating it. The cleanest resolution is extracting `UserMenu` into `components/app/user-menu/` with its own logout logic — but this is a sidebar/navigation refactor concern, not a standalone cleanup.

The dependency is:

- `app-shell.tsx` → imports `UserMenu` component from `features/auth/components`
- `app-shell.types.ts` → imports `User` type from `lib/types/user` (already fixed in M0)

The type import violation is resolved. Only the component import remains.

**Consequences:**

- `components/app/` depends on `features/auth/` for `UserMenu`
- Adding new features does not worsen this violation (it is isolated to `app-shell.tsx`)
- Will be resolved as part of sidebar/navigation refactor when role-based navigation is introduced (M1)
- The refactor moves `UserMenu` to `components/app/user-menu/` and passes logout action as a prop or extracts to `lib/`

---

## 77. Architectural Fixes Independent from Feature Milestones

**Status:** Established (M0 review)

**Context:** M0 resolved 2 of 3 boundary violations as part of infrastructure work. The remaining violation was left tracked as debt.

**Decision:** Architectural cleanup and technical debt resolution should be independent from feature implementation. Do not bundle architectural fixes into feature milestones unless they are genuinely blocking.

**Reason:**

- Feature milestones should deliver user-visible functionality, not refactoring
- Bundling architecture work into features creates reviewable-but-mixed PRs that are harder to review
- Architectural debt has its own lifecycle and priority; it should be tracked and addressed on its own terms
- Exception: if an architectural issue genuinely blocks a feature (e.g., a type definition needed by the feature), it may be resolved as a prerequisite — but this should be explicit, not assumed

**Consequences:**

- Technical debt items are tracked in DECISIONS.md with clear rationale for why they exist
- Feature milestones reference debt items only when blocked by them
- Architecture improvements are separate work items with their own acceptance criteria

---

## 78. Centralized Navigation Config

**Status:** Implemented (M1.1)

**Context:** Navigation items (label, href, icon, roles, disabled state, badge) were scattered across sidebar and mobile-nav components. Adding a new nav item required editing multiple files.

**Decision:** Create a single source of truth at `config/navigation.ts` that defines all navigation items with their roles, icons, disabled states, and badges. Both Sidebar and MobileNav consume this config.

**Reason:**

- Adding/removing navigation items requires editing only one file
- Role filtering logic (`getNavigationForRole`) is centralized
- Future features can add their nav entry without touching components
- Disabled state and badges (e.g., "Soon") are config-driven

**Consequences:**

- `config/navigation.ts` imports Lucide icons — acceptable for config
- Both Sidebar and MobileNav are client components that call `getNavigationForRole(role)`
- New features add their nav entry to `config/navigation.ts` as part of their milestone

---

## 79. Mobile-First Responsive Shell with Bottom Navigation

**Status:** Implemented (M1.1)

**Context:** The admin shell was desktop-only. On mobile (< 768px), the sidebar was visible but cramped. No mobile navigation pattern existed.

**Decision:** Implement a responsive shell: desktop keeps the existing sidebar; mobile hides the sidebar and shows a fixed bottom navigation bar with max 5 items + a "More" overflow menu.

**Reason:**

- Mobile bottom navigation is the standard pattern for admin apps on phones
- Max 5 items keeps the bar uncluttered; overflow goes to "More"
- Desktop layout unchanged — no regression for existing users
- CSS Grid media query (`@media max-width: 767px`) controls layout switching
- Mobile nav is a fixed overlay (`position: fixed; bottom: 0`) — does not affect content flow

**Consequences:**

- `layout.css` uses media query to hide sidebar and add `padding-bottom: 64px` on mobile
- `MobileNav` component is rendered inside `AppShell` but only visible on mobile via CSS
- "More" menu shows overflow nav items + profile + logout
- `UserMenu` in header is hidden on small screens via `hidden sm:inline` on the name text

---

## 80. Auth Redirect for Authenticated Users on /login

**Status:** Implemented (M1.1)

**Context:** Authenticated users could still visit `/login` and see the login form. This is a poor UX — they should be redirected to the dashboard.

**Decision:** Create an `(auth)/layout.tsx` route group that checks for an existing session. If a session exists, redirect to `/`.

**Reason:**

- Prevents authenticated users from seeing the login page
- Uses the same `getSession()` server-side check as the dashboard layout
- Layout-level check means it applies to all auth routes (not just `/login`)
- If future auth routes are added (register, forgot password), they get the redirect for free

**Consequences:**

- `(auth)/layout.tsx` is a server component — no client-side JS overhead
- Redirect is server-side via `redirect('/')` — no flash of login form
- If no session, renders children normally (login page)

---

## 81. ADS DropdownMenu Component

**Status:** Implemented (M1.2)

**Context:** UserMenu and future menus need a reusable dropdown. The M1.1 UserMenu used a manual `useState`/`useRef`/`useEffect` dropdown implementation. This pattern would be duplicated across the codebase.

**Decision:** Create an ADS DropdownMenu component wrapping `@radix-ui/react-dropdown-menu` with ADS liquid glass styling.

**Reason:**

- Radix handles keyboard navigation, focus management, and outside click — all things manual implementations get wrong
- ADS styling (blur, gradient borders, rounded corners) applied via CSS class `ads-dropdown-menu`
- Replaces manual dropdown in UserMenu — single source of truth for all dropdown menus
- Follows existing ADS architecture: `components/ui/dropdown-menu/` + `styles/components/dropdown-menu.css`
- Design system documentation page + route created at `/design/dropdown-menu`

**Consequences:**

- New dependency: `@radix-ui/react-dropdown-menu` added to package.json
- CSS uses `@keyframes` for open animation (scale + opacity)
- `UserMenu` simplified from 112 lines (manual) to 75 lines (Radix-based)
- All future dropdown menus reuse this component

---

## 82. Mobile Navigation: Dedicated "More" Page

**Status:** Implemented (M1.2)

**Context:** M1.1 implemented overflow navigation items via a popover menu in the bottom nav. Popovers on mobile are fragile (positioning, scroll behavior, touch targets) and don't scale.

**Decision:** Replace the mobile "More" popover with a dedicated `/more` route. The bottom nav's 5th item is a Link to `/more`.

**Reason:**

- Dedicated pages are more reliable than popovers on mobile (no positioning issues, proper scroll, native navigation)
- The `/more` page serves as a mobile navigation hub: user summary, all navigation groups, logout
- Bottom nav stays simple — max 4 primary items + "Lainnya" Link
- No `useState`, `useRef`, or `useEffect` needed in MobileNav — pure Link components
- MobileNav simplified from 149 lines to 76 lines

**Consequences:**

- `/more` page is a server component with a client `LogoutButton` sub-component
- MobileNav no longer has any popover logic — all overflow goes through `/more`
- The `/more` page is reusable for future mobile-only features (settings, profile, etc.)

---

## 83. ThemeToggle in Header

**Status:** Implemented (M1.2)

**Context:** The ThemeToggle was a floating fixed button at `bottom-right`. It overlapped content on mobile, had inconsistent styling, and wasn't discoverable.

**Decision:** Move ThemeToggle to the header actions area (right side, next to UserMenu). Rewrite as an icon-only button.

**Reason:**

- Header is the standard location for theme controls in admin dashboards
- Icon-only (Sun/Moon) saves space, tooltip via `aria-label` for accessibility
- Removes the floating overlay that blocked content on small screens
- `app/layout.tsx` no longer renders `<ThemeToggle />` — it's part of AppShell

**Consequences:**

- ThemeToggle is now rendered inside `AppShell` header actions
- Root layout simplified — no more floating ThemeToggle
- Theme toggle accessible from both desktop and mobile header

---

## 84. Sidebar Active State: ADS Pill Indicator

**Status:** Implemented (M1.2)

**Context:** The M1.1 sidebar active state used `bg-white/15` — a simple background color change. The spec requires the active state to "visually match the ADS design language" and "do NOT simply change text color."

**Decision:** Create `ads-nav-item` CSS classes with a left brand-color pill indicator, subtle glow, and inset highlight for the active state.

**Reason:**

- Left pill indicator (`width: 3px`, brand color) is a standard admin navigation pattern
- Subtle `box-shadow` glow adds depth without being distracting
- `inset 0 1px 0` highlight adds the liquid glass feel to the active item
- Dark mode has slightly different opacity/glow for proper contrast
- CSS class approach (`ads-nav-item`, `ads-nav-item--active`, `ads-nav-item--disabled`) is reusable for any navigation component

**Consequences:**

- `styles/components/nav.css` created with ADS nav styles
- Sidebar component uses `cn()` to apply classes instead of inline Tailwind
- MobileNav uses its own simpler styling (bottom nav doesn't need the pill indicator)

---

## 85. Header Brand Alignment with Sidebar

**Status:** Implemented (M1.2)

**Context:** The header spans both grid columns. Without alignment, the logo/title appeared offset from the sidebar below it.

**Decision:** Use `pl-8` on the header Surface to visually align the logo area with the sidebar content.

**Reason:**

- Sidebar: `aside` has `p-4` (16px) + Surface has `p-4` (16px) = 32px total inset
- Header: `Surface` uses `pl-8` (32px) to match
- Right side uses `pr-6` (24px) for breathing room on the actions side
- Simple, no structural CSS changes needed

**Consequences:**

- Header Surface uses asymmetric padding (`pl-8 pr-6`) for alignment
- Logo visually aligns with sidebar navigation items below
- AppShell no longer uses the `Header` ADS component — builds header directly with Surface for layout control

---

## 86. Toast via Sonner + ADS Wrapper

**Status:** Implemented (M1.3)

**Context:** Every important action needs user feedback. The project needs a consistent toast/notification system. Multiple toast libraries exist (react-hot-toast, react-toastify, sonner).

**Decision:** Use `sonner` as the toast library, wrapped in an ADS `toast` function and `<Toaster />` component.

**Reason:**

- Sonner is lightweight, has good defaults, and supports all toast variants (success, error, warning, info, loading)
- ADS wrapper (`toast.success()`, `toast.error()`, etc.) provides a consistent API without exposing Sonner internals
- `<Toaster />` renders in `AppProvider` (not AppShell) — available on all routes including `/login`
- CSS styling via `styles/components/toast.css` applies liquid glass visual identity

**Consequences:**

- New dependency: `sonner` added to root `package.json`
- All action feedback uses `toast.success()` / `toast.error()` — no more `alert()` or inline error messages
- Toast is globally available via `import { toast } from '@/components/ui'`

---

## 87. AlertDialog for Destructive Confirmations

**Status:** Implemented (M1.3)

**Context:** Destructive actions (delete, logout) need explicit confirmation. The codebase used `window.confirm()` which is non-customizable and visually inconsistent.

**Decision:** Use `@radix-ui/react-alert-dialog` for all destructive action confirmations.

**Reason:**

- Radix AlertDialog handles focus trapping, keyboard navigation, and accessibility (ARIA roles)
- ADS styling via `styles/components/alert-dialog.css` applies liquid glass visual identity
- Replaces `window.confirm()` — consistent look and feel with the rest of the design system
- Replaces `alert()` for error messages — toast is used instead

**Consequences:**

- New dependency: `@radix-ui/react-alert-dialog` added to root `package.json`
- `student-list.tsx` delete button now shows AlertDialog before calling `deleteStudent`
- `window.confirm()` and `alert()` are eliminated from the codebase

---

## 88. EmptyState and Skeleton ADS Components

**Status:** Implemented (M1.3)

**Context:** Features need consistent empty state messaging and loading placeholders. These patterns would be duplicated across features without a shared component.

**Decision:** Create ADS EmptyState and Skeleton components with design system documentation.

**Reason:**

- EmptyState provides icon, title, description, and action — used in lists with no data
- Skeleton provides loading placeholders (Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard)
- Both follow ADS architecture: `components/ui/` + `styles/components/` + design system page + route
- Prevents feature-specific loading/empty state implementations that diverge visually

**Consequences:**

- EmptyState is a server component (no interactivity needed)
- Skeleton components use `animate-pulse` for the loading animation
- StudentList uses both EmptyState and Skeleton for empty/loading states

---

## 89. Global Toaster in AppProvider

**Status:** Implemented (M1.3)

**Context:** Toasts need to be available on all routes, including `/login` (which is outside the dashboard layout). Placing `<Toaster />` in `AppShell` means login page has no toast support.

**Decision:** Place `<Toaster />` in `AppProvider` (root-level client component wrapper) instead of `AppShell`.

**Reason:**

- `AppProvider` wraps the entire app — all routes get toast support
- Login form can now show `toast.success()` / `toast.error()` feedback
- Logout can show `toast.success()` before redirect
- Single `<Toaster />` instance — no duplicates

**Consequences:**

- `AppProvider` now renders `<Toaster />` after `{children}`
- `AppShell` no longer renders `<Toaster />`
- All routes (dashboard, auth, design system) have toast support

---

## 90. Field Accessibility: htmlFor Association

**Status:** Implemented (M1.3)

**Context:** Form fields had `<label>` elements without `htmlFor` attribute, breaking the label-input association for screen readers and click-to-focus.

**Decision:** Add optional `id` prop to Field component. When provided, `<label htmlFor={id}>` associates with the corresponding input.

**Reason:**

- `htmlFor` + `id` is the standard HTML pattern for label-input association
- Screen readers announce the label when the input is focused
- Clicking the label focuses the associated input
- `id` is optional — existing Field usage without `id` continues to work

**Consequences:**

- `field.types.ts` updated with `id?: string` prop
- `field.tsx` passes `id` to `<label htmlFor={id}>`
- Login form and other forms should pass matching `id` values for new fields

---

## 91. Environment Variable Strategy

**Status:** Established (M1.5.2)

**Context:** The project uses Next.js (which reads `.env.local`) and Drizzle Kit (which reads `.env`). Both need `DATABASE_URL`, but they have different file conventions.

**Decision:** Use a layered environment strategy:

- `.env.example` — canonical template, always committed to git, contains all required variables with empty or placeholder values
- `.env` — Drizzle Kit reads this (used by `drizzle-kit generate`, `drizzle-kit push`, `drizzle-kit migrate`)
- `.env.local` — Next.js reads this (used by `next dev`, `next build`), takes precedence over `.env`
- Production — environment variables set in the deployment platform (e.g., Vercel), never committed `.env` files

**Reason:**

- Next.js and Drizzle Kit have different env file conventions — `.env.local` for Next.js, `.env` for Drizzle Kit
- Keeping both `.env` and `.env.local` in sync during development avoids confusion
- `.env.example` serves as the single source of truth for what variables are needed
- Production never uses committed `.env` files — variables are injected by the platform
- `.gitignore` excludes `.env`, `.env.local`, and variant files but NOT `.env.example`

**Consequences:**

- Developers copy `.env.example` to both `.env` and `.env.local` during setup
- Both files should contain the same `DATABASE_URL` value
- Adding a new environment variable requires updating `.env.example`, `.env`, and `.env.local`
- The README documents this convention for onboarding
