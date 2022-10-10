<script setup lang="ts">
import HelloWorld from "../components/HelloWorld.vue";
import { onMounted } from "vue";
import { SceneRenderer } from "@/canvas/scenes/SceneRenderer";
import { gsap, Linear } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { AnimationRenderer } from "@/canvas/animations/AnimationRenderer";
import Sidebar from "@/components/Sidebar.vue";
import NavigationWrapper from "@/components/NavigationWrapper.vue";
onMounted(() => {
    const animationRenderer = new AnimationRenderer();
    window.animationRenderer = animationRenderer;
    const renderer = new SceneRenderer();
    window.animationRenderer.renderVars(renderer.scrollTriggerVars);
    /**
     * Next: Dragon turns to the right
     * Dragon fireball shoot to the tunnel, fireball explosion, tunnel lights up
     * Tunnel design
     * 
     * Then, camera movement to the dragon's position, then movement through tunnel
     * 
     * Arrival at "About Me"
     * 
     * Next challenge: Tunnel, dragon and fireball movement
     */
});
</script>

<template>
    <main>
        <div class="target"> </div>
        <canvas id="canvas"> </canvas>
        
        
        <navigation-wrapper>
            <template v-slot:sidebar>
                <sidebar />
            </template>

            <template v-slot:content>
                <HelloWorld msg="ok" />
            </template>
        </navigation-wrapper>
        <!--  -->

    </main>
</template>

<style scoped>
#canvas {
    right: 0;
    bottom: 0;
    position: fixed;
    top: 0;
    left: 0;
    background: aliceblue;
}
</style>
