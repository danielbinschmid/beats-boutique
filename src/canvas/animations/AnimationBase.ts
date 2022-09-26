
/**
 * Computed animation.
 */
export abstract class AnimationBase {
    _cur: number;
    constructor() {

    }

    abstract getInterval(): {start: number, end: number};

    update(newCur: number) {
        if (this._cur != newCur) {
            this._update(newCur);
        }
    }

    abstract _update(newCur: number);
}