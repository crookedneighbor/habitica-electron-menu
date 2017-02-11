const menubar = require('menubar')
const mb = menubar()


mb.on('ready', function ready () {
  console.log('app is ready')
})

if (process.env.NODE_ENV === 'development') {
  mb.on('after-create-window', function () {
    mb.window.openDevTools()
  })
}
