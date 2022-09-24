<script setup lang="ts">
import HelloWorld from "../components/HelloWorld.vue";
import { onMounted } from "vue";
import { SceneRenderer } from "@/canvas/scenes/SceneRenderer";
import { gsap, Linear } from "gsap";
import { ScrollTrigger } from "gsap/all";
onMounted(() => {
	const renderer = new SceneRenderer();

	//runtime
	gsap.registerPlugin(ScrollTrigger);
	// const timelineVars: GSAPTimelineVars = {}
	const scrollTriggerVars: ScrollTrigger.Vars = {}
	const tl1 = gsap.timeline({
		defaults: { duration: 1 },
		duration: 7,
		scrollTrigger: { trigger: "start1", scrub: true, start: "top top", end: "bottom bottom"},
	});
	var tubePerc = {
		percent: 0
	};
	tl1.to(renderer, {
        scroll: 1,
        ease: Linear.easeNone,
		duration: 1,
	}, 0)
    tl1.to(renderer, {
        scroll: 2,
        ease: Linear.easeNone,
        duration: 1
    }, 1);
    tl1.to(renderer, {
        scroll: 3,
        ease: Linear.easeNone,
        duration: 1
    }, 2);
});
</script>

<template>
	<main>
        <div class="target"> </div>
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
