<script setup lang="ts">
definePageMeta({
  layout: false
})
</script>

<template>
  <main class="home-visual-page">
    <img
      class="home-visual"
      src="/images/home.png"
      alt="首页展示图一"
    >
    <img
      class="home-visual"
      src="/images/home2.jpg"
      alt="首页展示图二"
    >
     <img
      class="home-visual"
      src="/images/home-visual.jpg"
      alt="Longrise Enterprise 联系我们页面视觉稿"
    >
  </main>
</template>

<style scoped>
.home-visual-page {
  width: 100%;
  min-height: 100vh;
  background: #fff;
}

.home-visual {
  display: block;
  width: 100%;
  height: auto;
  margin: 0;
}
</style>
