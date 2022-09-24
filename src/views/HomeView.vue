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
	// const scrollTriggerVars: ScrollTrigger.Vars = {}

	const tl1 = gsap.timeline({
		defaults: { duration: 1 },
		duration: 3,
		scrollTrigger: { trigger: "start1", scrub: true, start: "top center" },
	});
	var tubePerc = {
		percent: 0
	};
	tl1.to(tubePerc, {
		percent: 0.97,
		ease: Linear.easeNone,
		duration: 10,
		onUpdate: function () {
            console.log("perce:T" + renderer.scroll)
			renderer.scroll = tubePerc.percent;
		},
	});
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
