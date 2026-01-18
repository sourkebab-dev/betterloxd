import { type RenderOptions, render as tlRender } from '@testing-library/vue'
import vuetify from '@/plugins/vuetify'

export function render<T> (component: T, options: RenderOptions<T> = {}) {
  return tlRender(component, {
    global: {
      plugins: [vuetify],
      ...options.global,
    },
    ...options,
  })
}
