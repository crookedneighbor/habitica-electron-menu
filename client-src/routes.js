'use strict'

module.exports = [
  {
    path: '/',
    name: 'landing-page',
    component: {
      template: '<div>Test</div>'
    }
  },
  {
    path: '*',
    redirect: '/'
  }
]
