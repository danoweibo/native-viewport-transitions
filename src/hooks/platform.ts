import { useEffect } from "react";
import { isAndroid, isIOS } from "react-device-detect";
import { usePlatform } from "@/contexts/platform";

export function usePlatformDetect() {
	const checkPlatform = usePlatform((state) => state.checkPlatform);

	useEffect(() => {
		const type = isIOS ? "ios" : isAndroid ? "android" : "other";
		checkPlatform(type);
	}, [checkPlatform]);
}
