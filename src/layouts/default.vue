<template>
  <navbar />
  <v-main>
    <div class="layout-content">
      <router-view />
    </div>
  </v-main>
  <AppFooter />
</template>

<script lang="ts" setup>
  import { VMain } from 'vuetify/components'
  import AppFooter from '@/features/common/components/AppFooter.vue'
  import Navbar from '@/features/common/components/Navbar.vue'
</script>

<style lang="scss" scoped>
.layout-content {
  width: 1024px;
  max-width: calc(100% - 32px);
  margin: auto;
}
</style>
