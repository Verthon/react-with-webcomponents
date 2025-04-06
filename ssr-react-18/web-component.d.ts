type ThemeProps = Record<
	'light' | 'dark',
	{
		background: string;
		text: string;
		accent: string;
	}
>;

declare namespace JSX {
  interface IntrinsicElements {
    'theme-switcher': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      themeConfig?: ThemeProps;
      onThemeChanged?: (event: CustomEvent<{ theme: "light" | "dark"; isDark: boolean }>) => void;
    }
  }
}