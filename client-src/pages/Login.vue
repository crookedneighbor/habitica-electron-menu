<template>
<div class="ui segment">
  <div class="ui form">
    <div class="ui message red" v-if="error">
      {{error}}
    </div>
    <div class="field" v-bind:class="{error: !username && error}">
      <label>Username or Email</label>
      <input v-model="username" @keyup.enter="login" />
    </div>
    <div class="field" v-bind:class="{error: !pass && error}">
      <label>Password</label>
      <input v-model="pass" @keyup.enter="login" />
    </div>
    <p class="advanced-options-link">
      <a v-if="!showAdvancedOptions" @click="displayAdvancedOptions()">Show Advanced Options</a>
    </p>
    <div class="field" v-if="showAdvancedOptions" v-bind:class="{error: !endpoint && error}">
      <label>Endpoint</label>
      <input v-model="endpoint" @keyup.enter="login" />
    </div>

    <div class="ui button" @click="login">Login</div>
  </div>
</div>
</template>

<style>
.advanced-options-link {
  cursor: pointer;
  text-align: right;
}
</style>

<script>
const habitica = require('../lib/habitica')
const DEFAULT_ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://habitica.com' : 'http://localhost:3000'

module.exports = {
  data () {
    return {
      showAdvancedOptions: false,
      error: '',
      username: '',
      pass: '',
      endpoint: DEFAULT_ENDPOINT
    }
  },
  methods: {
    login () {
      if (!this.username) {
        this.error = 'Username cannot be empty'
        return
      }
      if (!this.pass) {
        this.error = 'Password cannot be empty'
        return
      }
      if (!this.endpoint) {
        this.error = 'Endpoint cannot be empty'
        return
      }

      this.error = ''

      habitica.setOptions({
        endpoint: this.endpoint
      })
      return habitica.login(this.username, this.pass)
        .then((res) => {
          localStorage.id = res.id
          localStorage.apiToken = res.apiToken
          localStorage.endpoint = this.endpoint

          this.$router.replace(this.$route.query.redirect || '/')
        }).catch((err) => {
          this.error = err.message
        })
    },
    displayAdvancedOptions () {
      this.showAdvancedOptions = true
    }
  }
}
</script>
