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
    window.animationRenderer.renderObjs(renderer.scrollTriggerObjs);
});
</script>

<template>
    <main>

        <div class="canvas-container"> 
            <canvas id="canvas"> </canvas>
        </div>
        
        
        
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
.canvas-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
}

#canvas {

    background: inherit;
}
</style>
