import { BufferGeometry, Camera, Clock, Color, ColorRepresentation, Line, Mesh, Object3D, PerspectiveCamera, PlaneGeometry, Raycaster, Scene, SphereGeometry, Vector2, Vector3, VectorKeyframeTrack } from "three";
import * as THREE from "three"
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry, TextGeometryParameters } from 'three/examples/jsm/geometries/TextGeometry.js';
import { MeshBase } from "./MeshBase";
import { SongMetaData } from "@/types";
import { RotatingText } from "./RotatingText";
import { PlayButton } from "./PlayButton";

import sphereVertex from "@/shader/sphere/singleSphereVertex.glsl?raw";
import sphereFragment from "@/shader/sphere/singleSphereFragment.glsl?raw";


// https://threejs.org/docs/#api/en/core/Raycaster


function getFarNearPlane(cam: PerspectiveCamera) {

    // Near Plane dimensions
    const hNear = 2 * Math.tan(cam.fov / 2) * cam.near; // height
    const wNear = hNear * cam.aspect;;

    // Far Plane dimensions    
    const hFar = 2 * Math.tan(cam.fov / 2) * cam.far;
    const wFar = hFar * cam.aspect; // width;

    const res = {
        near: {
            tl: new THREE.Vector3(-wNear / 2, hNear / 2, -cam.near),
            tr: new THREE.Vector3(wNear / 2, hNear / 2, -cam.near),
            bl: new THREE.Vector3(-wNear / 2, -hNear / 2, -cam.near),
            br: new THREE.Vector3(wNear / 2, -hNear / 2, -cam.near)
        },
        far: {
            tl: new THREE.Vector3(-wFar / 2, hFar / 2, -cam.far),
            tr: new THREE.Vector3(wFar / 2, hFar / 2, -cam.far),
            bl: new THREE.Vector3(-wFar / 2, -hFar / 2, -cam.far),
            br: new THREE.Vector3(wFar / 2, -hFar / 2, -cam.far)
        }
    }
    return res;
}

declare type ArtistCardWorldPos = {
    position: Vector3,
    rotation?: Vector3,
    scaling?: Vector3,
    lookAt?: Vector3
}


declare type ArtistCardMetadata = {
    artistName: string,
    songs: SongMetaData[]
}

export function processTextInputKawasaki(inp: string) {
    var out = ""
    for (var x = 0; x < inp.length; x++) {
        const add = inp.at(x) == " " ? "    " : inp.at(x) + " ";
        out = out + add;
    }
    return out;
}

declare type RaycastObjectUserData = {
    triggerCallbackIdx?: string,
    name?: string,
    mesh?: Mesh
}


export class ArtistCard extends MeshBase {
    _cardMesh: Mesh;
    _globalPosition;
    _globalRotation;
    _scaling: Vector3;
    _textMesh: Mesh;
    _lookAt?: Vector3;
    _artist: ArtistCardMetadata;
    _title: string;
    _animatedMeshes: MeshBase[];
    _clock: Clock;
    _uniforms;

    _raycaster: Raycaster;
    _raycastData: {
        objects: Object3D[],
        onEntry: { [idx: string]: any },
        onLeave: { [idx: string]: any },
        onClick: { [idx: string]: any }
    }
    _pointedObjects: {
        [id: string]: RaycastObjectUserData
    }
    _mousePointer: Vector2


    constructor(pos: ArtistCardWorldPos, artist?: ArtistCardMetadata, title?: string) {
        super();
        this._raycastData = {
            objects: [],
            onEntry: {},
            onLeave: {},
            onClick: {}
        }
        this._pointedObjects = {};
        this._mousePointer = new Vector2();
        this._initRaycaster();

        this._animatedMeshes = [];
        this._title = title ? title : "underdogs";
        this._artist = artist ? artist : {
            artistName: "prodbycctv",
            songs: [{
                url: "music/2.mp3",
                songName: "youngboy",
                artistName: "prodbycctv"
            }]
        }
        this._clock = new Clock(true);
        this._globalPosition = pos.position;
        this._globalRotation = pos.rotation;
        this._lookAt = pos.lookAt;
        this._scaling = pos.scaling ? pos.scaling : new Vector3(30, 40, 0);
        this._init()
    }

    _initRaycaster() {
        this._raycaster = new THREE.Raycaster();
        this._mousePointer = new THREE.Vector2();
        const vm = this;
        window.addEventListener('mousemove', (event) => {
            pointerPosChange(event);
        });

        function pointerPosChange(event) {
            const canvasRect = window.mainCanvas.getBoundingClientRect();

            vm._mousePointer.x = ((event.clientX - canvasRect.left) / (canvasRect.right - canvasRect.left)) * 2 - 1;
            vm._mousePointer.y = - ((event.clientY - canvasRect.top) / (canvasRect.bottom - canvasRect.top)) * 2 + 1;
            vm._raycasterUpdate();
        }

        function onClick() {
            for (const key in vm._pointedObjects) {
                const hovered = vm._pointedObjects[key];
                vm._raycastData.onClick[hovered.triggerCallbackIdx]();
            }
        }



        window.addEventListener('touchstart', (ev) => {
            pointerPosChange(ev);
            setTimeout(() => {
                pointerPosChange({ clientX: -10000000, clientY: -10000000 });
            }, 200)

        });

        window.addEventListener('mousedown', (ev) => {
            onClick();
        })


    }

    _raycasterUpdate() {
        this._raycaster.setFromCamera(this._mousePointer, window.camera);
        const intersects = this._raycaster.intersectObjects(this._raycastData.objects);

        // First check, if any object is released
        for (const key in this._pointedObjects) {
            if (intersects.findIndex((val, idx, arr) => {
                const usrData: RaycastObjectUserData = val.object.userData;
                return usrData.triggerCallbackIdx == key;
            }) == -1) {
                this._raycastData.onLeave[key]();
                delete this._pointedObjects[key];
            }
        }

        for (const intersection of intersects) {
            const usrData: RaycastObjectUserData = intersection.object.userData;
            if (this._pointedObjects[usrData.triggerCallbackIdx] == undefined) {
                this._pointedObjects[usrData.triggerCallbackIdx] = usrData;
                this._raycastData.onEntry[usrData.triggerCallbackIdx]();
            }
        }
    }

    _init() {
        // this._cardMesh = new Mesh(THREE.)
        const geometry = new PlaneGeometry(1, 1, 2, 2);
        const invisibleMaterial = new THREE.MeshStandardMaterial({
            wireframe: true,
            color: "rgba(0, 0, 0)",
            transparent: true,
            opacity: 0
        });

        const mesh = new Mesh(geometry, invisibleMaterial)
        this._uniforms = {};
        this._cardMesh = mesh;
        this._cardMesh.position.setX(this._globalPosition.x);
        this._cardMesh.position.setY(this._globalPosition.y);
        this._cardMesh.position.setZ(this._globalPosition.z);

        if (this._globalRotation != undefined) {
            this._cardMesh.rotateX(this._globalRotation.x);
            this._cardMesh.rotateY(this._globalRotation.y);
            this._cardMesh.rotateZ(this._globalRotation.z);
        }
        if (this._lookAt != undefined) {
            this._cardMesh.lookAt(this._lookAt);
        }

        this._cardMesh.scale.x = this._scaling.x;
        this._cardMesh.scale.y = this._scaling.y;

        const loader = new FontLoader();


        loader.load('fonts/kawasaki.json', (font) => {
            const vm = this;
            function addTriggerbox(width, height, position, id: string, mesh: Mesh,clickCallback: any, name?: string, scaling?: number) {
                scaling = scaling? scaling: 0.8;
                const triggerBoxMesh = new Mesh(new PlaneGeometry(width, height, 1, 1), invisibleMaterial);
                triggerBoxMesh.position.copy(position);
                triggerBoxMesh.applyMatrix4(vm._cardMesh.matrixWorld);
                const usrData: RaycastObjectUserData = {
                    triggerCallbackIdx: id,
                    name: name,
                    mesh: mesh
                }
                triggerBoxMesh.userData = usrData
                vm._raycastData.objects.push(triggerBoxMesh)
                const upScaling = scaling;
                vm._raycastData.onEntry[usrData.triggerCallbackIdx] = () => {
                    document.body.style.cursor = "pointer";
                    mesh.scale.x *= upScaling;
                    mesh.scale.y *= upScaling;
                }
                vm._raycastData.onLeave[usrData.triggerCallbackIdx] = () => {
                    document.body.style.cursor = "";
                    mesh.scale.x *= 1 / upScaling;
                    mesh.scale.y *= 1 / upScaling;
                }
                vm._raycastData.onClick[usrData.triggerCallbackIdx] = clickCallback;
                vm._cardMesh.children.push(triggerBoxMesh)
            }

            // constants
            const marginHorizontal = 0.05
            const marginVertical = 0.05
            const boundary = 0.5;
            const fontSize = 0.06;
            const lineHeight = 0.8 * fontSize;
            const yScale = 0.5;
            const xScale = 1.15;
            const params: TextGeometryParameters = {
                font: font,
                height: 0.001,
                size: 0.2,
                bevelEnabled: false,
            }
            // card title
            const titleMesh = new Mesh(new TextGeometry(processTextInputKawasaki(this._title), params), new THREE.MeshNormalMaterial());
            titleMesh.position.y += boundary - marginVertical - lineHeight * 0.5;
            titleMesh.position.x -= boundary - marginHorizontal;
            titleMesh.scale.y = yScale;
            titleMesh.scale.x = xScale

            titleMesh.parent = this._cardMesh;
            this._cardMesh.children.push(titleMesh);

            // hyphen (bindestrich)
            // artist name
            const h2: TextGeometryParameters = {
                font: params.font,
                height: params.height,
                size: params.size / 1.5,
                bevelEnabled: params.bevelEnabled
            }
            const h2LineWidth = 1;
            const h2LineHeight = 0.08;
            const artistNameMesh = new Mesh(new TextGeometry(processTextInputKawasaki("artist: " + this._artist.artistName), h2), new THREE.MeshNormalMaterial());
            artistNameMesh.position.y += boundary - 2 * marginVertical - lineHeight * 2;
            artistNameMesh.position.x -= boundary - marginHorizontal;
            artistNameMesh.scale.y = yScale;
            artistNameMesh.scale.x = xScale
            artistNameMesh.parent = this._cardMesh;

            this._cardMesh.children.push(artistNameMesh);
            addTriggerbox(h2LineWidth, h2LineHeight, new Vector3(0, artistNameMesh.position.y + h2LineHeight / 2,0), "artist_name", artistNameMesh, () => {
                console.log("click artist name")
            }, "Settings button", 1.1);



            const rotatingText = new RotatingText(font, processTextInputKawasaki(this._artist.songs[0].songName), this._cardMesh);
            this._animatedMeshes.push(rotatingText);

            const playBtnWidth = 0.2;
            const playBtnHeight = 0.1;
            const playBtnPos = new Vector3(
                - boundary / 2,
                - boundary + marginVertical + 3 * playBtnHeight / 2,
                0);
            const playBtn = new PlayButton(this._cardMesh, playBtnPos);
            addTriggerbox(playBtnWidth, playBtnHeight, playBtn._mesh.position, "0", playBtn._mesh, () => {
                console.log("play or pause");
            } ,"Play and pause button");




            const material = new THREE.LineBasicMaterial({
                color: new Color('rgb(150,150,255)'),
                linewidth: 5,
            });

            const points = [];
            points.push(new THREE.Vector3(- 0.4, -0.47, 0));
            points.push(new THREE.Vector3(0.4, -0.47, 0));
            const geometry = new THREE.BufferGeometry().setFromPoints(points);

            const line = new THREE.Line(geometry, material);
            this._cardMesh.children.push(line);
            line.parent = this._cardMesh;
            const sliderLineHeight = 0.1;
            

            const sph = this._sphere();
            sph.position.copy(new Vector3(-0.4, -.47, 0));
            this._cardMesh.children.push(sph);
            sph.parent = this._cardMesh;

            addTriggerbox(0.8, sliderLineHeight, new Vector3(0, -0.47, 0), "slider", sph, () => {
                console.log("slider");
            }, "Time slider", 2);

            const h3LineHeight = 0.04;
            const h3LineWidth = 0.25;
            const h3: TextGeometryParameters = {
                font: params.font,
                height: params.height,
                size: params.size / 2.5,
                bevelEnabled: params.bevelEnabled
            }
            const nextMesh = new Mesh(new TextGeometry(processTextInputKawasaki("next"), h3), new THREE.MeshNormalMaterial());
            nextMesh.position.y -= boundary / 2 - h3LineHeight / 2;
            nextMesh.position.x += marginHorizontal;
            nextMesh.scale.y = yScale;
            nextMesh.scale.x = xScale
            nextMesh.parent = this._cardMesh;
            this._cardMesh.children.push(nextMesh);
            addTriggerbox(h3LineWidth, h3LineHeight, new Vector3().copy(nextMesh.position).add(new Vector3(h3LineWidth / 2, h3LineHeight / 2, 0)), "next", nextMesh, () => {
                console.log("clicked next song");
            }, "Next song button");



            const prevMesh = new Mesh(new TextGeometry(processTextInputKawasaki("previous"), h3), new THREE.MeshNormalMaterial());
            prevMesh.position.y -= boundary / 2 + marginVertical + h3LineHeight / 2;
            prevMesh.position.x += marginHorizontal;
            prevMesh.scale.y = yScale;
            prevMesh.scale.x = xScale;
            prevMesh.parent = this._cardMesh;
            this._cardMesh.children.push(prevMesh);
            addTriggerbox(h3LineWidth, h3LineHeight, new Vector3().copy(prevMesh.position).add(new Vector3(h3LineWidth / 2, h3LineHeight / 2, 0)), "prev", prevMesh, () => {
                console.log("Clicked previous song");
            }, "Previous song button");


            const settingsMesh = new Mesh(new TextGeometry(processTextInputKawasaki("settings"), h3), new THREE.MeshNormalMaterial());
            settingsMesh.position.y -= boundary / 2 + 2 * marginVertical + 3 * h3LineHeight / 2;
            settingsMesh.position.x += marginHorizontal;
            settingsMesh.scale.y = yScale;
            settingsMesh.scale.x = xScale
            settingsMesh.parent = this._cardMesh;
            this._cardMesh.children.push(settingsMesh);
            addTriggerbox(h3LineWidth, h3LineHeight, new Vector3().copy(settingsMesh.position).add(new Vector3(h3LineWidth / 2, h3LineHeight / 2, 0)), "3", settingsMesh, () => {
                console.log("open settings button")
            }, "Settings button");

        });
    }


    _sphere() {

        this._uniforms = {
            'u_time': {
                type: "f",
                value: this._clock.elapsedTime,
            }
        };
        const sphereMaterial = new THREE.ShaderMaterial({
            wireframe: false,
            uniforms: this._uniforms,
            vertexShader: sphereVertex,
            fragmentShader: sphereFragment,
        });

        const geometry = new SphereGeometry(0.03, 4, 2);
        return new Mesh(geometry, sphereMaterial);
    }

    updateFrame() {
        for (const mesh of this._animatedMeshes) {
            mesh.updateFrame();
        }
        if (this._uniforms["u_time"])
            this._uniforms.u_time.value = this._clock.getElapsedTime();


    }
    addToScene(scene: Scene) {
        scene.add(this._cardMesh);
    }

}