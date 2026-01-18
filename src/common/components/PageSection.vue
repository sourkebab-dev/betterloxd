<template>
  <div class="section">
    <div class="section__headings">
      <h2>{{ title }}</h2>
      <router-link v-if="link?.to" :to="link.to"> {{ link.label }}</router-link>
    </div>
    <v-divider />
    <div class="section__content">
      <slot />
    </div>
  </div>

</template>

<script setup lang="ts">
  import { type RouteLocationRaw, RouterLink } from 'vue-router'
  import { VDivider } from 'vuetify/components'

  const props = withDefaults(defineProps<{
    title?: string
    link?: {
      label: string
      to: RouteLocationRaw
    }
  }>(), { title: '' })

</script>

<style lang="scss" scoped>
  .section {
    &__content {
      padding-block: 16px;
    }
  }

</style>
