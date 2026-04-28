
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3000/api',
    },
  },
  elementPlus: {
    // 关键: 告诉模块使用 SCSS 源码
    importStyle: 'scss',
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // 关键: 在你的变量文件后注入分号
          additionalData: `@use "@/assets/styles/element-vars.scss" as *;`,
          api: 'modern-compiler', // 推荐配置
        },
      },
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
  modules: ['unplugin-icons/nuxt','@pinia/nuxt', '@element-plus/nuxt'],
})
