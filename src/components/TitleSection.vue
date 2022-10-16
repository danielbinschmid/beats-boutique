<script setup lang="ts">
import VueSection from "@/components/ui_comps/VueSection.vue"
import { reactive } from "vue";
import * as ui from "./uiSizeCalculation";


const sizes = reactive({val: ui.computeSizes(window.innerHeight)} );

window.onresize = () => {
    sizes.val = ui.computeSizes(window.innerHeight);
}
</script>

<template>
    <div class="title-section">
        <vue-section>
            <div class="container">

                <h2 :style="{fontSize: sizes.val.h2}"> BEATS BOUTIQUE </h2>
                <h2 :style="{fontSize: sizes.val.h2}"> SCOPE OUT </h2>
                <h2 :style="{fontSize: sizes.val.h2}"> VIBES & HEADBANGERS </h2>
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
    font-size: 44px;
    font-weight: bold;
    text-align: center;
}
</style>