import { AnimationLine } from "@/canvas/animations/AnimationLine";
import { AnimationRenderer } from "@/canvas/animations/AnimationRenderer";
import { SceneRenderer } from "@/canvas/scenes/SceneRenderer";
import { Camera, PerspectiveCamera, Vector3 } from "three";

declare global {
    interface Window {
        animationRenderer: AnimationRenderer | undefined;
        isMobile: boolean;
        nSections: number;
        isScrolling: boolean;
        camera: PerspectiveCamera;
        mainCanvas: HTMLCanvasElement;
        mainAudio: HTMLAudioElement;
    }
}


declare type ObjAnimationParams = { obj: {}; target: {}; id: string }


declare type MeshMovementOptions = {
    startPos: Vector3,
    endPos: Vector3,
    start: number,
    end: number,
    id?: string,
    scene?: SceneRenderer,
    ease?: gsap.EaseFunction
}

declare type CamFovAnimationOptions = {
    start: number;
    end: number;
    targetFov: number;
    scene: SceneRenderer;
    id: string;
    animationLine?: AnimationLine;
    ease?: gsap.EaseFunction
}

declare type SongMetaData = {
    url: string,
    songName: string,
    artistName: string
}