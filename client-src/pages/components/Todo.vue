<template>
<div class="event" v-bind:class="{ pending: task.processInProgress }">
  <div class="label" v-bind:class="task.color">
    <i class="radio icon" v-bind:class="{ selected: task.selected }" @click="score(task)"></i>
  </div>

  <div class="content" v-on:dblclick="openMenu(task)">
    <div class="summary" v-html="md(task.text)"></div>
  </div>
</div>
</template>

<style>
.event .label {
  border-right: 2px solid #444;
}

.event .label.best {
  border-color: rgb(201, 218, 248);
}

.event .label.best i {
  border-color: rgb(201, 218, 248);
}

.event .label.better {
  border-color: rgb(208, 224, 227);
}

.event .label.good {
  border-color: rgb(217, 234, 211);
}

.event .label.neutral {
  border-color: rgb(255, 242, 204);
}

.event .label.bad {
  border-color: rgb(252, 229, 205);
}

.event .label.worse {
  border-color: rgb(244, 204, 204);
}

.event .label.worst {
  border-color: rgb(230, 184, 175);
}
</style>

<script>
'use strict'

const habitica = require('../../lib/habitica')
const modalTask = require('../../store/modal-task')

module.exports = {
  props: ['task'],
  methods: {
    md (text) {
      return habitica.md(text)
    },
    openMenu () {
      let task = this.task
      modalTask.id = task.id
			modalTask.text = task.text
			modalTask.notes = task.notes

      $('#modal')
        .modal({
          blurring: true,
          observeChanges: true,
          onHidden () {
            modalTask.editFields.notes = false
            modalTask.editFields.text = false
          },
          onApprove () {
            habitica.updateTask(task.id, {
              text: modalTask.text,
              notes: modalTask.notes
            }).then((res) => {
              task.text = res.data.text
              task.value = res.data.value
              task.notes = res.data.notes
              $('#modal').modal('hide')
            })

            return false
          },
          setting: {
            transition: 'scale'
          }
        })
        .modal('show')
    },
    score (task) {
      task.processInProgress = true
      task.selected = true;

      // habitica.scoreTask(task.id).then(() => {
      //   $(todoNode).slideUp()
      // }).catch(reportError)
    }
  },
}
</script>
