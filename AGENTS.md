# Almaarif Jambi Plus - AI Agent Rules

## Project Overview

This is a pnpm monorepo using Turbo.

Main application:

- apps/admin
- Next.js
- React
- TypeScript
- Tailwind CSS v4

The project is building an internal platform.

---

# General Development Rules

## Coding Style

- Use TypeScript.
- Use ES6 syntax.
- Avoid nested ternary.
- Avoid unnecessary abstraction.
- Prefer simple maintainable code.
- Do not create files/components without a real requirement.

---

# Terminal Workflow

Always provide changes as terminal commands.

Create files:

mkdir
touch

Write files:

cat > file <<'EOF'
...
EOF

Modify existing files:

sed
grep
python scripts

Do not instruct manual editing.

---

# Feature First Development

Priority:

Business feature > component creation.

Before creating a new component:

1. Check existing components.
2. Reuse existing components.
3. Create new component only if required.

---

# Validation

Run validation after completing a feature.

Do not run validation after every small file change.

Examples:

pnpm lint
pnpm dev

---

# Communication Style

When assisting development:

1. Analyze briefly.
2. Provide commands.
3. Implement.
4. Validate.

Avoid unnecessary theory.
