import { AnimationBase } from "./AnimationBase";

declare type AnimationVars = {
	start: number;
    end: number
};
export class AnimationLine {
	_cur: number;
	_animations: {
		[id: string]: AnimationBase
	};
	_globalTermination: number;
	_scrollVars: { [id: string]: {
        start: number;
        end: number;
        to: number;
        value: number;
    } };
    _globalStart: number;
    _nAnimations: number;
    _id: string;
	constructor(globalStart: number, globalTermination: number, id:string) {
        this._nAnimations = 0;
		this._animations = {};
        this._scrollVars = {}
		this._globalTermination = globalTermination;
        this._globalStart = globalStart;
        this._id = id;
	}

    update(globalTime: number) {
        if (globalTime <= this._globalTermination && globalTime >= this._globalStart) {
            for (const id in this._animations) {
                this._animations[id].update(this._scrollVars[id].value);
            }
        }
    }

	addAnimation(animation: AnimationBase, animationVars: AnimationVars) {
		const interval = animation.getInterval();
        const id = this._id + this._nAnimations;
        this._animations[id] = animation;
        
        this._scrollVars[id] = {
            start: animationVars.start,
            end: animationVars.end,
            to: interval.end,
            value: animation._cur
        }

        this._nAnimations += 1;
	}  

    registerScrollTriggerVars(globalVars) {
        for (const id in this._scrollVars) {
            if (globalVars[id] !== undefined) {throw "duplicate scroll trigger var id"; }
            globalVars[id] = this._scrollVars[id];
        }
    }

}
