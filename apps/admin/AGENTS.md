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
- Toast
- AlertDialog
- EmptyState
- Skeleton

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

M1.3 Complete — UX Foundation

Consistent UX patterns established:

- ADS Toast (Sonner wrapper) for action feedback
- ADS AlertDialog (Radix wrapper) for destructive confirmations
- ADS EmptyState for empty data messaging
- ADS Skeleton for loading placeholders
- Global Toaster in AppProvider (all routes)
- All actions use toast feedback (no more alert() or window.confirm())
- Error boundary with friendly messaging
- Field accessibility (htmlFor + id association)

Next: Business features (Teacher Management, Attendance Input)

---

# Implementation Rules

Before coding:

Inspect existing structure.

Reuse ADS components.

Do not redesign architecture unless required.

Prefer incremental implementation.
