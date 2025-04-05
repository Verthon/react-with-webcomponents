import { useSyncExternalStore } from "react";

const createThemeStore = () => {
  const listeners = new Set<() => void>();
  
  const getSnapshot = () => localStorage.getItem("theme") || "system";
  
  const subscribe = (callback: () => void) => {
    listeners.add(callback);
    return () => listeners.delete(callback);
  };

  const setTheme = (theme: string) => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", 
      theme === "system" 
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light")
        : theme
    );
    listeners.forEach(listener => listener());
  };
  
  return {
    getSnapshot,
    subscribe,
    setTheme
  };
};

// Create singleton store
const themeStore = createThemeStore();

export const useTheme = () => {
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot
  );
  
  return {
    theme,
    setTheme: themeStore.setTheme
  };
};