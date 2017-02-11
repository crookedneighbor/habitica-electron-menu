<template>
<div id="new-task-input" class="ui icon input" v-bind:class="{ loading: task.sending }">
  <input type="text" v-model="task.text" placeholder="Task Name" @keyup.enter="makeNewTask()" :disabled="task.sending">
  <i class="add link icon" v-on:click="makeNewTask()" v-bind:class="{ circular: !task.sending, inverted: !task.sending }"></i>
</div>
</template>

<style></style>

<script>
'use strict'

const habitica = require('../../lib/habitica')
const todos = require('../../store/todos')
const formatTask = require('../../lib/format-task')

module.exports = {
  data () {
    return {
      task: {
        text: '',
        invalid: false,
        sending: false
      }
    }
  },
  methods: {
    makeNewTask () {
      if (!this.task.text) {
        this.task.invalid = true
        return
      }
  
      this.task.invalid = false
      this.task.sending = true
      habitica.makeTask({
        text: this.task.text,
        type: 'todo'
      }).then((response) => {
        let createdTask = response.data
        this.task.text = ''
        this.task.sending = false
        todos.unshift(formatTask(createdTask))
      })
    }
  }
}
</script>
