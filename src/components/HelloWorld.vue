<script setup lang="ts">
import { ref, computed, onMounted, onBeforeMount, reactive, watch, WritableComputedRef, ComputedRef } from "vue";
import AboutView from "@/views/AboutView.vue";
import VueSection from "./ui_comps/VueSection.vue";
import MenuSection from "./MenuSection.vue"
import TitleSection from "./TitleSection.vue"
import EntertainmentSection from "./EntertainmentSection.vue"
import FillerSection from "./FillerSection.vue";
import ContentSection from "./ContentSection.vue";
import beatsMetadata from "./beatsMetadata.json";
import beatsMetadata2 from "./beatsMetadata2.json";
import About from "./About.vue"
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
    return filler;
})


const nRows = 10;

function computeSizes() {
    const introSectionHeight: number = refSection.value.clientHeight;
    const singleRowHeight = introSectionHeight / nRows;
    fillerFontSize.val = Math.floor(singleRowHeight / 1.5) + 'px';
    heightFillerTextDiv.heightFillerTextDiv_ = Math.floor(100 / nRows) + "%";

    h2FontSize.val = Math.floor(singleRowHeight / 2) + 'px';

    subtitleFontSize.val = Math.floor(singleRowHeight / 3.5) + 'px';
}



onBeforeMount(() => { });
const refSection = ref(null);
const webglContent: {value: HTMLDivElement} = ref(null);
const contentContainer: { value: HTMLDivElement } = ref(null);
const headingFiller = ref(null);
const nSections = window.nSections;
const fillerFontSize = reactive({ val: '' })
const h2FontSize = reactive({ val: '' })
const heightFillerTextDiv_ = '';
const heightFillerTextDiv = reactive({ heightFillerTextDiv_ });
const subtitleFontSize = reactive({ val: '' })
const c = 'rgba(160, 255, 150, 0.5)'
const missingSections = reactive({ val: 0 });
const nWebglContentSections = 4;
onMounted(() => {
    computeSizes();
    if (contentContainer.value.childElementCount + webglContent.value.childElementCount < nSections - 1) {
        missingSections.val = nSections - 1 - contentContainer.value.childElementCount - webglContent.value.childElementCount;
    }
});
</script>

<template>
    <div class="greetings">
        <div ref="contentContainer">
            <section id="section_Home" ref="refSection"> </section>
            <title-section />
            <menu-section id="section_Menu" />



            <!--<entertainment-section :tracks="beatsMetadata" />
            <entertainment-section :tracks="beatsMetadata2" /> -->
        </div>

        <div v-for="n in missingSections.val">
            <section> </section>
        </div>

        <div ref="webglContent">
            <div v-for="i in nWebglContentSections" :key="i">
                <section :id="'webglContent_' + i" > </section>
            </div>
            
        </div>

        <section>
            <about id="section_About" />
        </section>
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
