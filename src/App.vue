<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";

window.nSections = 9;


var scrollTimeout = undefined;
window.addEventListener("scroll", () => {
    window.isScrolling = true;
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        window.isScrolling = false;
    },500);
})
</script>

<template>
  <header>

  </header>

  <RouterView />
</template>

<style scoped>

</style>
