import type { MovieData } from '@/features/common/types'
import { ref, watch } from 'vue'
import { debounce } from '@/common/utils/misc'
import { searchMovie } from '@/services/movie-service'

export default function useMoviesAutocomplete (defaultSearch: string) {
  const searchKey = ref(defaultSearch)
  const autoCompleteResult = ref<Array<MovieData>>([])
  const isLoading = ref(false)

  async function getAutocompleteTitle () {
    isLoading.value = true

    try {
      const resp = await searchMovie({ Title: searchKey.value, page: 1 })
      autoCompleteResult.value = resp.data
    } catch (error) {
      console.error(error)
    }

    isLoading.value = false
  }

  const debouncedget = debounce(getAutocompleteTitle)

  watch(searchKey, newVal => {
    if (newVal) {
      debouncedget()
    } else {
      autoCompleteResult.value = []
    }
  })

  return {
    searchKey,
    autoCompleteResult,
    isLoading,
  }
}
