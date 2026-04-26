# Copilot Project Instructions

Use `AGENTS.md` as the canonical project instruction file for this repository.

## Project Rules

- The app is a stateless React 19 todo app with in-memory state only.
- Do not add persistence, backend calls, or model SDK code unless explicitly requested.
- Keep business logic in `src/domain/todo-store.ts`.
- Keep config in `src/config/app-config.ts`.
- Keep UI orchestration in `src/App.tsx`.
- Keep presentation concerns in `src/styles.css`.
- Keep Playwright interaction details in `e2e/page-objects`.
- Record every new user prompt in `prompt.md` before substantive changes.
- Add or update tests for every behavior change.
- Prefer small, targeted changes over broad refactors.
- Use `pnpm lint`, `pnpm test`, and `pnpm build` for validation as needed.

If this file and `AGENTS.md` differ, follow `AGENTS.md`.
