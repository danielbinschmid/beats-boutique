import { Scene } from "three";




export abstract class MeshBase {

    constructor() {
    }

    abstract updateFrame();


    abstract addToScene(scene: Scene);

}