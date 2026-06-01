import { ThemeProvider, useTheme } from "next-themes";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import MobileView from "@/components/layouts/mobile";
import TransitionManager from "@/components/transitions";

function ThemeColorMeta() {
	const { resolvedTheme } = useTheme();

	useEffect(() => {
		const themeColor = resolvedTheme === "dark" ? "#000000" : "#ffffff";
		let meta = document.querySelector<HTMLMetaElement>(
			'meta[name="theme-color"]',
		);
		if (!meta) {
			meta = document.createElement("meta");
			meta.name = "theme-color";
			document.head.appendChild(meta);
		}
		meta.content = themeColor;
	}, [resolvedTheme]);

	return null;
}

function AppContent() {
	return (
		<>
			<ThemeColorMeta />
			<MobileView>
				<TransitionManager />
			</MobileView>
		</>
	);
}

export default function App() {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<BrowserRouter>
				<AppContent />
			</BrowserRouter>
		</ThemeProvider>
	);
}
