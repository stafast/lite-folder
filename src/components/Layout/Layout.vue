<script setup lang="ts">
import Header from "./Header.vue";
import Footer from "./Footer.vue";
</script>

<template>

  <Header />

  <main class="my-20">
    <slot></slot>
  </main>

  <Footer />

</template>

<style scoped>

</style>