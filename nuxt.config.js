import colors from 'vuetify/es5/util/colors'

const axios = require('axios')

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Assessoria & Consultoria Jurídica',
    title: 'Aline Pontes Advocacia',
    htmlAttrs: {
      lang: 'pt-br'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Website jurídico do escritório de advocacia Aline Pontes Advocacia (Guarabira/PB) com informações jurídicas atualizadas sobre as principais decisões judiciais dos Tribunais.' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:image', property: 'og:image', content: 'https://i.ibb.co/nj2jSSg/logo-aline3.png' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // Canonical
      { hid: 'canonical', rel: 'canonical', href: process.env.BASE_URL }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/disqus',
    '@/plugins/vue-social-sharing',
    '@/plugins/event-bus'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/google-analytics',
    '@nuxtjs/sitemap',
    '@nuxtjs/strapi',
    'nuxt-seo'
  ],  

  googleAnalytics: {
    id: process.env.ID_GOOGLE_ANALYTICS,
    dev: false
  },

  env: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    // strapiBaseUri: process.env.VUE_APP_BASE_URL_API || 'http://localhost:1337'
    strapiBaseUri: process.env.VUE_APP_BASE_URL_API || 'http://localhost:1337'
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.VUE_APP_BASE_URL_API || 'http://10.0.0.105:1337'
  },

  router: {
    middleware: 'admin',
    extendRoutes (routes, resolve) {      
      // routes.push({
      //   name: 'admin',
      //   path: '/ap-admin',
      //   redirect: 'https://api-alinepontes.herokuapp.com/admin'
      // })
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: '#D3C3BC',
          secondary: '#BFADA5',
          accent: '#D8EBF1',
          warning: colors.amber.base,
          info: '#5E1415',
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  generate: {
    routes() {
      return axios.get(`${process.env.VUE_APP_BASE_URL_API}/posts`).then((res) => {
        return res.data.map((post) => {
          return `/posts/${post.slug}`;
        })
      })
    },
    fallback: '404.html',
    exclude: [
      '/secret',
      '/admin/**'
    ],
    crawler: false
  },

  seo: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
		name: 'Aline Pontes Advocacia',
		title: 'Portal jurídico do escritório Aline Pontes Advocacia',
		templateTitle: '%name% - %title%',
		description: 'Website jurídico do escritório de advocacia Aline Pontes Advocacia (Guarabira/PB) com informações jurídicas atualizadas sobre as principais decisões judiciais dos Tribunais.',
		canonical: 'auto',
		isForcedTrailingSlash: false
  },

  sitemap: {
    middleware: 'admin',
    hostname: process.env.BASE_URL,
    gzip: true,
    exclude: [
      '/secret',
      '/admin/**'
    ],
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date()
    },
    routes: async () => {
      const { data } = await axios.get(`${process.env.VUE_APP_BASE_URL_API}/posts`)
      return data.map(post => `posts/${post.slug}`)
    },
    filter ({ routes }) {
      return routes.map(route => {
        route.url = `${route.url}/`
        return route
      })
    }
  },

  strapi: {
    entities: ['post', 'frase', 'categoria'],
    url: process.env.VUE_APP_BASE_URL_API || 'http://10.0.0.105:1337'
  }
  
}
