import { type RenderOptions, render as tlRender } from '@testing-library/vue'
import pinia from '@/plugins/pinia'
import vuetify from '@/plugins/vuetify'
import router from '@/router'

export function render<T> (component: T, options: RenderOptions<T> = {}) {
  return tlRender(component, {
    global: {
      plugins: [vuetify, pinia, router],
      ...options.global,
    },
    ...options,
  })
}
