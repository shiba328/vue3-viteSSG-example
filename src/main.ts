import './assets/main.css'

import { ViteSSG } from 'vite-ssg'
import App from './App.vue'

import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import VueGtag from 'vue-gtag'
import { createHead } from '@unhead/vue'
import VueCookieAcceptDecline from 'vue-cookie-accept-decline'

const ga = 'G-XXXXXXXXXXXXXXX'

export const createApp = ViteSSG(
  App,
  { routes: setupLayouts(routes) },
  ({ app, router, routes, isClient, initialState }) => {
    app.use(VueGtag, {
      config: { id: ga, },
    }, router),
    createHead(),
    app.component('vue-cookie-accept-decline',
      VueCookieAcceptDecline)
  },
)