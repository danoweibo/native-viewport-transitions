import { motion } from "motion/react";
import { useState } from "react";

interface FallTransitionProps {
	children: [React.ReactNode, React.ReactNode];
	routeKey: string;
}

export default function FallTransition({
	children,
	routeKey,
}: FallTransitionProps) {
	const [prev, current] = children;
	const [gone, setGone] = useState(false);

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
				key={`${routeKey}-bg`}
				style={{ position: "absolute", inset: 0, zIndex: 10 }}
				initial={{ y: "-10px" }}
				animate={{ y: "0px" }}
				transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
			>
				{current}
			</motion.div>
			{!gone && (
				<motion.div
					key={routeKey}
					style={{ position: "absolute", inset: 0, zIndex: 20 }}
					initial={{ y: "0vh", opacity: 1 }}
					animate={{ y: "15vh", opacity: 0 }}
					transition={{
						y: { duration: 0.15, ease: [0.4, 0, 0.2, 1] },
						opacity: { duration: 0.25, ease: [0.4, 0, 0.2, 1], delay: 0 },
					}}
					onAnimationComplete={() => setGone(true)}
				>
					{prev}
				</motion.div>
			)}
		</div>
	);
}
