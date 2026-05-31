import type { ComponentType } from "react";
import CurrentTransitionScreen from "@/screens/index";
import NextTransitionScreen from "@/screens/next";

export const routes: Record<string, ComponentType> = {
	"/": CurrentTransitionScreen,
	"/next": NextTransitionScreen,
};

export function matchRoute(pathname: string) {
	return routes[pathname] ?? null;
}
