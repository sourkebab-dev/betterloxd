import type { MovieListResp, MovieSearchReq } from '@/features/common/types'
import { createService } from '@/common/utils/service'

const ENDPOINTS = {
  search: '/api/movies/search',
}

const moviesService = createService()

export function searchMovie (params: MovieSearchReq): Promise<MovieListResp> {
  return moviesService.get<MovieSearchReq, MovieListResp>(ENDPOINTS.search, { params })
}
