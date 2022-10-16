import { Color, Mesh, MeshBasicMaterial, MeshBasicMaterialParameters, MeshPhongMaterial, MeshPhongMaterialParameters, RingGeometry, Scene, SphereGeometry, Vector3 } from "three";
import { MeshBase } from "./MeshBase";


export class PlayButton extends MeshBase {
    _position: Vector3;
    _parent: Mesh;
    _scaling: number;
    _mesh: Mesh;
    constructor(parent: Mesh, position?: Vector3) {
        super();
        this._position = position? position: new Vector3(0, 0, 0);
        this._scaling = 2;
        this._parent = parent;
        this._init();
    }

    _init() {
        const g = new RingGeometry(0.05, 0.1,1, 1, 0, 6.283185307179586);
        const materialParameters: MeshBasicMaterialParameters = {}
        materialParameters.color = new Color('rgb(150,150,255)');
        const material = new MeshBasicMaterial(materialParameters);

        const playBtn = new Mesh(g, material);
        this._mesh = playBtn;
        this._parent.children.push(playBtn);

        playBtn.position.add(this._position);
        playBtn.scale.y = 0.8;
        playBtn.parent = this._parent;
        // playBtn.position.add(this._position);
        // playBtn.position.add(this._parent.position);
        // playBtn.rotation.copy(this._parent.rotation);
        // playBtn.scale.copy(new Vector3(this._scaling, this._scaling, this._scaling));

    }

    updateFrame() {
        throw new Error("Method not implemented.");
    }
    addToScene(scene: Scene) {
        throw new Error("Method not implemented.");
    }

}