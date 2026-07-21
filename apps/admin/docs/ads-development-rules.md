# ADS Development Rules

## Project Context

Project:
Almaarif Design System (ADS)

Stack:

- Next.js
- React
- TypeScript
- Tailwind CSS v4

Goal:
Build a production-ready design system inspired by shadcn/ui, Radix UI, Mantine, and NextUI with ADS Liquid Glass identity.

---

# General Rules

- Use TypeScript.
- Use ES6.
- Avoid nested ternary.
- Avoid over abstraction.
- Keep components reusable.
- Follow existing project structure.

---

# Coding Style

## Tailwind

Keep className in one line.

Preferred:

className={cn('flex items-center justify-between')}

Avoid:

className={cn(
'flex',
'items-center',
)}

---

## Import

Use aliases.

Preferred:

import { cn } from '@/lib';

Avoid relative imports.

---

## Component Export

Use named export.

Preferred:

export function Button() {}

Avoid default export.

---

# Workflow

Always provide terminal commands.

Never ask manual file editing.

Create files using:

mkdir
touch
cat > file <<'EOF'

Edit existing files using:

sed
grep
python script

Validate after completing a feature/component.

Avoid running validation after every small change.

---

# ADS Component Structure

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

# Component Completion Rule

One component is considered complete when:

- component implementation done
- styling done
- documentation page done
- route done
- navigation done

Do not start another component before finishing current one.

---

# ADS Design Rules

All components follow:

- Liquid Glass
- Blur
- Rounded
- Border
- Shadow
- Motion
- Hover
- Focus
- Active
- Disabled
- Error states

Backdrop filter:

-webkit-backdrop-filter: blur(var(--blur-lg)) saturate(180%);
backdrop-filter: blur(var(--blur-lg)) saturate(180%);

---

# Component API Rules

Keep API consistent.

Examples:

<Button />
<Input />
<Textarea />
<Select />
<Checkbox />
<Radio />
<Switch />

---

# Documentation Rules

Every ADS component needs documentation:

- Header
- Description
- Default example
- Variants
- Sizes (if available)
- States
- Disabled
- Real usage example

Use:

SectionPreview

Forms should use:

<Field>
  <Input />
</Field>

---

# Development Philosophy

Pilot project first.

Do not over-engineer.

Build only what current feature needs.

Advanced features should wait until required.

Examples:

Select:
Basic
Search
Multi
Async
Creatable

Implement progressively.

---

# Current ADS Progress

Completed:

- Card, Button, Field, Input, Select, Textarea, Checkbox, Radio, Switch
- Badge, Card, Header, Table, DatePicker
- DropdownMenu, AlertDialog, Toast
- Skeleton, EmptyState, Pagination, InfiniteScroll
- Tabs, Breadcrumb, Popover, PageLayout
- ThemeToggle

Future:

- Avatar
- Divider
- Tooltip
- Accordion
- Drawer
- Combobox
- MultiSelect

---

# Feature Priority

When building application features:

1. Solve business requirement.
2. Create missing component only when needed.
3. Keep component simple.
4. Avoid building unused design system parts.
