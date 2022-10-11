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
import { AnimationBase } from "./AnimationBase";

export class CameraMovement extends AnimationBase {
	_speed: number;
	_finalTargetPos: Vector3;
	_curTargetPos: Vector3;
	_curPos: Vector3;
	velocity: Vector3;
	_startPos: Vector3;
	_camera: Camera;
	_fixatePos: Vector3 | undefined;
	_fixatePosOrigin: Vector3;
	/**
     * 
     * @param startPos - start position of movement
     * @param targetPos - target position of movement
     * @param camera - camera to move
     * @param fixatePos - optional, position to lookat during movement
     */
	constructor(
		startPos: Vector3,
		targetPos: Vector3,
		camera: Camera,
		fixatePos = undefined
	) {
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
		this._fixatePosOrigin = fixatePos;
	}

	_update(newCur: number) {
		this._curPos = this._camera.position;
		if (newCur > 1) {
			this._cur = 1;
			this._fixatePos = undefined;
		} else {
			this._cur = newCur;
			this._fixatePos = this._fixatePosOrigin;
		}

		const direction = new Vector3(0, 0, 0)
			.add(this._finalTargetPos)
			.sub(this._startPos)
			.multiplyScalar(this._cur);
		this._curTargetPos = direction.add(this._startPos);


		this.velocity = new Vector3(0, 0, 0)
			.add(this._curTargetPos)
			.sub(this._curPos)
			.multiplyScalar(this._speed);

		this._camera.position.x += this.velocity.x;
		this._camera.position.y += this.velocity.y;
		this._camera.position.z += this.velocity.z;

		if (this._fixatePos != undefined) {
			this._camera.lookAt(this._fixatePos);
		}
	}

	getInterval(): { start: number; end: number } {
		return {
			start: 0,
			end: 1,
		};
	}
}
