# Claude Code Project Instructions

Use `AGENTS.md` as the canonical project instruction file.

## Required Summary

- This repository is a stateless React 19 todo app with in-memory state only.
- Keep business logic in `src/domain/todo-store.ts`.
- Keep config in `src/config/app-config.ts`.
- Keep UI orchestration in `src/App.tsx`.
- Keep styling in `src/styles.css`.
- Record every new user prompt in `prompt.md` before substantive changes.
- Add or update tests for every behavior change.
- Use `pnpm lint`, `pnpm test`, and `pnpm build` for validation as needed.

If this file and `AGENTS.md` ever differ, follow `AGENTS.md`.
