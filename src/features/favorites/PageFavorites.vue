<template>
  <page-section class="favorite-section" title="Your favorite movies">
    <v-empty-state
      v-if="favoriteList.length === 0"
      icon="mdi-magnify"
      text="Movies you mark as favorites will appear here for quick access."
      title="You don’t have any favorite movies yet."
    />
    <div v-else class="favorite-section__list">
      <v-slide-x-transition group>
        <favorite-card
          v-for="(movie) in favoriteList"
          :key="`favorite-card-${movie.imdbID}`"
          :movie-data="movie"
        />
      </v-slide-x-transition>
    </div>
  </page-section>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { VEmptyState, VSlideXTransition } from 'vuetify/components'
  import PageSection from '@/common/components/PageSection.vue'
  import useCachedUserData from '../common/store/useCachedUserData'
  import FavoriteCard from './components/FavoriteCard.vue'

  const userCacheStore = useCachedUserData()
  const { favoriteList } = storeToRefs(userCacheStore)
</script>

<style lang="scss" scoped>
  .favorite-section {
    padding-top: 16px;

    &__list {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 12px;
    }
  }
</style>
