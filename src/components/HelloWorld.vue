<script setup lang="ts">
import { ref, computed, onMounted, onBeforeMount } from "vue";

const probs = defineProps<{
  msg: string;
}>();

onBeforeMount(() => {
  console.log("before mounted! " + probs.msg);
});

onMounted(() => {
  console.log("mounted!");
});

const count = ref(0);
console.log("hell yeah");
const a = computed(() => {
  console.log("yes");
  return "a";
});
</script>

<template>
  <div class="greetings">
    <!-- 
      <section></section>
      <section></section>
      <section></section>
      <section></section>
    -->
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

section {
  outline: 1px solid red;
  width: 100vw;
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

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
