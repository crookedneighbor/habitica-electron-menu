'use strict'

const todos = require('../store/todos')

module.exports = {
  loggedIn () {
    return localStorage.id && localStorage.apiToken
  },
  logout () {
    delete localStorage.id
    delete localStorage.apiToken
    delete localStorage.endpoint
    todos.splice(0, todos.length)
  }
}
