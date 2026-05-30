import { motion, type Variants } from "motion/react";
import { anim } from "@/lib/animation";

interface PushTransitionProps {
	children: [React.ReactNode, React.ReactNode];
	reverse?: boolean;
	routeKey: string;
}

export default function PushTransition({
	children,
	reverse = false,
	routeKey,
}: PushTransitionProps) {
	const [prev, current] = children;

	const EASE: [number, number, number, number] = [0.25, 0.8, 0.25, 1];
	const DURATION = 0.4;

	const outgoing: Variants = {
		initial: { x: "0%" },
		enter: {
			x: reverse ? "100%" : "-100%",
			transition: { duration: DURATION, ease: EASE },
		},
		exit: {},
	};

	const incoming: Variants = {
		initial: { x: reverse ? "-100%" : "100%" },
		enter: {
			x: "0%",
			transition: { duration: DURATION, ease: EASE },
		},
		exit: {},
	};

	return (
		<div className="relative h-screen w-full overflow-hidden">
			<motion.div
				key={`${routeKey}-prev`}
				{...anim(outgoing)}
				className="absolute inset-0 z-10 h-full w-full"
			>
				{prev}
			</motion.div>
			<motion.div
				key={`${routeKey}-current`}
				{...anim(incoming)}
				className="absolute inset-0 z-20 h-full w-full"
			>
				{current}
			</motion.div>
		</div>
	);
}
