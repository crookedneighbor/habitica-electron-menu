<template>
<div>
  <new-task></new-task>

  <div class="ui divider"></div>

  <div class="ui feed">
    <task v-for="task in todos" v-bind:task="task" :key="task.id"></task>
  </div>

  <task-modal v-bind:task="modalTask"></task-modal>
</div>
</template>

<script>
'use strict'

const todos = require('../store/todos')
const modalTask = require('../store/modal-task')
const habitica = require('../lib/habitica')
const formatTask = require('../lib/format-task')

const Task = require('./components/Task.vue')
const TaskModal = require('./components/Task-Modal.vue')
const NewTask = require('./components/New-Task.vue')

function reportError (err) {
  console.error(err)
}

module.exports = {
  data () {
    return {
      modalTask: modalTask,
      newTask: {
        text: '',
        sending: false
      },
      todos: todos
    }
  },
  beforeCreate () {
    todos.splice(0, todos.length) // clear out todos array

    habitica.getTasks().then((tasks) => {
      tasks.forEach((task) => {
        todos.push(formatTask(task))
      })
    }).catch(reportError)
  },
  methods: {
    md: habitica.md,
  },
  components: {
    Task: Task,
    TaskModal: TaskModal,
    NewTask: NewTask
  }
}
</script>
