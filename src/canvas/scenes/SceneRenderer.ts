import * as THREE from "three";

import {
    ColorRepresentation,
    Color,
    WebGLRenderer,
    Scene,
    PerspectiveCamera,
    Vector3,
    Mesh,
    Camera,
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
        // const letters = new LettersGltf(new Vector3(50, 10, -20));
        // this._meshes.push(letters);
        // letters.addToScene(this._scene);

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
        const line1 = new AnimationLine(0, 1.8, "start_");
        this._camera.lookAt(dragonCenter);
        const cameraPos1 = new Vector3(40, 0, 40);
        const animation = new CameraZoom(
            new Vector3().copy(this._camera.position),
            cameraPos1,
            this._camera,
            dragonCenter
        );
        line1.addAnimation(animation, { start: 0, end: 1 });

        const fixPls = new CameraShift(this._camera, dragonCenter, dragonCenter);
        line1.addAnimation(fixPls, {start: 1, end: 1.8}, "fixpls");
        

        line1.registerScrollTriggerVars(this.scrollTriggerVars);
        this._animationLines.push(line1);

        // @@@ Rotate dragon to the right @@@

        const initialLookAtDragon = new Vector3(20, 0, 1);
        const vm = this;
        function rotateDragon(mesh: Mesh, meshName: string) {
            const line3 = new AnimationLine(1, 3, "line3");
            mesh.lookAt(initialLookAtDragon);
            const rotationLookAt = new MeshLookAt([mesh], initialLookAtDragon, tunnelPos);
            line3.addAnimation(rotationLookAt, { start: 1.75, end: 2 }, meshName)
            const triggerVars = {}
            line3.registerScrollTriggerVars(triggerVars);
            window.animationRenderer.renderVars(triggerVars);
            vm._animationLines.push(line3);
        }
        const checkpoints = tunnel.checkpoints;
        const tunnelPos = checkpoints[0]; // new Vector3(100, 0, 0);
        const line2 = new AnimationLine(1.5, 4, "line2");
        // const dragonFocus = new CameraShift(this._camera, textCenter, dragonCenter);
        // line2.addAnimation(dragonFocus, { start: 3, end: 3.5 })

        const movement = new CameraZoom(
            cameraPos1,
            dragonCenter,
            this._camera,
            undefined
        );
        const c = 0.5;
        line2.addAnimation(movement, { start: 1.5, end: 2 });
        const lookat = new CameraShift(this._camera, dragonCenter, tunnelPos);

        const extraLine = new AnimationLine(1.5, 2.5, "extra line");

        extraLine.addAnimation(lookat, { start: 1.8, end: 2 });
        
        extraLine.registerScrollTriggerVars(this.scrollTriggerVars);
        this._animationLines.push(extraLine);
        line2.registerScrollTriggerVars(this.scrollTriggerVars);
        this._animationLines.push(line2);


        const line3 = new AnimationLine(3.5, 7, "tunnelMovement");
        const startTunnelMovement = 4;
        const endTunnelMovement = 7;
        const step = (endTunnelMovement - startTunnelMovement) / checkpoints.length;
    
        
        for (var i = 0; i < checkpoints.length; i++) {
            var cameraMovement: CameraZoom | undefined = undefined
            if (i != 0) {
                cameraMovement = new CameraZoom(tunnel.getCheckpointAt(i - 1), tunnel.getCheckpointAt(i), this._camera, undefined);
            } else {
                cameraMovement = new CameraZoom(dragonCenter, tunnel.getCheckpointAt(i), this._camera, undefined);
            }

            const animationVars = { start: startTunnelMovement + i * step, end: startTunnelMovement + (1 + i) * step }
            line3.addAnimation(cameraMovement, animationVars, "ccc 0 " + i);
            const line4 = new AnimationLine(startTunnelMovement + i * step, startTunnelMovement + (i + 1) * step, "dragon tunnel movement " + i);
            const lookAt_ = new MeshLookAt([vm._camera], tunnel.getCheckpointAt(i), tunnel.getCheckpointAt(i + 1));
            line4.addAnimation(lookAt_, { start: startTunnelMovement + i * step, end: startTunnelMovement + (i + 1) * step }, "dragonlookat" + i);
            vm._animationLines.push(line4);
            


            const vars = {};
            line4.registerScrollTriggerVars(vars);
            window.animationRenderer.renderVars(vars);
        }

        line3.registerScrollTriggerVars(this.scrollTriggerVars);
        this._animationLines.push(line3);

        const camFov = {
            "camFov": {
                start: 2,
                end: 4,
                obj: this._camera,
                target: { fov: 160 }
            },
            "camFov2": {
                start: 6.5,
                end: 7,
                obj: this._camera,
                target: {fov: 20 }
            }
        }
        window.animationRenderer.renderObjs(camFov);
        
        /** 
         * const v = {
            "cubeRotation": {
                start: 8,
                end: 10,
                obj: mesh.rotation,
                target: {y: 2 * Math.PI}
            }
        }
         */
        
        // window.animationRenderer.renderObjs(v);

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
        this._camera.updateProjectionMatrix();
        requestAnimationFrame(() => {
            this.animate(vm);
        });
        this._renderer.render(this._scene, this._camera);
    }
}
