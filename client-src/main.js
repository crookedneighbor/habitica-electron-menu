'use strict'

const Vue = require('vue/dist/vue.common')
const VueRouter = require('vue-router')

Vue.use(VueRouter)

const App = require('./App.vue')

Vue.config.debug = true

/* eslint-disable no-new */
new Vue(App).$mount('#app')
