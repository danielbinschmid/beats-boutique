
import * as THREE from "three";
import { Clock, Mesh, Scene, ShaderMaterial, SkinnedMesh, Vector3 } from "three";
import fragmentShader from "@/shader/dragon/dragonFragment.glsl?raw";
import vertexShader from "@/shader/dragon/dragonVertex.glsl?raw";

import { AnimationBase } from "@/canvas/animations/AnimationBase";
import { DirectAnimationBase } from "@/canvas/animations/DirectAnimationBase";

export class MeshRotation extends DirectAnimationBase {
    constructor(meshes: Mesh[], rotation: number, start: number, end: number, id: string="MeshRotation") {
        const trigger: {
            obj: any,
            target: any,
            id: string
        }[] = [];
        var i = 0;
        for (const mesh of meshes) {
            const target = {
                y: rotation
            }
            trigger.push({
                obj: mesh.rotation,
                target: target,
                id: id + i,
            })
            i++;
        }
        super(trigger, start, end, id);
    }
}

