<template>
  <div class="search-result">
    <div class="search-result__list">
      <template v-if="isEmpty">
        <v-empty-state
          icon="mdi-magnify"
          text="Try adjusting your search terms or filters. Sometimes less specific terms or broader queries can help you find what you're looking for."
          title="We couldn't find a match."
        />
      </template>
      <template v-else-if="isSearching">
        <movie-card v-for="i in 5" :key="`movie-card-loading-${i}`" :data-testid="`movie-card-loading-${i}`" is-loading />
      </template>
      <template v-else>
        <movie-card
          v-for="(movie, index) in movieList"
          :key="`movie-card-${movie.imdbID}`"
          class="search-result__card"
          :data-testid="`movie-card-${index}`"
          :movie-data="movie"
        />
      </template>
    </div>
    <v-pagination
      v-if="!isSearching && !isEmpty"
      class="search-result__pagination"
      :length="totalPage"
      :model-value="searchData.page"
      @update:model-value="movieStore.setCurrentPage($event)"
    />
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { VEmptyState, VPagination } from 'vuetify/components'
  import useMovieSearch from '../store/useMovieSearch'
  import MovieCard from './MovieCard.vue'

  const movieStore = useMovieSearch()
  const { movieList, isSearching, isEmpty, totalPage, searchData } = storeToRefs(movieStore)
</script>

<style lang="scss" scoped>
.search-result {
  &__list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-block: 16px;
  }

  &__card {
    width: 100%;
    min-height: 110px;
  }

  &__pagination {
    margin: auto;
    width: 50%;
  }
}
</style>
