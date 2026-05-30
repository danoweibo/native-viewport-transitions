import { motion, type Variants } from "motion/react";
import { anim } from "@/lib/animation";

interface RiseTransitionProps {
	children: [React.ReactNode, React.ReactNode];
	reverse?: boolean;
	routeKey: string;
}

export default function RiseTransition({
	children,
	reverse = false,
	routeKey,
}: RiseTransitionProps) {
	const [prev, current] = children;

	const slide: Variants = reverse
		? {
				initial: { top: "0%", opacity: 1 },
				enter: {
					top: "60%",
					opacity: 0.5,
					transition: {
						duration: 0.35,
						ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
					},
				},
				exit: {},
			}
		: {
				initial: { top: "60%", opacity: 0.5 },
				enter: {
					top: "0%",
					opacity: 1,
					transition: {
						duration: 0.35,
						ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
					},
				},
				exit: {},
			};

	const background: Variants = reverse
		? {
				initial: { y: -100, scale: 0.9, opacity: 0.5 },
				enter: {
					y: 0,
					scale: 1,
					opacity: 1,
					transition: {
						duration: 0.35,
						ease: [0.65, 0, 0.35, 1] as [number, number, number, number],
					},
				},
				exit: {},
			}
		: {
				initial: { y: 0, scale: 1, opacity: 1 },
				enter: {
					y: -100,
					scale: 0.9,
					opacity: 0.5,
					transition: {
						duration: 0.35,
						ease: [0.65, 0, 0.35, 1] as [number, number, number, number],
					},
				},
				exit: {},
			};

	return (
		<div className="relative h-screen w-full overflow-hidden">
			<motion.div
				key={`${routeKey}-bg`}
				{...anim(background)}
				className="absolute inset-0 z-10 h-full w-full"
			>
				{prev}
			</motion.div>
			<motion.div
				key={`${routeKey}-fg`}
				{...anim(slide)}
				className="absolute inset-0 z-20 h-full w-full"
			>
				{current}
			</motion.div>
		</div>
	);
}
