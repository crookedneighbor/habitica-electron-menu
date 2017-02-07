'use strict'

console.log('foo')

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
