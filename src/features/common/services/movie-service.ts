import type { MovieListResp, MovieSearchReq } from '../types'
import { createService } from '@/common/utils/service'

const moviesService = createService()

export function getMovieList () {}

export function searchMovie (params: MovieSearchReq): Promise<MovieListResp> {
  return moviesService.get<MovieSearchReq, MovieListResp>('/api/something', { params })
}
