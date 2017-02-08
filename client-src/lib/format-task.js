'use strict'

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

module.exports = function formatTask (task) {
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
