<template>
  <v-btn
    :aria-label="isFavorite ? 'Unfavorite' : 'Favorite'"
    :aria-pressed="isFavorite"
    data-testid="button-favorite"
    :icon="isFavorite ? 'mdi-heart' : 'mdi-heart-outline'"
    @click="onToggle"
  />
</template>

<script setup lang="ts">
  import { VBtn } from 'vuetify/components'

  const emit = defineEmits<{
    toggle: [value: boolean]
  }>()

  const props = withDefaults(defineProps<{
    isFavorite?: boolean
  }>(), { isFavorite: false })

  function onToggle () {
    emit('toggle', !props.isFavorite)
  }
</script>
