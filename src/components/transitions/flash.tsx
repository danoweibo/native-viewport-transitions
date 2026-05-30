import { motion } from "motion/react";

interface FlashTransitionProps {
	children: [React.ReactNode, React.ReactNode];
	routeKey: string;
}

export default function FlashTransition({
	children,
	routeKey,
}: FlashTransitionProps) {
	const [prev, current] = children;

	return (
		<div
			style={{
				position: "relative",
				height: "100vh",
				width: "100%",
				overflow: "hidden",
			}}
		>
			<motion.div
				key={`${routeKey}-current`}
				style={{ position: "absolute", inset: 0, zIndex: 10 }}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
			>
				{current}
			</motion.div>
			<motion.div
				key={`${routeKey}-prev`}
				style={{
					position: "absolute",
					inset: 0,
					zIndex: 20,
					pointerEvents: "none",
				}}
				initial={{ opacity: 1 }}
				animate={{ opacity: 0 }}
				transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
			>
				{prev}
			</motion.div>
		</div>
	);
}
