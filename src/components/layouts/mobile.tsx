import { cn } from "@ticketmaster/ui/lib/utils";
import { useMediaQuery } from "react-responsive";
import { useOrientation } from "react-use";
import { usePlatform } from "@/contexts/platform";
import { useHydration } from "@/hooks/hydration";
import RotateIcon from "../icons/rotate";

export default function MobileView({
	children,
}: {
	children: React.ReactNode;
}) {
	const hydrated = useHydration();
	const platform = usePlatform((state) => state.platform);
	const orientation = useOrientation();
	const isMobileDevice = useMediaQuery({ maxWidth: 767 });

	const isLandscape =
		orientation.type === "landscape-primary" ||
		orientation.type === "landscape-secondary";

	const showRotate = isLandscape && platform !== "other";

	if (!hydrated) return null;

	if (showRotate) {
		return (
			<main className="flex h-screen w-screen items-center justify-center bg-white">
				<div className="-mt-7.5 flex flex-col items-center gap-3.5">
					<div className="flex size-16 items-center justify-center rounded-full bg-black">
						<RotateIcon className="size-10 -rotate-12 -scale-x-100 text-white" />
					</div>

					<p className="max-w-md text-center font-averta text-[20px] text-neutral-800 -tracking-[0.020em]">
						Rotate your phone to portrait mode to continue.
					</p>
				</div>
			</main>
		);
	}

	return (
		<main className="flex min-h-screen w-screen items-center justify-center bg-neutral-200">
			<div
				className={cn(
					"relative min-h-screen overflow-hidden bg-white",
					isMobileDevice ? "w-full" : "w-[375px]",
				)}
			>
				{children}
			</div>
		</main>
	);
}
