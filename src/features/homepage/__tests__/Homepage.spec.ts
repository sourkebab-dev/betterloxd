import { screen } from '@testing-library/vue'
import { describe, test } from 'vitest'
import { render } from '@/common/utils/test-utils'
import Homepage from '../components/Homepage.vue'

describe('Feature - Homepage', async () => {
  test('it mounts correctly', () => {
    render(Homepage)

    expect(screen.getByTestId('welcome')).toHaveTextContent('Welcome to')
  })
})
