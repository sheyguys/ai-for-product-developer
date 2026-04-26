# Architecture Notes

## Current Boundaries

- `src/domain/todo-store.ts`
  Holds the todo state model, pure reducer, and selectors.
- `src/config/app-config.ts`
  Maps environment variables into application config.
- `src/App.tsx`
  Orchestrates UI events and local in-memory state transitions.
- `src/styles.css`
  Contains responsive presentation only.
- `e2e/features`
  Holds business-readable E2E scenarios.
- `e2e/page-objects`
  Encapsulates browser interaction details for Playwright tests.
- `e2e/specs`
  Binds feature scenarios to executable Playwright coverage.

## Why This Shape

- The reducer is framework-agnostic and easy to test.
- UI behavior is verified through user-focused tests instead of implementation details.
- Configuration is externalized to environment variables to keep the app portable across environments.
- No persistence is used, so the app remains stateless and easy to deploy as static assets.

## Code Smell Guardrails

- Keep state transitions in the reducer, not inside event handlers.
- Avoid duplicating filter and task mutation logic across components.
- Keep side effects at the edges of the app.
- Prefer descriptive action names over generic setters.
- Add tests before expanding business behavior.
- Keep selectors centralized in page objects rather than scattering them across specs.

## Future Support For Other Models Or Providers

The current product does not call any AI model, so adding provider code now would be premature. To support future model changes safely:

1. Create a provider-agnostic port such as `TaskAssistantPort`.
2. Place each vendor implementation in its own adapter module.
3. Inject the adapter at the application edge using environment-driven configuration.
4. Keep domain rules independent from any SDK payload shape.

That approach lets you switch providers without rewriting task logic or UI behavior.
