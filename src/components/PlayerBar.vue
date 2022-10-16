<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import * as ui from "./uiSizeCalculation";




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
                    <img src="https://chillhop.com/wp-content/uploads/2020/09/0255e8b8c74c90d4a27c594b3452b2daafae608d-1024x1024.jpg"
                        alt="" />

                    <div>
                        <h2>Quran</h2>
                        <h3>Hakim Omari</h3>
                    </div>
                </div>
                <div class="player">
                    <div>
                        <input type="range"/>
                        <div></div>
                    </div>
                    <span>start</span>
                    <span>end</span>
                </div>
                <div class="player-control">
                    <div class="btn">
                        <img src="music_player/Previous.svg">
                    </div>
                    <div class="btn">
                        <img src="music_player/Play.svg">
                    </div>
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
                <audio src="./music/2.mp3"></audio>
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

.sound-control i {
    color: black;
}
</style>