import { gsap, Linear } from "gsap";
import { ScrollTrigger } from "gsap/all";

export class AnimationHandler {
	constructor(animationLines) {
		//runtime
		gsap.registerPlugin(ScrollTrigger);
		// const timelineVars: GSAPTimelineVars = {}
		const scrollTriggerVars: ScrollTrigger.Vars = {};
		const tl1 = gsap.timeline({
			defaults: { duration: 1 },
			duration: 7,
			scrollTrigger: {
				trigger: "start1",
				scrub: true,
				start: "top top",
				end: "bottom bottom",
			},
		});
		var tubePerc = {
			percent: 0,
		};
		tl1.to(
			renderer,
			{
				scroll: 1,
				ease: Linear.easeNone,
				duration: 1,
			},
			0
		);
		tl1.to(
			renderer,
			{
				scroll: 2,
				ease: Linear.easeNone,
				duration: 1,
			},
			1
		);
		tl1.to(
			renderer,
			{
				scroll: 3,
				ease: Linear.easeNone,
				duration: 1,
			},
			2
		);
	}
}
