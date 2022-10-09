<script setup lang="ts">
import MusicPlayer from './MusicPlayer.vue';
import VueSection from "./ui_comps/VueSection.vue";

</script>

<template>
    <div class="entertainment-section">
        <vue-section> 
            <music-player :song-name="'Space Travel'" :artist-name="'prodbycctv'" :audio-u-r-l="'music/2.mp3'"/>
            <hr class="rounded" />
            <music-player :song-name="'Oldskul'" :artist-name="'prodbycctv'" :audio-u-r-l="'music/sampling_sesh.mp3'"/>
            <hr class="rounded" />
            <music-player :song-name="'Youngboy'" :artist-name="'prodbycctv'" :audio-u-r-l="'music/youngboy.mp3'"/>
            <hr class="rounded" />
            <music-player :song-name="'65656565, G#minor, 125BPM'" :artist-name="'Zeno'" :audio-u-r-l="'music/65656565_Gisminor_125bpm_prodbyZENO.mp3'"/>
            <hr class="rounded" />
        </vue-section>
        
    </div>
</template>

<style scoped>
/* Rounded border */
hr.rounded {
  border-top: 2px solid #bbb;
  border-radius: 5px;
  border-bottom: 0px;
}
</style>