export default {
  env: {},
  server: {
    port: 8881,
    host: '0.0.0.0',
  },
  head: {
    title: 'Расписание для студентов',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js TypeScript project' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  loading: { color: '#3B8070' },
  css: ['~/static/styles/app.min.css'],
  build: {
    vendor: [
      'vue2-touch-events',
      'js-cookie',
    ],
  },
  plugins: ['~plugins/vue2-touch-events'],
  modules: [
    '@nuxtjs/axios',
    [
      '@nuxtjs/yandex-metrika',
      {
        id: '55267690',
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
      },
    ],
  ],
  axios: {},
};
