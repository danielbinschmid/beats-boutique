import * as THREE from "three";

import {
	ColorRepresentation,
	Color,
	WebGLRenderer,
	Scene,
	PerspectiveCamera,
	Vector3,
	Mesh,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { Spheres } from "@/canvas/meshes/Spheres";

import { DragonGltf } from "@/canvas/gltf/Dragon";
import { MeshRotation } from "@/canvas/animations/MeshRotation";
import { MeshLookAt } from "@/canvas/animations/MeshLookAt";
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
	_animations: AnimationBase[];
	_animationLines: AnimationLine[];
	_localVars: { [name: string]: any };

	scrollTriggerVars: {
		[name: string]: {
			start: number;
			end: number;
			to: number;
			value: number;
		};
	};

	_initRenderer() {
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
			antialias: true,
		});
		this._renderer.setSize(window.innerWidth, window.innerHeight);

		window.addEventListener(
			"resize",
			() => {
				this._camera.aspect = window.innerWidth / window.innerHeight;
				this._camera.updateProjectionMatrix();
				this._renderer.setSize(window.innerWidth, window.innerHeight);
			},
			false
		);
	}

	_addMesh(mesh: MeshBase) {
		this._meshes.push(mesh);
		mesh.addToScene(this._scene);
	}

	_initScene() {
		// background color

		const backgroundColor: ColorRepresentation = new Color(0.9, 0.9, 1);
		this._renderer.setClearColor(backgroundColor);

		// add light
		const light = new THREE.AmbientLight(new THREE.Color(100, 0, 0), 0.01); // soft white light
		this._scene.add(light);
		const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
		this._scene.add(directionalLight);

		// orbit control
		// const orbitcontrols = new OrbitControls(this._camera, canvas);
		// orbitcontrols.position0 = this._camera.position;

		// ------------------- MESHES ---------------------
		this._meshes = [];
		const dragonCenter = new Vector3(20, 0, -10);
		this._clock = new THREE.Clock(true);
		const letters = new LettersGltf(new Vector3(50, 10, -20));
		this._meshes.push(letters);
		letters.addToScene(this._scene);

		const dragon = new DragonGltf(dragonCenter, undefined, rotateDragon);
		this._addMesh(dragon);
		this._addMesh(new Spheres(false, dragonCenter));
		this._addMesh(new Spheres(true, dragonCenter));
		this._addMesh(new Fireflies());
		this._addMesh(
			new Tunnel(new Vector3(100, 0, 95), 100, (3 * Math.PI) / 2)
		);

		// ----------------- ANIMATIONS -------------------
		this._animationLines = [];
		this._camera.position.z += 20;
		this._camera.position.x -= 0;
		this._camera.position.y -= 10;

		this.scrollTriggerVars = {};
		this.scrollTriggerVars["global"] = {
			start: 0,
			end: 7,
			to: 7,
			value: 0,
		};

		// @@@ introduction animation @@@
		const line1 = new AnimationLine(0, 2.5, "start_");
		this._camera.lookAt(dragonCenter);
        const cameraPos1 = new Vector3(40, 0, 40);
		const animation = new CameraZoom(
			new Vector3().copy(this._camera.position),
			cameraPos1,
			this._camera,
			dragonCenter
		);
		line1.addAnimation(animation, { start: 0, end: 1.5 });

        const textCenter = new Vector3(50, 0, 0);
		const cameraShift = new CameraShift(
			this._camera,
			dragonCenter,
			textCenter
		);
		line1.addAnimation(cameraShift, { start: 0.5, end: 2 });

		line1.registerScrollTriggerVars(this.scrollTriggerVars);
		this._animationLines.push(line1);

		// @@@ Rotate dragon to the right @@@
		function rotateDragon(mesh: Mesh, meshName: string) {
			const rotation = new MeshRotation(
				[mesh],
				Math.PI / 2,
				2.5,
				4.5,
				meshName
			);
			const vars: {
				[name: string]: {
					start: number;
					end: number;
					target: {};
					obj: {};
				};
			} = {};
			rotation.registerScrollTriggerVars(vars);
			window.animationRenderer.renderObjs(vars);
		}

		const tunnelPos = new Vector3(100, 0, 0);
		const line2 = new AnimationLine(3, 7, "line2");
        const dragonFocus = new CameraShift(this._camera, textCenter, dragonCenter);
        line2.addAnimation(dragonFocus, {start: 3, end: 3.5})

		const movement = new CameraZoom(
			cameraPos1,
			dragonCenter,
			this._camera,
			undefined
		);
        const c = 0.5;
        line2.addAnimation(movement, { start: 3, end: 4});
        const lookat = new CameraShift(this._camera, dragonCenter, tunnelPos);
        line2.addAnimation(lookat, { start: 3.6, end: 4});

        line2.registerScrollTriggerVars(this.scrollTriggerVars);
        this._animationLines.push(line2);

		/**
		 * Next: Kameraschwenker damit die Blickrichtung zum Portal zeigt und die Position mit dem Drachen übereinstimmt
		 *
		 * Idee: Feuerball während der Animation, beobachten wie der Feuerball fliegt
		 *
		 * Idee: Ab dem Moment wenn man aus der Sicht des Drachens blickt, ändert sich die Sicht. Man sieht Sterne oder so,
		 * bzw. ne andere Dimension
		 */
	}

	constructor() {
		// initialize
		this._initRenderer();
		this._initScene();

		this.animate(this);
	}
	animate(vm: SceneRenderer) {
		for (const mesh of vm._meshes) {
			mesh.updateFrame();
		}
		for (const line of this._animationLines) {
			line.update(this.scrollTriggerVars["global"].value);
		}
		requestAnimationFrame(() => {
			this.animate(vm);
		});
		this._renderer.render(this._scene, this._camera);
	}
}
