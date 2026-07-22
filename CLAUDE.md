# Maxstash Contribution Guide

This guide provides context for coding agents working in this repository. Maxstash is a personal portfolio site: a Vue 3 + TypeScript app built with Vite and prerendered to static HTML with vite-ssg, styled with Tailwind CSS v4 over PrimeVue (v4) + `@primeuix/themes` and custom CSS variables, and shipped as a Docker image.

## Directory overview

- `src/` – application source.
  - `pages/` – route-level views (lazy-loaded by the router).
  - `components/` – reusable components, grouped by area (`common/`, `header/`, `footer/`).
  - `composables/` – Vue composables (e.g. `useTheme`, `useScrollReveal`).
  - `router/` – `vue-router` setup.
  - `App.vue`, `main.ts`, `style.css` – app shell, bootstrap, and global styles.
  - `setupTests.ts`, `testUtils.ts` – Vitest setup and shared test helpers (in-memory router, PrimeVue stubs).
- `public/` – static assets served as-is (e.g. `logo.svg`).
- `Dockerfile`, `nginx.conf` – production container that serves the prerendered site via NGINX.
- `vite.config.ts`, `vitest.config.ts`, `eslint.config.js`, `tsconfig*.json` – tooling config.

## Tooling

- Package manager: **pnpm** (pinned via the `packageManager` field; `npm`/`yarn` are blocked by an `only-allow pnpm` preinstall hook). Enable with `corepack enable`. `pnpm-workspace.yaml` sets `minimumReleaseAge: 1440` to refuse dependency versions published less than 24h ago.
- Build/dev: **Vite** (`pnpm dev`, `pnpm build`, `pnpm preview`).
- Lint: **ESLint** flat config (`pnpm lint`).
- Format: **Prettier** (`pnpm format`); enforced on commit via **Husky + lint-staged**.
- Type check: `pnpm type-check` (uses `vue-tsc`).
- Tests: **Vitest** + **@vue/test-utils** + **jsdom** (`pnpm test`, `pnpm test:watch`, `pnpm test:coverage`).

Coverage thresholds are enforced at **80%** for statements / branches / functions / lines in `vitest.config.ts`. Keep them passing.

## Code style

- Vue SFCs use `<script setup lang="ts">`.
- Props: declare with `defineProps<Props>()` and `withDefaults` when needed; `Props` is a local `interface` (not exported) unless reused.
- Composables live in `src/composables/` and are named `useXxx`. Prefer module-scoped singletons for shared state (see `useTheme`); avoid allocating a new `reactive(...)` per call.
- Style with **Tailwind utility classes in the template**. A `<style scoped>` block is a fallback, not the default — reach for one only when a rule genuinely can't be a utility (see Styling below).
- Use the theme colors (`bg-bg-soft`, `text-text-h`, `border-accent-border`, …) rather than raw hex or `var(--…)`; they are bridged from the CSS variables so they follow light/dark automatically.
- Use PrimeIcons (`pi pi-*`) for icons rather than introducing new icon libraries.
- Avoid comments unless the code is genuinely non-obvious.
- Never type with `any`; use `unknown` if the type is truly unknown.
- Let TypeScript infer composable/hook return types where possible.

## Routing & pages

- Routes are registered in [src/router/index.ts](src/router/index.ts) and lazy-load page components from `src/pages/`. The file exports `routes` / `scrollBehavior` rather than a router instance — **vite-ssg constructs the router**, both at prerender time and in the browser.
- New top-level views: add a `XxxPage.vue` in `src/pages/` and a route in the router. Use `RouterLink` for in-app navigation; use `useRouter().push(...)` from event handlers.
- **Every page must call `usePageMeta({ title, description, canonical })`** ([src/composables/usePageMeta.ts](src/composables/usePageMeta.ts)). It wraps `useHead`, so the title, description, canonical, robots, and og/twitter tags are baked into that route's prerendered HTML. A page without it inherits no title and no self-referencing canonical, which is what previously kept `/about`, `/contact`, and `/projects` out of Google's index.
- `robots` defaults to `index, follow`; `NotFoundPage.vue` passes `noindex, follow` and omits `canonical`. Those tags live only in `usePageMeta` — don't reintroduce static copies in `index.html`, or every page gets duplicates that unhead can't dedupe.
- Add each new static route to [public/sitemap.xml](public/sitemap.xml).

## Static site generation

- `pnpm build` runs **vite-ssg**, which prerenders every static route to its own HTML file, plus the catch-all once as `/404` (see `includedRoutes` below).
- `ssgOptions.dirStyle` is `nested`, so the output is `dist/about/index.html`, matched by the `$uri/index.html` term of the `try_files` chain in `nginx.conf`. Changing one without the other silently breaks every route: with `flat` output the term never matches, and requests fall through to the 404 handler.
- `beastiesOptions` is disabled deliberately: critical-CSS inlining rewrites the PrimeVue/Tailwind `@layer` order documented under Styling.
- `includedRoutes` filters out dynamic paths (mirroring vite-ssg's default, which a custom `includedRoutes` replaces rather than extends) and renders the catch-all once as `/404`. NGINX serves that file via `error_page 404`, so unknown urls return a real 404 status instead of a soft 404. It hydrates against the requested url, so the router still resolves the catch-all normally.
- Code that touches `window`/`document`/`localStorage` at module scope or in `setup()` runs under Node during prerender. Guard it, or put it behind the `!import.meta.env.SSR` branch in [src/main.ts](src/main.ts) (as `useTheme().init()` and route-chunk preloading are). Use that over the context's deprecated `isClient` flag — it's statically analyzable, so the block is tree-shaken out of the SSR bundle.
- Theme preference stays in `localStorage`; the blocking inline script in `index.html` applies it before first paint. A cookie would buy nothing — prerendered HTML is built ahead of any request.
- **PrimeVue generates its component CSS from the theme at runtime and injects it once JS runs**, so prerendered PrimeVue markup paints unstyled until hydration. `style.css` carries a fallback layout for the header's `Menubar` (in `@layer base`, so the real `primevue` layer wins the moment it loads) with values read off the hydrated computed styles. **Nothing tests this automatically** — verify it by hand after a PrimeVue upgrade by loading the site with JS disabled and confirming the header is still a horizontal bar. Putting a PrimeVue component above the fold means extending that fallback, or the header flash comes back.

## Styling

- **Tailwind CSS v4**, wired through the `@tailwindcss/vite` plugin. There is no `tailwind.config.js`; all configuration lives in [src/style.css](src/style.css).
- `style.css` holds, in order: the `@layer` declaration, `@import 'tailwindcss'`, the `@theme` block, the `:root` / `:root.dark` variables, base element styles, the `.reveal` scroll-reveal classes, and the shared `layout-container` / `layout-section` / `page-title` utilities.
- The `@theme` block **bridges the CSS variables into Tailwind** (`--color-bg: var(--bg)` and friends), so `bg-bg`, `text-text-h`, `border-accent-border`, `font-mono`, `rounded-card`, `shadow-card` all track the light/dark variables with no `dark:` variant needed. To add a color, add the `--x` variable to both `:root` and `:root.dark`, then map it once in `@theme`.
- `.container` and `.section` were renamed to `layout-container` / `layout-section` to avoid colliding with Tailwind's built-in `container`.
- Keep a `<style scoped>` block only for what utilities can't express: `@keyframes` and the rules that drive them, multi-state `transition` shorthands that differ between reveal and hover, and PrimeVue `:deep()` overrides.
- Inside a scoped block write **plain CSS against the variables** (`var(--accent)`, `var(--border)`) — do not use `@apply`. It would require a `@reference` directive that re-parses the theme per component, and editors flag both as unknown at-rules.
- A `transition-*` utility on a `RevealSection` element **breaks the scroll reveal**: utilities outrank the `components` layer where `.reveal` defines its transition, so `opacity` drops out and the fade-in dies. Declare the reveal and hover transitions together in one scoped rule instead (see `.app-card`, `.lift-card`, `.feature`).
- Never put a `pi` icon class on the same element as layout utilities. PrimeIcons is imported unlayered, so `.pi { display: inline-block }` beats any utility; PrimeVue's theme also sets `.pi { font-size: var(--p-icon-size) }`. Nest the glyph in its own `<span>` and size it there.
- PrimeVue is emitted into a `primevue` CSS layer (configured in `src/main.ts`) ordered `theme, base, primevue, components, utilities`, so Tailwind's preflight doesn't strip PrimeVue component styling and utilities still win over it. Don't reorder those layers.
- Some class names (`term__item`, `term__input`, `term__menu`, `term__out-link`, `card__link`, `legal-links__item`) are retained purely as **test selectors** and carry no styling — don't remove them without updating the tests.

## Theming

- Theme state lives in [src/composables/useTheme.ts](src/composables/useTheme.ts) as a module-scoped reactive singleton. Toggling sets/removes the `dark` class on `document.documentElement` and persists the choice to `localStorage` under `maxstash:theme`.
- Both PrimeVue (configured in `src/main.ts`) and the CSS variables in `src/style.css` react to the `.dark` class. Prefer extending those variables over hard-coding colors.

## Animations

- Use [src/components/common/RevealSection.vue](src/components/common/RevealSection.vue) for scroll-reveal effects. It wraps `useScrollReveal`, which uses `IntersectionObserver` and falls back to immediately visible when the API is missing.

## Testing

- Tests are colocated next to the source file as `Foo.test.ts` and run with Vitest in jsdom.
- Shared helpers in [src/testUtils.ts](src/testUtils.ts):
  - `createTestRouter()` – an in-memory `vue-router` with the same route names as production.
  - `stubGlobals.stubs` – lightweight stubs for PrimeVue `Button` and `Menubar` so component tests don't need the full PrimeVue plugin.
- For navigation assertions after a click, `await flushPromises()` before checking `router.currentRoute.value.path`.
- When mocking `IntersectionObserver`, restore `globalThis.IntersectionObserver` in `afterEach` (see `useScrollReveal.test.ts`).
- Run `pnpm test:coverage` before committing changes that touch `src/`. The build will fail if any coverage metric drops below 80%.

## Deployment

- Production builds are prerendered static assets emitted to `dist/` and served by NGINX via the provided `Dockerfile` + `nginx.conf`.
- `nginx.conf` serves prerendered files and returns real 404s: `try_files $uri $uri/index.html =404` with `error_page 404 /404/index.html`. There is deliberately **no `/index.html` SPA fallback** — every real route is prerendered, so an unmatched path is genuinely missing and should say so rather than return the homepage shell with a 200 (a soft 404 Google penalises).
- Adding a route therefore means adding it to the router _and_ rebuilding, or it will 404 in production. Client-side routing is unaffected: it never touches NGINX after the initial load.

## Commit conventions

Use conventional commits. Common types and scopes for this repo:

- Types: `feat`, `fix`, `refactor`, `chore`, `ci`, `docs`, `test`, `style`.
- Scopes (optional): `pages`, `components`, `composables`, `router`, `theme`, `tests`, `build`, `deploy`.

Example: `feat(pages): add resume download link to AboutPage`.

Always run `pnpm lint`, `pnpm type-check`, and `pnpm test` before committing.
