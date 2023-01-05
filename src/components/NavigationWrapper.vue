<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import * as ui from "./uiSizeCalculation";
/* 
Inspired from: https://tympanus.net/codrops/2013/08/28/transitions-for-off-canvas-navigations/

there are still some quirks for animation 3, 6, 7, 8 & 14 
as they do not animate back gracefully  
(those are the navs in the div with class st-pusher)

https://codepen.io/kyunwang/pen/zNOoxb
*/


const menuBtn: {value: HTMLButtonElement} = ref(null);
const playerBtn: {value: HTMLButtonElement} = ref(null);
onMounted(() => {
    var menu = document.querySelector('#st-container');
    var pusher = document.querySelector('.st-pusher');
    // to store the corresponding effect
    var effect;

    menuBtn.value.onclick = addClass;
    playerBtn.value.onclick = addClass;
    // adding a click event to all the buttons

    pusher.addEventListener('click', closeMenu);


    function addClass(e) {
        // to get the correct effect
        effect = e.target.getAttribute('data-effect');
        // adding the effects
        menu.classList.toggle(effect);
        menu.classList.toggle('st-menu-open');

        // console.log(e.target.getAttribute('data-effect'));
    }

    function closeMenu(el) {
        // if the click target has this class then we close the menu by removing all the classes
        if (el.target.classList.contains('st-pusher')) {
            menu.classList.toggle(effect);
            menu.classList.toggle('st-menu-open');
            // console.log(el.target);
        }
    }
})


const isMobile = reactive({ val: ui.isMobile() });

window.addEventListener('resize', () => {
    isMobile.val = ui.isMobile();
})

</script>

<template>
    <div class="navigation-wrapper">
        <div id="st-container" class="st-container">

            <nav class="st-menu-1 st-effect-1" id="menu-1" :style="{width: isMobile.val ? '70vw':'30vw'}">
                <slot name="sidebar"></slot>
            </nav>
            <nav class="st-menu-2 st-effect-2" id="menu-2" :style="{width: isMobile.val ? '70vw':'30vw'}">
                <slot name="player"></slot>
            </nav>

            <div class="st-pusher">
                <slot name="content"></slot>

                <div id="st-trigger-effects" class="menu-btn">
                    <button data-effect="st-effect-1" class="btn" type="button" ref="menuBtn">
                        <img src="/menu.svg" class="svg">
                    </button>
                </div>

                <div id="st-trigger-effects" class="player-btn">
                    <button data-effect="st-effect-2" class="btn" type="button" ref="playerBtn">
                        <img src="/player.svg" class="svg">
                    </button>
                </div>
                <hr />
                <!-- /st-content -->
            </div>
        </div>
    </div>
</template>

<style scoped>

.svg {

    pointer-events: none;
}
.btn {
    width: 8vh;
    height: 8vh;
    border: none;
    color:rgba(173, 216, 230, 0.5);
    background-color: rgba(0, 0, 0, 0);
    font-size: xx-large;
    cursor: pointer;
    display: inline-block;
    padding: 2vh;
    margin: 2vh;
}

.btn:hover {
    -moz-border-radius-topleft: 10px;
    -moz-border-radius-topright: 10px;
    -moz-border-radius-bottomright: 0px;
    -moz-border-radius-bottomleft: 0px;
    -webkit-border-radius: 10px 10px 10px 10px;
    border-radius: 10px 10px 10px 10px;
    background-color: rgba(100, 100, 100, 0.4);
}


.menu-btn {
    position: fixed;
    top: 0;
    right: 0;
    mix-blend-mode: difference;
    background-color: rgba(100, 100, 100, 0);
}
.player-btn {
    position: fixed;
    top: 0;
    left: 0;
    mix-blend-mode: difference;
    background-color: rgba(100, 100, 100, 0);
}


.st-pusher {
    -webkit-transition: -webkit-transform 0.5s;
    transition: transform 0.5s;
}

.st-pusher::after {
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    filter: blur(100px);
    background: rgba(0, 240, 255, 0.5);
    mix-blend-mode: difference;
    content: '';
    opacity: 0;
    -webkit-transition: opacity 0.5s, width 0.1s 0.5s, height 0.1s 0.5s;
    transition: opacity 0.5s, width 0.1s 0.5s, height 0.1s 0.5s;
}

.st-menu-open .st-pusher::after {
    position: fixed;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    opacity: 1;
    -webkit-transition: opacity 0.5s;
    transition: opacity 0.5s;
}

.st-menu-1 {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 100;
    visibility: hidden;
    width: 200px;
    height: 100%;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
}

.st-menu-2 {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    visibility: hidden;
    width: 200px;
    height: 100%;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
}

.st-menu-2::after {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    content: '';
    opacity: 1;
    -webkit-transition: opacity 0.5s;
    transition: opacity 0.5s;
}

.st-menu-open .st-menu-1::after {
    width: 0;
    height: 0;
    opacity: 0;
    -webkit-transition: opacity 0.5s, width 0.1s 0.5s, height 0.1s 0.5s;
    transition: opacity 0.5s, width 0.1s 0.5s, height 0.1s 0.5s;
}

.st-menu-open .st-menu-2::after {
    width: 0;
    height: 0;
    opacity: 0;
    -webkit-transition: opacity 0.5s, width 0.1s 0.5s, height 0.1s 0.5s;
    transition: opacity 0.5s, width 0.1s 0.5s, height 0.1s 0.5s;
}


/* Effect 1: Slide in on top */
.st-effect-1.st-menu-1 {
    visibility: visible;
    -webkit-transform: translate3d(105%, 0, 0);
    transform: translate3d(105%, 0, 0);
}

.st-effect-1.st-menu-open .st-effect-1.st-menu-1 {
    visibility: visible;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}

.st-effect-1.st-menu-1::after {
    display: none;
}


/* Effect 2: Slide from the left */
.st-effect-2.st-menu-2 {
    visibility: visible;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
}

.st-effect-2.st-menu-open .st-effect-2.st-menu-2 {
    visibility: visible;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}

.st-effect-2.st-menu-2::after {
    display: none;
}


/* Fallback example for browsers that don't support 3D transforms (and no JS fallback) */
.no-csstransforms3d .st-pusher,
.no-js .st-pusher {
    padding-left: 300px;
}
</style>