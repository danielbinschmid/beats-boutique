import { GltfHandler } from "./Handler";
import * as THREE from "three";
import { Clock, Mesh, Scene, ShaderMaterial, SkinnedMesh, Vector3 } from "three";
import fragmentShader from "@/shader/dragon/dragonFragment.glsl?raw";
import vertexShader from "@/shader/dragon/dragonVertex.glsl?raw";

import { AnimationBase } from "@/canvas/animations/AnimationBase";
import { DirectAnimationBase } from "@/canvas/animations/DirectAnimationBase";
export class DragonGltf extends GltfHandler {
	_material: ShaderMaterial;
	_clock: Clock;
	_scene: Scene;
	_uniformData;
	_position: Vector3;
    _meshes: THREE.Mesh[];
    _animationCallback;

	constructor(
		position = new Vector3(0, 0, 0),
		material: undefined | ShaderMaterial = undefined,
        animationCallback=undefined
	) {
		super();
        this._animationCallback = animationCallback;
        this._meshes = [];
		this._position = position;
		this._clock = new THREE.Clock(true);
		if (material === undefined) {
			this._initMaterial();
		} else {
			this._material = material;
		}
	}

	_initMaterial() {
		const uniformData = {
			u_time: {
				type: "f",
				value: this._clock.getElapsedTime(),
			},
		};
		this._uniformData = uniformData;
		const material = new THREE.ShaderMaterial({
			uniforms: this._uniformData,
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
		});
		this._material = material;
	}

	addToScene(scene: Scene) {
		this._scene = scene;
		this.load("chinese_dragon/scene.gltf", this._loadCallback, this);
	}

	updateFrame() {
		this._uniformData.u_time.value = this._clock.getElapsedTime();
	}

	_meshCallback(res: SkinnedMesh, vm: DragonGltf) {
		const constantScale = 4;
		if (res.isMesh) {
			var mesh: undefined | THREE.Mesh = undefined;
			switch (
				res.name // (res.id) {
			) {
				case "Object_4": // plane
					break;
				case "Object_9": // tooth
					break;
				case "Object_10": // stomach
					res.geometry.scale(
						constantScale,
						constantScale,
						constantScale
					);
					mesh = new THREE.Mesh(res.geometry, vm._material);

					break;
				case "Object_11": // body
					res.geometry.scale(
						constantScale,
						constantScale,
						constantScale
					);
					mesh = new THREE.Mesh(res.geometry, vm._material);
					break;
				case "Object_12": // eyes
					break;
				case "Object_13": // nothing
					break;
				case "Object_14": // nothing
					break;
			}
			if (mesh != undefined) {
				mesh.position.x = this._position.x;
				mesh.position.y = this._position.y;
				mesh.position.z = this._position.z;
				vm._scene.add(mesh);
                vm._meshes.push(mesh);
                if (vm._animationCallback != undefined) {
                    vm._animationCallback(mesh, res.name);
                }
                
			}
		}
	}

	_loadCallback(gltf, vm: DragonGltf) {
		gltf.scene.traverse((res) => {
			vm._meshCallback(res, vm);
		});
	}
}

export class MeshRotation extends DirectAnimationBase {
    constructor(meshes: Mesh[], rotation: number, start: number, end: number, id: string="MeshRotation") {
        const trigger: {
            obj: any,
            target: any,
            id: string
        }[] = [];
        var i = 0;
        for (const mesh of meshes) {
            const target = {
                y: rotation
            }
            trigger.push({
                obj: mesh.rotation,
                target: target,
                id: id + i,
            })
            i++;
        }
        super(trigger, start, end, id);
    }
}

