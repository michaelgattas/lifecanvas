// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr: true,
  css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css'],

  build: {
      transpile: ['vuetify']
  },

  sass: {
      compiler: 'modern-compiler'
  },

  compatibilityDate: '2024-11-20',
});