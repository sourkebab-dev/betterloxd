<template>
  <div class="page-search">
    <div class="backdrop" :style="{backgroundImage: `url(${image})`}">
      <h2 class="backdrop__text">Track films you’ve&nbsp;watched.<br>Save those you want to&nbsp;see.<br>Tell your friends what’s&nbsp;good.</h2>
    </div>
    <search-panel />
    <search-result />
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import SearchPanel from './components/SearchPanel.vue'
  import SearchResult from './components/SearchResult.vue'
  import { HERO_IMAGES } from './config'

  const image = computed<string>(() => {
    const idx = Math.floor(Math.random() * HERO_IMAGES.length)

    return HERO_IMAGES[idx] || ''
  })

</script>

<style lang="scss" scoped>
.backdrop {
  position: relative;
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center;
  margin-bottom: 128px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
      to top,
      rgb(var(--v-theme-background)) 0%,
      transparent 55%,
      transparent 85%,
      rgb(var(--v-theme-background)) 95%
    );
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
      to right,
      rgb(var(--v-theme-background)) 0%,
      transparent 15%,
      transparent 85%,
      rgb(var(--v-theme-background)) 100%
    );
  }

  &__text {
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-size: 32px;
    position: absolute;
    bottom: -15%;
    text-align: center;
    width: 100%;
  }
}
</style>
