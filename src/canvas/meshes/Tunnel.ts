import * as THREE from "three";

import { Clock, Matrix4, Scene, Vector2, Vector3, Mesh } from "three";
import sphereVertex from "@/shader/tunnel/sphereVertex.glsl?raw";
import sphereFragment from "@/shader/tunnel/sphereFragment.glsl?raw";

import { MeshBase } from "./MeshBase";
import { Spheres } from "./Spheres";

export class Tunnel extends MeshBase {
	_center: Vector3;
	_nRings: number;
	_radius: number;
    _rings: Spheres[];
    _clock: Clock;
    _uniforms;
    _material;
    _globalRotation;
    checkpoints: Vector3[];

	constructor(center: Vector3, radius: number, rotation: number=0) {
		super();
        this._globalRotation = rotation;
		// Sphere rings rotated and positioned accordingly
		this._nRings = 10;
        this._rings = [];
        this._clock = new Clock(true);
        this._center = center;
        this._radius = radius;
        // this._initShader();
        this._genRings();
	}

	_genRings() {
		const vecsForCycle = [];
		// centers
        const rotations = []
		for (var i = 0; i < this._nRings; i++) {
			const angle = 1 * Math.PI * (i / this._nRings) + this._globalRotation;
			vecsForCycle.push([Math.cos(angle), Math.sin(angle)]);
            rotations.push( Math.PI - angle )
		}
        this.checkpoints = []
		for (var i = 0; i < this._nRings; i++) {
            const xzPos = new Vector2(
				vecsForCycle[i][0] * this._radius,
				vecsForCycle[i][1] * this._radius,
            )
            const pos = new Vector3(this._center.x + xzPos.x, this._center.y , this._center.z + xzPos.y);
            this.checkpoints.push(new Vector3().copy(pos));

            const sphereUniforms = {
                u_time: {
                    type: "f",
                    value: this._clock.elapsedTime,
                },
                center: {
                    type: "vec3",
                    value: pos
                },
                rotation: {
                    type: "f",
                    value: rotations[i]
                }
            };
            this._uniforms = sphereUniforms;
    
            const sphereMaterial = new THREE.ShaderMaterial({
                blending: THREE.SubtractiveBlending,
                uniforms: sphereUniforms,
                vertexShader: sphereVertex,
                fragmentShader: sphereFragment,
            });
            const material = sphereMaterial;

            const ring = new Spheres(false, pos, material);
            this._rings.push(ring);
        }

	}

    getCenter(): Vector3 {
        return new Vector3().copy(this._center);  
    }

    getRadius(): number {
        return this._radius;
    }

    getEntry(): Vector3 {
        const entryInfo = {
            pos: this.checkpoints[0],
            
        }
        return this.checkpoints[0];
    }

	updateFrame() {
        for (const ring of this._rings) {
            ring.updateFrame();
        }
    }

    addToScene(scene: THREE.Scene) {
        for (const ring of this._rings) {
            ring.addToScene(scene);
        }
        
    }
}
