# react-with-webcomponents

## prerequisites

- Node 22 and nvm
- pnpm

Every time you navigate to new folder with example e.g. `csr-react-18` you must install the dependencies:
```shell
nvm use && pnpm i
```

This repo showcases the problems of web-components usage in the React before the React 19 era.
It contains the client-side-rendering traditional SPA examples as well as server-side-rendering approach.

Don't worry about the web-component code it is messy and not optimal, its purpose is just to:

- dispatch custom event `ThemeChanged`
- save the theme to the local-storage under key which user pass
- display correct icon with theme

## csr-react-18

Shows the problem in `csr-react-18/src/theme-toggler/ThemeToggler.tsx` with:

- synthetic events
- props treated as attribute in React 18 or lower

`ThemeToggler` has to use the ref workaround to be synced with state.

Change the `ThemeToggler` to `NotWorkingThemeToggler` in `csr-react-18/src/App.tsx` to see it in the action.

## csr-react-19

All the problems with the React 18 CSR are solved. It doesn't use the ref workaround anymore.

## ssr-react-18

Multiple warning with hydration logged to the browser console.
Change the `ThemeToggler` to `NotWorkingThemeToggler` in `ssr-react-18/app/routes/home.tsx` to see state mismatches.
ThemeToggler has to use the ref workaround to be synced with state.

The WebComponent is dynamically imported and registered in the useEffect inside of the `ssr-react-18/app/theme-toggler/ThemeToggler.tsx`. This workaround is necessary because, unlike Next.js, React Router doesn't provide a `"use client"` directive.
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

## ssr-react-19

Hydration warnings are no longer logged to the browser console. All the problems with the React 18 SSR are solved.
The WebComponent is dynamically imported and registered in the useEffect inside of the `ssr-react-18/app/theme-toggler/ThemeToggler.tsx`. This workaround is necessary because, unlike Next.js, React Router doesn't provide a `"use client"` directive.

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
