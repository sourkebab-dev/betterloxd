import type { MovieData, MovieListResp, MovieSearchReq } from '@/features/common/types'
import { defineStore } from 'pinia'

import { computed, reactive, readonly, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { searchMovie } from '@/services/movie-service'

export default defineStore('movie-search', () => {
  const router = useRouter()
  const route = useRoute()

  const searchResult = ref<MovieListResp | undefined>(undefined)
  const isSearching = ref(false)
  const isError = ref(false)

  function getDefaultSearch (): MovieSearchReq {
    const title = route.query.title ? `${route.query.title}` : ''

    return {
      Title: title,
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
    router.push({ path: '/', query: { title: searchData.Title, page: searchData.page } })
  }

  async function onMovieSearch (title: string, page: number) {
    if (isSearching.value) {
      return
    }

    isSearching.value = true
    isError.value = false
    searchData.Title = title
    searchData.page = page

    try {
      const resp = await searchMovie({ Title: title, page })
      searchResult.value = resp
      syncSearchToRoute()
    } catch (error) {
      isError.value = true
      console.error(error)
    }

    isSearching.value = false
  }

  function clearSearch () {
    searchResult.value = undefined
    onMovieSearch('', 1)
  }

  function retrySearch () {
    onMovieSearch(searchData.Title, searchData.page)
  }

  return {
    isSearching: readonly(isSearching),
    searchData: readonly(searchData),
    totalPage,
    movieList,
    isEmpty,
    isError,
    retrySearch,
    setCurrentPage,
    onMovieSearch,
    clearSearch,
  }
})
