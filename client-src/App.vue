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

function valueToColor (value) {
  if (value > 10) {
    return 'best'
  } else if (value >= 5) {
    return 'better'
  } else if (value >= 1) {
    return 'good'
  } else if (value >= -1) {
    return 'neutral'
  } else if (value >= -10) {
    return 'bad'
  } else if (value >= -20) {
    return 'worse'
  } else {
    return 'worst'
  }
}

function formatTask (task) {
  return {
    id: task.id,
    completed: task.completed,
    text: task.text,
    notes: task.notes,
    color: valueToColor(task.value),
    processInProgress: false,
    selected: false
  }
}

api.get('/tasks/user', {type: 'todos'}).then((response) => {
	let tasks = response.data

	tasks.forEach((task) => {
    todos.push(formatTask(task))
	})
}).catch(reportError)
</script>
