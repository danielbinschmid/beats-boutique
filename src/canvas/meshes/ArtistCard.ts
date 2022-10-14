import { BufferGeometry, Camera, ColorRepresentation, Mesh, PerspectiveCamera, PlaneGeometry, Scene, Vector3 } from "three";
import * as THREE from "three"
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry, TextGeometryParameters } from 'three/examples/jsm/geometries/TextGeometry.js';
import { MeshBase } from "./MeshBase";
import { SongMetaData } from "@/types";
import {  RotatingText } from "./RotatingText";

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
    for (var x  = 0; x < inp.length; x++) {
        const add = inp.at(x) == " "? "    " : inp.at(x) + " "; 
        out = out + add;
    }
    return out;
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

    constructor( pos: ArtistCardWorldPos, artist?: ArtistCardMetadata, title?: string) {
        super();
        this._animatedMeshes = [];
        this._title = title? title: "underdogs";
        this._artist = artist? artist: {
            artistName: "prodbycctv",
            songs: [{
                url: "music/2.mp3",
                songName: "youngboy",
                artistName: "prodbycctv"
            }]
        }

        this._globalPosition = pos.position;
        this._globalRotation = pos.rotation;
        this._lookAt = pos.lookAt;
        this._scaling = pos.scaling ? pos.scaling : new Vector3(30, 40, 0);
        this._init()
    }

    _init() {
        // this._cardMesh = new Mesh(THREE.)
        const geometry = new PlaneGeometry(1, 1, 2, 2);
        const material = new THREE.MeshStandardMaterial({
            wireframe: true,
            color: "rgba(0, 0, 0)",
            transparent: true,
            opacity: 0
        });
        
        const mesh = new Mesh(geometry, material)
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

        // console.log(renderer);
        // rotatingText(renderer._scene, renderer);
        const loader = new FontLoader();


        loader.load('fonts/kawasaki.json', (font) => {
            // constants
            const marginHorizontal = 0.05
            const marginVertical = 0.05
            const boundary = 0.5;
            const fontSize = 0.06;
            const lineHeight = 0.8 *  fontSize;
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
            const artistNameMesh = new Mesh(new TextGeometry(processTextInputKawasaki("artist: " + this._artist.artistName), h2), new THREE.MeshNormalMaterial());
            artistNameMesh.position.y += boundary - 2* marginVertical - lineHeight * 2;
            artistNameMesh.position.x -= boundary - marginHorizontal;
            artistNameMesh.scale.y = yScale;
            artistNameMesh.scale.x = xScale
            artistNameMesh.parent = this._cardMesh;
            this._cardMesh.children.push(artistNameMesh);



            const rotatingText = new RotatingText(font, processTextInputKawasaki(this._artist.songs[0].songName), this._cardMesh);
            this._animatedMeshes.push(rotatingText);
        });
    }

    _addChildren(mesh: Mesh) {
        //
    }

    updateFrame() {
        for (const mesh of this._animatedMeshes) {
            mesh.updateFrame();
        }
    }
    addToScene(scene: Scene) {
        scene.add(this._cardMesh);
    }

}