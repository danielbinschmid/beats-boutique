import { gsap, Linear } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { SceneRenderer } from "../scenes/SceneRenderer";
export class AnimationRenderer {
	_timeline: gsap.core.Timeline;
	_allVars: any[];
	constructor() {
		//runtime
		gsap.registerPlugin(ScrollTrigger);
		// const timelineVars: GSAPTimelineVars = {}
		// const scrollTriggerVars: ScrollTrigger.Vars = {};
		this._allVars = [];
		const tl1 = gsap.timeline({
			defaults: { duration: 1 },
			duration: 7 + 6,
			scrollTrigger: {
				trigger: "start1",
				scrub: true,
				start: "top top",
				end: "bottom bottom",
			},
		});
		this._timeline = tl1;
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
			obj.target["ease"] = Linear.easeNone;
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
		};
	}) {
		// this._allVars.push(vars);
		for (let key in vars) {
			const val = vars[key];
			this._timeline.to(
				val,
				{
					value: val.to,
					ease: Linear.easeNone,
					duration: val.end - val.start,
				},
				val.start
			);
		}
	}
}
