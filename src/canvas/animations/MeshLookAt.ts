import * as THREE from "three";
import {
Camera,
	Clock,
	Mesh,
	Scene,
	ShaderMaterial,
	SkinnedMesh,
	Vector3,
} from "three";

import { AnimationBase } from "@/canvas/animations/AnimationBase";


export class MeshLookAt extends AnimationBase {
    _meshes: (Mesh | Camera)[];
    _currentLookAt: Vector3;
    _directionVec: Vector3;
    _start: Vector3;
    _end: Vector3;
	constructor(
        meshes: (Mesh | Camera)[],
        start: Vector3,
        end: Vector3
    ) {
		super();
        this._end = end;
        this._currentLookAt = new Vector3(0, 0, 0).copy(start);
        this._meshes = meshes;
        this._start = start;
        this._directionVec = new Vector3(0,0,0).add(end).sub(start);
	}

    getInterval(): { start: number; end: number } {
		return {start: 0, end: 1};
	}
    
	_update(newCur: number) {
        const d = new Vector3(0, 0, 0).add(this._start).add(new Vector3(0, 0, 0).add(this._directionVec).multiplyScalar(newCur));
		for (const mesh of this._meshes) {
            if (newCur > 1) {
                mesh.lookAt(this._end);
            } else {
                mesh.lookAt(d);
            }
            
        }
    }
}
