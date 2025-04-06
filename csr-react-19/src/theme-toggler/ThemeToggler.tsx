import { ThemeSwitcher } from "../../../web-components/theme-toggler";
import { useTheme } from "./useTheme";

if (typeof window !== "undefined" && !customElements.get("theme-switcher")) {
	customElements.define("theme-switcher", ThemeSwitcher);
}

const customThemeConfig = {
	light: {
		background: "#f8f9fa",
		text: "#343a40",
		accent: "#007bff",
	},
	dark: {
		background: "red",
		text: "#f8f9fa",
		accent: "#0d6efd",
	},
};

export const ThemeToggler = () => {
	const { theme, setTheme } = useTheme();

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
