
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3000/api',
    },
  },
  nitro:{
    routeRules:{
      '/api/**':{
        proxy:'http://localhost:3001/api/**'
      }
    }
  },
  css:[
    '~/assets/styles/main.scss',
    '~/assets/styles/globalCssVariable.scss',
  ],
  modules: ['unplugin-icons/nuxt','@pinia/nuxt'],
})
