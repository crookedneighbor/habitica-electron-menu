'use strict'

const VueRouter = require('vue-router')
const Home = require('../components/Home.vue')

const routes = [
  {
    path: '/',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

module.exports = router
