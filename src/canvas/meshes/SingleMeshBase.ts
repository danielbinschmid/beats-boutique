

import { MeshBase } from "./MeshBase";
import * as THREE from "three";

import { Clock, Matrix4, Scene, Vector2, Vector3, Mesh } from "three";
export abstract class SingleMeshBase extends MeshBase {
    mesh: Mesh;
    constructor(mesh: Mesh) {
        super()
    }
} 