
import { AnimationBase } from "./AnimationBase";

export class AnimationLine {
    _cur: number;
    _animations: AnimationBase[]; 
    constructor(animations: AnimationBase[] = undefined) {
        this._cur = 0.0;
        if (animations === undefined) {
            this._animations = []
        } else {
            this._animations = animations;
        }
    }

    update(newCur: number) {
        const animationID = Math.floor(newCur);
        const val = newCur - animationID;
        if (animationID < this.getNAnimations()) {
            this._animations[animationID].update(val);
        }
    }

    addAnimation(animation: AnimationBase) {
        this._animations.push(animation);
    }

    getNAnimations(): number {
        return this._animations.length;
    }

}