'use strict'

const Habitica = require('habitica')
const markdown = require('habitica-markdown')
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
  md (text) {
    return markdown.render(text)
  },
  login (username, password) {
    return api.post('/user/auth/local/login', {
      username,
      password
    }).then((res) => {
      let creds = {
        id: res.data.id,
        apiToken: res.data.apiToken
      }

      api.setOptions(creds)
      return creds
    })
  },
  getTasks () {
    return api.get('/tasks/user', {type: 'todos'}).then((response) => {
      return response.data
    })
  }
}
