import type { MovieData, MovieListResp } from '@/features/common/types'
import { fireEvent, screen, within } from '@testing-library/vue'
import { beforeEach, describe, expect, vi } from 'vitest'
import { render } from '@/common/utils/test-utils'
import PageSearch from '@/features/search/PageSearch.vue'
import { searchMovie } from '@/services/movie-service'

vi.mock('@/services/movie-service')

function makeResp (page: number, movies: MovieData[], total = 20, totalPages = 2): MovieListResp {
  return { data: movies, total, page, total_pages: totalPages, per_page: 10 }
}

function makeMovie (n: number): MovieData {
  return {
    Title: `Movie ${n}`,
    Year: 2000 + n,
    imdbID: `tt00000${n}`,
  }
}

beforeEach(() => {
  vi.clearAllMocks()
  localStorage.clear()
})

describe('Home - Search', () => {
  test('shows loading on initial search, then renders movie cards and their link text', async () => {
    searchMovie.mockResolvedValueOnce(
      makeResp(1, [makeMovie(1), makeMovie(2), makeMovie(3)]),
    )

    await render(PageSearch)

    expect(screen.getAllByTestId('movie-card-loading').length).toBeGreaterThan(0)

    const cards = await screen.findAllByTestId('movie-card')
    expect(cards.length).toBeGreaterThan(0)

    expect(screen.getByText('Movie 1')).toBeInTheDocument()
    expect(screen.getByText('Movie 2')).toBeInTheDocument()

    const firstCard = cards[0]
    const link = within(firstCard).getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link.getAttribute('href') || '').toContain('tt000001')
  })

  test('shows error condition', async () => {
    searchMovie.mockRejectedValueOnce(new Error('error'))

    await render(PageSearch)

    expect(await screen.findByTestId('error-search')).toBeInTheDocument()
  })

  test('shows empty condition', async () => {
    searchMovie.mockResolvedValueOnce(
      makeResp(1, [], 0, 0),
    )

    await render(PageSearch)

    expect(await screen.findByTestId('empty-search')).toBeInTheDocument()
  })

  it('can favorite a movie from the search results', async () => {
    searchMovie.mockResolvedValueOnce(makeResp(1, [makeMovie(1)]))

    await render(PageSearch)

    await screen.findAllByTestId('movie-card')

    const favBtn = screen.getByRole('button', { name: /favorite/i })
    expect(favBtn).toBeInTheDocument()

    await fireEvent.click(favBtn)
    expect(await screen.findByRole('button', { name: /unfavorite/i })).toBeInTheDocument()
  })
})
