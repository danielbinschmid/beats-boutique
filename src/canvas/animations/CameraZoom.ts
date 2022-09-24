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


export class CameraZoom extends AnimationBase{
	_speed: number;
	_cur: number;
	_finalTargetPos: Vector3;
	_curTargetPos: Vector3;
	_curPos: Vector3;
	velocity: Vector3;
	_startPos: Vector3;
    _camera: Camera;
    _fixatePos: Vector3 | undefined;
	/**
	 * Cur varies between 0.0 and 1.0, 0.0 is start
	 */
	constructor(startPos: Vector3, targetPos: Vector3, camera: Camera, fixatePos=undefined) {
        super();
		this._startPos = startPos;
		this.velocity = new THREE.Vector3(0, 0, 0);
		this._speed = 1; // speed = 1 implies direct camera movement to target point, 1/10 means after 10 frames
		this._cur = 0.0;
		this._curPos = new Vector3(startPos.x, startPos.y, startPos.z);
		this._finalTargetPos = targetPos;
		this._curTargetPos = startPos;
        this._camera = camera;
        this._fixatePos = fixatePos;
	}

	update(newCur: number) {
		this._curPos = this._camera.position;
		if (newCur != this._cur) {
            if (newCur > 1) {
                this._cur = 1;
                this._fixatePos = undefined;
            } else {
                this._cur = newCur;
                this._fixatePos = new Vector3(0, 0, 0);
            }
			
			const zeroVec = new Vector3(0, 0, 0);
			const direction = zeroVec
				.add(this._finalTargetPos)
				.sub(this._startPos)
				.multiplyScalar(this._cur);
			this._curTargetPos = direction.add(this._startPos);
		}
		const zeroVec = new Vector3(0, 0, 0);
		this.velocity = zeroVec
			.add(this._curTargetPos)
			.sub(this._curPos)
			.multiplyScalar(this._speed);


        this._camera.position.x += this.velocity.x;
        this._camera.position.y += this.velocity.y;

        if (this._fixatePos != undefined) { this._camera.lookAt(this._fixatePos); }
	}
}