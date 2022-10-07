<script setup lang="ts">
import { ref, computed, onMounted, onBeforeMount, reactive, watch, WritableComputedRef, ComputedRef } from "vue";
import AboutView from "@/views/AboutView.vue";
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
    const introSectionHeight: number = introSection.value.clientHeight;
    const singleRowHeight = introSectionHeight / nRows;
    fillerFontSize.val = Math.floor(singleRowHeight / 1.5) + 'px';
    heightFillerTextDiv.heightFillerTextDiv_ = Math.floor(100 / nRows) + "%";
}



onBeforeMount(() => { });
const introSection = ref(null);

const headingFiller = ref(null);

const fillerFontSize = reactive({ val: '' })
const heightFillerTextDiv_ = '';
const heightFillerTextDiv = reactive({ heightFillerTextDiv_ });
console.log(heightFillerTextDiv)
onMounted(() => {
    computeSizes();

});
</script>

<template>
    <div class="greetings">
        <section id="start1">

        </section>
        <div ref="introSection">
            <vue-section :borderTop_="true" :msg="'nothing'">
                <div v-for="(item, i) in fillerText_" :key="i"
                    :style="{height: heightFillerTextDiv.heightFillerTextDiv_}" ref="headingFiller">
                    <h2 :style="{fontSize: fillerFontSize.val }"> {{item}} </h2>

                </div>
            </vue-section>
        </div>

        <section :name="'scroll section'">
            <div :style="{ center: true }"></div>
        </section>
        <section :name="'Content section'">
            <!--
            <div class="subtitle">
                (你是王 (nǐ shì wáng) := "You are king")
            </div>
            <h2>
				Let Your Vision Become Reality ~ 
			</h2>
            <div class="subtitle">
				Made by Daniel Bin Schmid
            </div>
            <div class="subtitle">
				Contact: Mail, LinkedIn, Github
			</div>
            -->
        </section>
        <section id="start2"></section>
        <section></section>
        <section></section>
        <section></section>
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
