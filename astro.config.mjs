import { defineConfig } from 'astro/config'
// eslint-disable-next-line import/no-unresolved
import svelte from '@astrojs/svelte'

// eslint-disable-next-line import/no-unresolved
import netlify from '@astrojs/netlify/functions'

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  output: 'server',
  adapter: netlify()
})
