import { BufferGeometry, Camera, Mesh, PerspectiveCamera, PlaneGeometry, Scene, Vector3 } from "three";
import * as THREE from "three"
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry, TextGeometryParameters } from 'three/examples/jsm/geometries/TextGeometry.js';
import { MeshBase } from "./MeshBase";

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

declare type SongCardWorldPos = {
    position: Vector3,
    rotation?: Vector3,
    scaling?: Vector3,
    lookAt?: Vector3
}

export class SongCard extends MeshBase {
    _cardMesh: Mesh;
    _globalPosition;
    _globalRotation;
    _scaling: Vector3;
    _textMesh: Mesh;
    _lookAt?: Vector3


    constructor(pos: SongCardWorldPos) {
        super();
        this._globalPosition = pos.position;
        this._globalRotation = pos.rotation;
        this._lookAt = pos.lookAt;
        this._scaling = pos.scaling ? pos.scaling : new Vector3(30, 40, 0);
        this._init()
    }

    _init() {
        // this._cardMesh = new Mesh(THREE.)

        const geometry = new PlaneGeometry(1, 1, 2, 2);
        const mesh = new Mesh(geometry, new THREE.LineBasicMaterial({ transparent: true }))
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


        loader.load('fonts/Nagasaki.json', (font) => {
            const params: TextGeometryParameters = {
                font: font,
                size: 0.1
            }
            params.bevelSize = 0.001;
            params.bevelEnabled = false;

            const geometry = new TextGeometry('prodbycctv', params);

            const textMesh = new Mesh(geometry, new THREE.MeshNormalMaterial());
            textMesh.scale.z = 0.001
            textMesh.parent = this._cardMesh;
            this._cardMesh.children.push(textMesh);

            // textMesh.applyMatrix4(textMesh.parent.matrixWorld);
        });
    }

    updateFrame() {
    }
    addToScene(scene: Scene) {
        scene.add(this._cardMesh);
    }

}