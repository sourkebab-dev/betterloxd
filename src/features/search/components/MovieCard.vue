<template>
  <v-skeleton-loader :loading="isLoading" type="article">
    <v-card
      v-if="movieData"
      class="movie-card"
      color="surface-variant"
      rounded="lg"
    >
      <img class="movie-card__poster" :src="`https://picsum.photos/200/300?random=${movieData.imdbID}`">

      <div class="movie-card__info">
        <v-card-title class="movie-card__title" :href="imdbLink" tag="a" target="_blank">
          {{ movieData.Title }}
        </v-card-title>

        <v-card-subtitle>
          {{ movieData.Year }}
        </v-card-subtitle>
      </div>
      <v-btn
        class="movie-card__btn"
        :icon="isFavorite ? 'mdi-heart' : 'mdi-heart-outline'"
        @click.stop=""
      />
    </v-card>
  </v-skeleton-loader>

</template>

<script setup lang="ts">
  import type { MovieData } from '@/features/common/types'
  import { computed } from 'vue'
  import { VBtn, VCard, VCardSubtitle, VCardTitle, VSkeletonLoader } from 'vuetify/components'

  const props = withDefaults(defineProps<{
    movieData?: MovieData
    isFavorite?: boolean
    isLoading?: boolean
  }>(), {
    isFavorite: false,
    isLoading: false,
  })

  const imdbLink = computed(() => {
    return `https://www.imdb.com/title/${props.movieData.imdbID}`
  })

</script>

<style lang="scss" scoped>
  .movie-card {
    display: flex;
    padding: 12px;
    gap: 16px;

    &__poster {
      border-radius: 4px;
      width: 72px;
      min-height: 110px;
    }

    &__info {
      flex-grow: 1;
      min-width: 0;
    }

    &__title {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-block: 0;
      text-decoration: none;
      color: black;
    }

    &__btn {
      flex-shrink: 0;
      align-self: center;
    }
  }
</style>
