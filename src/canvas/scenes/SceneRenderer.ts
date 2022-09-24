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
import { sign } from "crypto";
import { start } from "repl";

export class SceneRenderer {
	_meshes: MeshBase[];
	_renderer: WebGLRenderer;
	_scene: Scene;
	_camera: PerspectiveCamera;
	_clock;
	scroll;
	_animations: ScrollAnimation[];

	constructor() {
		// initialize
		this.scroll = 0;
		this._meshes = [];
		this._animations = [];
		this._scene = new THREE.Scene();
		this._camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);

		this._camera.position.z += 20;
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

		// orbit control
		const orbitcontrols = new OrbitControls(this._camera, canvas);
		orbitcontrols.position0 = this._camera.position;

		// Animations
		const animation = new ScrollAnimation(
			new Vector3(0, 0, 20),
			new Vector3(100, 100, 20)
		);
		this._animations.push(animation);

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
		for (const animation of this._animations) {
			const velocity = animation.update(
				this._camera.position,
				this.scroll
			);
			this._camera.position.x = this._camera.position.x + velocity.x;
			this._camera.position.y = this._camera.position.y + velocity.y;
		}
		// this._camera.position.x += Math.sin(this.scroll) / 2;
		// this._camera.position.y += Math.sin(this.scroll) / 2;
		this._camera.lookAt(0.0, 0.0, 0.0);

		requestAnimationFrame(() => {
			this.animate(vm);
		});
		this._renderer.render(this._scene, this._camera);
	}
}

class ScrollAnimation {
	_speed: number;
	_cur: number;
	_finalTargetPos: Vector3;
	_curTargetPos: Vector3;
	_curPos: Vector3;
	velocity: Vector3;
	_startPos: Vector3;
	/**
	 * Cur varies between 0.0 and 1.0, 0.0 is start
	 */
	constructor(startPos, targetPos) {
		this._startPos = startPos;
		this.velocity = new THREE.Vector3(0, 0, 0);
		this._speed = 1; // speed = 1 implies direct camera movement to target point, 1/10 means after 10 frames
		this._cur = 0.0;
		this._curPos = new Vector3(startPos.x, startPos.y, startPos.z);
		this._finalTargetPos = targetPos;
		this._curTargetPos = startPos;
	}

	update(curPos: Vector3, newCur: number): Vector3 {
		this._curPos = curPos;
		if (newCur != this._cur) {
			this._cur = newCur;
			console.log(this._startPos);
			const zeroVec = new Vector3(0, 0, 0);
			const direction = zeroVec
				.add(this._finalTargetPos)
				.sub(this._startPos)
				.multiplyScalar(this._cur);
			this._curTargetPos = direction.add(this._startPos);
		}
		const zeroVec = new Vector3(0, 0, 0);
		this.velocity = zeroVec
			.add(this._curTargetPos)
			.sub(this._curPos)
			.multiplyScalar(this._speed);
		return this.velocity;
	}
}
