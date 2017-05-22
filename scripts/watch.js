
const chokidar = require('chokidar')

const handleError = require('./handleError')

module.exports = function (target, func) {
  chokidar.watch(target)
    .on('change', (path) => func(path).catch(handleError))
}
