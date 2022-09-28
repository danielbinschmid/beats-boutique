
import * as THREE from "three";
import { Clock, Mesh, Scene, ShaderMaterial, SkinnedMesh, Vector3 } from "three";
import fragmentShader from "@/shader/dragon/dragonFragment.glsl?raw";
import vertexShader from "@/shader/dragon/dragonVertex.glsl?raw";

import { AnimationBase } from "@/canvas/animations/AnimationBase";
import { DirectAnimationBase } from "@/canvas/animations/DirectAnimationBase";

export class MeshMovement extends DirectAnimationBase {
    constructor(meshes: Mesh[], startPos: Vector3, endPos: Vector3, start: number, end: number, id: string="MeshMovement") {
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
    }
}
