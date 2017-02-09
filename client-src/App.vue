<style>
body {
  margin-top: 10px;
}

.event.pending {
  opacity: .5;
  transition: .1s;
}

.event {
  cursor: pointer;
}

.no-notes {
  color: #999;
}

.icon-buttons {
  text-align: right;
}

#new-task-input {
  width: 100%;
}

#settings-link {
  text-align: right;
  margin-bottom: 20px;
}
</style>

<template>
<div id="app" class="ui container">
  <div v-if="$route.path === '/'" id="settings-link">
    <router-link to="/settings">
      <i class="icon settings link"></i>
    </router-link>
  </div>
  <router-view></router-view>
</div>
</template>

<script>
'use strict'

const router = require('./lib/router')

module.exports = {
  router,
}
</script>
