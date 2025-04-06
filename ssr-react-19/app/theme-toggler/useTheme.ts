import { useSyncExternalStore } from "react";

const createThemeStore = () => {
  const listeners = new Set<() => void>();

  const getSnapshot = () => {
    if (typeof window === "undefined" || !window.localStorage) {
      return "system";
    }
    try {
      return localStorage.getItem("theme") || "system";
    } catch (e) {
      return "system";
    }
  };

  const subscribe = (callback: () => void) => {
    listeners.add(callback);
    return () => listeners.delete(callback);
  };

  const setTheme = (theme: string) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("theme", theme);
        const effectiveTheme =
          theme === "system"
            ? window.matchMedia('(prefers-color-scheme: dark)').matches
              ? "dark"
              : "light"
            : theme;
        document.documentElement.setAttribute("data-theme", effectiveTheme);
      } catch {}
    }
    listeners.forEach(listener => listener());
  };

  return {
    getSnapshot,
    subscribe,
    setTheme,
  };
};

const themeStore = createThemeStore();

export const useTheme = () => {
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getSnapshot
  );
  
  return {
    theme,
    setTheme: themeStore.setTheme,
  };
};