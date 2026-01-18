import type { MovieData, MovieListResp, MovieSearchReq } from '@/features/common/types'

import { defineStore } from 'pinia'
import { computed, reactive, readonly, ref } from 'vue'
import { searchMovie } from '@/features/common/services/movie-service'

export default defineStore('movie-search', () => {
  const searchResult = ref<MovieListResp | undefined>(undefined)
  const isSearching = ref(false)
  const searchData = reactive<MovieSearchReq>({
    page: 1,
    Title: '',
  })

  const movieList = computed<Array<MovieData>>(() => {
    return searchResult.value?.data || []
  })

  const totalPage = computed(() => searchResult.value?.total_pages || 0)

  const isEmpty = computed(() => !isSearching.value && searchResult.value?.total === 0)

  function setCurrentPage (newPage: number) {
    searchData.page = newPage

    onMovieSearch(searchData.Title, newPage)
  }

  async function onMovieSearch (title: string, page: number) {
    isSearching.value = true

    searchData.Title = title
    searchData.page = page

    try {
      const resp = await searchMovie({ Title: title, page })
      searchResult.value = resp
    } catch (error) {
      console.error(error)
    }

    isSearching.value = false
  }

  function clearSearch () {
    searchResult.value = undefined
    onMovieSearch('', 1)
  }

  return {
    isSearching: readonly(isSearching),
    searchData: readonly(searchData),
    totalPage,
    movieList,
    isEmpty,
    setCurrentPage,
    onMovieSearch,
    clearSearch,
  }
})
