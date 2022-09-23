import * as THREE from "three";

import {
	Matrix4, Scene,
} from "three";
import sphereVertex from "@/shader/sphere/sphereVertex.glsl?raw";
import sphereFragment from "@/shader/sphere/sphereFragment.glsl?raw";
import { MeshBase } from "./MeshBase";
export class Spheres extends MeshBase {
    _uniforms;
    _clock;
    _material;
    _mesh;
	constructor() {
        super();
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

		const size = 1;
		var sphereGeom = new THREE.SphereGeometry(size, 50, 50);

		const nSpheres = 500;
		var sphere = new THREE.InstancedMesh(
			sphereGeom,
			sphereMaterial,
			nSpheres
		);
		for (var i = 0; i < nSpheres; i++) {
			const m: Matrix4 = new Matrix4();
			const universumSize = 160;
			const sphereSize = 2.5;
			m.set(
				sphereSize,
				0,
				0,
				Math.random() * universumSize - universumSize / 2,
				0,
				sphereSize,
				0,
				Math.random() * universumSize - universumSize / 2,
				0,
				0,
				sphereSize,
				Math.random() * universumSize - universumSize / 2,
				0,
				0,
				0,
				1
			);
			sphere.setMatrixAt(i, m);
		}
        this._mesh = sphere
    }


    addToScene(scene: Scene) {
        scene.add(this._mesh);
    }

    updateFrame() {
        this._uniforms.u_time.value = this._clock.getElapsedTime();
    }
}
