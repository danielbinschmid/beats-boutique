import * as THREE from "three";
import { Mesh, Object3D, Scene, Vector3 } from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { Font, FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { InstancedFlow, Flow } from "three/examples/jsm/modifiers/CurveModifier.js";
import { SceneRenderer } from "../scenes/SceneRenderer";
import { processTextInputKawasaki } from "./ArtistCard";

import { MeshBase } from "./MeshBase";


export class RotatingText extends MeshBase {
    _scaling;
    _parent: Mesh;
    _font: Font;
    _scene: Scene;
    _flow: InstancedFlow;
    _text: string;
    constructor(font: Font, text: string, parent?: Mesh, scaling?: number) {
        super();
        this._text = text;
        this._font = font;
        this._parent = parent;
        this._scaling = scaling ? scaling : 6;
        this._init();
    }

    

    _init() {
        const curves = this._transformCurveVertices();

        const geometry = new TextGeometry(this._text, {
            font: this._font,
            height: 0.0000001,
            size: 0.2,
            bevelEnabled: false,
        });


        geometry.rotateX(Math.PI);
        geometry.scale(2.4, 1, 1);
        geometry.scale(this._scaling, this._scaling, this._scaling);

        // geometry.applyMatrix4(parent.matrixWorld)
        // const color: THREE.ColorRepresentation = 'sky'
        const material = new THREE.MeshNormalMaterial()

        const numberOfInstances = 8;
        this._flow = new InstancedFlow(numberOfInstances, curves.length, geometry, material);
        curves.forEach(({ curve }, i) => {

            this._flow.updateCurve(i, curve);
            // this._flow.object3D.parent = this._parent;
            // this._flow.object3D.position.copy(this._parent.position);
            this._flow.object3D.setColorAt(i, new THREE.Color(0xffffff * Math.random()));
            this._parent.children.push(this._flow.object3D);

        });

        for (let i = 0; i < numberOfInstances; i++) {

            const curveIndex = i % curves.length;
            this._flow.setCurve(i, curveIndex);
            this._flow.moveIndividualAlongCurve(i, i * 1 / numberOfInstances);
        }


    }

    _transformCurveVertices() {
        return this._genCurveVertices().map((curvePoints) => {
            const curveVertices = curvePoints.map((vertex) => {
                const transformed = new Vector3(vertex.x * this._scaling, vertex.y * this._scaling, vertex.z * this._scaling);
                transformed.applyEuler(new THREE.Euler(this._parent.rotation.x, this._parent.rotation.y, this._parent.rotation.z))
                transformed.add(this._parent.position);
                
                return transformed;
            });

            const curve = new THREE.CatmullRomCurve3(curveVertices, true, "centripetal");

            const points = curve.getPoints(50);
            const line = new THREE.LineLoop(
                new THREE.BufferGeometry().setFromPoints(points),
                new THREE.LineBasicMaterial({ color: 0x00ff00 })
            );

            return {
                curve,
                line
            };
        });
    }

    _genCurveVertices() {
        return [[
            { x: 1, y: - 0.5, z: - 1 },
            { x: 1, y: - 0.5, z: 1 },
            { x: - 1, y: - 0.5, z: 1 },
            { x: - 1, y: - 0.5, z: - 1 },
        ],
        [
            { x: - 1, y: 0.5, z: - 1 },
            { x: - 1, y: 0.5, z: 1 },
            { x: 1, y: 0.5, z: 1 },
            { x: 1, y: 0.5, z: - 1 },
        ]];
    }



    updateFrame() {
        if (this._flow) this._flow.moveAlongCurve(0.001);

    }
    addToScene(scene: THREE.Scene) {
        this._scene = scene;
    }

}
