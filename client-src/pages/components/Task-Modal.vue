<template>
<div id="modal" class="ui modal">
  <div class="header">
    <div v-if="!task.editFields.text" v-html="md(task.text)" v-on:dblclick="editField('text')"></div>
    <div class="ui form">
      <div class="field" v-if="task.editFields.text">
        <input id="modal-task-text" v-model="task.text" @keyup.enter="closeField('text')" />
      </div>
    </div>
  </div>
  <div class="content">
    <div class="description">
      <div v-if="!task.editFields.notes" v-on:dblclick="editField('notes')">
        <div v-html="md(task.notes)"></div>
      </div>
      <div v-if="task.editFields.notes" class="ui form">
        <div class="field">
          Press Ctrl + Enter to Exit Edit Mode

          <textarea id="modal-task-notes" v-model="task.notes" @keyup.enter="metaEnterCloseField($event, 'notes')"></textarea>
        </div>
      </div>
      <div class="no-notes" v-if="!task.notes && !task.editFields.notes" v-on:dblclick="editField('notes')">
        Double-Click to Enter Notes
      </div>
    </div>
  </div>
  <div class="content icon-buttons">
    <i class="ui icon trash link" @click="deleteTask(task.id)"></i>
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
</template>

<style></style>

<script>
'use strict'

const habitica = require('../../lib/habitica')
const todos = require('../../store/todos')

module.exports = {
  props: ['task'],
  methods: {
    md: habitica.md,
    editField (field) {
      this.task.editFields[field] = true
      setTimeout(function () {
        $(`#modal-task-${field}`).focus()
      }, 100)
    },
    closeField (field) {
      modalTask.editFields[field] = false
    },
    metaEnterCloseField ($event, field) {
      if ($event.metaKey || $event.ctrlKey) {
        this.task.editFields[field] = false
      }
    },
    deleteTask (id) {
      habitica.deleteTask(id).then((res) => {
        let taskIndex = todos.findIndex(task => task.id === id)

        if (taskIndex > -1) {
          todos.splice(taskIndex, 1)
        }
        $('#modal').modal('hide')
      })
    }
  }
}
</script>
