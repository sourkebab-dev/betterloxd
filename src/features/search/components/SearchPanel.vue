<template>
  <div class="search-panel">
    <div class="search-panel__field">
      <v-combobox
        id="search-field"
        v-model:search="searchKey"
        clearable
        data-testid="search-field"
        density="compact"
        hide-details
        item-title="Title"
        item-value="imdbID"
        :items="autoCompleteResult"
        label="Find a film"
        :loading="isLoading"
        @keydown.enter="onSubmit"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { watch } from 'vue'
  import { VCombobox } from 'vuetify/components'
  import useMoviesAutocomplete from '../composables/useMoviesAutocomplete'
  import useMovieSearch from '../store/useMovieSearch'

  const { searchKey, autoCompleteResult, isLoading } = useMoviesAutocomplete()
  const { onMovieSearch, clearSearch } = useMovieSearch()

  function onSubmit () {
    onMovieSearch(searchKey.value, 1)
  }

  watch(searchKey, () => {
    if (!searchKey.value) {
      clearSearch()
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
