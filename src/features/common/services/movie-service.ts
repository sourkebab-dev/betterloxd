import type { MovieListResp, MovieSearchReq } from '../types'
import { createService } from '@/common/utils/service'

const ENDPOINTS = {
  search: '/api/movies/search',
}

const moviesService = createService()

export function getMovieList () {}

export function searchMovie (params: MovieSearchReq): Promise<MovieListResp> {
  return moviesService.get<MovieSearchReq, MovieListResp>(ENDPOINTS.search, { params })
}
