import * as THREE from "three";

import { InstancedMesh, Matrix4, Scene, Vector3 } from "three";
import sphereVertex from "@/shader/fire/firecometsVertex.glsl?raw";
import sphereFragment from "@/shader/fire/firecometsFragment.glsl?raw";
import { MeshBase } from "./MeshBase";


function mod(n, d) {
    return ((n % d) + d) % d;
}

export class FireComets extends MeshBase {
	_uniforms;
	_clock;
	_material;
	_mesh: InstancedMesh;
	_nSpheres;
	_initialMatrices: Vector3[];
    _size;
	constructor() {
		super();
        this._size = 0.1;
		this._initialMatrices = [];
		this._clock = new THREE.Clock(true);
		const sphereUniforms = {
			u_time: {
				type: "f",
				value: this._clock.elapsedTime,
			},
		};
		this._uniforms = sphereUniforms;

		const sphereMaterial = new THREE.ShaderMaterial({
			blending: THREE.SubtractiveBlending,
			uniforms: sphereUniforms,
			vertexShader: sphereVertex,
			fragmentShader: sphereFragment,
		});
		this._material = sphereMaterial;

		const size = 2;
		var sphereGeom = new THREE.SphereGeometry(size, 50, 50);

		const nSpheres = 1000;
		this._nSpheres = nSpheres;

		var sphere = new THREE.InstancedMesh(
			sphereGeom,
			sphereMaterial,
			nSpheres
		);

		for (var i = 0; i < nSpheres; i++) {
			const m: Matrix4 = new Matrix4();
			const universumSize = 1000;
			const sphereSize = this._size;
			const pos = new Vector3(
				Math.random() * universumSize - universumSize / 2,
				Math.random() * universumSize - universumSize / 2,
				Math.random() * universumSize - universumSize / 2
			);
			m.set(
				sphereSize,
				0,
				0,
				pos.x,
				0,
				sphereSize,
				0,
				pos.y,
				0,
				0,
				sphereSize,
				pos.z,
				0,
				0,
				0,
				1
			);
			sphere.setMatrixAt(i, m);
			this._initialMatrices.push(pos);
		}
        
		this._mesh = sphere;
        this._mesh.instanceMatrix.needsUpdate = true;
	}

	addToScene(scene: Scene) {
		scene.add(this._mesh);
	}

	updateFrame() {
		this._uniforms.u_time.value = this._clock.getElapsedTime();
		for (var sphereIdx = 0; sphereIdx < this._nSpheres; sphereIdx++) {
            const pos = this._initialMatrices[sphereIdx].add( new Vector3(0, -0.1, 0));
            pos.y = mod(pos.y, 400);

            const m = new Matrix4();
            m.set(this._size,
				0,
				0,
				pos.x,
				0,
				this._size,
				0,
				pos.y - 50,
				0,
				0,
				this._size,
				pos.z,
				0,
				0,
				0,
				1)

            // m.makeTranslation(v.x, v.y, v.z);
            this._mesh.setMatrixAt(sphereIdx, m);
            this._mesh.instanceMatrix.needsUpdate = true;
            
		}
	}
}
