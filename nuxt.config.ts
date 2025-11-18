export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/icon'],
  css: ['@/assets/css/tailwind.css'],
  components: true,
  alias: {
    '#components': '/components',
  },
  nitro: {
    preset: 'static',
  },
})
