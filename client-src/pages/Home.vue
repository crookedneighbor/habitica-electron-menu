<template>
<div>
  <div id="new-task-input" class="ui icon input" v-bind:class="{ loading: newTask.sending }">
    <input type="text" v-model="newTask.text" placeholder="Task Name" @keyup.enter="makeNewTask(newTask)" :disabled="newTask.sending">
    <i class="add link icon" v-on:click="makeNewTask(newTask)" v-bind:class="{ circular: !newTask.sending, inverted: !newTask.sending }"></i>
  </div>
  <div class="ui divider"></div>
  <div class="ui feed">
    <todo v-for="task in todos" v-bind:task="task" :key="task.id">
  </div>
  <div id="modal" class="ui modal">
    <div class="header">
      <div v-if="!modalTask.editFields.text" v-html="md(modalTask.text)" v-on:dblclick="editField('text')"></div>
      <div class="ui form">
        <div class="field" v-if="modalTask.editFields.text">
          <input id="modal-task-text" v-model="modalTask.text" @keyup.enter="closeField('text')" />
        </div>
      </div>
    </div>
    <div class="content">
      <div class="description">
        <div v-if="!modalTask.editFields.notes" v-on:dblclick="editField('notes')">
          <div v-html="md(modalTask.notes)"></div>
        </div>
        <div v-if="modalTask.editFields.notes" class="ui form">
          <div class="field">
            Press Ctrl + Enter to Exit Edit Mode

            <textarea id="modal-task-notes" v-model="modalTask.notes" @keyup.enter="metaEnterCloseField($event, 'notes')"></textarea>
          </div>
        </div>
        <div class="no-notes" v-if="!modalTask.notes && !modalTask.editFields.notes" v-on:dblclick="editField('notes')">
          Double-Click to Enter Notes
        </div>
      </div>
    </div>
    <div class="content icon-buttons">
      <i class="ui icon trash link" @click="deleteTask(modalTask.id)"></i>
    </div>
    <div class="actions">
      <div class="ui black deny button">
        Cancel
      </div>
      <div class="ui positive right labeled icon button">
        Save
        <i class="checkmark icon"></i>
      </div>
    </div>
  </div>
</div>
</template>

<script>
'use strict'

const markdown = require('habitica-markdown')

const todos = require('../store/todos')
const modalTask = require('../store/modal-task')
const habitica = require('../lib/habitica')
const formatTask = require('../lib/format-task')

const Todo = require('./components/Todo.vue')

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
    md (text) {
      return markdown.render(text)
    },
    editField (field) {
      modalTask.editFields[field] = true
      setTimeout(function () {
        $(`#modal-task-${field}`).focus()
      }, 100)
    },
    closeField (field) {
      modalTask.editFields[field] = false
    },
    metaEnterCloseField ($event, field) {
      if ($event.metaKey || $event.ctrlKey) {
        modalTask.editFields[field] = false
      }
    },
    deleteTask (id) {
      api.del(`/tasks/${id}`)
        .then((res) => {
          let taskIndex = todos.findIndex(task => task.id === id)
  
          if (taskIndex > -1) {
            todos.splice(taskIndex, 1)
          }
          $('#modal').modal('hide')
        })
    },
    makeNewTask (newTask) {
      if (!newTask.text) {
        newTask.invalid = true
        return
      }
  
      newTask.invalid = false
      newTask.sending = true
      api.post('/tasks/user', {
        text: newTask.text,
        type: 'todo'
      }).then((response) => {
        let createdTask = response.data
        newTask.text = ''
        newTask.sending = false
        todos.unshift(formatTask(createdTask))
      })
    }
  },
  components: {
    Todo: Todo
  }
}
</script>
