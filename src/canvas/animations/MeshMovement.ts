
import * as THREE from "three";
import { Camera, Clock, Mesh, Scene, ShaderMaterial, SkinnedMesh, Vector3 } from "three";
import fragmentShader from "@/shader/dragon/dragonFragment.glsl?raw";
import vertexShader from "@/shader/dragon/dragonVertex.glsl?raw";

import { AnimationBase } from "@/canvas/animations/AnimationBase";
import { DirectAnimationBase } from "@/canvas/animations/DirectAnimationBase";
import { SceneRenderer } from "../scenes/SceneRenderer";
import { MeshMovementOptions, ObjAnimationParams } from "@/types";



export class MeshMovement extends DirectAnimationBase {
    constructor(meshes: (Mesh | Camera)[], options: MeshMovementOptions) {
        const trigger: ObjAnimationParams[] = [];
        var i = 0;
        options.id = options.id? options.id: "MeshMovement";
        for (const mesh of meshes) {
            const target = {
                x: options.endPos.x,
                y: options.endPos.y,
                z: options.endPos.z,
                ease: options.ease
            }
            trigger.push({
                obj: mesh.position,
                target: target,
                id: options.id + i,
            })
            i++;
        }
        super(trigger, options.start, options.end, options.id);

        if (options.scene != undefined) {
            this.registerScrollTriggerVars(options.scene.scrollTriggerObjs);
        }
    }
}
