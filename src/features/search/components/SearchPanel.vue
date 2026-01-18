<template>
  <div class="search-panel">
    <div class="search-panel__field">
      <v-combobox
        id="search-field"
        v-model:menu="isMenuOpened"
        v-model:search="searchKey"
        clearable
        data-testid="search-field"
        density="compact"
        :disabled="isSearching"
        hide-details
        item-title="Title"
        item-value="imdbID"
        :items="autoCompleteResult"
        label="Find a film"
        :loading="isLoading"
        :model-value="searchKey"
        @keydown.enter="onSubmit"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { storeToRefs } from 'pinia'
  import { ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { VCombobox } from 'vuetify/components'
  import useMoviesAutocomplete from '../composables/useMoviesAutocomplete'
  import useMovieSearch from '../store/useMovieSearch'

  const route = useRoute()

  const defaultTitle = route.query.title ? `${route.query.title}` : ''

  const { searchKey, autoCompleteResult, isLoading } = useMoviesAutocomplete(defaultTitle)
  const moviesStore = useMovieSearch()
  const { isSearching } = storeToRefs(moviesStore)

  const isMenuOpened = ref(false)

  function onSubmit () {
    moviesStore.onMovieSearch(searchKey.value, 1)
    isMenuOpened.value = false
  }

  watch(searchKey, () => {
    if (!searchKey.value) {
      moviesStore.clearSearch()
    }
  })
</script>

<style lang="scss" scoped>
  .search-panel {
    &__field {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 0 0 33%;
    }
  }
</style>
