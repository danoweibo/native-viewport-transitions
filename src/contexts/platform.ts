import { create } from "zustand";

type PlatformOS = "ios" | "android" | "other";

interface PlatformState {
	platform: PlatformOS;
	checkPlatform: (type: PlatformOS) => void;
}

export const usePlatform = create<PlatformState>((set) => ({
	platform: "other",
	checkPlatform: (type) => set({ platform: type }),
}));
