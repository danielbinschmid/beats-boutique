import { GltfHandler } from "./Handler";
import * as THREE from "three";
import { Clock, Scene, ShaderMaterial, SkinnedMesh, Vector3 } from "three";
import fragmentShader from "@/shader/dragon/dragonFragment.glsl?raw";
import vertexShader from "@/shader/dragon/dragonVertex.glsl?raw";

export class DragonGltf extends GltfHandler {
	_material: ShaderMaterial;
    _clock: Clock;
    _scene: Scene;
    _uniformData;
    _position: Vector3;

	constructor(position = new Vector3(0, 0, 0), material: undefined | ShaderMaterial = undefined) {
		super();
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
        this._material = material
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
            switch (
                res.name // (res.id) {
            ) {
                case "Object_4": // plane
                    break;
                case "Object_9": // tooth
                    // scene.add(new THREE.Mesh(res.geometry, boxMaterial))
                    break;
                case "Object_10": // stomach
                    // res.geometry.scale()
                    // scene.add(new THREE.Mesh(res.geometry, boxMaterial))
                    
                    res.geometry.scale(
                        constantScale,
                        constantScale,
                        constantScale
                    );
                    res.geometry.translate(this._position.x, this._position.y, this._position.z);
                    vm._scene.add(new THREE.Mesh(res.geometry, vm._material));
                    break;
                case "Object_11": // body
                    res.geometry.scale(
                        constantScale,
                        constantScale,
                        constantScale
                    );
                    res.geometry.translate(this._position.x, this._position.y, this._position.z);
                    vm._scene.add(new THREE.Mesh(res.geometry, vm._material));
                    break;
                case "Object_12": // eyes
                    break;
                case "Object_13": // nothing
                    break;
                case "Object_14": // nothing
                    break;
            }
        }
    }

	_loadCallback(gltf, vm: DragonGltf) {
		gltf.scene.traverse((res) => {
            vm._meshCallback(res, vm);
        });
	}
}
