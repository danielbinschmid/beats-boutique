import * as THREE from "three";
import {
	Clock,
	Mesh,
	Scene,
	ShaderMaterial,
	SkinnedMesh,
	Vector3,
} from "three";

import { AnimationBase } from "@/canvas/animations/AnimationBase";


export class MeshLookAt extends AnimationBase {
    _meshes: Mesh[];
    _currentLookAt: Vector3;
    _directionVec: Vector3;
    _start: Vector3;
	constructor(
        meshes: Mesh[],
        start: Vector3,
        end: Vector3
    ) {
		super();
        this._currentLookAt = start;
        this._meshes = meshes;
        this._start = start;
        this._directionVec = new Vector3(0,0,0).add(end).sub(start);
	}

    getInterval(): { start: number; end: number } {
		return {start: 0, end: 1};
	}
    
	_update(newCur: number) {
        this._currentLookAt = new Vector3(0, 0, 0).add(this._start).add(new Vector3(0, 0, 0).add(this._directionVec).multiplyScalar(newCur));
        console.log(this._currentLookAt);
		for (const mesh of this._meshes) {
            mesh.lookAt(this._currentLookAt);
        }
    }
}
