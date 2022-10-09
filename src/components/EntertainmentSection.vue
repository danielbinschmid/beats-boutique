<script setup lang="ts">
import MusicPlayer from './MusicPlayer.vue';
import VueSection from "./ui_comps/VueSection.vue";


const probs = defineProps<{
    tracks?: {
        url: string,
        songName: string,
        artistName: string
    }[];
}>();

</script>

<template>
    <div class="entertainment-section">
        <vue-section> 
            <div v-for="(item, i) in tracks" :key="i" >
                <div class="box"> 
                    <music-player :song-name="item.songName" :artist-name="item.artistName" :audio-u-r-l="item.url"/>
                </div>
                <hr class="rounded" />
            </div>
        </vue-section>
        
    </div>
</template>

<style scoped>
/* Rounded border */

.box {
    height: 24.75vh;
    display: flex;
} 

hr.rounded {
  border-top: 0.25vh solid #bbb;
  border-radius: 5px;
  border-bottom: 0px;
}
</style>