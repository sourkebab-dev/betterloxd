<template>
  <v-footer app height="40">
    <a
      v-for="item in items"
      :key="item.title"
      class="d-inline-block mx-2 social-link"
      :href="item.href"
      rel="noopener noreferrer"
      target="_blank"
      :title="item.title"
    >
      <v-icon :icon="item.icon" :size="16" />
    </a>

    <div class="text-caption text-disabled" style="position: absolute; right: 16px">
      &copy; {{ new Date().getFullYear() }}
      <span class="d-none d-sm-inline-block">sourkebab-dev</span>

    </div>
  </v-footer>
</template>

<script setup lang="ts">
  import { VFooter, VIcon } from 'vuetify/components'

  const items = [
    {
      title: 'GitHub',
      icon: `mdi-github`,
      href: 'https://github.com/sourkebab-dev/betterloxd',
    },
  ]
</script>
