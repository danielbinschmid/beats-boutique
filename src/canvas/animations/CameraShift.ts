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
    _cur: number;
    _directionVec;
    _startVec;
    _camera: Camera;
    constructor(camera: Camera, startFixation: Vector3, endFixation: Vector3) {
        super();
        this._camera = camera;
        this._cur = 0;
        this._startVec = startFixation;
        this._directionVec = new Vector3(0,0,0).add(endFixation).sub(startFixation);
    }

    update(newCur: number) {
        const fixation = new Vector3(0,0,0).add(this._startVec).add(new Vector3(0,0,0).add(this._directionVec).multiplyScalar(newCur));
        this._camera.lookAt(fixation);
    }
}