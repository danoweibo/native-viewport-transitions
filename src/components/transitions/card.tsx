import { motion } from "motion/react";

interface CardTransitionProps {
	children: [React.ReactNode, React.ReactNode];
	reverse?: boolean;
	routeKey: string;
}

export default function CardTransition({
	children,
	reverse = false,
	routeKey,
}: CardTransitionProps) {
	const [prev, current] = children;

	const DURATION = 0.35;
	const EASE: [number, number, number, number] = [0.33, 1, 0.68, 1];

	return (
		<div
			style={{
				position: "relative",
				height: "100vh",
				width: "100%",
				overflow: "hidden",
				backgroundColor: "#000",
			}}
		>
			{/* Previous page */}
			<motion.div
				key={`${routeKey}-bg`}
				style={{
					position: "absolute",
					inset: 0,
					zIndex: 10,
					overflow: "hidden",
					transformOrigin: "top center",
				}}
				initial={{
					scale: reverse ? 0.9 : 1,
					borderRadius: reverse ? "12px" : "0px",
					top: reverse ? "1%" : "0%",
				}}
				animate={{
					scale: reverse ? 1 : 0.9,
					borderRadius: reverse ? "0px" : "12px",
					top: reverse ? "0%" : "1%",
				}}
				transition={{ duration: DURATION, ease: EASE }}
			>
				{prev}
			</motion.div>

			{/* Incoming page */}
			<motion.div
				key={`${routeKey}-fg`}
				style={{
					position: "absolute",
					left: 0,
					right: 0,
					bottom: 0,
					zIndex: 20,
					overflow: "hidden",
					borderTopLeftRadius: "12px",
					borderTopRightRadius: "12px",
				}}
				initial={{
					top: reverse ? "3%" : "100%",
				}}
				animate={{
					top: reverse ? "100%" : "3%",
				}}
				transition={{ duration: DURATION, ease: EASE }}
			>
				{current}
			</motion.div>
		</div>
	);
}
