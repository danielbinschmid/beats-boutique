export class DirectAnimationBase {
	trigger: { obj: {}; target: {}; id: string }[];
	start: number;
	end: number;
	id: string;
	constructor(
		trigger: { obj: {}; target: {}; id: string }[],
		start: number,
		end: number,
		id: string
	) {
		this.trigger = trigger;
		this.start = start;
		this.end = end;
		this.id = id;
	}

	registerScrollTriggerVars(globalVars: {
		[name: string]: {
			start: number;
			end: number;
			obj: {};
			target: {};
		};
	}) {
		for (const x of this.trigger) {
			if (globalVars[this.id + x.id] != undefined) {
				throw new Error("duplicate ids");
			}
			globalVars[this.id + x.id] = {
				start: this.start,
				end: this.end,
				obj: x.obj,
				target: x.target,
			};
		}
	}
}
