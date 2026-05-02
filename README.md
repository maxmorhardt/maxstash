# Maxstash

![Vue](https://img.shields.io/badge/vue.js-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![PrimeVue](https://img.shields.io/badge/PrimeVue-%2310B981.svg?style=for-the-badge&logo=vuedotjs&logoColor=white)
![License](https://img.shields.io/badge/license-Apache%202.0-blue?style=for-the-badge)

## Overview

Personal portfolio website built with Vue 3 and TypeScript. Features a full-width landing page with scroll-driven animations, light/dark theming, and a router-based multi-page layout for showcasing projects, background, and contact information.

## Features

- **Vue 3** with `<script setup>` and TypeScript
- **PrimeVue + PrimeIcons** for the design system
- **Vue Router** for client-side routing
- **Light / Dark Mode** with system-preference detection and persistence
- **Scroll Animations** powered by the `IntersectionObserver` API
- **ESLint + Prettier + Husky** for code quality
- **Vitest + @vue/test-utils** for unit testing

## Architecture

The application is a static SPA. Pages are lazy-loaded route chunks served behind a sticky header and full-width hero sections. The theme store toggles a `.dark` class on the root element which both PrimeVue and the custom CSS variables react to, keeping the look consistent across components and pages.

## Development

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Open browser to `http://localhost:5173`

## Production Build

Build the application for production deployment:

```bash
npm run build
```

## License

Released under the [Apache License 2.0](./LICENSE).
