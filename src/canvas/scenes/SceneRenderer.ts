import * as THREE from "three";
import * as gsap from "gsap";
import {
    ColorRepresentation,
    Color,
    WebGLRenderer,
    Scene,
    PerspectiveCamera,
    Vector3,
    Mesh,
    Camera,
    WebGLRendererParameters,
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
import { CamFovAnimationOptions, MeshMovementOptions } from "@/types";
import { camFovAnimation } from "../animations/CamFovAnimation";
import { initScene } from "./initScene";


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
    _prevCanvasWidth;
    _prevCanvasHeight;
    scrollTriggerVars: {
        [name: string]: {
            start: number;
            end: number;
            to: number;
            value: number;
        };
    };
    scrollTriggerObjs: {}



    _addMesh(mesh: MeshBase) {
        this._meshes.push(mesh);
        mesh.addToScene(this._scene);
    }

    _registerAnimations() {
        for (const line of this._animationLines) {
            line.registerScrollTriggerVars(this.scrollTriggerVars);
        }
    }

    _initRenderer() {
        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        const canvas: HTMLElement = document.getElementById("canvas");
        this._canvas = canvas;
        const webglParams: WebGLRendererParameters = {
            canvas: canvas,
            antialias: true
        }
        this._renderer = new THREE.WebGLRenderer(webglParams);
        this._renderer.setSize(window.innerWidth, window.innerHeight);

        window.isMobile = window.innerHeight > window.innerWidth;

        this._prevCanvasWidth = window.innerWidth;
        this._prevCanvasHeight = window.innerHeight;

        const tolerance = 1.2;
        const delay = 250;
        var timeout = undefined;
        window.addEventListener(
            "resize",
            () => {
                timeout = setTimeout(() => {
                    clearTimeout(timeout);
                    if ((this._prevCanvasHeight > window.innerHeight || this._prevCanvasWidth > window.innerWidth)
                        || (this._prevCanvasHeight * tolerance < window.innerHeight || this._prevCanvasWidth < window.innerWidth)) {
                        this._prevCanvasHeight = window.innerHeight;
                        this._prevCanvasWidth = window.innerWidth
                        this._camera.aspect = window.innerWidth / window.innerHeight;
                        this._camera.updateProjectionMatrix();
                        this._renderer.setSize(window.innerWidth, window.innerHeight);
                        window.isMobile = window.innerHeight > window.innerWidth;
                    }
                }, delay)


            },
            false
        );

        this._animationLines = [];
        this._meshes = [];
        this.scrollTriggerObjs = {}
    }

    _initScene() {
        initScene(this);
        this._registerAnimations();
    }

    constructor() {
        // initialize
        this._initRenderer();
        this._initScene();
        const vm = this;
        window.addEventListener("scroll", () => {
            requestAnimationFrame(() => {
                for (const line of this._animationLines) {
                    line.update(this.scrollTriggerVars["global"].value);
                }
            })
        })

        this.animate(this);
    }
    animate(vm: SceneRenderer) {
        for (const mesh of vm._meshes) {
            mesh.updateFrame();
        }

        // for (const v of window.animationRenderer._allVars) {
        //     console.log(v.id);
        // }
        // this._camera.updateProjectionMatrix();
        // record scroll position before resize, resize, then set scroll position after resize
        requestAnimationFrame(() => {
            this.animate(vm);
        });
        this._renderer.render(this._scene, this._camera);
    }
}
