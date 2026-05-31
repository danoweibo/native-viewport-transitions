import { useNavigate } from "react-router-dom";
import { useTransitionStore } from "@/contexts/transitions";

type EffectType =
	| "stack"
	| "push"
	| "rise"
	| "fall"
	| "flash"
	| "card"
	| "none";

export default function CurrentTransitionScreen() {
	const navigate = useNavigate();
	const { setTransition } = useTransitionStore();

	const go = (effect: EffectType) => {
		setTransition({ effect });
		navigate("/next");
	};

	return (
		<div className="flex h-screen flex-col items-center justify-center gap-4 bg-white">
			<h1 className="font-bold text-2xl">Home</h1>
			<button
				type="button"
				onClick={() => go("stack")}
				className="cursor-pointer rounded bg-black px-4 py-2 text-white"
			>
				Stack →
			</button>
			<button
				type="button"
				onClick={() => go("push")}
				className="cursor-pointer rounded bg-blue-600 px-4 py-2 text-white"
			>
				Push →
			</button>
			<button
				type="button"
				onClick={() => go("rise")}
				className="cursor-pointer rounded bg-green-600 px-4 py-2 text-white"
			>
				Rise →
			</button>
			<button
				type="button"
				onClick={() => go("fall")}
				className="cursor-pointer rounded bg-orange-500 px-4 py-2 text-white"
			>
				Fall →
			</button>
			<button
				type="button"
				onClick={() => go("flash")}
				className="cursor-pointer rounded bg-purple-500 px-4 py-2 text-white"
			>
				Flash →
			</button>
			<button
				type="button"
				onClick={() => go("card")}
				className="cursor-pointer rounded bg-sky-500 px-4 py-2 text-white"
			>
				Card →
			</button>
			<button
				type="button"
				onClick={() => go("none")}
				className="cursor-pointer rounded bg-gray-400 px-4 py-2 text-white"
			>
				None →
			</button>
		</div>
	);
}
