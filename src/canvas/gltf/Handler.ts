import * as THREE from "three";
import test from "node:test";
import {
	Clock,
	ShaderMaterial,
	ShaderMaterialParameters,
	BufferAttribute,
	ColorRepresentation,
	Color,
	BufferGeometry,
	SkinnedMesh,
	Object3D,
	Mesh,
	Matrix4,
	Blending,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// Our Javascript will go here.
// import Dragon from "../assets/chinese_dragon/scene.gltf"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { MeshBase } from "@/canvas/meshes/MeshBase";


export abstract class GltfHandler extends MeshBase {
	_loader;
	constructor() {
        super();
		this._loader = new GLTFLoader();
	}


    load(gltfLoc: string, loadCallback, vm=undefined) {
        this._loader.load(
            gltfLoc,
            (gltf) => {
                loadCallback(gltf, vm);
            },
            (xhr) => {
                // called while loading is progressing
                // console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
            },
            (error) => {
                // called when loading has errors
                console.error("An error happened", error);
            }
        );
    }
}
