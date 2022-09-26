import * as THREE from "three";

import {
	ColorRepresentation,
	Color,
	WebGLRenderer,
	Scene,
	PerspectiveCamera,
	Vector3,
Camera,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { Spheres } from "@/canvas/meshes/Spheres";

import { DragonGltf } from "@/canvas/gltf/Dragon";
import { MeshBase } from "../meshes/MeshBase";
import { AnimationBase } from "./AnimationBase"


export class CameraShift extends AnimationBase {
    _directionVec;
    _startVec;
    _camera: Camera;
    _endFixation;
    constructor(camera: Camera, startFixation: Vector3, endFixation: Vector3) {
        super();
        this._camera = camera;
        this._cur = 0;
        this._endFixation = endFixation;
        this._startVec = startFixation;
        this._directionVec = new Vector3(0,0,0).add(endFixation).sub(startFixation);
    }

    _update(newCur: number) {

        if (newCur > 1) {
            this._camera.lookAt(this._endFixation);
        } else {
            const fixation = new Vector3(0,0,0).add(this._startVec).add(new Vector3(0,0,0).add(this._directionVec).multiplyScalar(newCur));
            this._camera.lookAt(fixation);
        }
        
    }

    getInterval(): { start: number; end: number; } {
        return {
            start: 0,
            end: 1
        }
    }
}