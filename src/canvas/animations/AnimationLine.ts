
import { tSMethodSignature } from "@babel/types";
import { AnimationBase } from "./AnimationBase";

export class AnimationLine {
    _cur: number;
    _animations: AnimationBase[]; 
    _termination: number;
    constructor(animations: AnimationBase[] = undefined) {
        this._cur = 0.0;
        if (animations === undefined) {
            this._animations = []
        } else {
            this._animations = animations;
        }
        this._termination = this.getNAnimations() + 1;
    }

    update(newCur: number) {
        if (newCur <= this._termination && this._cur != newCur) {
            const l = newCur <= this.getNAnimations() ? Math.floor(newCur) + 1: this._animations.length
            for (var i = 0; i < l; i++) {
                const val = newCur - i;
                this._animations[i].update(val);
            }
        }   
    }

    addAnimation(animation: AnimationBase) {
        this._animations.push(animation);
        this._termination = this.getNAnimations() + 1;
    }

    getNAnimations(): number {
        return this._animations.length;
    }

}