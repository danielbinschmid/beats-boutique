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
import { FireComets } from "@/canvas/meshes/FireComets";
import { MeshBase } from "../meshes/MeshBase";
import { CameraMovement } from "@/canvas/animations/CameraMovement";
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
    _canvas;
    scrollTriggerVars: {
        [name: string]: {
            start: number;
            end: number;
            to: number;
            value: number;
        };
    };
    scrollTriggerObjs: {}

    _initRenderer() {
        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        const canvas = document.getElementById("canvas");
        this._canvas = canvas;
        this._renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
        });
        this._renderer.setSize(window.innerWidth, window.innerHeight);

        window.isMobile = window.innerHeight > window.innerWidth;

        var timeout = undefined;

        const resizeTimeout = 100;
        window.addEventListener("resize",
            () => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    this._camera.aspect = window.innerWidth / window.innerHeight;
                    this._camera.updateProjectionMatrix();
                    this._renderer.setSize(window.innerWidth, window.innerHeight);
                    window.isMobile = window.innerHeight > window.innerWidth;
                }, resizeTimeout);
            })
        /**
         * 
         * window.addEventListener(
            "resize",
            () => {
                
            },
            false
        );
         */

    }

    _addMesh(mesh: MeshBase) {
        this._meshes.push(mesh);
        mesh.addToScene(this._scene);
    }

    _registerAnimations() {
        for (const line of this._animationLines) {
            line.registerScrollTriggerVars(this.scrollTriggerVars);
        }
    }

    _initScene() {
        // initialize parameter holder
        this._animationLines = [];
        this._meshes = [];
        const vm = this;
        this.scrollTriggerObjs = {}

        // background color
        const backgroundColor: ColorRepresentation = new Color(0.9, 0.9, 1); // rgb(240, 248, 255) rgb(229.5, 229.5, 255)
        this._renderer.setClearColor(backgroundColor);

        // add light
        const light = new THREE.AmbientLight(new THREE.Color(100, 0, 0), 0.01); // soft white light
        this._scene.add(light);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        this._scene.add(directionalLight);

        // orbit control
        const orbitcontrols = new OrbitControls(this._camera, this._canvas);
        orbitcontrols.position0 = this._camera.position;


        // ----------- STATIC FIXED POSITIONS ------------
        // camera
        const initialCameraPos: Vector3 = new Vector3(0, -10, 20);  // Starting position of camera
        const cameraPos1 = new Vector3(40, 0, 40); // position of camera after first movement in introduction animation

        // dragon pos
        const dragonCenter = new Vector3(20, 0, -10); // dragon position
        const initialLookAtDragon = new Vector3(20, 0, 1);


        // ----------------- TIME CHECKPOINTS ------------------
        const globalEnd = 7;
        const startTunnelMovement = 4;
        const endTunnelMovement = 7;

        // ------------------- MESHES ---------------------


        this._clock = new THREE.Clock(true);

        this._addMesh(new FireComets());
        const tunnel = new Tunnel(new Vector3(100, 0, 95), 100, (3 * Math.PI) / 2)
        //this._addMesh(
        //    tunnel
        //);

        /*
        const dragon = new DragonGltf(dragonCenter, undefined, rotateDragon);
        this._addMesh(dragon);
        this._addMesh(new Spheres(false, dragonCenter));
        this._addMesh(new Spheres(true, dragonCenter));
        */
        // --------------NON-STATIC POSITIONS --------------
        const checkpoints = tunnel.checkpoints;
        const tunnelPos = checkpoints[0];


        // ----------------- ANIMATIONS -------------------
        this.scrollTriggerVars = {};
        this.scrollTriggerVars["global"] = {
            start: 0,
            end: globalEnd,
            to: globalEnd,
            value: 0,
        };

        /********** CAMERA **********/

        // CAMERA MOVEMENTS
        this._camera.position.x = initialCameraPos.x;
        this._camera.position.y = initialCameraPos.y;
        this._camera.position.z = initialCameraPos.z;

        new MeshMovement([this._camera], new Vector3().copy(this._camera.position), cameraPos1, 0, 1, "camera intro movement", this);
        new MeshMovement([this._camera], cameraPos1, dragonCenter, 1.5, 2, "Camera movement inside of dragon", this);
        
        const step = (endTunnelMovement - startTunnelMovement) / checkpoints.length;
        for (var i = 0; i < checkpoints.length; i++) {
            const start = i == 0? dragonCenter: tunnel.getCheckpointAt(i - 1);
            new MeshMovement([this._camera], start, tunnel.getCheckpointAt(i), startTunnelMovement + i * step, startTunnelMovement + (1 + i) * step, "dragon tunnel movement " + i, this);
        }
        


        // CAMERA LOOKATS
        this._camera.lookAt(dragonCenter);
        const lookAtLine = new AnimationLine(0, 1.8, "landing page animation", this);
        lookAtLine.addAnimation(new CameraShift(this._camera, dragonCenter, dragonCenter), { start: 0, end: 1.8 }, "fixate camera after introduction animation");
        
    
        const lookat = new CameraShift(this._camera, dragonCenter, tunnelPos);

        const extraLine = new AnimationLine(1.5, 2.5, "extra line", this);

        extraLine.addAnimation(lookat, { start: 1.75, end: 1.8 });


        const line3 = new AnimationLine(3.5, 7, "tunnelMovement", this);


        for (var i = 0; i < checkpoints.length; i++) {
            const line4 = new AnimationLine(startTunnelMovement + i * step, startTunnelMovement + (i + 1) * step, "dragon tunnel movement " + i, this);
            const lookAt_ = new MeshLookAt([vm._camera], tunnel.getCheckpointAt(i), tunnel.getCheckpointAt(i + 1));
            line4.addAnimation(lookAt_, { start: startTunnelMovement + i * step, end: startTunnelMovement + (i + 1) * step }, "dragonlookat" + i);
            vm._animationLines.push(line4);
        }


        // OTHER CAMERA ANIMATIONS
        this.scrollTriggerObjs["camFov"] = {
            start: 2,
            end: 4,
            obj: this._camera,
            target: {fov: 160}
        }
        this.scrollTriggerObjs["camFov2"] = {
            start: 6.5,
            end: 7,
            obj: this._camera,
            target: { fov: 20 }
        }


        /* 
        // @@@ Rotate dragon to the right @@@


        
        function rotateDragon(mesh: Mesh, meshName: string) {
            const line3 = new AnimationLine(1, 3, "line3");
            mesh.lookAt(initialLookAtDragon);
            const rotationLookAt = new MeshLookAt([mesh], initialLookAtDragon, tunnelPos);
            line3.addAnimation(rotationLookAt, { start: 1.75, end: 1.8 }, meshName)
            const triggerVars = {}
            line3.registerScrollTriggerVars(triggerVars);
            window.animationRenderer.renderVars(triggerVars);
            vm._animationLines.push(line3);
        }




        

        
        */


        this._registerAnimations();
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
