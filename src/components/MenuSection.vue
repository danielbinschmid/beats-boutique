<script setup lang="ts">
import VueSection from "@/components/ui_comps/VueSection.vue"
import { gsap, Linear } from "gsap";

const nWebglContentSections = 4;
const sectionNames = ["BEATS", "SAMPLES", "ARTISTS", "RELEASES"]

function scrollTo(target: number) {
    const targetID = "webglContent_" + target;
    gsap.to(window, {duration: 2, scrollTo: "#" + targetID});

}


</script>

<template>
    <div class="menu-section">
        <vue-section>
            <div class="container">
                <div v-for="(item, i) in sectionNames" :key="i">
                    <h2 :content="item" @click="scrollTo(i + 1)"> {{ item }} </h2>
                </div>
            </div>

        </vue-section>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-flow: column;
    height: 100%;
    margin-top: 10%;
    margin-bottom: 10%;
}

h2 {
    width: fit-content;
    cursor: pointer;
    font-size: 44px;
    font-weight: bold;
    text-align: center;
    transition: 50ms;
}

h2::before {
    display: block;
    width: fit-content;
    content: attr(content);
    font-weight: bold;
    color: transparent;
    height: 1px;
    overflow: hidden;
    visibility: hidden;
}

h2:hover {
    font-weight: 100;
    transition: 200ms;
}
</style>
