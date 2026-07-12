<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# ADS Project Rules

## Application

This application contains:

Almaarif Design System (ADS)

ADS is an internal design system inspired by:

- shadcn/ui
- Radix UI
- Storybook

with its own Liquid Glass visual identity.

---

# Architecture Rules

Structure:

components/ui/component/
component.tsx
component.types.ts
index.ts

styles/components/
component.css

features/design-system/pages/
component-page.tsx

app/(dashboard)/design/component/
page.tsx

---

# ADS Component Rules

A component is complete only when:

- component implementation finished
- styling finished
- documentation finished
- route finished
- navigation finished

Do not start another component before completion.

---

# Design Rules

All ADS components should support:

- liquid glass UI
- blur
- rounded corners
- borders
- shadows
- motion
- hover state
- focus state
- active state
- disabled state
- error state

Backdrop filter:

-webkit-backdrop-filter: blur(var(--blur-lg)) saturate(180%);
backdrop-filter: blur(var(--blur-lg)) saturate(180%);

---

# Current ADS Status

Completed:

- Surface
- Button
- Field
- Input
- Select
- Textarea
- Checkbox
- Radio
- Switch
- Badge
- DropdownMenu

---

# Current Development Direction

ADS component creation is paused.

Focus on business features first.

Rule:

Feature requires UI
|
v
Check existing ADS component
|
v
Missing?
|
v
Create required component only

---

# Current Feature

M1.2 Complete — Navigation & App Shell Foundation

The admin shell is production-ready with:

- Centralized navigation config
- Responsive layout (desktop sidebar + mobile bottom nav + /more page)
- ADS DropdownMenu for UserMenu
- Theme toggle in header
- Auth redirect for authenticated users
- Login form with per-field validation

Next: Business features (Student Management is partially done)

---

# Implementation Rules

Before coding:

Inspect existing structure.

Reuse ADS components.

Do not redesign architecture unless required.

Prefer incremental implementation.
