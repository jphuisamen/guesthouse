
const data = require('./data')
const dustPartial = require('./dustPartial')
const dustRender = require('./dustRender')
const glob = require('./glob')
const handleError = require('./handleError')
const less = require('./less')
const mkdirs = require('./mkdirs')
const remove = require('./remove')
const symlink = require('./symlink')

function main () {
  return Promise.resolve()
    .then(() => remove('www'))
    .then(() => mkdirs('www'))
    .then(() => mkdirs('www/css'))
    .then(() => less('styles/index.less', 'www/css/index.css'))
    .then(() => glob(
      'templates/partials/**/*.dust',
      dustPartial('templates/partials')
    ))
    .then(() => data())
    .then((data) => glob(
      'templates/www/**/*.dust',
      dustRender('templates/www', 'www', data)
    ))
    .then(() => symlink('assets/fonts', 'www/fonts'))
    .then(() => symlink('assets/js', 'www/js'))
    .then(() => symlink('assets/images', 'www/images'))
}

module.exports = main

if (!module.parent) {
  main().catch(handleError)
}
