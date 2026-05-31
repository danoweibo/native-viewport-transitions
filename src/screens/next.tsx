import { useNavigate } from "react-router-dom";
import { useTransitionStore } from "@/contexts/transitions";

export default function NextTransitionScreen() {
	const navigate = useNavigate();
	const { setTransition } = useTransitionStore();

	const back = () => {
		setTransition({ effect: "card", reverse: true });
		navigate(-1);
	};

	return (
		<div className="flex h-screen flex-col items-center justify-center gap-4 bg-blue-300">
			<h1 className="font-bold text-2xl text-white">Test Page</h1>
			<button
				type="button"
				onClick={back}
				className="cursor-pointer rounded bg-black px-4 py-2 text-white"
			>
				← Back
			</button>
			<section className="absolute bottom-3 text-white">Testing...</section>
		</div>
	);
}
