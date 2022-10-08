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
import { MeshMovement } from "../animations/MeshMovement";


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

        window.isMobile = window.innerHeight > window.innerWidth; 
		window.addEventListener(
			"resize",
			() => {
				this._camera.aspect = window.innerWidth / window.innerHeight;
				this._camera.updateProjectionMatrix();
				this._renderer.setSize(window.innerWidth, window.innerHeight);
                window.isMobile = window.innerHeight > window.innerWidth; 
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
        const tunnel = new Tunnel(new Vector3(100, 0, 95), 100, (3 * Math.PI) / 2)
		this._addMesh(
			tunnel
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
        
        const initialLookAtDragon = new Vector3(20, 0, 1);
        const vm = this;
		function rotateDragon(mesh: Mesh, meshName: string) {
            const line3 = new AnimationLine(2.5, 4, "line3");
            mesh.lookAt(initialLookAtDragon);
            const rotationLookAt = new MeshLookAt([mesh], initialLookAtDragon, tunnelPos);
            line3.addAnimation(rotationLookAt, {start: 2.5, end: 4}, meshName)
            const triggerVars = {}
            line3.registerScrollTriggerVars(triggerVars);
            console.log(triggerVars);
            window.animationRenderer.renderVars(triggerVars);
            vm._animationLines.push(line3);

            dragonMovementCallback(mesh, meshName);
            dragonM(mesh, meshName);
		}
        const checkpoints = tunnel.checkpoints;
		const tunnelPos = checkpoints[0]; // new Vector3(100, 0, 0);
		const line2 = new AnimationLine(2.5, 5, "line2");
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


        const line3 = new AnimationLine(4, 8, "tunnelMovement");
        const startTunnelMovement = 5;
        const endTunnelMovement = 8;
        const step = (endTunnelMovement - startTunnelMovement) / checkpoints.length;
        function dragonMovementCallback(mesh: Mesh, meshName: string) {
                        
            for (var i = 0; i < checkpoints.length - 1; i++) {
                var movementAnimation: MeshMovement | undefined = undefined
                if (i == 0) {
                    movementAnimation = new MeshMovement([mesh], dragonCenter, checkpoints[i], startTunnelMovement + i * step, startTunnelMovement + (i + 1) * step, meshName + i);
                } else {
                    movementAnimation = new MeshMovement([mesh], checkpoints[i - 1], checkpoints[i],  startTunnelMovement + i * step, startTunnelMovement + (i + 1) * step, meshName + i);
                }
                
                const objs = {};
                // movementAnimation.registerScrollTriggerVars(objs);
                window.animationRenderer.renderObjs(objs);

                var lookAt_: undefined | MeshLookAt = undefined;
                const line4 = new AnimationLine( startTunnelMovement + i * step, startTunnelMovement + (i + 1) * step, "dragon tunnel movement " + i);
                lookAt_ = new MeshLookAt([vm._camera],checkpoints[i], checkpoints[i + 1]);
                line4.addAnimation(lookAt_, {start: startTunnelMovement + i * step, end: startTunnelMovement + (i + 1) * step}, "dragonlookat" + i);
                vm._animationLines.push(line4);
                const vars = {}
                line4.registerScrollTriggerVars(vars);
                window.animationRenderer.renderVars(vars);
            }
            
        }
        for (var i = 0; i < checkpoints.length - 1; i++) {
            var cameraMovement: CameraZoom | undefined = undefined
            if (i != 0) {
                cameraMovement = new CameraZoom(checkpoints[i -1], checkpoints[i], this._camera, undefined);
            } else {
                cameraMovement = new CameraZoom(dragonCenter, checkpoints[i], this._camera, undefined);
            }

            const animationVars = {start: startTunnelMovement+ i * step, end: startTunnelMovement + (1 + i) * step}
            line3.addAnimation(cameraMovement, animationVars, "ccc 0 " + i);
        }

        line3.registerScrollTriggerVars(this.scrollTriggerVars);
        this._animationLines.push(line3);
        

        // Last scene
        const start = 8;
        const end = 9;
        const lastLine = new AnimationLine(start, end, "last line");

        const cameraObjsDistance = 20;
        const objDistances = 15;
        const finalCameraPos = tunnel.getCheckpointAt(checkpoints.length);
        const finalCamLookAt = tunnel.getCheckpointAt(checkpoints.length + 1);
        const finalDragonPos = finalCamLookAt;


        const camMove = new CameraZoom(checkpoints[checkpoints.length - 2], finalCameraPos, this._camera, undefined);
        lastLine.addAnimation(camMove, {start: start, end: end}, "ll");
        const camShift = new CameraShift(this._camera, checkpoints[checkpoints.length - 1], finalCamLookAt);
        lastLine.addAnimation(camShift, {start: start, end: end}, "sdg");

        function dragonM(mesh: Mesh, meshName: string) {
            const mo = new MeshMovement([mesh], checkpoints[checkpoints.length - 2], finalDragonPos, 7, 8, "mo" + meshName);
            const vars = {}
            // mo.registerScrollTriggerVars(vars);
            // window.animationRenderer.renderObjs(vars);
        }

        this._animationLines.push(lastLine);
        lastLine.registerScrollTriggerVars(this.scrollTriggerVars);

        // right shall be a cloud with points inside to click
        // each point represents a point, interactive single page interface
        // Last page is about me:
        // Made with three.js
        // - Author: Daniel Bin Schmid 
        // - M.Sc. Informatics student at TU Munich
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
        // for (const v of window.animationRenderer._allVars) {
        //     console.log(v.id);
        // }
		requestAnimationFrame(() => {
			this.animate(vm);
		});
		this._renderer.render(this._scene, this._camera);
	}
}
