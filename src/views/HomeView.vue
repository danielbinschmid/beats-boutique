<script setup lang="ts">
import HelloWorld from "../components/HelloWorld.vue";
import { onMounted } from "vue";
import * as THREE from "three";
import test from "node:test";
import { Clock, ShaderMaterial, ShaderMaterialParameters, BufferAttribute, ColorRepresentation, Color, BufferGeometry, SkinnedMesh, Object3D, Mesh, Matrix4, Blending } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// Our Javascript will go here.
// import Dragon from "../assets/chinese_dragon/scene.gltf"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import vertexShader from "../shader/vertexShader.glsl?raw";
import fragmentShader from "../shader/fragmentShader.glsl?raw";
import sphereVertex from "../shader/sphere/sphereVertex.glsl?raw";
import sphereFragment from "../shader/sphere/sphereFragment.glsl?raw";

const a: ShaderMaterialParameters = {}
onMounted(() => {
  // console.log(Dragon)
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const canvas = document.getElementById("canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas
  });
  const light = new THREE.AmbientLight(new THREE.Color(100, 0, 0), 0.01); // soft white light
  scene.add(light);
  const backgroundColor: ColorRepresentation = new Color(0.9, 0.9, 1)
  renderer.setClearColor(backgroundColor)
  const loader = new GLTFLoader();

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  scene.add(directionalLight);

  const clock = new THREE.Clock(true);

  renderer.setSize(window.innerWidth, window.innerHeight);

  /* const geometry = new THREE.BoxGeometry( 1, 1, 1, 1, 1, 1 );
  const material = new THREE.MeshNormalMaterial({
    wireframe: true
  })
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube ); */

  camera.position.z = 30;
  camera.position.x = 20;

  const orbitcontrols = new OrbitControls(camera, canvas);
  orbitcontrols.position0 = camera.position

  const boxGeometry = new THREE.BoxGeometry(16, 16, 16, 16, 16, 16)

  const geometry = new THREE.BufferGeometry()

  const vertices = new Float32Array([
    -1.0, -1.0, 1.0, // 0
    1.0, -1.0, 1.0, // 1
    1.0, 1.0, 1.0, // 2
    -1.0, 1.0, 1.0, // 3
  ])
  const indeces = new Float32Array([
    0, 1, 2,
    2, 3, 0
  ])

  geometry.setIndex(new THREE.BufferAttribute(indeces, 3))

  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3))

  const uniformData = {
    u_time: {
      type: 'f',
      value: clock.getElapsedTime()
    }
  }
  const boxMaterial = new THREE.ShaderMaterial({
    linewidth: 100,
    uniforms: uniformData,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
  })

  const sphereUniforms = {
    u_time: {
        type: 'f',
        value: clock.elapsedTime
      }
  }
  const sphereMaterial = new THREE.ShaderMaterial({
    blending: THREE.SubtractiveBlending,
    uniforms: sphereUniforms,
    vertexShader: sphereVertex,
    fragmentShader: sphereFragment,
  })


  loader.load(
    'chinese_dragon/scene.gltf',
    (gltf) => {
      gltf.scene.traverse((res: SkinnedMesh) => {
        // gltfGeometry = res.isMe 
        const constantScale = 4
        if (res.isMesh) {
          switch (res.name) {// (res.id) {
            case "Object_4": // plane
              break;
            case "Object_9": // tooth
              // scene.add(new THREE.Mesh(res.geometry, boxMaterial))
              break;
            case "Object_10": // stomach
              // res.geometry.scale()
              // scene.add(new THREE.Mesh(res.geometry, boxMaterial))
              res.geometry.scale(constantScale, constantScale, constantScale)
              scene.add(new THREE.Mesh(res.geometry, boxMaterial))
              break;
            case "Object_11": // body
              
              res.geometry.scale(constantScale, constantScale, constantScale)
              scene.add(new THREE.Mesh(res.geometry, boxMaterial))
              break;
            case "Object_12": // eyes
              break;
            case "Object_13": // nothing
              break;
            case "Object_14": // nothing
              break;
          }
          //if (res.id == 83 || res.id == 84) {
          //  const mesh = new THREE.Mesh(res.geometry, boxMaterial);
          //  scene.add(mesh)
          //}

        }
      })
      // called when the resource is loaded
      // scene.add(gltf.scene);
    },
    (xhr) => {
      // called while loading is progressing
      console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`);
    },
    (error) => {
      // called when loading has errors
      console.error('An error happened', error);
    },
  );
  const size = 1
  var sphereGeom = new THREE.SphereGeometry(size, 50, 50);
  var blueMaterial = new THREE.MeshNormalMaterial({ transparent: true, opacity: 0.5 });

  const nSpheres = 500;
  var sphere = new THREE.InstancedMesh(sphereGeom, sphereMaterial, nSpheres)
  for (var i = 0; i < nSpheres; i++) {
    const m: Matrix4 = new Matrix4()
    const universumSize = 160
    const sphereSize = 2.5
    m.set(sphereSize, 0, 0, Math.random() * universumSize - universumSize / 2,
          0, sphereSize, 0, Math.random() * universumSize - universumSize / 2,
          0, 0, sphereSize, Math.random() * universumSize - universumSize / 2,
          0, 0, 0, 1);
    sphere.setMatrixAt(i, m)

  }


  scene.add(sphere)

  var sphere2 = new THREE.Mesh(sphereGeom, boxMaterial)

  const boxMesh = new THREE.Mesh(geometry, boxMaterial)
  // scene.add(boxMesh)
  var nRender = 2;
  var curRender = 0
  function animate() {
    if (curRender % nRender == 0) {
      uniformData.u_time.value = clock.getElapsedTime();
      sphereUniforms.u_time.value = clock.getElapsedTime();
    } else {

    }
    requestAnimationFrame(animate);

    /* cube.position.x = (cube.position.x + 0.01) % 10; 
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01; */
    renderer.render(scene, camera);
  }
  animate();
})

</script>

<template>
  <main>
    <canvas id="canvas"> </canvas>
    <HelloWorld msg="ok" />
  </main>
</template>

<style scoped>
#canvas {
  position: fixed;
  top: 0;
  left: 0;
  background: aliceblue;
}
</style>