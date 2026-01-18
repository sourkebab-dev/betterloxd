import type { MovieData } from '@/features/common/types'

export interface UserCache {
  favoriteIds: Set<string>
  moviesCache: Record<string, MovieData>
}

export type UserCacheLS = Pick<UserCache, 'moviesCache'> & {
  favoriteIds: Array<string>
}
