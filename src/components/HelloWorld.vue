<script setup lang="ts">
import { ref, computed, onMounted, onBeforeMount } from "vue";
import AboutView from "@/views/AboutView.vue";
import VueSection from "./ui_comps/VueSection.vue";
const probs = defineProps<{
	msg: string;
}>();

onBeforeMount(() => {});

onMounted(() => {});
</script>

<template>
	<div class="greetings">
		<section id="start1">
            
        </section>
        <vue-section :borderTop_="true">
            <h2>
				Explore Explore Explore Explore
			</h2>
            <h2>
				Explore Explore Explore Explore 
			</h2>
            <h2>
				Explore Explore Explore Explore 
			</h2>
            <h2>
				Explore Explore Explore Explore 
			</h2>
            <h2>
				Explore Explore Explore Explore 
			</h2>
            <h2>
				Explore Explore Explore Explore 
			</h2>
            <h2>
				Explore Explore Explore Explore 
			</h2>
            <h2>
				Explore Explore Explore Explore 
			</h2>
            <h2>
				Explore Explore Explore Explore 
			</h2>
            <h2>
				Explore Explore Explore Explore 
			</h2>
            <h2>
				Explore Explore Explore Explore 
			</h2>
            <h2>
				Explore Explore Explore Explore 
			</h2>
        </vue-section>
		<section :name="'scroll section'">
			<div :style="{ center: true }"></div>
		</section>
		<section :name="'Content section'">
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

h1 {
	font-weight: 500;
	font-size: 2.6rem;
	top: -10px;
}

h2 {
    font-size: 5vw;
    font-weight: bold;
    text-align: center;
}

subtitle {
    font-size: 0.05rem;
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
