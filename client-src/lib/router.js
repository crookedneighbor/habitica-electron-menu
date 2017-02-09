'use strict'

const VueRouter = require('vue-router')
const Home = require('../pages/Home.vue')
const Login = require('../pages/Login.vue')
const Settings = require('../pages/Settings.vue')
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
  }, {
    path: '/settings',
    component: Settings
  }, {
    path: '/logout',
    beforeEnter (to, from, next) {
      auth.logout()
      next('/login')
    }
  }
]

const router = new VueRouter({
  routes
})

module.exports = router
