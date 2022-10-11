
import * as THREE from "three";
import { Camera, Clock, Mesh, Scene, ShaderMaterial, SkinnedMesh, Vector3 } from "three";
import fragmentShader from "@/shader/dragon/dragonFragment.glsl?raw";
import vertexShader from "@/shader/dragon/dragonVertex.glsl?raw";

import { AnimationBase } from "@/canvas/animations/AnimationBase";
import { DirectAnimationBase } from "@/canvas/animations/DirectAnimationBase";
import { SceneRenderer } from "../scenes/SceneRenderer";

export class MeshMovement extends DirectAnimationBase {
    constructor(meshes: (Mesh | Camera)[], startPos: Vector3, endPos: Vector3, start: number, end: number, id: string="MeshMovement", scene: undefined | SceneRenderer = undefined) {
        const trigger: {
            obj: any,
            target: any,
            id: string
        }[] = [];
        var i = 0;
        for (const mesh of meshes) {
            const target = {
                x: endPos.x,
                y: endPos.y,
                z: endPos.z
            }
            trigger.push({
                obj: mesh.position,
                target: target,
                id: id + i,
            })
            i++;
        }
        super(trigger, start, end, id);

        if (scene != undefined) {
            this.registerScrollTriggerVars(scene.scrollTriggerObjs);
        }
    }
}
