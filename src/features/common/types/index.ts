import type { BasePaginationResp } from '@/common/types'

export interface MovieData {
  Title: string
  Year: number
  imdbID: string
}

export type MovieSearchReq = {
  Title: string
  page: number
}

export type MovieListResp = BasePaginationResp<MovieData>
