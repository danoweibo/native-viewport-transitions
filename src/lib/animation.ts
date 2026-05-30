import type { Variants } from "motion/react";

type AnimationVariants = {
	initial: string;
	animate: string;
	exit: string;
	variants: Variants;
};

export const anim = (variants: Variants): AnimationVariants => ({
	initial: "initial",
	animate: "enter",
	exit: "exit",
	variants,
});
