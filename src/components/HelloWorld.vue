<script setup lang="ts">
import { ref, computed, onMounted, onBeforeMount } from "vue";

const probs = defineProps<{
  msg: string;
}>();


onBeforeMount(() => {
  console.log("before mounted! " + probs.msg)
})

onMounted(() => {
  console.log("mounted!")
})

const count = ref(0)
console.log("hell yeah")
const a = computed(() => {
  console.log("yes")
  return "a"
})


</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
      What's next?
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
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
