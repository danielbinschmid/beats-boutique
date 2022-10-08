<script setup lang="ts">
import { ref, computed, onMounted, onBeforeMount, reactive, watch, WritableComputedRef, ComputedRef } from "vue";
import AboutView from "@/views/AboutView.vue";
import VueSection from "./ui_comps/VueSection.vue";

import FillerSection from "./FillerSection.vue";
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
        fillerStr = fillerStr + "Explore ";
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
    const introSectionHeight: number = refSection.value.clientHeight;
    const singleRowHeight = introSectionHeight / nRows;
    fillerFontSize.val = Math.floor(singleRowHeight / 1.5) + 'px';
    heightFillerTextDiv.heightFillerTextDiv_ = Math.floor(100 / nRows) + "%";

    h2FontSize.val =Math.floor(singleRowHeight / 2) + 'px';

    subtitleFontSize.val = Math.floor(singleRowHeight / 3.5) + 'px';
}



onBeforeMount(() => { });
const refSection = ref(null);

const headingFiller = ref(null);

const fillerFontSize = reactive({ val: '' })
const h2FontSize = reactive({val: ''})
const heightFillerTextDiv_ = '';
const heightFillerTextDiv = reactive({ heightFillerTextDiv_ });
const subtitleFontSize = reactive({val: ''})


onMounted(() => {
    computeSizes();

});
</script>

<template>
    <div class="greetings">
        <section id="start1" ref="refSection">

        </section>
        <filler-section :msg="'EXPLORE'" />
        <section :name="'scroll section'">
        </section>
        <section :name="'Content section'">
            
            <div class="subtitle" :style="{fontSize: subtitleFontSize.val}">
                (你是王 (nǐ shì wáng) := "You are king")
            </div>
            <h2 :style="{fontSize: h2FontSize.val}">
				Let Your Vision Become Reality ~ 
			</h2>
            <div class="subtitle" :style="{fontSize: subtitleFontSize.val}">
				Made by Daniel Bin Schmid
            </div>
            <div class="subtitle" :style="{fontSize: subtitleFontSize.val}">
				Contact: Mail, LinkedIn, Github
			</div>
            
        </section>
        <section id="start2"></section>
        <filler-section :msg="''"/>
        <filler-section :msg="'EXPLORE'"/>
        <filler-section :msg="'TIME'"/>
        
        
        <section></section>
        <section></section>
        <section></section>
        <section></section>
        <section></section>
        <section></section>
    </div>
</template>

<style scoped>
#greetings {
    margin-left: 0px;
    padding-left: 0px;
    width: 100%;
}

.fillerTextDiv {
    display: inline-block;
    height: 10%;
}

h1 {
    font-weight: 500;
    font-size: 2.6rem;
    top: -10px;
}

h2 {

    font-size: 100%;
    font-weight: bold;
    text-align: center;
}

h3 {
    text-align: center;
}

.subtitle {
    text-align: center;
}


section {
    color: black;
    padding-left: 0px;
    margin-left: 0px;
    border: 10px solid red;
    border-width: 0px;
    height: 100vh;
    display: flex;
    flex-direction: column;
}

h3 {
    font-size: 1.2rem;
    color: white;
}

.greetings h1,
.greetings h3 {
    text-align: center;
}

@media (min-width: 0px) {

    .greetings h1,
    .greetings h3 {
        text-align: left;
    }
}
</style>
