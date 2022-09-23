<script setup lang="ts">
import HelloWorld from "../components/HelloWorld.vue";
import { onMounted } from "vue";
import { SceneRenderer } from "@/canvas/scenes/SceneRenderer";
onMounted(() => {
	const renderer = new SceneRenderer();
});
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
