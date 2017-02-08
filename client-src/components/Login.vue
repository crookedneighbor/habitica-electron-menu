<template>
<div class="ui segment">
  <div class="ui form">
    <div class="ui message red" v-if="error">
      {{error}}
    </div>
    <div class="field">
      <label>Username or Email</label>
      <input v-model="username" />
    </div>
    <div class="field">
      <label>Password</label>
      <input v-model="pass" />
    </div>
    <p class="advanced-options-link">
      <a v-if="!showAdvancedOptions" @click="displayAdvancedOptions()">Show Advanced Options</a>
    </p>
    <div class="field" v-if="showAdvancedOptions">
      <label>Endpoint</label>
      <input v-model="endpoint" />
    </div>

    <div class="ui button" @click="login">Login</div>
  </div>
</div>
</template>

<style>
body {
  margin-top: 50px;
}

.advanced-options-link {
  cursor: pointer;
  text-align: right;
}
</style>

<script>
const habitica = require('../lib/habitica')

module.exports = {
  data () {
    return {
      showAdvancedOptions: false,
      error: '',
      username: '',
      pass: '',
      endpoint: 'https://habitica.com'
    }
  },
  methods: {
    login () {
      this.error = ''

      if (this.showAdvancedOptions) {
        habitica.setOptions({
          endpoint: this.endpoint
        })
      }
      return habitica.login(this.username, this.pass)
        .then((res) => {
          localStorage.id = res.id
          localStorage.apiToken = res.apiToken
          localStorage.endpoint = this.endpoint
          this.$router.replace(this.$route.query.redirect || '/')
        })
        .catch((err) => {
          this.error = err.message
        })
    },
    displayAdvancedOptions () {
      this.showAdvancedOptions = true
    }
  }
}
</script>
