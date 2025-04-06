
import { useEffect, useRef } from "react";
import { useTheme } from "./useTheme";

const customThemeConfig = {
  light: {
    background: "#f8f9fa",
    text: "#343a40",
    accent: "#007bff",
  },
  dark: {
    background: "#212529",
    text: "#f8f9fa",
    accent: "#0d6efd",
  },
};

// This won't work properly in React 18 and earlier
// Despite the theme is visually changing correctly, our React state is completely desynchronized
// due to the callback not firing up
export const NotWorkingThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    import("../../../web-components/theme-toggler").then((module) => {
      const ThemeSwitcher = module.ThemeSwitcher;
      if (typeof window !== "undefined" && !customElements.get("theme-switcher")) {
        customElements.define("theme-switcher", ThemeSwitcher);
      }
    });
  }, []);

	const handleThemeChange = (
		event: CustomEvent<{ theme: "light" | "dark"; isDark: boolean }>
	) => {
		console.log("[Not working] Theme changed to:", event.detail.theme);
    setTheme(event.detail.theme);
	};

	return (
		<div>
			<h2>Problematic Usage (React 18 and earlier)</h2>

			{/* Problem 1: Object prop will be stringified */}
			<theme-switcher
				themeConfig={customThemeConfig}
				onThemeChanged={handleThemeChange}
        storage-key="theme"
			/>

			{/* Problem 2: Custom event won't be handled */}
			{/* <theme-switcher onThemeChanged={handleThemeChange} storage-key="theme" /> */}

      <p>Current theme: {theme}</p>
		</div>
	);
};

export const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const themeRef = useRef<
    HTMLElement & {
      themeConfig: any;
      onThemeChanged: (event: CustomEvent<{ theme: "light" | "dark"; isDark: boolean }>) => void;
    }
  >(null);

  useEffect(() => {
    import("../../../web-components/theme-toggler").then((module) => {
      const ThemeSwitcher = module.ThemeSwitcher;
      if (typeof window !== "undefined" && !customElements.get("theme-switcher")) {
        customElements.define("theme-switcher", ThemeSwitcher);
      }
    });
  }, []);

  const handleThemeChange = (event: CustomEvent) => {
    if (event.detail && event.detail.theme) {
      setTheme(event.detail.theme);
      console.log("[Working] Theme changed to:", event.detail.theme);
    }
  };

  useEffect(() => {
    const element = themeRef.current;
    if (element) {
      // Directly assign the themeConfig to avoid serialization issues.
      element.themeConfig = customThemeConfig;
      // Attach a native event listener for the custom event.
      element.addEventListener("ThemeChanged", handleThemeChange as EventListener);
      return () => {
        element.removeEventListener("ThemeChanged", handleThemeChange as EventListener);
      };
    }
  }, []);

  useEffect(() => {
    const element = themeRef.current;
    if (element) {
      element.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return (
    <div>
      <h2>Working Solution with Ref (React 18 and earlier)</h2>
      <theme-switcher ref={themeRef} storage-key="theme" />
      <p>Current theme: {theme}</p>
    </div>
  );
};