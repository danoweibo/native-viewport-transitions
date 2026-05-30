import { create } from "zustand";

type EffectType =
	| "stack"
	| "push"
	| "rise"
	| "fall"
	| "flash"
	| "card"
	| "none";

interface TransitionConfig {
	effect: EffectType;
	reverse?: boolean;
}

interface TransitionState {
	effect: EffectType;
	reverse: boolean;
	locked: boolean;
	presenceMode: "wait" | "sync";
	presenceInitial: boolean;
	setTransition: (config: TransitionConfig) => void;
	lock: () => void;
	unlock: () => void;
}

const TRANSITION_DURATIONS: Record<EffectType, number> = {
	stack: 800,
	push: 400,
	rise: 350,
	fall: 350,
	flash: 150,
	card: 500,
	none: 0,
};

export const useTransitionStore = create<TransitionState>((set, get) => ({
	effect: "none",
	reverse: false,
	locked: false,
	presenceMode: "wait",
	presenceInitial: false,
	setTransition: ({ effect, reverse = false }) => {
		if (get().locked) return;

		const presenceMode = effect === "push" ? "sync" : "wait";
		const presenceInitial = effect !== "push";

		set({ effect, reverse, presenceMode, presenceInitial, locked: true });

		setTimeout(() => {
			set({ locked: false });
		}, TRANSITION_DURATIONS[effect]);
	},
	lock: () => set({ locked: true }),
	unlock: () => set({ locked: false }),
}));
