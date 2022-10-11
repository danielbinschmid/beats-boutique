import * as THREE from "three";

import {
	Matrix4, Scene, Vector3,
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
    _center: Vector3;
    _parentMaterial;
    _skipCenterSpheres;

	constructor(horizontal = false, center=new Vector3(0, 0, 0), material = undefined, skipCenterSpheres=false) {
        super();

        this._parentMaterial = material;
        this._center = center;
        this._skipCenterSpheres = skipCenterSpheres;
        this._horizontal =horizontal;
        this._clock = new THREE.Clock(true);

        if (material == undefined) {
            const sphereUniforms = {
                u_time: {
                    type: "f",
                    value: this._clock.elapsedTime,
                },
                is_horizontal: {
                    type: "b",
                    value: this._horizontal
                },
                center: {
                    type: "vec3",
                    value: this._center
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
        } else {
            this._material = material;
        }
		
		var sphereGeom = new THREE.SphereGeometry(1, 8, 6);
		
        const nRings = 2;
        const ballsPerRing = 32;
        if (ballsPerRing % 4 != 0 && this._skipCenterSpheres) { throw new Error("Balls per ring muss durch 4 teilbar sein wenn skipCenterSpheres")}
        const positions = this._drawPosition(nRings, ballsPerRing);
        const nSpheres = this._skipCenterSpheres? nRings * (ballsPerRing - 2): nRings * ballsPerRing;

        var sphere = new THREE.InstancedMesh(
			sphereGeom,
			this._material,
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

    

    _drawPosition(nRings, ballsPerRing) {
        const badRadius =12;
        const goodRadius = 22;

        const finalBallsPerRing = this._skipCenterSpheres? ballsPerRing - 2: ballsPerRing;

        const vecsForCycle = []
        for (var i = 0; i < ballsPerRing; i++) {
            const angle = (Math.PI * 2 / ballsPerRing) * i; 
            if (!this._skipCenterSpheres || (i != ballsPerRing / 4 && i != 3 * ballsPerRing / 4)) {
                vecsForCycle.push([Math.cos(angle), Math.sin(angle)]);
            }
        }

        const radii = []
        for (var i = 0; i < nRings; i++) {
            radii.push( (badRadius + i * ((goodRadius - badRadius) /nRings)  ) )
        }
        const res = []
        for (var ring = 0; ring < nRings; ring++) {
            for (var ball = 0; ball < finalBallsPerRing; ball++) {
                res.push([vecsForCycle[ball][0] * radii[ring], vecsForCycle[ball][1] * radii[ring]])
            }
        }
        return res;
    }


    addToScene(scene: Scene) {
        scene.add(this._mesh);
    }

    updateFrame() {
        if (this._parentMaterial == undefined) {
            this._uniforms.u_time.value = this._clock.getElapsedTime();
        }
        
    }
}
