// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  plugins: [
    { src: '~/plugins/particles.js', ssr: false},
    { src: '~/plugins/vue-confetti.js', mode: 'client'}
  ],
  modules: ['@nuxtjs/supabase', '@nuxtjs/tailwindcss', 'nuxt-icon'],
  routeRules:  {
    '/api/**': { cors: true },
  }

})
