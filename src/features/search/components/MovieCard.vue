<template>
  <v-skeleton-loader :loading="isLoading" type="article">
    <v-card
      v-if="movieData"
      class="movie-card"
      color="surface-variant"
      rounded="lg"
    >

      <v-lazy>
        <img class="movie-card__poster" :src="`https://picsum.photos/200/300?random=${movieData.imdbID}`">
      </v-lazy>

      <div class="movie-card__info">
        <v-card-title class="movie-card__title" :href="imdbLink" tag="a" target="_blank">
          {{ movieData.Title }}
        </v-card-title>

        <v-card-subtitle>
          {{ movieData.Year }}
        </v-card-subtitle>
      </div>
      <button-favourite
        class="movie-card__btn"
        :is-favorite="isFavourite"
        @click.stop="toggleFavourite"
      />
    </v-card>
  </v-skeleton-loader>

</template>

<script setup lang="ts">
  import type { MovieData } from '@/features/common/types'
  import { computed } from 'vue'
  import { VCard, VCardSubtitle, VCardTitle, VLazy, VSkeletonLoader } from 'vuetify/components'
  import ButtonFavourite from '@/features/common/components/ButtonFavourite.vue'
  import useCachedUserData from '@/features/common/store/useCachedUserData'

  const props = withDefaults(defineProps<{
    movieData?: MovieData
    isFavorite?: boolean
    isLoading?: boolean
  }>(), {
    isFavorite: false,
    isLoading: false,
  })

  const { toggle, isFavorite: getFavourite } = useCachedUserData()

  const isFavourite = computed(() => {
    if (!props.movieData) return false
    return getFavourite(props.movieData?.imdbID)
  })

  const imdbLink = computed(() => {
    if (!props.movieData) return ''

    return `https://www.imdb.com/title/${props.movieData.imdbID}`
  })

  function toggleFavourite () {
    if (!props.movieData) return

    toggle(props.movieData)
  }

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
