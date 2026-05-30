/** biome-ignore-all lint/style/noNonNullAssertion: requires cache. */
import { useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import CardTransition from "@/components/transitions/card";
import FallTransition from "@/components/transitions/fall";
import FlashTransition from "@/components/transitions/flash";
import NoneTransition from "@/components/transitions/none";
import PushTransition from "@/components/transitions/push";
import RiseTransition from "@/components/transitions/rise";
import StackTransition from "@/components/transitions/stack";
import { useTransitionStore } from "@/contexts/transitions";
import { matchRoute } from "@/screens/router";

const pageCache = new Map<string, React.ReactNode>();

function getPage(pathname: string): React.ReactNode {
	if (pageCache.has(pathname)) {
		return pageCache.get(pathname)!;
	}
	const Component = matchRoute(pathname);
	const page = Component ? <Component /> : null;
	pageCache.set(pathname, page);
	return page;
}

type EffectType =
	| "stack"
	| "push"
	| "rise"
	| "fall"
	| "flash"
	| "card"
	| "none";

interface TransitionSnapshot {
	effect: EffectType;
	reverse: boolean;
	prev: React.ReactNode;
	current: React.ReactNode;
	key: string;
}

export default function TransitionManager() {
	const location = useLocation();

	const routeKey = location.pathname + location.search;
	const prevKeyRef = useRef<string>(routeKey);

	const [snapshot, setSnapshot] = useState<TransitionSnapshot>({
		effect: "none",
		reverse: false,
		prev: null,
		current: getPage(location.pathname),
		key: routeKey,
	});

	useLayoutEffect(() => {
		if (routeKey !== prevKeyRef.current) {
			const { effect, reverse } = useTransitionStore.getState();

			setSnapshot((prev) => ({
				effect,
				reverse,
				prev: prev.current,
				current: getPage(location.pathname),
				key: routeKey,
			}));

			prevKeyRef.current = routeKey;
		}
	}, [routeKey, location.pathname]);

	const { effect, reverse, prev, current, key } = snapshot;

	const renderEffect = () => {
		switch (effect) {
			case "stack": {
				const children: [React.ReactNode, React.ReactNode] = reverse
					? [current, prev]
					: [prev, current];
				return <StackTransition reverse={reverse}>{children}</StackTransition>;
			}
			case "push":
				return (
					<PushTransition reverse={reverse} routeKey={key}>
						{[prev, current]}
					</PushTransition>
				);
			case "rise": {
				const children: [React.ReactNode, React.ReactNode] = reverse
					? [current, prev]
					: [prev, current];
				return (
					<RiseTransition reverse={reverse} routeKey={key}>
						{children}
					</RiseTransition>
				);
			}
			case "fall":
				return (
					<FallTransition routeKey={key}>{[prev, current]}</FallTransition>
				);
			case "flash":
				return (
					<FlashTransition routeKey={key}>{[prev, current]}</FlashTransition>
				);
			case "card": {
				const children: [React.ReactNode, React.ReactNode] = reverse
					? [current, prev]
					: [prev, current];
				return (
					<CardTransition reverse={reverse} routeKey={key}>
						{children}
					</CardTransition>
				);
			}
			default:
				return <NoneTransition>{current}</NoneTransition>;
		}
	};

	return <>{renderEffect()}</>;
}
