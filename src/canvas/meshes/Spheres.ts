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
    _horizontal;
	constructor(horizontal = false) {
        super();
        this._horizontal =horizontal;
        this._clock = new THREE.Clock(true);
		const sphereUniforms = {
			u_time: {
				type: "f",
				value: this._clock.elapsedTime,
			},
            is_horizontal: {
                type: "b",
                value: this._horizontal
            }
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

		
		
        const nRings = 2;
        const ballsPerRing = 32;
        const calcBallsPerRing = (ringIdx) => {
            const n = ringIdx + 3
            return n * n
        }
        const positions = this._drawPosition(nRings, ballsPerRing, calcBallsPerRing);
        const nSpheres = nRings * ballsPerRing;

        var sphere = new THREE.InstancedMesh(
			sphereGeom,
			sphereMaterial,
			nSpheres
		);

		for (var i = 0; i < nSpheres; i++) {
			const m: Matrix4 = new Matrix4();
			const universumSize = 160;
			const sphereSize = 1;
			m.set(
				sphereSize, 0, 0, positions[i][0], // Math.random() * universumSize - universumSize / 2,
				0, sphereSize, 0, positions[i][1], //Math.random() * universumSize - universumSize / 2,
				0, 0, sphereSize, 0,// Math.random() * universumSize - universumSize / 2,
				0,
				0,
				0,
				1
			);
			sphere.setMatrixAt(i, m);
		}
        this._mesh = sphere
    }

    _drawPosition(nRings, ballsPerRing, calcBallsPerRing = undefined) {
        const center = [0, 0, 0];
        const badRadius =15;
        const goodRadius = 30;

        const nTotalBalls = 60
        
        // we need always the cos and sin from the angle
        // angle between 0 - 360
        const vecsForCycle = []
        for (var i = 0; i < ballsPerRing; i++) {
            const angle = (Math.PI * 2 / ballsPerRing) * i; 
            vecsForCycle.push([Math.cos(angle), Math.sin(angle)])
        }
        // angles = [for (360 / nAngles) * i of i in arange(nAngles)]

        const radii = []
        for (var i = 0; i < nRings; i++) {
            radii.push( (badRadius + i * ((goodRadius - badRadius) /nRings)  ) )
        }
        const res = []
        for (var ring = 0; ring < nRings; ring++) {
            for (var ball = 0; ball < ballsPerRing; ball++) {
                res.push([vecsForCycle[ball][0] * radii[ring], vecsForCycle[ball][1] * radii[ring]])
            }
        }
        return res;
    }


    addToScene(scene: Scene) {
        scene.add(this._mesh);
    }

    updateFrame() {
        this._uniforms.u_time.value = this._clock.getElapsedTime();
    }
}
