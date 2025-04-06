# SSR React 18 Application

## Getting Started

SSR App based on the react-router. You can toggle implementations in the `ssr-react-18/app/routes/home.tsx`

Despite the `ThemeToggler` from the `import { NotWorkingThemeToggler } from "~/theme-toggler/ThemeToggler";` the theme is visually changing correctly, our React state is completely desynchronized - due to the callback not firing up.

Moreover there are multiple hydration errors logged to the browser console: `Uncaught Error: Hydration failed because the initial UI does not match what was rendered on the server.`

**Note**: The following error is printed by default by Router - which you can confirm in the `unchanged-router-boilerplate` that also outputs it

```shell
A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch

  ...
    <RouterProvider2 router={{basename:"/", ...}}>
      <RouterProvider flushSync={function} router={{basename:"/", ...}}>
        <Router basename="/" location={{pathname:"/", ...}} navigationType="POP" navigator={{...}}>
          <DataRoutes routes={[...]} future={{...}} state={{...}}>
            <RenderErrorBoundary location={{pathname:"/", ...}} revalidation="idle" component={<Layout>} ...>
              <RenderedRoute match={{params:{}, ...}} routeContext={{...}}>
                <Layout>
                  <html lang="en">
                    <head>
                    <body
-                     bis_register="W3sibWFzdGVyIjp0cnVlLCJleHRlbnNpb25JZCI6IntmY2E2N2Y0MS03NzZiLTQzOGEtOTM4Mi02NjIxNz..."
-                     data-new-gr-c-s-check-loaded="8.929.0"
-                     data-gr-ext-installed=""
                    >
react-dom-client.development.js:4621:18
```

### Installation

Install the dependencies:

```bash
pnpm install
```

### Development

Start the development server with HMR:

```bash
pnpm run dev
```

Your application will be available at `http://localhost:5173`.

Built with ❤️ using React Router.


```shell
A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch

  ...
    <RouterProvider2 router={{basename:"/", ...}}>
      <RouterProvider flushSync={function} router={{basename:"/", ...}}>
        <Router basename="/" location={{pathname:"/", ...}} navigationType="POP" navigator={{...}}>
          <DataRoutes routes={[...]} future={{...}} state={{...}}>
            <RenderErrorBoundary location={{pathname:"/", ...}} revalidation="idle" component={<Layout>} ...>
              <RenderedRoute match={{params:{}, ...}} routeContext={{...}}>
                <Layout>
                  <html lang="en">
                    <head>
                    <body
-                     bis_register="W3sibWFzdGVyIjp0cnVlLCJleHRlbnNpb25JZCI6IntmY2E2N2Y0MS03NzZiLTQzOGEtOTM4Mi02NjIxNz..."
-                     data-new-gr-c-s-check-loaded="8.929.0"
-                     data-gr-ext-installed=""
                    >
react-dom-client.development.js:4621:18
```