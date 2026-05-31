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

const effects: { id: EffectType; label: string; accent: string }[] = [
	{ id: "stack", label: "Stack", accent: "#e2e8f0" },
	{ id: "push", label: "Push", accent: "#60a5fa" },
	{ id: "rise", label: "Rise", accent: "#34d399" },
	{ id: "fall", label: "Fall", accent: "#fb923c" },
	{ id: "flash", label: "Flash", accent: "#c084fc" },
	{ id: "card", label: "Card", accent: "#38bdf8" },
	{ id: "none", label: "None", accent: "#94a3b8" },
];

export default function CurrentTransitionScreen() {
	const navigate = useNavigate();
	const { setTransition } = useTransitionStore();

	const go = (effect: EffectType) => {
		setTransition({ effect });
		navigate("/next");
	};

	return (
		<div className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-[#090b12]">
			{/* Ambient blobs */}
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute top-[-10%] left-[20%] h-[420px] w-[420px] rounded-full bg-indigo-600/20 blur-[120px]" />
				<div className="absolute right-[15%] bottom-[-5%] h-[350px] w-[350px] rounded-full bg-sky-500/15 blur-[100px]" />
				<div className="absolute top-[40%] left-[-5%] h-[280px] w-[280px] rounded-full bg-violet-500/10 blur-[90px]" />
			</div>

			{/* Glass card */}
			<div className="relative z-10 flex w-[340px] flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_8px_64px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
				{/* Header */}
				<div className="mb-4 text-center">
					<p className="text-white/30 text-xs uppercase tracking-[0.25em]">
						Native Viewport Transitions
					</p>
					<h1 className="mt-1 font-semibold text-2xl text-white tracking-tight">
						Choose Effect
					</h1>
				</div>

				{/* Buttons */}
				{effects.map(({ id, label, accent }) => (
					<button
						key={id}
						type="button"
						onClick={() => go(id)}
						style={{ "--accent": accent } as React.CSSProperties}
						className="group relative flex items-center justify-between overflow-hidden rounded-xl border border-white/8 bg-white/5 px-5 py-3 font-medium text-sm text-white/80 transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white"
					>
						{/* Left accent bar */}
						<span
							className="absolute top-0 left-0 h-full w-[3px] scale-y-0 rounded-full transition-transform duration-200 group-hover:scale-y-100"
							style={{ backgroundColor: accent }}
						/>
						<span className="pl-1">{label}</span>
						<span className="text-white/30 transition-transform duration-200 group-hover:translate-x-1">
							→
						</span>
					</button>
				))}
			</div>
		</div>
	);
}
