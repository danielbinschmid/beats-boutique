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
import { LettersGltf } from "@/canvas/gltf/ChineseLetters";
import { Fireflies } from "@/canvas/meshes/Fireflies";
import { MeshBase } from "../meshes/MeshBase";
import { CameraZoom } from "@/canvas/animations/CameraZoom";
import { CameraShift } from "@/canvas/animations/CameraShift";
import { AnimationBase } from "@/canvas/animations/AnimationBase";
import { AnimationLine } from "@/canvas/animations/AnimationLine";
import { Tunnel } from "../meshes/Tunnel";
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
			50,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);

		const canvas = document.getElementById("canvas");
		this._renderer = new THREE.WebGLRenderer({
			canvas: canvas,
            antialias: true
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
		this._camera.position.x -= 0;
		this._camera.position.y -= 10;
        
		// orbit control
		// const orbitcontrols = new OrbitControls(this._camera, canvas);
		// orbitcontrols.position0 = this._camera.position;
        const dragonCenter = new Vector3(20, 0, -10);
        this._camera.lookAt(dragonCenter);

		// Animations
		const animation = new CameraZoom(
            new Vector3().copy(this._camera.position),
			new Vector3(40, 0, 40),
            this._camera,
            dragonCenter
		);
		this._animationLine.addAnimation(animation);

        const cameraShift = new CameraShift(
            this._camera,
            dragonCenter,
            new Vector3(50, 0, 0)
        )
        this._animationLine.addAnimation(cameraShift);

		// meshes
		this._clock = new THREE.Clock(true);
        const letters = new LettersGltf(new Vector3(50, 10, -20));
        this._meshes.push(letters);
        letters.addToScene(this._scene);


		const dragon = new DragonGltf(dragonCenter);
		dragon.addToScene(this._scene);
		this._meshes.push(dragon);
		const spheres = new Spheres(false, dragonCenter);
		this._meshes.push(spheres);
		spheres.addToScene(this._scene);

		const spheres2 = new Spheres(true, dragonCenter);
		this._meshes.push(spheres2);
		spheres2.addToScene(this._scene);

        const fireflies = new Fireflies();
        this._meshes.push(fireflies);
        fireflies.addToScene(this._scene);

        const tunnel = new Tunnel(new Vector3(100, 0, 95), 100, 3 * Math.PI / 2);
        this._meshes.push(tunnel);
        tunnel.addToScene(this._scene);

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


