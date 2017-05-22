
const koa = require('koa')
const koaLivereload = require('koa-livereload')
const koaStatic = require('koa-static')
const livereload = require('livereload')

const build = require('./build')
const data = require('./data')
const dustPartial = require('./dustPartial')
const dustRender = require('./dustRender')
const glob = require('./glob')
const handleError = require('./handleError')
const less = require('./less')
const log = require('./log')
const watch = require('./watch')

const PORT = 8000

function serve () {
  // Create the server application
  var app = koa()
  app.use(koaLivereload())
  app.use(koaStatic('www'))
  // Start the server
  app.listen(PORT)
  // Setup and start the livereload server
  var livereloadServer = livereload.createServer()
  livereloadServer.watch('www')
  // Display running server message
  log(`Server running at localhost:${PORT}`)
}

function main () {
  return Promise.resolve()
    .then(() => build())
    .then(() => serve())
    .then(() => watch(
      'styles/**/*',
      () => less('styles/index.less', 'www/css/index.css')
    ))
    .then(() => watch(
      'templates/partials/**/*.dust',
      (filePath) => {
        return Promise.resolve()
          .then(() => dustPartial('templates/partials')(filePath))
          .then(() => data())
          .then((data) => glob(
            'templates/www/**/*.dust',
            dustRender('templates/www', 'www', data)
          ))
      }
    ))
    .then(() => watch(
      'templates/www/**/*.dust',
      (filePath) => {
        return Promise.resolve()
          .then(() => data())
          .then((data) => dustRender('templates/www', 'www', data)(filePath))
      }
    ))
}

module.exports = main

if (!module.parent) {
  main().catch(handleError)
}
