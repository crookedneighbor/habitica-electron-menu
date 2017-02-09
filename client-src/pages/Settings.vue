<template>
<div class="ui segment">
  <div class="ui form">
    <router-link to="/logout">
      <div class="ui button">Logout</div>
    </router-link>
  </div>
</div>
</template>

<script>
const auth = require('../lib/auth')

module.exports = {
}
</script>
