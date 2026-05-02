# Maxstash Contribution Guide

This guide provides context for coding agents working in this repository. Maxstash is a personal portfolio site: a Vue 3 + TypeScript SPA built with Vite, styled with PrimeVue + custom CSS variables, and shipped as a Docker image.

## Directory overview

- `src/` – application source.
  - `pages/` – route-level views (lazy-loaded by the router).
  - `components/` – reusable components, grouped by area (`common/`, `header/`, `footer/`).
  - `composables/` – Vue composables (e.g. `useTheme`, `useScrollReveal`).
  - `router/` – `vue-router` setup.
  - `App.vue`, `main.ts`, `style.css` – app shell, bootstrap, and global styles.
  - `setupTests.ts`, `testUtils.ts` – Vitest setup and shared test helpers (in-memory router, PrimeVue stubs).
- `public/` – static assets served as-is (e.g. `logo.svg`).
- `Dockerfile`, `nginx.conf` – production container that serves the built SPA via NGINX.
- `vite.config.ts`, `vitest.config.ts`, `eslint.config.js`, `tsconfig*.json` – tooling config.

## Tooling

- Package manager: **npm**.
- Build/dev: **Vite** (`npm run dev`, `npm run build`, `npm run preview`).
- Lint: **ESLint** flat config (`npm run lint`).
- Format: **Prettier** (`npm run format`); enforced on commit via **Husky + lint-staged**.
- Type check: `npm run type-check` (uses `vue-tsc`).
- Tests: **Vitest** + **@vue/test-utils** + **jsdom** (`npm run test`, `npm run test:watch`, `npm run test:coverage`).

Coverage thresholds are enforced at **80%** for statements / branches / functions / lines in `vitest.config.ts`. Keep them passing.

## Code style

- Vue SFCs use `<script setup lang="ts">`.
- Props: declare with `defineProps<Props>()` and `withDefaults` when needed; `Props` is a local `interface` (not exported) unless reused.
- Composables live in `src/composables/` and are named `useXxx`. Prefer module-scoped singletons for shared state (see `useTheme`); avoid allocating a new `reactive(...)` per call.
- Pages and components keep their template, script, and scoped styles colocated in the SFC.
- Use the existing CSS variables (`--bg`, `--text`, `--accent`, etc.) and PrimeIcons (`pi pi-*`) for icons rather than introducing new icon libraries.
- Avoid comments unless the code is genuinely non-obvious.
- Never type with `any`; use `unknown` if the type is truly unknown.
- Let TypeScript infer composable/hook return types where possible.

## Routing & pages

- Routes are registered in [src/router/index.ts](src/router/index.ts) and lazy-load page components from `src/pages/`.
- New top-level views: add a `XxxPage.vue` in `src/pages/` and a route in the router. Use `RouterLink` for in-app navigation; use `useRouter().push(...)` from event handlers.

## Theming

- Theme state lives in [src/composables/useTheme.ts](src/composables/useTheme.ts) as a module-scoped reactive singleton. Toggling sets/removes the `dark` class on `document.documentElement` and persists the choice to `localStorage` under `maxstash:theme`.
- Both PrimeVue (configured in `src/main.ts`) and the global CSS variables in `src/style.css` react to the `.dark` class. Prefer extending those variables over hard-coding colors.

## Animations

- Use [src/components/common/RevealSection.vue](src/components/common/RevealSection.vue) for scroll-reveal effects. It wraps `useScrollReveal`, which uses `IntersectionObserver` and falls back to immediately visible when the API is missing.

## Testing

- Tests are colocated next to the source file as `Foo.test.ts` and run with Vitest in jsdom.
- Shared helpers in [src/testUtils.ts](src/testUtils.ts):
  - `createTestRouter()` – an in-memory `vue-router` with the same route names as production.
  - `stubGlobals.stubs` – lightweight stubs for PrimeVue `Button` and `Menubar` so component tests don't need the full PrimeVue plugin.
- For navigation assertions after a click, `await flushPromises()` before checking `router.currentRoute.value.path`.
- When mocking `IntersectionObserver`, restore `globalThis.IntersectionObserver` in `afterEach` (see `useScrollReveal.test.ts`).
- Run `npm run test:coverage` before committing changes that touch `src/`. The build will fail if any coverage metric drops below 80%.

## Deployment

- Production builds are static assets emitted to `dist/` and served by NGINX via the provided `Dockerfile` + `nginx.conf`.
- `nginx.conf` should keep SPA fallback (`try_files ... /index.html`) intact — don't break client-side routing.

## Commit conventions

Use conventional commits. Common types and scopes for this repo:

- Types: `feat`, `fix`, `refactor`, `chore`, `ci`, `docs`, `test`, `style`.
- Scopes (optional): `pages`, `components`, `composables`, `router`, `theme`, `tests`, `build`, `deploy`.

Example: `feat(pages): add resume download link to AboutPage`.

Always run `npm run lint`, `npm run type-check`, and `npm run test` before committing.
