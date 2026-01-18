<template>
  <v-app-bar>
    <div class="nav-content">
      <v-app-bar-title>Betterloxd</v-app-bar-title>

      <v-tabs
        align-tabs="start"
        class="nav-tabs"
        color="primary"
        density="compact"
      >
        <v-tab exact to="/">Search</v-tab>
        <v-tab to="/favorites">Favorites</v-tab>
      </v-tabs>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
  import { VAppBar, VAppBarTitle, VTab, VTabs } from 'vuetify/components'
</script>

<style scoped lang="scss">
.nav-content {
  width: 1024px;
  margin: auto;
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-tabs {
  flex: 0 0 auto;
}

:deep(.v-tab) {
  font-size: 0.9rem;
  text-transform: none;
}
</style>
