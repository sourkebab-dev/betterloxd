<template>
  <div class="favorite-card">
    <a :href="imdbLink" target="_blank">
      <v-card class="favorite-card__image">
        <v-img cover :src="`https://picsum.photos/200/300?random=${movieData.imdbID}`" />
        <button-favourite class="favorite-card__btn" :is-favorite="isFavourite" @click.stop.prevent="onRemove" />
      </v-card>
    </a>

    <p class="favorite-card__title">
      {{ movieData.Title }}
    </p>
    <sub>{{ movieData.Year }}</sub>
  </div>

</template>

<script setup lang="ts">
  import type { MovieData } from '@/features/common/types'
  import { computed } from 'vue'
  import { VCard, VImg } from 'vuetify/components'
  import ButtonFavourite from '@/features/common/components/ButtonFavourite.vue'
  import useCachedUserData from '@/features/common/store/useCachedUserData'

  const props = defineProps<{
    movieData: MovieData
  }>()

  const { isFavorite: getFavourite, remove } = useCachedUserData()

  const isFavourite = computed(() => {
    return getFavourite(props.movieData.imdbID)
  })

  const imdbLink = computed(() => {
    return `https://www.imdb.com/title/${props.movieData.imdbID}`
  })

  function onRemove () {
    remove(props.movieData.imdbID)
  }
</script>

<style lang="scss" scoped>
.favorite-card {
  &__image {
    position: relative;
    height: 320px;
    object-fit: cover;

    &:hover {
      box-shadow:  0 0 0 3px green;
    }
  }

  &__title {
    margin-top: 8px;
  }

  &__btn {
    position: absolute;
    bottom: 8px;
    right: 8px;
  }
}
</style>
