<script setup lang="ts">
import { Mesh } from "three";
import { ref, computed, onMounted, onBeforeMount, reactive, watch, WritableComputedRef, ComputedRef } from "vue";
import VueSection from "./ui_comps/VueSection.vue";


const probs = defineProps<{
    msg: string;
}>();


const isMobile = reactive({ val: window.innerHeight > window.innerWidth });
window.addEventListener('resize', () => {
    isMobile.val = window.innerHeight > window.innerWidth;
    computeSizes();
})

const fillerText_: ComputedRef<string[]> = computed(() => {
    const nFiller = isMobile.val ? 2 : 4;
    var fillerStr = ""
    for (var i = 0; i < nFiller; i++) {
        fillerStr = fillerStr + probs.msg  + " ";
    }


    const filler = []
    for (var i = 0; i < nRows; i++) {
        filler.push(fillerStr);
    }

    console.log(window.isMobile);
    return filler;
})



const nRows = 10;

function computeSizes() {
    const introSectionHeight: number = introSection.value.clientHeight;
    const singleRowHeight = introSectionHeight / nRows;
    fillerFontSize.val = Math.floor(singleRowHeight / 2) + 'px';
    heightFillerTextDiv.heightFillerTextDiv_ = Math.floor(100 / nRows) + "%";

    h2FontSize.val = Math.floor(singleRowHeight / 2) + 'px';

    subtitleFontSize.val = Math.floor(singleRowHeight / 3.5) + 'px';
}



onBeforeMount(() => { });
const introSection = ref(null);

const headingFiller = ref(null);

const fillerFontSize = reactive({ val: '' })
const h2FontSize = reactive({ val: '' })
const heightFillerTextDiv_ = '';
const heightFillerTextDiv = reactive({ heightFillerTextDiv_ });
const subtitleFontSize = reactive({ val: '' })


onMounted(() => {
    computeSizes();

});


</script>

<template>
    <div class="filler-section">
        <div ref="introSection">
            <vue-section :borderTop_="false"  :msg="'nothing'">
                <div v-for="(item, i) in fillerText_" :key="i"
                    :style="{height: heightFillerTextDiv.heightFillerTextDiv_}" ref="headingFiller">
                    <h2 :style="{fontSize: fillerFontSize.val }"> {{item}} </h2>

                </div>
            </vue-section>
        </div>
    </div>
</template>

<style scoped>
h2 {
    font-size: 100%;
    font-weight: bold;
    text-align: center;
}
</style>
