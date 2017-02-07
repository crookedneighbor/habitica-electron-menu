'use strict'

const Vue = require('vue/dist/vue.common')

const App = require('./App.vue')

Vue.config.debug = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: function (createElement) {
    return createElement(App)
  }
})
