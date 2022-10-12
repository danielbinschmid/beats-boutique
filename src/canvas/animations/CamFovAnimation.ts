
import { CamFovAnimationOptions } from "@/types";
import { PerspectiveCamera } from "three";
import { SceneRenderer } from "../scenes/SceneRenderer";
import { AnimationLine } from "./AnimationLine";



export function camFovAnimation(camera: PerspectiveCamera, options: CamFovAnimationOptions) {
    options.scene.scrollTriggerObjs[options.id] = {
        start: options.start,
        end: options.end,
        obj: camera,
        target: {fov: options.targetFov}
    }
    const line = options.animationLine? options.animationLine: new AnimationLine(options.start, options.end, options.id, options.scene);
    line.addCallback(() => {
        camera.updateProjectionMatrix();
    })
}