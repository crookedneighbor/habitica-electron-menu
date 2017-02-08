'use strict'

const VueRouter = require('vue-router')
const Home = require('../components/Home.vue')
const Login = require('../components/Login.vue')
const auth = require('../lib/auth')

function requireAuth (to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    component: Home,
    beforeEnter: requireAuth
  }, {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

module.exports = router
