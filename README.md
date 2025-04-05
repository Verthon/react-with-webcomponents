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
* dispatch custom event `ThemeChanged`
* save the theme to the local-storage under key which user pass
* display correct icon with theme

## csr-react-18

Shows the problem in `csr-react-18/src/theme-toggler/ThemeToggler.tsx` with:

- synthetic events
- props treated as attribute in React 18 or lower

Change the `ThemeToggler` to `NotWorkingThemeToggler` in `csr-react-18/src/App.tsx` to see it in the action