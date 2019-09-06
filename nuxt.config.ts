export default {
  env: {},
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  head: {
    title: 'Расписание ИВТ-364',
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
  css: ['~/static/styles/app.css'],
  build: {},
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {},
};
