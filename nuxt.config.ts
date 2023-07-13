// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Porra eleccions generals 23J',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🗳️</text></svg>' }
      ]
    }
  },
  plugins: [
    { src: '~/plugins/particles.js', ssr: false},
    { src: '~/plugins/vue-confetti.js', mode: 'client'}
  ],
  modules: ['@nuxtjs/supabase', '@nuxtjs/tailwindcss', 'nuxt-icon'],
  css: [
    "primevue/resources/themes/lara-light-blue/theme.css",
    "primevue/resources/primevue.css"
  ],
  build: {
    transpile: ["primevue"]
  }

})
