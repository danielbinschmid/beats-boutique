<script setup lang="ts">
import MusicPlayer from './MusicPlayer.vue';
import VueSection from "./ui_comps/VueSection.vue";

</script>

<template>
    <div class="entertainment-section">
        <vue-section> 
            <music-player :song-name="'Space Travel'" :artist-name="'prodbycctv'" />
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