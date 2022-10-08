<script setup lang="ts">

const probs = defineProps<{
    borderTop_?: boolean;
	msg?: string;
    color?: string;
}>();

</script>

<template>
	<div class="vue-section">
		<section :style="{borderTop: borderTop_? 'double': '', backgroundColor: color? color: 'rgba(0, 240,255, 0.5 )'}">
            <slot> </slot>
        </section>
	</div>
</template>

<style scoped>
section {
    color: black;
	padding-left: 0px;
	margin-left: 0px;
	border: 10px solid red;
	border-width: 0px;
	height: 100vh;
    display: flex;
    flex-direction: column;
    width: 100%;
    mix-blend-mode:difference;
}

</style>
