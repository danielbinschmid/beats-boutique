<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import * as ui from "./uiSizeCalculation";
import { gsap, Linear } from "gsap";
const nWebglContentSections = 4;
const sectionNames = ["Beats", "Samples", "Artists", "Releases"]

function scrollTo(target: number) {
    const targetID = "webglContent_" + target;
    gsap.to(window, {duration: 2, scrollTo: "#" + targetID});

}

const menuAfterContent = [
    "About"
]

const menuBeforeContent = [
    "Home",
    "Menu"
]

function scrollToSection(target: string) {
    const targetID = "section_" + target;
    gsap.to(window, {duration: 2, scrollTo: "#" + targetID});
}

// const menuRefs = ref([]);

onMounted(() => {
    // const links: HTMLElement[] = menuRefs.value;
    /**
     * link.classList.remove("hover"); for removing hover
     * link.classList.add("hover"); for adding hover
     */

})
//For Demo only
// var links = document.getElementsByClassName('link')


const isMobile = reactive({ val: ui.isMobile() });

window.addEventListener('resize', () => {
    isMobile.val = ui.isMobile();
})
</script>

<template>
    <div class="sidebar">

        <div class="container">
            <div v-for="(item, i) in menuBeforeContent" :key="i">
                <div class="link" @click="scrollToSection(item)">
                    <div class="text"> {{ item }}</div>
                </div>
            </div>
            <hr />
            <div v-for="(item, i) in sectionNames" :key="item">
                <div class="link" @click="scrollTo(i + 1)">
                    <div class="text" > {{ item }}</div>
                </div>
            </div>
            <hr />
            <div v-for="(item, i) in menuAfterContent" :key="i">
                <div class="link" @click="scrollToSection(item)">
                    <div class="text"> {{ item }}</div>
                </div>
            </div>

        </div>




    </div>
</template>

<style scoped>
hr {
    margin: 10%
}

.container {
    mix-blend-mode: difference;
    width: 100%;
    background: rgba(100, 100, 100, 0.5);
    margin: 0px auto;
    padding: 0px;
    position: fixed;
    right: 0px;
    top: 0px;
    height: 100vh;
    display: flex;
    flex-flow: column;
    justify-content: center;
}

.link {
    font-size: x-large;
    font-weight: 300;
    text-align: center;
    position: relative;
    height: 40px;
    margin-top: 10px;
    overflow: hidden;
    width: 90%;
    margin-left: 5%;
    cursor: pointer;
}

.link:after {
    content: '';
    position: absolute;
    width: 80%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    bottom: 50%;
    left: -100%;
    transition-delay: all 0.5s;
    transition: all 0.5s;
}

.link:hover:after,
.link.hover:after {
    left: 100%;
}

.link .text {
    text-shadow: 0px -40px 0px rgba(255, 255, 255, 1);
    transition: all 0.75s;
    transform: translateY(100%) translateZ(0);
    transition-delay: all 0.25s;
}

.link:hover .text,
.link.hover .text {
    text-shadow: 0px -40px 0px rgba(255, 255, 255, 0);
    transform: translateY(0%) translateZ(0) scale(1.1);
    font-weight: 600;
}
</style>