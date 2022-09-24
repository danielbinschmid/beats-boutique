import * as THREE from "three";

import {
	ColorRepresentation,
	Color,
	WebGLRenderer,
	Scene,
	PerspectiveCamera,
	Vector3,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { Spheres } from "@/canvas/meshes/Spheres";

import { DragonGltf } from "@/canvas/gltf/Dragon";
import { MeshBase } from "../meshes/MeshBase";
import { CameraZoom } from "@/canvas/animations/CameraZoom";
import { CameraShift } from "@/canvas/animations/CameraShift";
import { AnimationBase } from "@/canvas/animations/AnimationBase";
import { AnimationLine } from "@/canvas/animations/AnimationLine";
export class SceneRenderer {
	_meshes: MeshBase[];
	_renderer: WebGLRenderer;
	_scene: Scene;
	_camera: PerspectiveCamera;
	_clock;
	scroll;
	_animations: AnimationBase[];
    _animationLine: AnimationLine;

	constructor() {
		// initialize
		this.scroll = 0;
		this._meshes = [];
        this._animationLine = new AnimationLine();
		this._scene = new THREE.Scene();
		this._camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);

		const canvas = document.getElementById("canvas");
		this._renderer = new THREE.WebGLRenderer({
			canvas: canvas,
		});
		this._renderer.setSize(window.innerWidth, window.innerHeight);

		// - forward animation
		// - back and toLeft animation

		// background color
		const backgroundColor: ColorRepresentation = new Color(0.9, 0.9, 1);
		this._renderer.setClearColor(backgroundColor);

		// add light
		const light = new THREE.AmbientLight(new THREE.Color(100, 0, 0), 0.01); // soft white light
		this._scene.add(light);
		const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
		this._scene.add(directionalLight);

        this._camera.position.z += 20;
		this._camera.position.x += 40;
		this._camera.position.y += 40;

		// orbit control
		const orbitcontrols = new OrbitControls(this._camera, canvas);
		orbitcontrols.position0 = this._camera.position;

		// Animations
		const animation = new CameraZoom(
            new Vector3().copy(this._camera.position),
			new Vector3(-20, -20, 20),
            this._camera,
            new Vector3(0, 0, 0)
		);
		this._animationLine.addAnimation(animation);

        const animationBack = new CameraZoom(
            new Vector3(-20, -20, 20),
			new Vector3(40, 0, 20),
            this._camera,
            new Vector3(0, 0, 0)
		);
		this._animationLine.addAnimation(animationBack);
        const cameraShift = new CameraShift(
            this._camera,
            new Vector3(0,0,0),
            new Vector3(30, 0, 0)
        )
        this._animationLine.addAnimation(cameraShift);

		// meshes
		this._clock = new THREE.Clock(true);
		const dragon = new DragonGltf();

		dragon.addToScene(this._scene);
		this._meshes.push(dragon);
		const spheres = new Spheres();
		this._meshes.push(spheres);
		spheres.addToScene(this._scene);

		const spheres2 = new Spheres(true);
		this._meshes.push(spheres2);
		spheres2.addToScene(this._scene);

		this.animate(this);
	}
	animate(vm: SceneRenderer) {
		for (const mesh of vm._meshes) {
			mesh.updateFrame();
		}
		this._animationLine.update(this.scroll);

		requestAnimationFrame(() => {
			this.animate(vm);
		});
		this._renderer.render(this._scene, this._camera);
	}
}


