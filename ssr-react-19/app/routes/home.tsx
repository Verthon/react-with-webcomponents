import type { Route } from "./+types/home";
import { ThemeToggler } from "~/theme-toggler/ThemeToggler";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function Home() {
	return (
		<div>
			<h1>Server side rendering example in React 18</h1>
			<p>Theme toggler works with ref workaround</p>
			<ThemeToggler />
		</div>
	);
}
