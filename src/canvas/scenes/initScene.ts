import { Color, ColorRepresentation, Mesh, Vector3 } from "three";
import { SceneRenderer } from "./SceneRenderer";
import * as THREE from "three";
import { FireComets } from "../meshes/FireComets";
import { Tunnel } from "../meshes/Tunnel";
import { Spheres } from "../meshes/Spheres";
import { DragonGltf } from "../gltf/Dragon";
import { MeshMovement } from "../animations/MeshMovement";
import * as gsap from "gsap";
import { AnimationLine } from "../animations/AnimationLine";
import { CameraShift } from "../animations/CameraShift";
import { MeshLookAt } from "../animations/MeshLookAt";
import { camFovAnimation } from "../animations/CamFovAnimation";
import { CamFovAnimationOptions, MeshMovementOptions } from "@/types";

export function initScene(renderer: SceneRenderer) {
    // initialize parameter holder
    
    const vm = renderer;
    

    // background color
    const backgroundColor: ColorRepresentation = new Color(0.9, 0.9, 1); // rgb(240, 248, 255) rgb(229.5, 229.5, 255)
    renderer._renderer.setClearColor(backgroundColor);

    // add light
    const light = new THREE.AmbientLight(new THREE.Color(100, 0, 0), 0.01); // soft white light
    renderer._scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    renderer._scene.add(directionalLight);

    


    // ----------- STATIC FIXED POSITIONS ------------
    // camera
    const initialCameraPos: Vector3 = new Vector3(0, -10, 20);  // Starting position of camera
    const cameraPos1 = new Vector3(40, 0, 40); // position of camera after first movement in introduction animation

    const cameraPosBehindDragon = new Vector3(-20, 0, 10);

    // dragon pos
    const dragonCenter = new Vector3(20, 0, -10); // dragon position
    const initialLookAtDragon = new Vector3(20, 0, 1);


    // ------------------- MESHES ---------------------
    renderer._clock = new THREE.Clock(true);

    renderer._addMesh(new FireComets());
    const tunnel = new Tunnel(new Vector3(100, 0, 95), 100, (3 * Math.PI) / 2)
    renderer._addMesh(tunnel);
    renderer._addMesh(new Spheres(false, dragonCenter, undefined, true));
    renderer._addMesh(new Spheres(true, dragonCenter));

    const dragon = new DragonGltf(dragonCenter, undefined, rotateDragon);
    renderer._addMesh(dragon);




    // --------------NON-STATIC POSITIONS --------------
    const checkpoints = tunnel.checkpoints;
    const tunnelPos = checkpoints[0];


    
    // ----------------- TIME CHECKPOINTS ------------------
    const globalEnd = window.nSections - 1;

    // camera movements
    const endIntroMovement = 1;

    const startMovementBehindDragon = 2.5;
    const endMovementBehindDragon = 3;

    const startMovementToDragon = 3;
    const endMovementToDragon = 3.8;

    const startTunnelMovement = 4;
    const endTunnelMovement = 11;

    // lookats
    const endLookAtDragon = 3;
    const endLookAtTunnel = 3.8;

    const endDragonLookAtInitial = 3;
    const endDragonLookAtTunnel = 3.8;

    // cam. fov
    // const zoomOut = { start: 4, end: startTunnelMovement };
   //  const zoomIn = { start: endTunnelMovement - 0.5, end: endTunnelMovement };


    const tunnelMovementDuration = 1;
    const breakDuration = 0.5;
    const zoomDuration = 0;
    const nTunnelCheckpoints = 2;
    const nBeats = 5;
    const beatSectionDuration = 0;
    const enterHyperspaceDuration = 1;

    // first move behind dragon
    // then move inside dragon and look at tunnel
    // ----------------- ANIMATIONS -------------------
    renderer.scrollTriggerVars = {};
    renderer.scrollTriggerVars["global"] = {
        start: 0,
        end: globalEnd,
        to: globalEnd,
        value: 0,
    };

    /********** CAMERA **********/

    // CAMERA MOVEMENTS
    renderer._camera.position.x = initialCameraPos.x;
    renderer._camera.position.y = initialCameraPos.y;
    renderer._camera.position.z = initialCameraPos.z;

    new MeshMovement([renderer._camera], {
        startPos: new Vector3().copy(renderer._camera.position),
        endPos: cameraPos1,
        start: 0,
        end: endIntroMovement,
        id: "camera intro movement",
        scene: renderer
    });

    new MeshMovement([renderer._camera], {
        startPos: cameraPos1,
        endPos: cameraPosBehindDragon,
        start: startMovementBehindDragon,
        end: endMovementBehindDragon,
        id: "move cam behind the dragon",
        scene: renderer,
    });

    new MeshMovement([renderer._camera], {
        startPos: cameraPosBehindDragon,
        endPos: dragonCenter,
        start: startMovementToDragon,
        end: endMovementToDragon,
        id: "Camera movement inside of dragon",
        scene: renderer,
        ease: gsap.Power2.easeInOut
    });


    // CAMERA LOOKATS
    renderer._camera.lookAt(dragonCenter);
    const lookAtLine = new AnimationLine(0, endLookAtTunnel, "landing page animation", renderer);

    lookAtLine.addAnimation(new CameraShift(renderer._camera, dragonCenter, dragonCenter), { start: 0, end: endLookAtDragon }, "fixate camera during intro animation");
    lookAtLine.addAnimation(new CameraShift(renderer._camera, dragonCenter, tunnelPos), { start: endLookAtDragon, end: endLookAtTunnel }, "Look at tunnel start");

    // jump through beats
    var curTime = startTunnelMovement + enterHyperspaceDuration;
    // const fovLine = new AnimationLine(startTunnelMovement, endTunnelMovement, "tunnelDiscovery", renderer);

    camFovAnimation(renderer._camera, {
        start: startTunnelMovement,
        end: startTunnelMovement + enterHyperspaceDuration,
        targetFov: 120,
        scene: renderer,
        id: "fovIn",
        animationLine: undefined,
    });

    // camFovAnimation(renderer._camera, {
    //     start: curTime + zoomDuration - breakDuration + tunnelMovementDuration,
    //     end: curTime + zoomDuration + tunnelMovementDuration,
    //     targetFov: 100,
    //     scene: renderer,
    //     id: "fovIn" + b,
    //     animationLine: undefined
    // });

    for (var b = 0; b < nBeats; b++) {

        // Movement
        for (var c = 0; c < nTunnelCheckpoints; c++) {
            const start = curTime + (c / nTunnelCheckpoints) * tunnelMovementDuration
            const end = curTime + zoomDuration + ((c + 1) / nTunnelCheckpoints) * tunnelMovementDuration

            const moveOpts: MeshMovementOptions = {
                startPos: b == 0 && c == 0 ? dragonCenter: tunnel.getCheckpointAt((nTunnelCheckpoints) * b + c - 1),
                endPos: tunnel.getCheckpointAt((nTunnelCheckpoints) * b + c),
                start:start,
                end: end,
                id: "tunnel movement for beat " + b + " and ring " + c,
                scene: renderer,
            }
           new MeshMovement([renderer._camera], moveOpts);

            // lookat
            const l = new AnimationLine(start, end, "c" + c + "b" + b, renderer);
            const lookat = new MeshLookAt([renderer._camera], tunnel.getCheckpointAt((nTunnelCheckpoints) * b + c - 0.5), tunnel.getCheckpointAt((nTunnelCheckpoints) * b + c + 0.5));
            l.addAnimation(lookat, {start: start, end: end}, "lookat " + c + " for beat " + b);

            console.log(b * nTunnelCheckpoints + c);
        }   

        

        curTime += zoomDuration + tunnelMovementDuration + beatSectionDuration;
    }

 
    
    /********** CAMERA END **********/



    // @@@ Rotate dragon to the right @@@

    function rotateDragon(mesh: Mesh, meshName: string) {
        const line3 = new AnimationLine(endDragonLookAtInitial, endDragonLookAtTunnel, "line3");
        mesh.lookAt(initialLookAtDragon);
        const rotationLookAt = new MeshLookAt([mesh], initialLookAtDragon, tunnelPos);
        line3.addAnimation(rotationLookAt, { start: endDragonLookAtInitial, end: endDragonLookAtTunnel }, meshName)
        const triggerVars = {}
        line3.registerScrollTriggerVars(triggerVars);
        window.animationRenderer.renderVars(triggerVars);
        vm._animationLines.push(line3);
    }

    
    
}