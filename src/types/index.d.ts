import { AnimationRenderer } from "@/canvas/animations/AnimationRenderer";

declare global {
	interface Window {
		animationRenderer: AnimationRenderer | undefined;
        isMobile: boolean
	}
}