import VueConfetti from 'vue-confetti';

export default defineNuxtPlugin((nuxtApp) => {
  // Doing something with nuxtApp
  nuxtApp.vueApp.use(VueConfetti)
})