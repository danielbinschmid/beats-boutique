import * as THREE from "three";

import { ColorRepresentation, Color, WebGLRenderer, Scene, PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { Spheres } from "@/canvas/meshes/Spheres";

import { DragonGltf } from "@/canvas/gltf/Dragon";
import { MeshBase } from "../meshes/MeshBase";

export class SceneRenderer {
	_meshes: MeshBase[];
    _renderer: WebGLRenderer;
    _scene: Scene;
    _camera: PerspectiveCamera;

	constructor() {
		// initialize
        this._meshes = []
        this._scene = new THREE.Scene();
		this._camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
        this._camera.position.x += 20;
		const canvas = document.getElementById("canvas");
		this._renderer = new THREE.WebGLRenderer({
			canvas: canvas,
		});
        this._renderer.setSize(window.innerWidth, window.innerHeight);

        // background color
        const backgroundColor: ColorRepresentation = new Color(0.9, 0.9, 1);
		this._renderer.setClearColor(backgroundColor);

        // add light
        const light = new THREE.AmbientLight(new THREE.Color(100, 0, 0), 0.01); // soft white light
		this._scene.add(light);
		const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
		this._scene.add(directionalLight);

        // orbit control
        const orbitcontrols = new OrbitControls(this._camera, canvas);
		orbitcontrols.position0 = this._camera.position;

        
        // meshes
        const clock = new THREE.Clock(true);
		const dragon = new DragonGltf();
        
		dragon.addToScene(this._scene);
        this._meshes.push(dragon);
		const spheres = new Spheres();
        this._meshes.push(spheres);
		spheres.addToScene(this._scene);
        
        this.animate(this);
	}
	animate(vm: SceneRenderer) {
        console.log("animate")
        for (const mesh of vm._meshes) {
            mesh.updateFrame();
        }

		requestAnimationFrame(() => {
            this.animate(vm);
        });
		this._renderer.render(this._scene, this._camera);

    }
}
