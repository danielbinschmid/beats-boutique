<script setup lang="ts">
import HelloWorld from "../components/HelloWorld.vue";
import { onMounted } from "vue";
import * as THREE from "three";
import test from "node:test";
import { Clock } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// Our Javascript will go here.

onMounted(() => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  const canvas = document.getElementById("canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas
  });

  
  const clock = new THREE.Clock(true);

  renderer.setSize( window.innerWidth, window.innerHeight );

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

  const uniformData = {
    u_time: {
      type: 'f',
      value: clock.getElapsedTime()
    }
  }
  const boxMaterial = new THREE.ShaderMaterial({
    wireframe: true,
    uniforms: uniformData,
    vertexShader: `
    uniform float u_time;
    void main() {
      
      vec4 result;

      result = vec4(position.x, sin(position.z + u_time) + position.y, position.z, 1.0);
      gl_Position = projectionMatrix * modelViewMatrix * result;
    }`,
    fragmentShader: `
    void main() { gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0); }`
  })
  
  const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
  scene.add(boxMesh)
  function animate() {
    requestAnimationFrame( animate );
    uniformData.u_time.value = clock.getElapsedTime();
    /* cube.position.x = (cube.position.x + 0.01) % 10; 
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01; */
    renderer.render( scene, camera );
  }
  animate();
})

</script>

<template>
  <main>
    <canvas id="canvas"> </canvas>
    <HelloWorld msg = "ok" />
  </main>
</template>

<style scoped>
  #canvas {
  position: fixed;
  top: 0;
  left: 0;
}
</style>