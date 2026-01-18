<template>
  <div class="search-panel">
    <div class="search-panel__filters">
      <label>
        Browse by
      </label>
    </div>

    <div class="search-panel__field">
      <label class="search-panel__label" for="search-field">
        Find a film
      </label>
      <v-combobox
        id="search-field"
        v-model:search="searchKey"
        data-testid="search-field"
        density="compact"
        hide-details
        item-title="Title"
        item-value="imdbID"
        :items="autoCompleteResult"
        :loading="isLoading"
        @keydown.enter="onSubmit"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { VCombobox } from 'vuetify/components'
  import useMoviesAutocomplete from '../composables/useMoviesAutocomplete'
  import useMovieSearch from '../store/useMovieSearch'

  const { searchKey, autoCompleteResult, isLoading } = useMoviesAutocomplete()
  const { onMovieSearch } = useMovieSearch()

  function onSubmit () {
    onMovieSearch(searchKey.value, 1)
  }
</script>

<style lang="scss" scoped>
    .search-panel {
        display: flex;
        align-items: center;

        &__filters {
            flex-grow: 1;
        }

        &__field {
            display: flex;
            align-items: center;
            gap: 8px;
            flex: 0 0 33%;
        }

        &__label {
            flex-shrink: 0;
        }
    }

</style>
