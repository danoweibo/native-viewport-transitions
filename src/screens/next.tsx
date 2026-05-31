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
		<div className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-[#090b12]">
			{/* Ambient blobs */}
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute top-[-10%] right-[10%] h-[400px] w-[400px] rounded-full bg-sky-500/20 blur-[120px]" />
				<div className="absolute bottom-[0%] left-[5%] h-[320px] w-[320px] rounded-full bg-indigo-500/15 blur-[100px]" />
			</div>

			{/* Glass card */}
			<div className="relative z-10 flex w-[320px] flex-col items-center gap-6 rounded-3xl border border-white/10 bg-white/5 p-10 shadow-[0_8px_64px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
				{/* Badge */}
				<span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-sky-300 text-xs uppercase tracking-widest">
					Test Page
				</span>

				<h1 className="font-semibold text-3xl text-white tracking-tight">
					You arrived.
				</h1>

				<p className="text-center text-sm text-white/40 leading-relaxed">
					The transition worked. Head back to try another effect.
				</p>

				<button
					type="button"
					onClick={back}
					className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/8 px-5 py-3 font-medium text-sm text-white/80 transition-all duration-200 hover:border-white/20 hover:bg-white/12 hover:text-white"
				>
					<span className="transition-transform duration-200 group-hover:-translate-x-1">
						←
					</span>
					Go Back
				</button>
			</div>

			{/* Bottom hint */}
			<p className="absolute bottom-6 text-white/20 text-xs uppercase tracking-widest">
				Testing...
			</p>
		</div>
	);
}
