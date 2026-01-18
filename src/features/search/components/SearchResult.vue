<template>
  <div class="search-result">
    <div class="search-result__list">
      <movie-card
        v-for="(movie, index) in movieStore.movieList"
        :key="`movie-card-${movie.imdbID}`"
        class="search-result__card"
        :data-testid="`movie-card-${index}`"
        :movie-data="movie"
      />
    </div>

    <v-pagination />
  </div>
</template>

<script setup lang="ts">
  import { VPagination } from 'vuetify/components'
  import useMovieSearch from '../store/useMovieSearch'
  import MovieCard from './MovieCard.vue'

  const movieStore = useMovieSearch()

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
}
</style>
