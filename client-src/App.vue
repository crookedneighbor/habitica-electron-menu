<style>
body {
  margin-top: 15px;
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
</style>

<template>
<div id="app" class="ui container">
  <router-view></router-view>
</div>
</template>

<script>
'use strict'

const router = require('./lib/router')
const todos = require('./store/todos')
const api = require('./lib/habitica').api

module.exports = {
  router,
}

function reportError (err) {
	console.error(err)
}

const formatTask = require('./lib/format-task')

api.get('/tasks/user', {type: 'todos'}).then((response) => {
	let tasks = response.data

	tasks.forEach((task) => {
    todos.push(formatTask(task))
	})
}).catch(reportError)
</script>
