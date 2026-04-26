# Todo Flow

Stateless todo application built with TypeScript and React. The app supports add, list, edit, complete, delete, and filter flows while staying responsive for mobile, tablet, and desktop browsers.

## Stack

- TypeScript
- React 19
- Vite
- Vitest + Testing Library
- GitHub Actions for CI/CD

## Features

- Add tasks
- View task list
- Edit tasks inline
- Mark tasks complete
- Delete tasks
- Filter by all, active, and completed
- Responsive layout for mobile and iPad-sized screens
- In-memory state only, with no database or persistence layer

## Commands

```bash
pnpm install
pnpm dev
pnpm test
pnpm build
pnpm run ci
```

## Runtime

- Node.js: `v24.14.0`
- pnpm: `10.28.1`
- Use `nvm use` after cloning because the project includes `.nvmrc`

## Environment Variables

Copy from `.env.example` when needed.

- `VITE_APP_TITLE`: UI title
- `VITE_DEFAULT_FILTER`: initial filter (`all`, `active`, `completed`)
- `VITE_BASE_PATH`: Vite base path for deployments such as GitHub Pages

## Engineering Notes

- TDD: reducer and UI behavior are covered by tests first, then implementation
- Code smell control: business logic lives in a pure reducer, keeping UI orchestration smaller and easier to refactor
- 12-factor alignment: config comes from environment variables, the app is stateless, and the build is disposable
- CI/CD: pull requests and pushes run validation automatically; main branch can deploy a static artifact to GitHub Pages

## Future Portability

The current app does not need model integration. To stay ready for future changes, the code keeps domain logic independent from UI and environment concerns. If you later add AI or automation support, place provider-specific code behind an adapter boundary rather than mixing SDK calls into the reducer or components.

See [docs/architecture.md](/Users/kasinan/Desktop/playground/AI/todo-list/docs/architecture.md) for the design notes.
