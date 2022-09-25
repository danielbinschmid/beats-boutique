<script setup lang="ts">
import { ref, computed, onMounted, onBeforeMount } from "vue";
import AboutView from "@/views/AboutView.vue";

const probs = defineProps<{
	msg: string;
}>();

onBeforeMount(() => {});

onMounted(() => {});
</script>

<template>
	<div class="greetings">
		<section id="start1"></section>
		<section></section>
		<section :name="'scroll section'">
			<div :style="{ center: true }"></div>
		</section>
		<section :name="'Content section'">
			<div :style="{ center: true }">
				Ni Shi Wang := "You are king" Let your vision become reality
				Made by Daniel Bin Schmid Contact: Mail, LinkedIn, Github
			</div>
		</section>
		<section id="start2"></section>
		<section></section>
		<section></section>
		<section></section>
	</div>
</template>

<style scoped>
h1 {
	font-weight: 500;
	font-size: 2.6rem;
	top: -10px;
}

section {
	padding-left: 0px;
	margin-left: 0px;
	border: 10px solid red;
	border-width: 0px;
	height: 100vh;
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
