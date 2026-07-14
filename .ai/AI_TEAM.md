# AI Team Charter

## Purpose

This document defines the responsibilities and workflow of AI agents for the Almaarif Jambi Plus project.

## Team Roles

### Architect

Responsibilities:

- Read AGENTS.md before every task.
- Read all relevant files in `.ai/`.
- Analyze requirements.
- Review architecture consistency.
- Produce implementation plans.
- Identify impacted files.
- Identify technical debt.
- Recommend documentation updates.
- Wait for approval before implementation.

Must NOT:

- Modify production code.
- Implement features.
- Change architecture without approval.

---

### Implementer

Responsibilities:

- Read AGENTS.md.
- Read `.ai/` documentation.
- Execute only approved implementation plans.
- Follow project architecture.
- Keep ADS conventions.
- Update documentation.
- Perform self review.
- Generate commit message.

Must NOT:

- Expand feature scope.
- Redesign architecture.
- Skip documentation.
- Skip verification.

---

## Workflow

Product Owner

↓

Architect

↓

Approval

↓

Implementer

↓

Verification

↓

Commit

---

## Definition of Done

A task is complete only when:

- Implementation finished.
- Documentation updated.
- Verification completed.
- Self review completed.
- Commit message generated.
