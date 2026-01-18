import type { UserCache, UserCacheLS } from '../../search/types'
import type { MovieData } from '@/features/common/types'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'

const LS_KEY = 'movie_favorites_v1'

function safeParseArray (value: string | null): UserCacheLS | undefined {
  if (!value) {
    return undefined
  }

  try {
    const parsed = JSON.parse(value)
    return parsed
  } catch {
    return undefined
  }
}

export default defineStore('cached-user-data', () => {
  const savedData = reactive<UserCache>({
    favoriteIds: new Set(),
    moviesCache: {},
  })

  const count = computed(() => savedData.favoriteIds.size)
  const ids = computed(() => savedData.favoriteIds)

  const favoriteList = computed<Array<MovieData>>(() => {
    return Array.from(savedData.favoriteIds).map(imdbID => {
      const cachedData = savedData.moviesCache[imdbID]

      if (!cachedData) {
        return null
      }

      return cachedData
    }).filter(data => !!data)
  })

  if (savedData.favoriteIds.size === 0) {
    const userCache = safeParseArray(localStorage.getItem(LS_KEY))

    if (userCache) {
      savedData.favoriteIds = new Set(userCache.favoriteIds)
      savedData.moviesCache = userCache.moviesCache
    }
  }

  function persist () {
    const persistedData: UserCacheLS = {
      favoriteIds: Array.from(savedData.favoriteIds),
      moviesCache: savedData.moviesCache,
    }

    localStorage.setItem(LS_KEY, JSON.stringify(persistedData))
  }

  function isFavorite (id: string) {
    return savedData.favoriteIds.has(id)
  }

  function add (id: string) {
    savedData.favoriteIds.add(id)
    persist()
  }

  function remove (id: string) {
    savedData.favoriteIds.delete(id)
    persist()
  }

  function toggle (movieData: MovieData) {
    const id = movieData.imdbID

    if (savedData.favoriteIds.has(id)) {
      savedData.favoriteIds.delete(id)
      delete savedData.moviesCache[id]
    } else {
      savedData.favoriteIds.add(id)
      savedData.moviesCache[id] = movieData
    }

    persist()
  }

  function updateMovieCache (movieData: MovieData) {
    savedData.moviesCache[movieData.imdbID] = movieData
    persist()
  }

  return { ids, count, favoriteList, updateMovieCache, isFavorite, add, remove, toggle }
})
