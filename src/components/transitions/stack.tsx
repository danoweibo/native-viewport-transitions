import { AnimatePresence, motion, type Variants } from "motion/react";
import { anim } from "@/lib/animation";

interface StackTransitionProps {
	children: [React.ReactNode, React.ReactNode];
	reverse?: boolean;
}

export default function StackTransition({
	children,
	reverse = false,
}: StackTransitionProps) {
	const [prev, current] = children;
	const animSpeed = 0.4;

	const slide: Variants = reverse
		? {
				initial: { top: "0%", opacity: 1 },
				enter: {
					top: "100%",
					transition: {
						duration: animSpeed,
						ease: [0.33, 1, 0.68, 1] as [number, number, number, number],
					},
				},
				exit: {},
			}
		: {
				initial: { top: "100%", opacity: 0 },
				enter: {
					top: "0%",
					opacity: 1,
					transition: {
						duration: animSpeed,
						ease: [0.33, 1, 0.68, 1] as [number, number, number, number],
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
						duration: animSpeed,
						ease: [0.33, 1, 0.68, 1] as [number, number, number, number],
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
						duration: animSpeed,
						ease: [0.33, 1, 0.68, 1] as [number, number, number, number],
					},
				},
				exit: {},
			};

	return (
		<AnimatePresence mode="wait">
			<div className="relative h-screen w-full overflow-hidden">
				<motion.div
					{...anim(background)}
					className="absolute inset-0 z-10 h-full w-full"
				>
					{prev}
				</motion.div>

				<motion.div
					{...anim(slide)}
					className="absolute inset-0 z-20 h-full w-full"
				>
					{current}
				</motion.div>
			</div>
		</AnimatePresence>
	);
}
