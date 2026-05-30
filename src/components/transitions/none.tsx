import { motion } from "motion/react";

interface NoneTransitionProps {
	children: React.ReactNode;
}

export default function NoneTransition({ children }: NoneTransitionProps) {
	return <motion.div className="h-full w-full">{children}</motion.div>;
}
