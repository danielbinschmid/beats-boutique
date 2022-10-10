<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import * as ui from "./uiSizeCalculation";


//For Demo only
var links = document.getElementsByClassName('link')
for (var i = 0; i <= links.length; i++)
    addClass(i)


function addClass(id) {
    setTimeout(function () {
        if (id > 0) links[id - 1].classList.remove('hover')
        links[id].classList.add('hover')
    }, id * 750)
}

const isMobile = reactive({ val: ui.isMobile() });

window.addEventListener('resize', () => {
    isMobile.val = ui.isMobile();
})
</script>

<template>
    <div class="sidebar">

        <div class="container" >
            <div class="link">
                <div class="text">Home</div>
            </div>
            <div class="link">
                <div class="text">Projects</div>
            </div>
            <div class="link">
                <div class="text">Art</div>
            </div>
            <div class="link">
                <div class="text">Social</div>
            </div>
            <div class="link">
                <div class="text">Setup</div>
            </div>
            <div class="link">
                <div class="text">Help</div>
            </div>
        </div>




    </div>
</template>

<style scoped>
.btn {
    position: fixed;
    left: 0;
    top: 0;
}


/* Effect 1: Slide in on top */
.st-effect-1.st-menu {
    visibility: visible;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
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