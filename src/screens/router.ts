import type { ComponentType } from "react";
import Ticketmaster from "@/screens/index";
import AnimationTestScreen from "@/screens/test";

export const routes: Record<string, ComponentType> = {
	"/": Ticketmaster,
	/* ONBOARDING */
	"/test": AnimationTestScreen,
};

export function matchRoute(pathname: string) {
	return routes[pathname] ?? null;
}
