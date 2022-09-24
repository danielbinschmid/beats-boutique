

import { GltfHandler } from "./Handler";
import * as THREE from "three";
import { Clock, Mesh, Scene, ShaderMaterial, SkinnedMesh, Vector3 } from "three";
import fragmentShader from "@/shader/chinese/lettersFragment.glsl?raw";
import vertexShader from "@/shader/chinese/lettersVertex.glsl?raw";

export class LettersGltf extends GltfHandler {
	_material: ShaderMaterial;
    _clock: Clock;
    _scene: Scene;
    _uniformData;
    _meshes: {[id: string]: Mesh};
    _startPosition;
	constructor(position: Vector3, material: undefined | ShaderMaterial = undefined) {
		super();
        this._startPosition = position;
        this._meshes = {};
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
        this._material = material
	}

	addToScene(scene: Scene) {
        this._scene = scene;
		this.load("chinese_letters/wo.gltf", (gltf, vm) => {
            this._loadCallback(gltf, vm, "wo")
        }, this);
        this.load("chinese_letters/shi.gltf", (gltf, vm) => {
            this._loadCallback(gltf, vm, "shi")
        }, this);
        this.load("chinese_letters/wang.gltf", (gltf, vm) => {
            this._loadCallback(gltf, vm, "wang")
        }, this);
	}

    updateFrame() {
        this._uniformData.u_time.value = this._clock.getElapsedTime();
    }

    _meshCallback(res: SkinnedMesh, vm: LettersGltf, id: string) {
        const constantScale = 4;
        if (res.isMesh) {
            const mesh = new THREE.Mesh(res.geometry, vm._material);
            mesh.position.x = this._startPosition.x;
            mesh.position.y = this._startPosition.y;
            mesh.position.z = this._startPosition.z;
            switch(id) {
                case "wo":
                    mesh.position.x -= 10;
                    break;
                case "shi":
                    break;
                case "wang":
                    mesh.position.x += 10;
                    break;
            }
            this._meshes[id] = mesh;
            vm._scene.add(mesh);
        }
    }

	_loadCallback(gltf, vm: LettersGltf, id: string) {
		gltf.scene.traverse((res) => {
            vm._meshCallback(res, vm, id);
        });
	}
}
