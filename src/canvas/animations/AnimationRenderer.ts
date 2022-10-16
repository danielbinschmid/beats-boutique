import { gsap, Linear } from "gsap";
import * as gsap_ from "gsap";
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";
import { SceneRenderer } from "../scenes/SceneRenderer";
export class AnimationRenderer {
	_timeline: gsap.core.Timeline;
	_allVars: any[];
    _progress: number;
	constructor() {
		//runtime
        gsap.registerPlugin(ScrollToPlugin)
		gsap.registerPlugin(ScrollTrigger);
		// const timelineVars: GSAPTimelineVars = {}
		// const scrollTriggerVars: ScrollTrigger.Vars = {};
		this._allVars = [];
        const v: ScrollTrigger.Vars = {}
        const factor = (1 / (window.nSections - 1))
        const tl1 = gsap.timeline({
			defaults: { duration: 1 },
			duration: window.nSections - 1,
			scrollTrigger: {
				scrub: true,
                snap: {
                    snapTo: [0, factor, 2 * factor, 3.5 * factor, 5 * factor, 6 * factor, 7 * factor, 8 * factor, 9 * factor],
                    duration: 1,
                    directional: true,
                    ease: "power1"
                },
				start: "top top",
				end: "bottom bottom",
			},
		});
		this._timeline = tl1;
        this._progress = 0;
        ScrollTrigger.addEventListener("refreshInit", () => this._progress = tl1.scrollTrigger.progress);
        ScrollTrigger.addEventListener("refresh", () => tl1.scrollTrigger.scroll(this._progress * ScrollTrigger.maxScroll(window)));
        // const ST = ScrollTrigger.create()
    }

	/**
	 * Target contains target variables, and target values.
	 * target variable name is key and target values are values
	 */
	renderObjs(objs: {
		[name: string]: {
			start: number;
			end: number;
			obj: {};
			target: {};
		};
	}) {
		this._allVars.push(objs);
		for (let key in objs) {
			const obj = objs[key];
			obj.target["ease"] = obj.target["ease"]? obj.target["ease"]: Linear.easeNone;
			obj.target["duration"] = obj.end - obj.start;
			this._timeline.to(obj.obj, obj.target, obj.start);
		}
	}

	renderVars(vars: {
		[name: string]: {
			start: number;
			end: number;
			to: number;
			value: number;
            ease?: gsap.EaseFunction
		};
	}) {
		// this._allVars.push(vars);
		for (let key in vars) {
			const val = vars[key];
            const ease = val.ease? val.ease: Linear.easeNone;
			this._timeline.to(
				val,
				{
					value: val.to,
					ease: ease,
					duration: val.end - val.start,
				},
				val.start
			);
		}
	}
}
