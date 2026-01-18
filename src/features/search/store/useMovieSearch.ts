import type { MovieData, MovieListResp, MovieSearchReq } from '@/features/common/types'

import { defineStore } from 'pinia'
import { computed, reactive, readonly, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { searchMovie } from '@/features/common/services/movie-service'

export default defineStore('movie-search', () => {
  const router = useRouter()
  const route = useRoute()

  const searchResult = ref<MovieListResp | undefined>(undefined)
  const isSearching = ref(false)

  function getDefaultSearch (): MovieSearchReq {
    return {
      Title: `${route.query.title}`,
      page: Number(route.query.page) || 1,
    }
  }

  const searchData = reactive<MovieSearchReq>(getDefaultSearch())

  const movieList = computed<Array<MovieData>>(() => {
    return searchResult.value?.data || []
  })

  const totalPage = computed(() => searchResult.value?.total_pages || 0)

  const isEmpty = computed(() => !isSearching.value && searchResult.value?.total === 0)

  function setCurrentPage (newPage: number) {
    searchData.page = newPage

    onMovieSearch(searchData.Title, newPage)
  }

  function syncSearchToRoute () {
    router.push({ path: '/search', query: { title: searchData.Title, page: searchData.page } })
  }

  async function onMovieSearch (title: string, page: number) {
    isSearching.value = true

    searchData.Title = title
    searchData.page = page

    try {
      const resp = await searchMovie({ Title: title, page })
      searchResult.value = resp
      syncSearchToRoute()
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
