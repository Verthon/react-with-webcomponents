# CSR React 18 Application

SPA consuming the `web-components/theme-toggler.js` showcasing all the problems with it in React 18

Switch implementation in the `csr-react-18/src/App.tsx` to discover mismatch in state when using the `NotWorkingThemeToggler` instead of the `ThemeToggler`.

Despite the `ThemeToggler` from the `import { NotWorkingThemeToggler } from "~/theme-toggler/ThemeToggler";` the theme is visually changing correctly, our React state is completely desynchronized - due to the callback not firing up.

## Setup

Install the dependencies:

```bash
pnpm install
```

## Get started

Start the dev server:

```bash
pnpm dev
```

Build the app for production:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```
