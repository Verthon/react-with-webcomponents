
import { useEffect } from "react";
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


export const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  // useEffect runs only on the client, so we safely import and register the custom element here
  // This workaround is necessary because, unlike Next.js, React Router doesn't provide a "use client" directive.
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
		console.log("[Working] Theme changed to:", event.detail.theme);
    setTheme(event.detail.theme);
	};

	return (
		<div>
			<h2>Everything works react 19</h2>

			<theme-switcher
				themeConfig={customThemeConfig}
				onThemeChanged={handleThemeChange}
				storage-key="theme"
			/>

      <p>Current theme: {theme}</p>
		</div>
	);
};