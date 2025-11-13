import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/image',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    'vue3-carousel-nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-schema-org',
  ],


  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
      meta: [
        { name: 'google-site-verification', content: '9RqmQvBJHEqw_iEDt0GITEi75tNzlS--tZxZqwTOgX8' },
      ],
      htmlAttrs: {
        lang: 'en',
      },
      bodyAttrs: {
        class: 'antialiased min-h-screen text-sm font-body text-body bg-gray-100',
      },
    },
  },

  site: { 
    url: 'https://www.buyzin.com', 
    name: 'Buyzin | Shop Smart. Live Easy.' 
  },
})