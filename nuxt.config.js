export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css:[
    '~/assets/styles/main.scss',
    '~/assets/styles/globalCssVariable.scss'
  ],
  modules: ['unplugin-icons/nuxt'],
})