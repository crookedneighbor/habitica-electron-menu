'use strict'

const Habitica = require('habitica')
const auth = require('./auth')
const api = new Habitica()

if (auth.loggedIn()) {
  api.setOptions({
    id: localStorage.id,
    apiToken: localStorage.apiToken,
    endpoint: localStorage.endpoint
  })
}

module.exports = {
  api,
  setOptions (options) {
    api.setOptions(options)
  },
  login (username, password) {
    return api.post('/user/auth/local/login', {
      username,
      password
    }).then((res) => {
      return {
        id: res.data.id,
        apiToken: res.data.apiToken
      }
    })
  }
}
