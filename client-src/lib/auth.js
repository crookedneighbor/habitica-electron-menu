'use strict'

module.exports = {
  loggedIn () {
    return localStorage.id && localStorage.apiToken
  }
}

