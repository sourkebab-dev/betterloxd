import type { MovieData, MovieSearchReq } from '@/features/common/types'

import { defineStore } from 'pinia'
import { reactive, readonly, ref } from 'vue'
import { searchMovie } from '@/features/common/services/movie-service'

export default defineStore('movie-search', () => {
  const movieList = ref<Array<MovieData>>([])
  const isSearching = ref(false)
  const searchData = reactive<MovieSearchReq>({
    page: 1,
    Title: '',
  })

  function setCurrentPage (newPage: number) {
    searchData.page = newPage

    onMovieSearch(searchData.Title, newPage)
  }

  async function onMovieSearch (title: string, page: number) {
    isSearching.value = true

    try {
      const resp = await searchMovie({ Title: title, page })
      movieList.value = resp.data
    } catch (error) {
      console.error(error)
    }

    isSearching.value = false
  }

  return {
    isSearching: readonly(isSearching),
    movieList: readonly(movieList),
    searchData: readonly(searchData),
    setCurrentPage,
    onMovieSearch,
  }
})
