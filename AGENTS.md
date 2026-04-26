# Project Agent Rules

This file is the canonical instruction source for AI coding agents working in this repository.

## Scope And Precedence

1. `AGENTS.md` is the source of truth.
2. Tool-specific instruction files must stay aligned with this file.
3. If a tool auto-loads another file such as `CLAUDE.md` or `.github/copilot-instructions.md`, treat that file as a mirror of these rules, not a separate policy.

## Project Snapshot

- Stack: TypeScript, React 19, Vite, Vitest, Playwright.
- Product: stateless todo app with in-memory state only.
- Do not add persistence, backend calls, or model SDK dependencies unless explicitly requested.

## Architecture Rules

- Keep business logic in `src/domain/todo-store.ts`.
- Keep environment-driven configuration in `src/config/app-config.ts`.
- Keep UI orchestration in `src/App.tsx`.
- Keep presentation concerns in `src/styles.css`.
- Keep E2E selectors and interaction details inside `e2e/page-objects`.
- Follow `docs/architecture.md` when making structural changes.

## Change Rules

- Prefer small, targeted changes over broad refactors.
- Preserve the stateless architecture unless the task explicitly changes it.
- Add or update tests with every behavior change.
- For domain behavior, update `src/domain/todo-store.test.ts`.
- For UI behavior, update `src/App.test.tsx`.
- For user-flow changes, update Playwright coverage when relevant.

## Validation

- Use the pinned toolchain from `package.json` and `.nvmrc`.
- Primary commands:
  - `pnpm lint`
  - `pnpm test`
  - `pnpm build`
  - `pnpm run e2e`
- Run the smallest relevant validation set for the change, then expand if risk is higher.

## Collaboration Notes

- Read `README.md` and `docs/architecture.md` before major changes.
- Avoid unrelated cleanup while implementing the requested task.
- When adding new instructions for another agent tool, mirror this file instead of creating a divergent rule set.

## Mirror Files

The following files exist to support tools that look for vendor-specific filenames:

- `CLAUDE.md`
- `GEMINI.md`
- `QWEN.md`
- `GLM.md`
- `.github/copilot-instructions.md`
- `.cursor/rules/project-rules.mdc`

Keep them consistent with this file.
