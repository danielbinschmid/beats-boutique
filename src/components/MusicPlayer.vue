<script setup lang="ts">
import { reactive } from "vue";
import * as ui from "./uiSizeCalculation";

const probs = defineProps<{
    artistName?: string;
    audioURL?: string;
    songName?: string;
    type?: string;
}>();

const isMobile = reactive({ val: ui.isMobile() });

window.addEventListener('resize', () => {
    isMobile.val = ui.isMobile();
})

const nElements = 2;

const options = {
    defaultSpeed: '1.00',
    speeds: ['1.25', '1.50', '2.00', '0.75'],
    loop: true,
    skipBackInterval: 15,
    jumpForwardInterval: 15,
    features: [
        "playpause",
        "progress",
        "current",
        "duration",
        "skipback",
        "changespeed",
        "volume",
        "jumpforward",
    ]
}


</script>

<template>
    <div class="music-player">
        <div class="playerBox" :style="{flexFlow: isMobile.val ? 'column nowrap': 'row nowrap'}">
            <div :style="{width: isMobile.val? '100%': (100 / nElements) +'%'}" class="basicBox">
                <audio controls class="audio" >
                    <source :src="audioURL? audioURL: 'music/2.mp3'" :type="type? type :'audio/mpeg'">
                    <!--<source src="music/2.mp3" type="audio/ogg"> Your browser does not support the audio tag. -->

                </audio>
                
            </div>

            <div class="basicBox" :style="{flexFlow: isMobile.val ? 'column nowrap': 'row nowrap', marginTop: isMobile.val? '2%': '',
            width: isMobile.val? '100%': (100 / nElements) +'%'}">
                <h2>
                    {{ songName? songName: 'Unknown'}}
                </h2>
                <h3 :style="{marginLeft: isMobile.val? '': '5%'}">
                    {{ artistName? ' by ' + artistName: ' by Unknown' }}
                </h3>
            </div>

        </div>

    </div>
</template>

<style scoped>
.playerBox {
    display: flex;
    margin-top: 5%;
    justify-content: space-evenly;
    margin-bottom: 5%;
}

.basicBox {

    display: flex;
    justify-content: center;
    align-items: center
}

.audio {
    mix-blend-mode: exclusion;
    align-self: center
}

h2 {
    font-weight: bold;
    text-align: center;
}
</style>