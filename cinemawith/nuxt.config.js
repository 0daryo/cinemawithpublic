module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'cinemawith',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js project'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#3B8070'
  },

  modules: [
    '@nuxtjs/pwa',
  ],

  workbox: {
    dev: true, //開発環境でもPWAできるように
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, {
      isDev,
      isClient
    }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  manifest: {
    name: 'CinemaWith',
    short_name: 'CinemaWith',
    title: 'CinemaWith',
    'og:title': 'CinemaWith',
    description: 'CinemaWith',
    'og:description': 'CinemaWith',
    lang: 'ja',
    theme_color: '#ffffff',
    background_color: '#ffffff'
  },

  plugins: [
    '~plugins/element-ui'
  ],

  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],
}
