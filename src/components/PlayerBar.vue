<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import * as ui from "./uiSizeCalculation";

onMounted(() => {

    audio.value.onloadedmetadata = () => {
        durationSlider.value.value = "" + audio.value.currentTime;
        durationSlider.value.setAttribute("max", "" + audio.value.duration);
        startTimeAudio.value = timeFormat(audio.value.currentTime);
        endTimeAudio.value = timeFormat(audio.value.duration);
        audio.value.ontimeupdate = () => {
            durationSlider.value.value = "" + audio.value.currentTime;
            startTimeAudio.value = timeFormat(audio.value.currentTime);
            progressBar.value.style.left = `${(audio.value.currentTime / audio.value.duration) * 100}%`
        }

    }

})

//format current/duration time
function timeFormat(time) {
    return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
}

const startTimeAudio = reactive({ value: "0" });
const endTimeAudio = reactive({ value: "1" });
const audio: { value: HTMLAudioElement } = ref(null);
const durationSlider: { value: HTMLInputElement } = ref(null);
const progressBar: { value: HTMLElement } = ref(null);

const svgPrefix = "music_player/"
const svgSources = {
    play: svgPrefix + "Play.svg",
    pause: svgPrefix + "Pause.svg"
}
const playBtnSrc = reactive({ value: svgSources.play });

const isPlaying = reactive({ value: false });
function play() {
    if (isPlaying.value) {
        audio.value.pause();
        playBtnSrc.value = svgSources.play;
    } else {
        audio.value.play();
        playBtnSrc.value = svgSources.pause;
    }
    isPlaying.value = !isPlaying.value;
}

const isMobile = reactive({ val: ui.isMobile() });

window.addEventListener('resize', () => {
    isMobile.val = ui.isMobile();
})
</script>

<template>
    <div class="player-bar">

        <div class="container">
            <div>
                <div class="song-info">
                    <div>
                        <h2>Quran</h2>
                        <h3>Hakim Omari</h3>
                    </div>
                </div>
                <div class="player">
                    <div>
                        <input type="range" ref="durationSlider" />
                        <div ref="progressBar"></div>
                    </div>
                    <span>{{ startTimeAudio.value}}</span>
                    <span>{{endTimeAudio.value}}</span>
                </div>
                <div class="player-control">
                    <div class="btn">
                        <img src="music_player/Previous.svg">
                    </div>
                    <button type="button" :onclick="play" button-name="Play music">

                        <img :src="playBtnSrc.value">

                    </button>
                    <div class="btn">
                        <img src="music_player/Next.svg">
                    </div>
                    <!--
                    <i class="fas fa-backward" id="backward"></i>
                <i class="fas fa-play" id="play-pause"></i>
                <i class="fas fa-forward" id="forward"></i>
                 -->

                </div>
                <div class="sound-control">
                    <i class="fas fa-volume-down"></i>
                    <input type="range" max="100" step="1" />
                    <i class="fas fa-volume-up"></i>
                </div>
                <audio src="./music/2.mp3" ref="audio" preload="metadata"></audio>
            </div>



        </div>
    </div>


</template>

<style scoped>
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


.song-info {
    margin-bottom: 10%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}

.song-info img {
    width: 50%;
    border-radius: 50%;
    margin-bottom: 10%;
}

.song-info .playing {
    -webkit-animation: playRotate 6s infinite forwards linear;
    animation: playRotate 6s infinite forwards linear;
}

.song-info h2 {
    color: transparent;
    background-image: -webkit-gradient(linear, left top, right top, from(#ff9966), to(#ff5e62));
    background-image: linear-gradient(to right, #ff9966, #ff5e62);
    -webkit-background-clip: text;
    background-clip: text;
    margin-bottom: 0.2rem;
}

.song-info h2,
.song-info h3 {

    font-weight: 400;
    text-align: center;
}

.song-info h3 {
    font-size: 0.8rem;

}

.player {
    min-height: 7vh;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
}

.player div {
    width: 100%;
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    border-radius: 8px;
    overflow: hidden;
}

.player div div {
    min-width: 100%;
    min-height: 3px;
    background-color: #adcaf2;
    border-radius: 8px;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
}



.player span {

    font-size: 0.8rem;
}

.player-control {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: space-evenly;
    max-height: 5%;
    margin-bottom: 10%;
}


.player-control i {
    cursor: pointer;
    margin: 0 1.5rem;
    font-size: 1.3rem;
}

.player-control .btn {
    height: 100%;
    width: 5%;
    display: flex;

}



.player-control button {
    cursor: pointer;
    display: inline-block;
    width: 10%;
    height: 80%;
    background: rgba(0, 0, 0, 0);
    border-width: 0;
}

.player-control button:hover {
    background: rgba(0, 0, 0, 0.5);
}



.sound-control {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin: 0.2rem auto;
    width: 60%;
}

.sound-control input {
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    margin: 0 0.5rem;
    max-height: 2px;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: #adcaf2;
    border-radius: 8px;
    outline: none;
}

.sound-control input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #adcaf2;
    cursor: pointer;
}

.player input {
    width: 100%;
    max-height: 3px;
    cursor: pointer;
    -webkit-appearance: none;
    border-radius: 8px;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    background: #ff9966;
    z-index: 0;
    -webkit-transition: width 0.2s ease;
    transition: width 0.2s ease;
}

.player input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #ff9966;
    cursor: pointer;
}

.sound-control i {
    color: black;
}
</style>